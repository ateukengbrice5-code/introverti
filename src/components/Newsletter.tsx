"use client";

import { useState, FormEvent } from "react";
import { getSupabase } from "@/lib/supabase/client";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success" | "loading">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setStatus("error");
      setMessage("Cette adresse ne semble pas valide. Vérifie-la et réessaie.");
      return;
    }

    setStatus("loading");
    const { error } = await getSupabase().from("newsletter_subscribers").insert({ email });

    if (error) {
      // Contrainte unique sur l'email : déjà inscrit n'est pas une erreur pour l'utilisateur.
      if (error.code === "23505") {
        setStatus("success");
        setMessage("Cette adresse est déjà inscrite.");
        setEmail("");
        return;
      }
      setStatus("error");
      setMessage("Une erreur est survenue. Réessaie dans un instant.");
      return;
    }

    setStatus("success");
    setMessage("C'est noté. Le premier envoi arrive bientôt.");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Adresse email
        </label>
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Ton adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={status === "error"}
          aria-describedby="newsletter-feedback"
          className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-paper placeholder:text-paper/40 focus:border-gold"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="whitespace-nowrap border border-gold bg-gold px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-transparent hover:text-gold disabled:opacity-60"
      >
        {status === "loading" ? "Envoi…" : "Je m\u2019inscris"}
      </button>

      <p
        id="newsletter-feedback"
        role="status"
        className={`w-full text-xs ${status === "error" ? "text-red-400" : "text-gold"} ${
          status === "idle" ? "sr-only" : "mt-1"
        }`}
      >
        {message}
      </p>
    </form>
  );
}
