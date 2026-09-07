# Ateukeng Brice — L'introverti

V1 de la plateforme, branchée sur une vraie base Supabase. « L'identité avant les objectifs. »

## 1. Backend : Supabase

Le contenu (thèmes, axes, archétypes, questions du quiz, articles, parcours,
ressources, produits, catégories) vit dans le projet Supabase **`inroverti`**
(région `eu-west-1`), pas dans le code. `src/lib/data/*.ts` contient des
fonctions asynchrones (`getArticles`, `getTheme`, `getJourneys`…) qui
interrogent Supabase — plus aucune donnée statique en dur.

Schéma complet : `users`/`profiles`, `articles`, `categories`, `themes`,
`axes`, `profile_types`, `quiz_questions`, `quiz_results`, `journeys`,
`user_progress`, `resources`, `products`, `newsletter_subscribers`,
`favorites`, `comments` — exactement les tables prévues section 19 du
cahier des charges. RLS activé partout : lecture publique sur le contenu
éditorial, écriture restreinte au propriétaire pour tout ce qui est
personnel (profil, progression, favoris, commentaires, résultats de quiz).

**Ajouter un article, un thème, un parcours, une ressource** ne demande
plus de toucher au code : une ligne `insert into articles (...) values (...)`
dans l'éditeur SQL de Supabase (ou dans le Table Editor, en visuel) suffit,
et elle apparaît sur le site au prochain rendu. C'est la V1 « efficace,
stable » : pas de CMS tiers à maintenir, l'architecture Supabase prévue
dès le départ dans le brief est simplement mise en service.

### Variables d'environnement

```
NEXT_PUBLIC_SUPABASE_URL=https://vqqmljffmgktdqmiazye.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_f8lLI6EH1pLjX3hI25XBGQ_yyfnzCSQ
```

Ce sont des clés publiques (publishable/anon) : elles sont faites pour être
exposées côté client, la sécurité réelle vient des policies RLS, pas du
secret de la clé. Elles sont déjà dans `.env.example` — copier en
`.env.local` en local, et les ajouter dans Project Settings → Environment
Variables sur Vercel pour la prod.

## 2. Interface d'administration (`/admin`)

Section 27 du cahier des charges, construite. Permet de créer, modifier et
supprimer des **articles**, **thèmes**, **parcours**, **ressources** et
**produits** sans toucher au code, plus une vue en lecture seule des
inscrits à la newsletter. Chaque changement se voit immédiatement sur le
site public (revalidation ciblée par page).

**Accès** — `/admin` est protégé par un mot de passe partagé
(`ADMIN_PASSCODE` dans `.env.local`), stocké dans un cookie httpOnly. Ce
n'est **pas** une vraie authentification multi-utilisateurs — juste une
porte fermée, en attendant Supabase Auth (voir §6). `middleware.ts`
redirige toute requête vers `/admin/login` sans le bon cookie.

**Écriture en base** — les Server Actions sous `/admin` utilisent la clé
`SUPABASE_SERVICE_ROLE_KEY` (contourne le RLS), jamais exposée au client
(`server-only` fait planter le build si elle finit dans un fichier `"use
client"`). Sans cette clé dans `.env.local`, `/admin` ne peut ni créer ni
modifier ni supprimer de contenu.

Pour la récupérer : Supabase → Project Settings → API → section
`service_role` (clé secrète, distincte de la clé publique `anon`).

## 3. Analyse d'architecture

**Organisation des composants** — App Router de Next.js, un dossier par
route publique, des composants transverses dans `src/components`, et
l'accès aux données isolé dans `src/lib/data/*.ts` + `src/lib/supabase/client.ts`.
Chaque page qui a besoin de contenu est un Server Component `async` qui
appelle ces fonctions — aucune donnée n'est fetchée côté client, sauf le
questionnaire (`TestClient.tsx`, qui reçoit les questions déjà chargées en
props depuis sa page serveur).

**Ce qui reste extensible par construction** :
- l'authentification et `/dashboard` sont préparés en façade (UI, routes,
  tables `profiles`/`user_progress`/`favorites` déjà en place côté base)
  mais pas connectés à Supabase Auth — prochaine étape naturelle ;
- `/bibliotheque` a les boutons d'achat mais pas de fournisseur de
  paiement ;
- `/communaute` explique volontairement que la V1 ne construit pas encore
  le réseau social complet, conformément à la consigne de ne pas
  surcharger la V1 (section 25 du brief).

## 4. Stack

- Next.js 16 (App Router, Turbopack), TypeScript strict, Tailwind CSS v4
- Supabase (Postgres + RLS) pour tout le contenu et les données utilisateur
- Rendu statique là où c'est possible (`generateStaticParams` sur les
  thèmes, articles, parcours — nécessite un accès réseau à Supabase au
  build, donc fonctionne sur Vercel ; ne fonctionne pas dans un
  environnement à réseau restreint sans accès à `*.supabase.co`)
- SEO : metadata par page, Open Graph, `sitemap.ts`, `robots.ts`
- Typographie : Fraunces / Inter / IBM Plex Mono, auto-hébergées via
  `@fontsource/*` (aucune dépendance à Google Fonts)

## 5. Identité visuelle

Noir profond `#0b0b0c`, blanc cassé `#f6f3ec`, anthracite `#2c2c30`, doré
discret `#b08d57`. Élément signature : **Le Cadran**
(`src/components/Compass.tsx`), une représentation SVG des 7 axes
d'introspection, en rotation très lente et purement ambiante.

## 6. Lancer le projet

```bash
npm install
cp .env.example .env.local   # déjà pré-rempli avec les clés du projet Supabase
npm run dev
npm run build   # nécessite un accès réseau à Supabase (OK sur Vercel)
```

## 7. Prochaines étapes

1. Supabase Auth pour `/connexion`, `/inscription`, `/dashboard`, et pour
   remplacer le mot de passe partagé de `/admin` par de vrais comptes.
2. Paiement pour `/bibliotheque`.
3. Communauté complète : profils publics, commentaires, discussions.
