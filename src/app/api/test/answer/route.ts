import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface AnswerPayload {
  session_id: string;
  question_id: string;
  option_id: string; // id de l'option choisie (A/B/C/D), voir test_question_options
}

/**
 * Enregistre une réponse (choix d'une option A-D). Idempotent : si
 * l'utilisateur revient sur une question déjà répondue, la réponse est
 * mise à jour (unique sur session_id + question_id côté base).
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

  const body: AnswerPayload = await request.json();

  if (!body.session_id || !body.question_id || !body.option_id) {
    return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
  }

  // Vérifie que l'option appartient bien à la question indiquée
  // (évite d'enregistrer une réponse incohérente).
  const { data: option, error: optionError } = await supabase
    .from("test_question_options")
    .select("id")
    .eq("id", body.option_id)
    .eq("question_id", body.question_id)
    .maybeSingle();

  if (optionError || !option) {
    return NextResponse.json(
      { error: "Option invalide pour cette question" },
      { status: 400 }
    );
  }

  // RLS garantit que la session appartient bien à l'utilisateur connecté ;
  // si ce n'est pas le cas, l'insert échoue silencieusement (0 ligne).
  const { error } = await supabase.from("test_responses").upsert(
    {
      session_id: body.session_id,
      question_id: body.question_id,
      option_id: body.option_id,
    },
    { onConflict: "session_id,question_id" }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
