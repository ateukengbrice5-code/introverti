# DECISION-LOG.md — Ateb's Inspire

Un seul fichier pour toutes les décisions. Ne jamais en créer un second.

---

## 25/08/2026 — Phase 0 : cadrage technique

- Stack : Next.js/React (frontend), Supabase Auth + PostgreSQL + RLS (backend), Vercel (déploiement).
- Historique du profil comportemental : table courante (`behavioral_profile`) + table d'historique séparée (`behavioral_profile_history`), plutôt qu'un versioning inline.
- Granularité des permissions inter-produits : par catégorie logique (`social`, `learning`, `rhythm`, `environment`), pas par champ individuel.
- Sécurité des permissions vérifiée en base (`has_permission()`, `SECURITY DEFINER` sans accès public), jamais uniquement côté frontend.
- Logique du test de personnalité : API route Next.js, pas d'Edge Function Supabase.

## 25/08/2026 — Phase 1 : socle auth

- Trigger `on_auth_user_created` crée automatiquement `core_profile` à l'inscription.
- Supabase Auth configuré en email/password uniquement (pas d'OAuth pour l'instant), confirmation d'e-mail exigée.
- Isolation RLS testée avec deux comptes fictifs : lecture/écriture croisées bloquées, cascade de suppression fonctionnelle.

## 25/08/2026 — Phase 2 découpée en 2a / 2b

- 2a (site + test → `behavioral_profile`) prioritaire ; 2b (Inspire Studio / CMS de contenus riches) reportée pour ne pas retarder Companion/Dating/Finance derrière un CMS complet.

## 25/08/2026 — Phase 2a : schéma du test de personnalité (première version)

- 8 dimensions (`test_dimensions`), questions liées à une dimension (`test_questions`), sessions rejouables (`test_sessions`), réponses en échelle 1-5 (`test_responses`).
- Scoring : moyenne par dimension → formulation qualitative (`faible`/`modéré`/`élevé`), jamais de score brut affiché.
- API Next.js : `/api/test/start`, `/api/test/answer`, `/api/test/complete` — cette dernière utilise un client service role séparé du client utilisateur pour appeler la fonction de scoring (sans accès public).

## 25/08/2026 — Audit du site existant "L'introverti"

- Deux archives fournies (v1, v2-admin). v2-admin est la version de référence : ajoute un CMS admin (`/admin`) protégé par mot de passe partagé, branché sur Supabase (contenu éditorial en base, plus de données statiques).
- Décision : **réutiliser le code existant**, ne pas reconstruire. Le design, la structure de contenu et le CMS admin sont conservés tels quels.
- Connexion/inscription/dashboard existants sont des maquettes sans logique réelle — à connecter au compte unique Ateb's Inspire (Supabase Auth déjà configuré sur `atebs-inspire-core`), sans créer de second système d'authentification.
- L'ancien test (5 questions → 6 archétypes par système de poids) est **remplacé**, pas conservé : incompatible avec le modèle par dimensions déjà retenu pour Ateb's Inspire. Son résultat n'était de toute façon jamais persisté en base.
- Nouveau modèle de test à implémenter : ~40 questions situationnelles, 4 dimensions parentes (énergie sociale, monde intérieur, expression/communication, fonctionnement personnel) déclinées en sous-variables, résultat riche (forces, vigilance, relations, travail, communication, recommandations), profils émergents de la combinaison des scores — pas de liste arbitraire de noms.

## 25/08/2026 — Décision sur le projet Supabase du site existant

- Le site tournait sur le projet Supabase `inroverti`, distinct de `atebs-inspire-core`.
- Décision : **migrer le site vers `atebs-inspire-core`** plutôt que de garder deux projets séparés — cohérent avec le principe de compte unique et de socle central.
- `inroverti` a été supprimé par le porteur du projet avant l'extraction de son contenu : aucune donnée éditoriale n'a pu être récupérée. Le contenu (articles, thèmes, parcours, ressources, produits) repart de zéro sur `atebs-inspire-core` et devra être recréé via le CMS admin une fois celui-ci branché.

## 30/08/2026 — Réconciliation des 3 projets Bolt (Companion, Finance AI, Dating) vers atebs-inspire-core

**Constat initial** : Bolt a livré 3 projets Vite/Next.js indépendants (Companion, Finance AI, Dating/Racine), chacun avec sa propre base Supabase auto-provisionnée. Aucune référence à `atebs-inspire-core`, `core_profile`, `behavioral_profile` ou `has_permission` dans aucun des trois — violation directe du principe de compte unique (Project Bible §4). Dating avait même recréé son propre système de test de personnalité (`test_completed`/`test_data`/`profile_result` en jsonb), dupliquant entièrement le système déjà en place.

**Collisions de noms détectées entre les 3 projets et l'existant** : `profiles` (×3), `categories` (Companion/Finance/éditorial), `goals` (Companion/Finance), `notifications` (Finance/Dating), `subscriptions` (×3).

**Décisions de réconciliation** :
- Toutes les tables produit-spécifiques préfixées : `companion_*`, `finance_*`, `dating_*` — cohérent avec `companion_state`/`finance_profile`/`dating_profile` déjà existants, élimine toute collision présente et future.
- Identité générique partagée entre produits (au lieu d'être dupliquée 3 fois dans 3 tables `profiles` séparées) : `display_name`, `avatar_url`, `birthdate` ajoutés à `core_profile`.
- Champs réellement spécifiques à un produit ajoutés à sa table de profil existante plutôt qu'une nouvelle table `profiles` : `companion_state.plan` ; `finance_profile.phone/country/currency/active_mode/onboarded/plan/plan_expires_at` ; `dating_profile.bio/pronouns/privacy_visible/invisible_mode/reflection_hours/verified/verification_*/plan/plan_expires_at/stripe_*`.
- **Le test de personnalité de Dating n'a pas été recréé** : ses colonnes `test_completed`/`test_data`/`profile_result` sont volontairement omises. Dating doit lire `behavioral_profile` directement (test de complétude via `exists (select 1 from behavioral_profile where user_id = ...)`), jamais maintenir sa propre copie.
- **bolt1 (Companion) avait son propre trigger sur `auth.users`** (fonction `handle_new_user()` insérant dans sa table `profiles`) — non appliqué, aurait écrasé la fonction `handle_new_user()` déjà sécurisée du socle. À la place, la fonction centrale a été étendue pour provisionner en une fois : `core_profile` + `companion_state` + `finance_profile` + `dating_profile` à chaque inscription. Testé avec un compte fictif : les 4 lignes se créent bien ensemble.
- Bucket de stockage `avatars` créé au niveau partagé (pas préfixé `dating_`) puisque `avatar_url` est maintenant sur `core_profile`, utilisable par tous les produits.
- `finance_activate_plan()` (ex-`activate_plan` de bolt2) : renommée, pointe vers `finance_profile` au lieu de `profiles`. **Note de sécurité assumée** : reste exécutable par un utilisateur authentifié (auto-activation de plan payant sans paiement réel) — comportement déjà présent et documenté comme temporaire dans le code d'origine de Bolt ("mode démo, à restreindre au service role une fois un vrai moyen de paiement branché"). Conservé tel quel, warning du linter de sécurité connu et accepté.
- Contenu réel réutilisé sans invention : les 6 articles de coaching de Dating (déjà rédigés dans le projet Bolt d'origine) réinsérés tels quels dans `dating_coaching_articles`.

**Résultat** : 0 alerte de sécurité hors le warning `finance_activate_plan` documenté ci-dessus.

**Reste à faire (chantier séparé, volumineux)** : adapter le code TypeScript des 3 applications Bolt pour qu'il interroge les tables renommées/préfixées et partage la session Supabase avec le reste de l'écosystème (au lieu de chacune sa propre logique d'auth/profil). À traiter un produit à la fois, en commençant par Companion.

## 26/08/2026 — Navigation : Header sensible à la session

- `Header.tsx` devient un composant serveur async : affiche "Mon espace" (→ `/dashboard`) si connecté, "Connexion" sinon. Reste du design inchangé.
- Valeurs `.env.local` communiquées à l'utilisateur pour son déploiement (URL projet + clé publique anon) — la clé service_role reste à récupérer par lui-même dans le dashboard Supabase (jamais partagée par l'IA).
- Décision : le test et le build réel (npm run build, parcours utilisateur complet) sont délégués à l'utilisateur, qui dispose d'un environnement de déploiement — l'IA n'a pas d'environnement Next.js exécutable pour le faire elle-même.

## 26/08/2026 — Intégration du nouveau questionnaire dans le frontend

- `TestClient.tsx` réécrit : plus de scoring côté client, entièrement piloté par les routes API (`/api/test/start`, `/api/test/answer`, `/api/test/complete`). Le composant ne connaît jamais les dimensions ni les pondérations.
- Le test nécessite désormais d'être connecté (`test_sessions.user_id` est obligatoire, et le résultat vit dans `behavioral_profile`, lié au compte) — décision assumée, plus de passage anonyme comme avant.
- Nouvelle page résultat (`se-decouvrir/resultat`) : lit `behavioral_profile` et génère un texte riche via `src/lib/profile/interpret.ts`, qui implémente une première version des sections demandées (§7 de `PHASE-2A-TEST-PERSONNALITE.md`) et détecte les configurations nuancées listées en §6 (introversion + expression, introversion + profondeur relationnelle, etc.).
- Table `axes` recréée (7 axes d'introspection, contenu placeholder à réviser via l'admin) — nécessaire pour `/se-decouvrir` qui l'utilisait déjà, sans lien avec le questionnaire lui-même.
- Code mort supprimé : `lib/data/quiz.ts`, `lib/data/profile-types.ts` (ancien modèle à 6 archétypes, plus aucune référence ailleurs dans le code, vérifié avant suppression). Les types `QuizQuestion`, `ProfileType`, `QuizResult` restent dans `types.ts` mais ne sont plus utilisés — à nettoyer lors d'un prochain passage si non réutilisés pour autre chose.
- **Non fait dans ce tour** : recommandations de contenu Ateb's Inspire en fin de résultat (§9 de la spec) — dépend du contenu éditorial réel (Phase 2b), actuellement vide puisque l'ancien contenu a été perdu.

## 26/08/2026 — Authentification utilisateur réelle (connexion/inscription/dashboard)

- Les trois maquettes sans logique (`connexion`, `inscription`, `dashboard`) sont maintenant branchées sur Supabase Auth, via des Server Actions (`src/lib/auth/actions.ts`) suivant exactement le même style que celles déjà utilisées pour `/admin/login` (cohérence de convention, pas de nouveau pattern introduit).
- Design existant conservé à l'identique (classes, structure) — seuls `action={...}`, les attributs `name`/`required`, et l'affichage des erreurs/succès via `searchParams` ont été ajoutés.
- Inscription : confirmation d'e-mail exigée (décision Phase 1) → pas de session immédiate après `signUp`, message d'attente affiché.
- Dashboard : vérifie la session réelle (redirige vers `/connexion` si absente), affiche le prénom (`core_profile`) si connu, et propose de passer le test si `behavioral_profile` n'existe pas encore pour cet utilisateur. Bouton de déconnexion ajouté.

## 26/08/2026 — Intégration du CMS admin existant (pas de recréation)

- Le CMS admin du site existant (`/admin` : articles, parcours, ressources, produits, thèmes, newsletter) est réutilisé tel quel, conformément à la règle de non-régression — aucun code recréé.
- Client Supabase admin réutilisé (`getSupabaseAdmin()`, `lib/supabase/admin.ts`) : les routes API du test (`/api/test/complete`) ont été adaptées pour l'utiliser plutôt que de garder un second client admin.
- Correction d'une erreur de structure : le projet suit la convention Next.js `src/` (confirmée via `tsconfig.json`, alias `@/* → ./src/*`), mais les premiers ajouts (routes API du test, client Supabase session-aware) avaient été placés à la racine par erreur. Déplacés sous `src/` ; les doublons résultants ont été vérifiés identiques puis supprimés.
- Dépendance `@supabase/ssr` ajoutée à `package.json` — nécessaire au nouveau client Supabase session-aware (`src/lib/supabase/server.ts`), absente du projet car aucune authentification utilisateur réelle n'existait avant.
- `.env.example` consolidé en un seul fichier (celui du site existant, avec `ADMIN_PASSCODE`, avait été écrasé par erreur lors d'une fusion précédente — corrigé).

## 26/08/2026 — Phase 2a v2 : questionnaire final (40 questions, 8 dimensions)

- Remplacement complet du modèle placeholder par le questionnaire final fourni : 40 questions, 4 réponses chacune, matrice de pondération multi-dimensions (une option peut contribuer à une dimension principale et une secondaire à demi-poids).
- 8 dimensions officielles : `stimulation_sociale`, `introspection`, `expression`, `organisation`, `adaptation`, `decision`, `profondeur_relationnelle` (mesurées directement), plus `introversion` — **score composite dérivé**, jamais mesuré par une question directe (formule : `0.6 x inverse(stimulation_sociale) + 0.4 x introspection`), pour respecter la mise en garde de la spec contre un axe d'introversion trop simpliste.
- `behavioral_profile` restructuré pour porter ces 8 dimensions (ancien modèle placeholder abandonné, aucune donnée réelle n'existait).
- Nouvelle table `test_question_options` (poids en jsonb par dimension) ; `test_responses` référence désormais un `option_id` plutôt qu'une valeur 1-5.
- Scoring testé et validé : simulation "toujours répondre C" vs "toujours répondre A" donnent des profils parfaitement symétriques et cohérents avec la matrice de pondération. Archivage de version confirmé.
- Détection des configurations nuancées (introversion + expression, introversion + profondeur relationnelle, etc.) : reportée au niveau applicatif (génération du texte de résultat), pas encore implémentée — voir `PHASE-2A-TEST-PERSONNALITE.md` §6 et §10.
- API `/api/test/answer` et `/api/test/start` adaptées au nouveau modèle (option_id au lieu d'answer_value).

## 30/08/2026 — Adaptation du code Companion (bolt1) vers atebs-inspire-core

**Contexte** : premier des 3 produits Bolt traité individuellement, conformément à la décision du 30/08/2026 ("un produit à la fois, en commençant par Companion"). Schéma vérifié en base avant modification (`list_tables` sur `atebs-inspire-core`), pas seulement supposé conforme aux docs.

**Modifications de code (projet Vite/React `bf8amcwp`)** :
- Toutes les requêtes `.from(...)` remappées vers les tables préfixées réellement déployées : `profiles`→`core_profile`, `goals`→`companion_goals`, `categories`→`companion_categories`, `goal_occurrences`→`companion_goal_occurrences`, `training_exercises`→`companion_training_exercises`, `training_sessions`→`companion_training_sessions`, `behavior_logs`→`companion_behavior_logs`.
- `useAuth.tsx` : le profil applicatif (`Profile`) est maintenant assemblé depuis deux tables — `core_profile` (identité partagée : `display_name`, `avatar_url`) et `companion_state` (`plan`, propre à Companion) — au lieu d'une table `profiles` unique qui n'existe plus. Type `Profile` mis à jour (`id`→`user_id`).
- Suppression de l'upsert manuel dans `profiles` lors de l'inscription : `handle_new_user()` sur `atebs-inspire-core` provisionne déjà `core_profile`+`companion_state`+`finance_profile`+`dating_profile` en un trigger (décision du 30/08/2026 ci-dessus) — pas de second système à maintenir côté client.
- `Profile.tsx` : sauvegarde de `display_name` redirigée vers `core_profile`, clé `user_id` (plus `id`).

**Piège détecté en base, absent des docs** : les tables `companion_*` reconstruites lors de la réconciliation n'ont **pas** repris le `DEFAULT auth.uid()` sur `user_id` que le schéma Bolt d'origine avait sur `goals`/`categories`/`goal_occurrences`/`training_sessions`/`behavior_logs`. Sans correction, tout insert applicatif aurait échoué contre la RLS (`user_id` NULL). Corrigé : `user_id: user.id` fourni explicitement à chaque insert (`createGoal`, `createCategory`, `createSession`, `createBehaviorLog`, génération des occurrences du jour).

**`.env`** : `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` du projet repointés sur `atebs-inspire-core` (clé anon publique uniquement, cohérent avec la règle déjà posée sur `.env.local` du site — clé service_role jamais partagée par l'IA).

**Corrections hors périmètre, nécessaires pour un build propre** (bugs pré-existants dans le code livré par Bolt, sans lien avec la migration de schéma) :
- Typage trop strict du `formatter` Recharts dans `Dashboard.tsx`/`Evolution.tsx` (4 occurrences) — annotation `(value: number)` retirée.
- `SessionForm` (`Training.tsx`) : le type de `onSave` omettait `linked_goal_id`, pourtant requis par `TrainingSession` — ajouté (`null` par défaut, le formulaire ne propose pas encore de lier un objectif).

**Validé** : `npm run typecheck` et `npm run build` passent tous les deux sans erreur sur le projet modifié.

**Reste à faire** : Finance AI (bolt2) et Dating (bolt3), même traitement — remapping des tables, vérification des `DEFAULT auth.uid()` sur chaque table produit-spécifique avant de supposer qu'ils existent encore.

## 30/08/2026 — Adaptation du code Finance AI (bolt2) vers atebs-inspire-core

**Contexte** : deuxième des 3 produits Bolt traité individuellement, après Companion. Schéma vérifié en base avant modification (`information_schema.columns` sur les colonnes `user_id` des tables `finance_*`, pas seulement supposé conforme aux docs).

**Modifications de code (projet Vite/React `hq2ktzja`)** :
- Toutes les requêtes `.from(...)` remappées vers les tables préfixées réellement déployées : `profiles`→`core_profile`/`finance_profile` (éclaté), `categories`→`finance_categories`, `transactions`→`finance_transactions`, `budgets`→`finance_budgets`, `notifications`→`finance_notifications`, `goals`→`finance_goals`, `financial_scores`→`finance_scores`, `chat_messages`→`finance_chat_messages`, `subscriptions`→`finance_subscriptions`.
- `lib/auth.tsx` : le profil applicatif (`Profile`) est maintenant assemblé depuis `core_profile` (identité partagée : `display_name`, `avatar_url`) et `finance_profile` (`phone`, `country`, `currency`, `active_mode`, `onboarded`, `plan`, `plan_expires_at`) au lieu d'une table `profiles` unique. Type `Profile` mis à jour (`id`→`user_id`, `full_name`→`display_name` pour cohérence avec le reste de l'écosystème).
- Suppression de l'upsert manuel dans `profiles` lors de l'inscription : `handle_new_user()` provisionne déjà `core_profile`+`finance_profile`. **Correction supplémentaire** : la métadonnée passée à `signUp()` était `full_name`, mais `handle_new_user()` lit la clé `display_name` — sans ce correctif, `core_profile.display_name` serait systématiquement retombé sur le préfixe de l'email au lieu du nom saisi à l'inscription. Métadonnée renommée en `display_name`.
- `usePlan.ts` : l'appel RPC `activate_plan` renommé en `finance_activate_plan` (nom réel de la fonction après réconciliation, voir entrée du 30/08/2026 ci-dessus). **Piège trouvé** : l'insert dans `subscriptions` (devenu `finance_subscriptions`) ne fournissait `user_id` nulle part, en dépendant du `DEFAULT auth.uid()` du schéma Bolt d'origine — supprimé sur `atebs-inspire-core` comme pour Companion. Corrigé en récupérant l'utilisateur courant (`supabase.auth.getUser()`) et en le fournissant explicitement.
- `Settings.tsx` : `saveProfile()` écrit désormais sur deux tables (`core_profile.display_name` et `finance_profile.phone/country/active_mode`) au lieu d'une seule ; champ renommé `fullName`→`displayName` dans tout le composant.
- `Onboarding.tsx` : la mise à jour `active_mode`/`onboarded` redirigée vers `finance_profile`, clé `user_id` (plus `id`).
- `Dashboard.tsx` : message de bienvenue basé sur `profile.display_name` (plus `full_name`).

**Même piège que Companion, reconfirmé** : aucune table `finance_*` n'a de `DEFAULT auth.uid()` sur `user_id`. La plupart des inserts du code Bolt d'origine le fournissaient déjà explicitement (bonne pratique déjà en place côté Finance) — seul l'insert de `subscriptions` dans `usePlan.ts` en dépendait implicitement, corrigé ci-dessus.

**Validé** : `npm run typecheck` et `npm run build` passent tous les deux sans erreur, aucune correction hors périmètre nécessaire cette fois (contrairement à Companion).

**Reste à faire** : Dating (bolt3), même traitement.

## 30/08/2026 — Bug corrigé : `/api/test/complete` plantait après le calcul du score

**Symptôme rapporté** : le calcul du profil sur le site semblait long/bloqué à l'écran « Calcul de ton profil... ».

**Cause réelle, pas de performance** : `score_test_session()` est légère (quelques agrégations sur ~40 réponses, millisecondes) — elle n'est pas en cause. Le bug était dans la relecture de `behavioral_profile` juste après, dans `/api/test/complete` : la requête sélectionnait encore les noms de colonnes de l'ancien modèle placeholder (`recovery_need`, `social_preference`, `learning_style`, `decision_style`, `environment_preference`, `stimulation_tolerance`, `progression_rhythm`), abandonné le 26/08/2026 au profit des 8 dimensions actuelles. Ces colonnes n'existent plus (vérifié en base) → la requête échouait (`column does not exist`) → 500 renvoyé au frontend, qui restait sur l'écran de chargement puis affichait une erreur.

**Effet de bord** : le score, lui, était bien calculé et enregistré avant l'échec (deux requêtes séparées, pas de transaction côté API) — mais `test_sessions.status` passait à `completed`, donc un nouvel essai tombait sur « Cette session a déjà été complétée » sans pouvoir recommencer. Utilisateur bloqué malgré un profil correctement calculé en base.

**Correction** : `SELECT` de `/api/test/complete` remplacé par les vraies colonnes (`introversion_level, stimulation_sociale, introspection, expression, organisation, adaptation, decision, profondeur_relationnelle, version`) — cohérent avec ce que `/se-decouvrir/resultat/page.tsx` faisait déjà correctement de son côté. Vérifié qu'aucun autre fichier du site n'a le même résidu (`/api/test/start`, `/api/test/answer` n'étaient pas concernés).

**Vérification de l'impact réel en base** (avant correctif, sur `atebs-inspire-core`) : 6 sessions de test, toutes pour un seul compte, aucune `completed`, aucun `behavioral_profile` enregistré.
- 5 sessions vides ou partielles (0 à 34 réponses/40) — tentatives abandonnées, sans dégât. Deux paires de sessions créées à ~2 ms d'écart repérées (ex. 08:18:39.712538 / 08:18:39.714913) — cohérent avec un double déclenchement de `TestClient.tsx` au montage (probable Strict Mode React en développement) créant une session orpheline vide à chaque lancement du test. Sans gravité, laissé en l'état (ces sessions n'entravent pas de futures tentatives, `test/start` en insère toujours une nouvelle).
- **1 session avec les 40 réponses complètes**, restée bloquée à `in_progress`, sans profil — la victime directe du bug.

**Réparation effectuée** : `score_test_session()` appelée directement sur cette session pour vérifier son bon fonctionnement en isolation (confirmé : aucune erreur, la fonction elle-même n'a jamais été en cause) — ce qui a du même coup calculé et enregistré le profil manquant, et marqué la session `completed`. Profil résultant : introversion élevé, stimulation sociale faible, introspection élevée, expression/organisation/adaptation/décision/profondeur relationnelle modérés. Aucune autre session complète-mais-bloquée trouvée à réparer.

## 01/09/2026 — Accès admin par compte (remplace le mot de passe partagé)

**Contexte** : le CMS admin utilisait un mot de passe unique partagé (`ADMIN_PASSCODE`), documenté comme provisoire depuis l'intégration du CMS (26/08/2026). Remplacé par une vérification basée sur le compte Supabase Auth déjà utilisé pour le reste du site.

**Schéma (migration `20260901090000_add_admin_users_table.sql`)** :
- `admin_users (user_id, granted_at)` — RLS activée, aucune policy `authenticated`/`anon` (accès uniquement via la fonction ci-dessous ou le client service role déjà utilisé par le CMS).
- `is_admin()` — `SECURITY DEFINER`, sans paramètre (vérifie uniquement `auth.uid()`, ne renseigne jamais sur un tiers), `EXECUTE` révoqué pour `public`/`anon`, accordé à `authenticated`. Cohérent avec le style déjà établi (`has_permission()`).
- Premier compte admin accordé manuellement : le seul compte existant sur `atebs-inspire-core` à ce jour (`bakekjovanyallan@gmail.com`, `bae44d5b-8c43-411c-974f-46c5d5e5ef89`).

**Code** :
- `middleware.ts` (`src/middleware.ts`) réécrit : vérifie la session Supabase (`@supabase/ssr`, déjà en dépendance) puis appelle `is_admin()`. Non connecté → redirigé vers `/connexion?from=<page demandée>` ; connecté mais pas admin → `/admin/acces-refuse` (nouvelle page).
- **Nettoyage** : le fichier `middleware.ts` à la racine du projet était un doublon mort du vrai middleware actif (`src/middleware.ts`, seul utilisé par Next.js puisque le projet suit la convention `src/`) — supprimé pour éviter toute confusion future.
- `lib/auth/actions.ts` (`signInAction`) : ajout du support d'un paramètre `from`, pour revenir sur `/admin` après connexion au lieu de toujours atterrir sur `/dashboard`. `connexion/page.tsx` transmet ce paramètre.
- `admin/layout.tsx` : déconnexion via `signOutAction` (vraie session Supabase) au lieu de l'ancien `logoutAction` (suppression de cookie passcode).
- **Supprimé** : `src/app/admin/login/` (page + action du mot de passe partagé) et `src/lib/admin/auth.ts` (`ADMIN_COOKIE`, `expectedPasscode()`, `isValidSessionValue()`) — plus aucune référence ailleurs dans le code (vérifié).
- `.env.example` : `ADMIN_PASSCODE` retiré, remplacé par une note pointant vers `admin_users`.

**Bug pré-existant corrigé au passage** (bloquant pour un build strict, présent avant cette session dans `lib/supabase/server.ts`, jamais remarqué faute de `next build` réel — voir note du 26/08/2026 sur les tests délégués à l'utilisateur) : le callback `setAll` des clients `@supabase/ssr` (session côté serveur et, par construction, le nouveau middleware) n'était pas typé, ce qui échoue en `strict` TypeScript. Corrigé avec le type `CookieOptions` exporté par `@supabase/ssr`.

**Validé** : `next build` compile et type-check sans erreur. L'échec de génération statique de `/comprendre/[slug]` observé en environnement de build restreint (pas d'accès réseau sortant vers Supabase depuis ce bac à sable) n'est pas un bug de code — à revalider sur un environnement avec accès réseau complet (Vercel).

**Reste à faire** : pas d'interface pour gérer les admins (ajout/retrait actuellement par SQL direct) — acceptable pour l'instant vu le nombre de comptes.

## 01/09/2026 — Interface de gestion des admins (`/admin/admins`)

**Contexte** : suite à l'entrée précédente (admin par compte), plus besoin de SQL direct pour ajouter/retirer un admin.

**Implémentation** : nouvelle page `/admin/admins`, dans le même style que les autres pages admin (Server Actions + `getSupabaseAdmin()`, pas de nouveau pattern).
- Liste les admins actuels (e-mail + date d'ajout).
- Formulaire d'ajout par e-mail : `admin_users` n'a pas de colonne e-mail (seulement `user_id`), donc la recherche passe par `auth.admin.listUsers()` (API admin Auth de Supabase, via le client service role) plutôt que par une table postgrest — recoupement par e-mail (insensible à la casse). Le compte doit déjà exister (s'être inscrit sur le site) ; message clair si introuvable.
- Retrait par bouton, avec **garde-fou** : impossible de retirer le dernier admin restant (compte avant suppression), pour éviter de fermer `/admin` à tout le monde sans moyen simple de revenir en arrière.
- Lien ajouté dans la nav de `admin/layout.tsx`.

**Validé** : `next build` compile et type-check sans erreur.

## 02/09/2026 — SSO Ateb ID (cookie de session partagé entre sous-domaines)

**Contexte** : priorité fixée en vue d'un déploiement en bêta d'Ateb Evolution (ex-Companion) et Ateb Finance sur Vercel, sous des sous-domaines d'un même domaine racine (déploiement sur `*.vercel.app` explicitement écarté : Vercel — et les navigateurs — interdisent le partage de cookies sur un domaine public comme `vercel.app`).

**Cause du problème résolu** : les 3 apps (site, Evolution, Finance) sont 3 déploiements séparés, donc 3 origines différentes. Le site utilisait déjà des cookies de session (`@supabase/ssr`, `createServerClient`) mais Evolution et Finance stockaient leur session dans le `localStorage` du navigateur — strictement isolé par origine, y compris entre sous-domaines. Un compte Ateb ID unique existait bien en base, mais rien ne propageait la connexion d'une app à l'autre.

**Implémentation** — cookie de session partagé, domaine configurable par variable d'environnement (aucune valeur en dur) :
- `lib/supabase/server.ts` et `middleware.ts` acceptent désormais `cookieOptions.domain` via la nouvelle variable `AUTH_COOKIE_DOMAIN` — vide en local (cookie host-only, comportement inchangé), ex. `.atebsinspire.com` en production.
- Même changement côté Evolution (`VITE_AUTH_COOKIE_DOMAIN`) et Finance (`VITE_AUTH_COOKIE_DOMAIN`), qui sont passés de `@supabase/supabase-js` (localStorage) à `@supabase/ssr` (`createBrowserClient`, cookie) — voir leurs propres DECISION-LOG respectifs.
- `sameSite: 'lax'` et `secure: true` uniquement quand un domaine est fourni (évite de casser le dev local en HTTP).

**Condition pour que ça fonctionne réellement** : chaque app doit être déployée sur un **sous-domaine** du même domaine racine (ex. `www.atebsinspire.com`, `evolution.atebsinspire.com`, `finance.atebsinspire.com`). Domaine final pas encore choisi ; `AUTH_COOKIE_DOMAIN` reste à renseigner au déploiement.

**Validé** : `build`/`typecheck` passent.

## 06/09/2026 — Partage des articles (`ArticleSharing.tsx`)

**Contexte** : le bouton « Partager cet article » existait déjà dans l'UI mais n'avait aucun comportement (`onClick` absent).

**Implémentation** : nouveau composant `ArticleSharing.tsx`, câblé sur `reflexions/[slug]/page.tsx`.
- Web Share API native (`navigator.share`) quand disponible (mobile surtout), sinon repli sur la copie du lien.
- Liens directs Facebook / X / WhatsApp / LinkedIn.
- Bloc « Citer cet article » : génère une citation avec attribution (`« titre », initialement publié sur Ateb's Inspire — url`) et un bouton pour la copier — ne peut pas empêcher la copie du texte par ailleurs, réduit juste la friction pour bien attribuer plutôt que de ne pas le faire.

## 08/09/2026 — Correctif `.env` (mauvais noms de variables) + partage du résultat de test

**Symptôme rapporté** : le bouton Admin semblait ne pas mener au studio d'administration.

**Cause trouvée** : `.env` définissait `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` — les noms de variables des projets **Vite** (Evolution, Finance) — alors que ce projet est en **Next.js**, qui lit `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`. Avec les mauvais noms, le client Supabase ne recevait jamais d'URL/clé valides côté site : `is_admin()` ne pouvait jamais répondre, cassant la détection admin dans `Header.tsx` et le middleware. **`SUPABASE_SERVICE_ROLE_KEY` était en plus totalement absente du fichier**, ce qui aurait aussi fait échouer toutes les routes `/admin` et `/api/test/complete` (`getSupabaseAdmin()` lève une erreur sans elle).

**Correction** : `.env` corrigé avec les bons noms de variables ; `SUPABASE_SERVICE_ROLE_KEY`, `AUTH_COOKIE_DOMAIN` et `NEXT_PUBLIC_SITE_URL` ajoutés (vides, à renseigner — la clé service_role n'est jamais générée ni connue par l'IA, à récupérer soi-même dans le dashboard Supabase).

**Partage du résultat de test** — n'existait pas, ajouté (`ResultSharing.tsx`, sur `se-decouvrir/resultat/page.tsx`) : **piège évité** — `/se-decouvrir/resultat` est une page privée qui affiche toujours le profil du compte *actuellement connecté*. Partager cette URL telle quelle aurait envoyé le destinataire soit sur un mur de connexion, soit — pire — sur son propre résultat s'il est déjà connecté, jamais sur celui de l'expéditeur. Le composant partage donc un **texte** (titre du profil + invitation à faire le test) avec un lien vers `/se-decouvrir/test` (public), jamais l'URL privée ni les dimensions détaillées — cohérent avec le principe du site : le résultat n'est pas une étiquette à exhiber.

**Validé** : `build`/`typecheck` passent (même limite d'accès réseau au build pour la génération statique que les entrées précédentes — sans rapport avec ces changements).

## 25/08/2026 — Incident technique : perte et reconstruction du schéma

- Une manipulation de pause/restore du projet `atebs-inspire-core` (dans le but de libérer un slot gratuit pour restaurer `inroverti`) a provoqué la perte complète du schéma (Phase 0, 1, 2a).
- Le schéma a été intégralement reconstruit à l'identique (aucune perte de logique, toutes les définitions étaient tracées dans ce journal), plus le schéma éditorial du site (`categories`, `articles`, `themes`, `journeys`, `resources`, `products`, `newsletter_subscribers`, `user_progress`, `favorites`, `comments`).
- Règle retenue pour la suite : plus aucune manipulation de pause/restore sur un projet actif sans validation explicite préalable.
