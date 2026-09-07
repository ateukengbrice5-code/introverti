"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface Option {
  id: string;
  option_letter: "A" | "B" | "C" | "D";
  label: string;
}

interface Question {
  id: string;
  prompt: string;
  order_index: number;
  test_question_options: Option[];
}

type LoadState = "loading" | "ready" | "submitting" | "error";

export default function TestClient() {
  const router = useRouter();
  const [state, setState] = useState<LoadState>("loading");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function start() {
      try {
        const res = await fetch("/api/test/start", { method: "POST" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Impossible de démarrer le test.");
        setSessionId(data.session_id);
        setQuestions(
          [...data.questions].sort((a: Question, b: Question) => a.order_index - b.order_index)
        );
        setState("ready");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erreur inconnue.");
        setState("error");
      }
    }
    start();
  }, []);

  const question = questions[step];
  const progress = useMemo(
    () => (questions.length ? Math.round((step / questions.length) * 100) : 0),
    [step, questions.length]
  );

  async function answer(optionId: string) {
    if (!sessionId || !question) return;

    // Enregistrement de la réponse (idempotent côté API)
    const res = await fetch("/api/test/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: sessionId,
        question_id: question.id,
        option_id: optionId,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Impossible d'enregistrer ta réponse.");
      setState("error");
      return;
    }

    if (step + 1 < questions.length) {
      setStep(step + 1);
      return;
    }

    // Dernière question : on complète le test
    setState("submitting");
    const completeRes = await fetch("/api/test/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    });

    if (!completeRes.ok) {
      const data = await completeRes.json();
      setError(data.error ?? "Impossible de calculer ton profil.");
      setState("error");
      return;
    }

    router.push("/se-decouvrir/resultat");
  }

  if (state === "loading") {
    return <p className="text-sm text-paper/50">Préparation du questionnaire...</p>;
  }

  if (state === "error") {
    return (
      <p className="border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
        {error ?? "Une erreur est survenue."}
      </p>
    );
  }

  if (state === "submitting") {
    return <p className="text-sm text-paper/50">Calcul de ton profil...</p>;
  }

  if (!question) {
    return <p className="text-sm text-paper/50">Aucune question disponible.</p>;
  }

  return (
    <div>
      <div className="h-1 w-full bg-white/10">
        <div className="h-1 bg-gold transition-all" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-paper/40">
        Question {step + 1} / {questions.length}
      </p>

      <h2 className="mt-4 font-display text-2xl leading-snug">{question.prompt}</h2>

      <div className="mt-8 flex flex-col gap-3">
        {question.test_question_options
          .sort((a, b) => a.option_letter.localeCompare(b.option_letter))
          .map((opt) => (
            <button
              key={opt.id}
              onClick={() => answer(opt.id)}
              className="border border-white/15 px-5 py-4 text-left text-sm text-paper/85 transition-colors hover:border-gold hover:text-gold"
            >
              {opt.label}
            </button>
          ))}
      </div>
    </div>
  );
}
