# ARCHITECTURE.md — Ateb's Inspire

## Stack
- Frontend : Next.js 16 (App Router), React 19, Tailwind v4 (site "L'introverti") ; Vite/React pour Companion et Finance AI, Next.js pour Dating (projets Bolt en cours d'intégration)
- Backend : Supabase (Auth + PostgreSQL + Row Level Security)
- Déploiement : Vercel

## Projet Supabase
`atebs-inspire-core` — id `iwoohdtbcgmsdzuxwniw`, région `eu-west-1`. Projet unique pour tout l'écosystème (pas un projet par produit).

## Principe général
Un compte unique (`auth.users`) donne accès à plusieurs profils spécialisés, un par produit, chacun dans sa propre table protégée par RLS. Aucun produit ne lit les données d'un autre sans permission explicite, vérifiée en base (jamais uniquement côté frontend).

Toutes les tables produit-spécifiques (issues de la réconciliation des projets Bolt, 30/08/2026) sont préfixées `companion_*`, `finance_*`, `dating_*` — aucune collision de nom possible entre produits, ni avec le contenu éditorial du site.

## Schéma — socle (Phase 0-1, étendu 30/08/2026)

| Table | Rôle |
|---|---|
| `core_profile` | identité de base, créée automatiquement à l'inscription. Colonnes : `user_id` (PK), `first_name`, `last_name`, `age`, `location_general`, `language`, `display_name`, `avatar_url`, `birthdate`, `created_at`, `updated_at`. `display_name`/`avatar_url`/`birthdate` centralisent l'identité générique auparavant dupliquée dans 3 tables `profiles` distinctes (Companion/Finance/Dating) |
| `behavioral_profile` | profil comportemental courant (8 dimensions : `introversion_level` [composite dérivé], `stimulation_sociale`, `introspection`, `expression`, `organisation`, `adaptation`, `decision`, `profondeur_relationnelle`) |
| `behavioral_profile_history` | historique des versions précédentes (`previous_values` jsonb) |
| `dating_profile` | isolé, Inspire Dating — voir détail ci-dessous |
| `finance_profile` | isolé, Inspire Finance AI — voir détail ci-dessous |
| `companion_state` | agrégat Companion (`current_goals`, `habits`, `progression_log` en jsonb, `plan`) — distinct des tables relationnelles `companion_*` ci-dessous, qui portent le détail objectif par objectif |
| `permissions` | consentement inter-produits (`product` ∈ `dating`/`finance`/`companion`/`saas`/`web`, `scope`, `granted_at`, `revoked_at`) |

Fonctions : `has_permission(user_id, product, scope)` (vérification RLS), `handle_new_user()` (trigger `on_auth_user_created`, provisionne en une fois `core_profile` + `companion_state` + `finance_profile` + `dating_profile`) — toutes deux `SECURITY DEFINER` sans accès public.

`admin_users (user_id, granted_at)` + `is_admin()` (`SECURITY DEFINER`, sans paramètre, vérifie uniquement `auth.uid()`) : protège `/admin` du site éditorial (voir DECISION-LOG.md, 01/09/2026) — remplace l'ancien mot de passe partagé. Interface de gestion sur `/admin/admins` (ajout par e-mail, retrait avec garde-fou contre la suppression du dernier admin) — voir DECISION-LOG.md, 01/09/2026.

**SSO Ateb ID** : `lib/supabase/server.ts` et `middleware.ts` acceptent `cookieOptions.domain` via la variable `AUTH_COOKIE_DOMAIN` (vide en local, domaine racine partagé en production, ex. `.atebsinspire.com`) — permet à la session de rester valide sur les sous-domaines des autres apps Ateb (Evolution, Finance). Voir DECISION-LOG.md, 02/09/2026.

**Partage** : `ArticleSharing.tsx` (articles — Web Share API, réseaux sociaux, citation avec attribution) et `ResultSharing.tsx` (résultat de test — partage un texte + lien vers `/se-decouvrir/test`, jamais l'URL privée du résultat ni les dimensions détaillées). Voir DECISION-LOG.md, 06/09/2026 et 08/09/2026.

Bucket de stockage partagé `avatars` (pas préfixé par produit, puisque `avatar_url` vit sur `core_profile`).

## Schéma — test de personnalité (Phase 2a, v2 finale)

| Table | Rôle |
|---|---|
| `test_dimensions` | 8 dimensions de référence (7 mesurées + `introversion`, dérivée) |
| `test_questions` | 40 questions liées à une dimension, avec dimension secondaire optionnelle |
| `test_question_options` | 4 options par question (A-D), poids par dimension en jsonb |
| `test_sessions` | une session par passage du test |
| `test_responses` | référence un `option_id` (plus une valeur 1-5) |

Fonction `score_test_session(session_id)` : calcule la moyenne par dimension à partir des poids d'options, dérive `introversion` (`0.6 × inverse(stimulation_sociale) + 0.4 × introspection`), traduit en formulation qualitative (`faible`/`modéré`/`élevé`), archive l'ancien profil dans `behavioral_profile_history`, incrémente la version. Sans accès public — appelée uniquement via un client service role, depuis `/api/test/complete`.

## Schéma — contenu éditorial (site "L'introverti")

| Table | Rôle |
|---|---|
| `categories`, `themes` | taxonomie éditoriale |
| `articles` | avec `status` (`draft`/`review`/`scheduled`/`published`/`archived`) |
| `journeys` | parcours d'accompagnement |
| `resources` | fiches, exercices, audio, vidéo |
| `products` | livres, ebooks, programmes |
| `newsletter_subscribers` | inscriptions newsletter |
| `user_progress`, `favorites`, `comments` | données personnelles liées au compte |
| `axes` | 7 axes d'introspection (contenu placeholder), utilisés par `/se-decouvrir` indépendamment du questionnaire |

RLS : lecture publique uniquement sur le contenu `published` ; écriture via service role (admin) ou propriétaire pour les données personnelles.

## Schéma — Inspire Companion (intégré 30/08/2026, ex-projet Bolt `bf8amcwp`)

| Table | Rôle |
|---|---|
| `companion_categories` | catégories d'objectifs, propres à l'utilisateur |
| `companion_goals` | objectifs (fréquence, priorité, valeur cible/courante, statut) |
| `companion_goal_occurrences` | occurrences planifiées d'un objectif (générées à la volée par le client, pas en masse) |
| `companion_training_exercises` | bibliothèque d'exercices (globale ou personnelle), 6 dimensions (`attention`/`habits`/`thoughts`/`emotions`/`learning`/`sleep_env`) |
| `companion_training_sessions` | sessions d'entraînement réalisées |
| `companion_behavior_logs` | journal comportemental (stimulus/pensée/émotion/décision/action/conséquence/apprentissage) |
| `companion_goal_training_links` | liaison many-to-many objectif ↔ exercice |
| `companion_subscriptions` | historique d'abonnement (prêt pour Stripe, `companion_state.plan` reste la source de vérité pour les droits actuels) |

RLS : owner-scoped (`auth.uid() = user_id`) sur toutes ces tables ; `companion_training_exercises` en lecture ouverte pour les exercices globaux (`is_global = true`), écriture restreinte au propriétaire. **Aucune colonne `user_id` de ces tables n'a de `DEFAULT auth.uid()`** (contrairement au schéma Bolt d'origine) — le client doit le fournir explicitement à chaque insert.

## Schéma — Inspire Finance AI (intégré 30/08/2026, ex-projet Bolt `hq2ktzja`)

`finance_profile` étendu avec les champs spécifiques au produit : `phone`, `country` (défaut `Cameroun`), `currency` (défaut `XAF`), `active_mode`, `onboarded`, `plan`, `plan_expires_at`.

| Table | Rôle |
|---|---|
| `finance_categories` | catégories revenus/dépenses, hiérarchiques (`parent_id`) |
| `finance_transactions` | transactions (montant, devise, mode de paiement dont mobile money, texte brut + confiance de classification) |
| `finance_budgets` | budgets par catégorie et période |
| `finance_notifications` | alertes (info/warning/critical) |
| `finance_goals` | objectifs d'épargne (maison, voiture, voyage, etc.) |
| `finance_scores` | score financier calculé (0-100) avec détail jsonb |
| `finance_chat_messages` | historique de l'assistant conversationnel |
| `finance_subscriptions` | abonnements avec paiement (mobile money, virement, carte) |

Fonction `finance_activate_plan(plan, duration_days)` (`SECURITY DEFINER`) : active un plan payant sur `finance_profile`. **Avertissement de sécurité assumé** : reste exécutable par tout utilisateur authentifié (auto-activation sans paiement réel) — comportement hérité du code Bolt d'origine, documenté comme temporaire ("mode démo, à restreindre au service role une fois un vrai moyen de paiement branché"). Conservé tel quel, warning du linter Supabase connu et accepté.

## Schéma — Inspire Dating (intégré 30/08/2026, ex-projet Bolt `1plndtw7`)

`dating_profile` étendu avec les champs spécifiques au produit : `bio`, `pronouns`, `privacy_visible`, `invisible_mode`, `reflection_hours`, `verified`, `verification_status`/`verification_photo_url`/`verification_submitted_at`, `plan`, `plan_expires_at`, `stripe_customer_id`/`stripe_subscription_id`.

| Table | Rôle |
|---|---|
| `dating_matches` | mise en relation entre deux utilisateurs (`user1_liked`/`user2_liked`, statut) |
| `dating_messages` | messagerie liée à un match, avec délai de réflexion (`reflection_until`) |
| `dating_notifications` | alertes (nouveau match, nouveau message, réflexion terminée) |
| `dating_blocks` | blocages entre utilisateurs |
| `dating_profile_prompts` | questions/réponses de présentation du profil |
| `dating_profile_views` | vues de profil |
| `dating_coaching_articles` | contenu de coaching (6 articles réels réutilisés depuis le projet Bolt d'origine, pas inventés) |
| `dating_subscriptions` | abonnements (mobile money, Stripe, virement) |

**Important** : Dating n'a **pas** son propre système de test de personnalité — ses colonnes `test_completed`/`test_data`/`profile_result` du projet Bolt d'origine ont été volontairement omises lors de la réconciliation. Dating doit lire `behavioral_profile` directement (test de complétude via `exists (select 1 from behavioral_profile where user_id = ...)`), jamais maintenir sa propre copie.

## API Next.js

- `/api/test/start`, `/api/test/answer`, `/api/test/complete` — orchestrent le test, décrits dans `PHASE-2A-TEST-PERSONNALITE.md`.
- Deux clients Supabase côté serveur : `lib/supabase/server.ts` (session utilisateur, sous RLS) et `lib/supabase/admin.ts` (service role, jamais exposé au frontend, réservé aux opérations volontairement sans accès public).

## Code existant réutilisé (site "L'introverti")

- Structure App Router, composants transverses (`Header`, `Footer`, `Compass`, etc.), identité visuelle (noir/doré/anthracite) — conservés tels quels.
- CMS admin (`/admin`) — conservé, authentification à faire évoluer.
- Ancien système de quiz (6 archétypes par poids) — abandonné, remplacé par le modèle par dimensions.

## État d'intégration des projets Bolt (30/08/2026)

Les schémas des 3 produits (Companion, Finance AI, Dating) sont unifiés sur `atebs-inspire-core`, sans collision de nom, avec provisioning compte unique fonctionnel (testé).

- **Companion** : code frontend adapté (voir DECISION-LOG.md, 30/08/2026) — requêtes remappées vers les tables préfixées, `user_id` fourni explicitement à chaque insert, profil applicatif reconstruit depuis `core_profile` + `companion_state`. `npm run typecheck` et `npm run build` passent.
- **Finance AI** : code frontend adapté (voir DECISION-LOG.md, 30/08/2026) — requêtes remappées, RPC `activate_plan`→`finance_activate_plan`, profil applicatif reconstruit depuis `core_profile` + `finance_profile`, métadonnée d'inscription corrigée (`full_name`→`display_name`, celle lue par `handle_new_user()`). `npm run typecheck` et `npm run build` passent.
- **Dating** : schéma en place, adaptation du code frontend **pas encore commencée**.

Companion et Finance AI partagent désormais effectivement le compte unique côté client. Dating interroge encore sa propre session Supabase/logique d'auth indépendante tant que son code n'a pas été adapté.

## Règles de sécurité stables

1. Toute fonction `SECURITY DEFINER` a son `EXECUTE` révoqué pour `public`/`anon`/`authenticated` sauf besoin explicite d'appel direct (exception assumée et documentée : `finance_activate_plan`, voir ci-dessus).
2. Sécurité inter-produits toujours vérifiée en base (RLS + `has_permission`), jamais uniquement côté frontend.
3. Aucune table d'un produit ne référence directement les données d'un autre.
4. Le profil comportemental n'est jamais affiché en score brut.
5. Ne pas modifier le schéma Supabase sans tracer la modification dans `DECISION-LOG.md`.
6. Plus aucune manipulation de pause/restore sur un projet actif sans validation explicite préalable (suite à l'incident du 25/08/2026).
