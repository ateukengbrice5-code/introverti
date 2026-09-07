import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Démarre une nouvelle session de test.
 * Retourne aussi les questions actives, groupées par dimension, pour que le
 * frontend puisse afficher le test sans appel supplémentaire.
 */
export async function POST() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { data: session, error: sessionError } = await supabase
    .from("test_sessions")
    .insert({ user_id: user.id })
    .select("id, started_at")
    .single();

  if (sessionError) {
    return NextResponse.json({ error: sessionError.message }, { status: 500 });
  }

  // Les dimensions et pondérations ne sont jamais exposées au frontend :
  // seuls l'id, le libellé et la lettre de chaque option sont renvoyés.
  const { data: questions, error: questionsError } = await supabase
    .from("test_questions")
    .select(
      "id, prompt, order_index, test_question_options(id, option_letter, label)"
    )
    .eq("active", true)
    .order("order_index", { ascending: true });

  if (questionsError) {
    return NextResponse.json({ error: questionsError.message }, { status: 500 });
  }

  return NextResponse.json({
    session_id: session.id,
    started_at: session.started_at,
    questions,
  });
}
