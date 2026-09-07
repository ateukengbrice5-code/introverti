import { getSupabase } from "@/lib/supabase/client";
import { QuizQuestion } from "@/lib/types";

type QuestionRow = {
  id: string;
  prompt: string;
  sort_order: number;
  options: QuizQuestion["options"];
};

export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  const { data, error } = await getSupabase()
    .from("quiz_questions")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return (data as QuestionRow[]).map((row) => ({
    id: row.id,
    prompt: row.prompt,
    options: row.options,
  }));
}
