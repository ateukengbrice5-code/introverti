import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

interface CompletePayload {
  session_id: string;
}

/**
 * Termine une session de test :
 * 1. Vérifie (via le client lié à l'utilisateur, donc sous RLS) que la
 *    session lui appartient et que toutes les questions actives ont une réponse.
 * 2. Appelle score_test_session via le client admin (seul moyen de l'appeler,
 *    la fonction n'a aucun accès public).
 * 3. Retourne le behavioral_profile résultant, formulé qualitativement.
 */
export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const body: CompletePayload = await request.json();
  if (!body.session_id) {
    return NextResponse.json({ error: "session_id manquant" }, { status: 400 });
  }

  // Vérifie l'ownership de la session (RLS s'applique sur ce client)
  const { data: session, error: sessionError } = await supabase
    .from("test_sessions")
    .select("id, status")
    .eq("id", body.session_id)
    .single();

  if (sessionError || !session) {
    return NextResponse.json({ error: "Session introuvable" }, { status: 404 });
  }

  if (session.status === "completed") {
    return NextResponse.json(
      { error: "Cette session a déjà été complétée" },
      { status: 409 }
    );
  }

  // Vérifie que toutes les questions actives ont une réponse
  const { data: activeQuestions } = await supabase
    .from("test_questions")
    .select("id")
    .eq("active", true);

  const { data: answered } = await supabase
    .from("test_responses")
    .select("question_id")
    .eq("session_id", body.session_id);

  const answeredIds = new Set((answered ?? []).map((r) => r.question_id));
  const missing = (activeQuestions ?? []).filter((q) => !answeredIds.has(q.id));

  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Test incomplet", missing_count: missing.length },
      { status: 400 }
    );
  }

  // Déclenche le scoring via le client admin existant du projet (service role,
  // réservé au serveur — voir lib/supabase/admin.ts, déjà utilisé par /admin)
  const admin = getSupabaseAdmin();
  const { error: scoreError } = await admin.rpc("score_test_session", {
    p_session_id: body.session_id,
  });

  if (scoreError) {
    return NextResponse.json({ error: scoreError.message }, { status: 500 });
  }

  // Relit le profil comportemental à jour pour le retourner au frontend
  const { data: profile, error: profileError } = await supabase
    .from("behavioral_profile")
    .select(
      "introversion_level, stimulation_sociale, introspection, expression, organisation, adaptation, decision, profondeur_relationnelle, version"
    )
    .eq("user_id", user.id)
    .single();

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({ profile });
}
