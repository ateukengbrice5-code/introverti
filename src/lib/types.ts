/**
 * Modèle de données de la plateforme.
 *
 * Ces types décrivent la forme des tables prévues côté Supabase (section 19
 * du cahier des charges). En V1, le contenu est servi depuis /src/lib/data
 * (fichiers statiques) mais chaque fonction d'accès aux données est isolée
 * dans /src/lib/content.ts afin de pouvoir être remplacée par des requêtes
 * Supabase sans toucher aux composants.
 */

export type UUID = string;
export type ISODate = string;

export interface User {
  id: UUID;
  email: string;
  created_at: ISODate;
}

export interface Profile {
  id: UUID;
  user_id: UUID;
  display_name: string;
  avatar_url?: string;
  created_at: ISODate;
}

export interface Category {
  slug: string;
  label: string;
  description: string;
}

export type ArticleStatus = "draft" | "review" | "scheduled" | "published" | "archived";

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  category: Category["slug"];
  author: string;
  published_at: ISODate;
  reading_minutes: number;
  cover_note: string; // légende affichée sous l'image de couverture
  cover_image_url?: string | null; // URL publique de l'image de couverture (Supabase Storage)
  excerpt: string;
  body: string[]; // paragraphes
  related?: string[]; // slugs d'articles associés
  status: ArticleStatus;
}

/** Une des 6 grandes thématiques de la section "Comprendre" (section 6). */
export interface Theme {
  slug: string;
  title: string;
  standfirst: string;
  body: string[];
  distinctions?: { fait: string; hypothese: string; reflexion: string };
}

/** Un des 7 axes d'introspection (section 8). */
export interface Axis {
  slug: string;
  index: number;
  name: string;
  intent: string;
  question: string;
  exercise: string;
}

/** Archétype éditorial issu du questionnaire "Qui es-tu ?" (section 7). */
export interface ProfileType {
  slug: string;
  name: string;
  description: string;
  strengths: string[];
  frictions: string[];
  advice: string[];
  recommended_articles: string[]; // slugs
  recommended_journey: string; // slug
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: { id: string; label: string; weight: Record<ProfileType["slug"], number> }[];
}

export interface QuizResult {
  id: UUID;
  user_id?: UUID;
  profile_type: ProfileType["slug"];
  answers: Record<string, string>;
  created_at: ISODate;
}

export interface JourneyStep {
  title: string;
  description: string;
}

export interface Journey {
  slug: string;
  title: string;
  audience: string;
  duration: string;
  objective: string;
  steps: JourneyStep[];
  resources: string[]; // slugs
}

export interface UserProgress {
  user_id: UUID;
  journey_slug: string;
  step_index: number;
  updated_at: ISODate;
}

export interface Resource {
  slug: string;
  type: "ebook" | "fiche" | "exercice" | "audio" | "video";
  title: string;
  description: string;
  format_note: string;
  video_url: string | null;
}

export interface Product {
  slug: string;
  title: string;
  kind: "livre" | "ebook" | "carnet" | "programme";
  description: string;
  price_eur: number;
}

export interface NewsletterSubscriber {
  id: UUID;
  email: string;
  subscribed_at: ISODate;
}

export interface Favorite {
  user_id: UUID;
  target_type: "article" | "resource" | "journey";
  target_slug: string;
}

export interface Comment {
  id: UUID;
  user_id: UUID;
  article_slug: string;
  body: string;
  created_at: ISODate;
}
