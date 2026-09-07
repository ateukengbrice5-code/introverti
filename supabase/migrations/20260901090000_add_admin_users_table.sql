/*
# Accès admin par compte (remplace le mot de passe partagé)

Voir DECISION-LOG.md, 01/09/2026. Remplace le système à mot de passe unique
(ADMIN_PASSCODE) par une vérification basée sur le compte Supabase Auth déjà
utilisé pour le reste du site : un utilisateur connecté est admin s'il a une
ligne dans `admin_users`.

1. New Tables
- `admin_users`
  - `user_id` (uuid, primary key, references auth.users) — le compte habilité
  - `granted_at` (timestamptz, default now())

2. Security
- RLS activée, aucune policy authenticated/anon — la table n'est lisible que
  via la fonction SECURITY DEFINER ci-dessous ou le client service role
  (déjà utilisé par le CMS admin existant, `lib/supabase/admin.ts`).
- `is_admin()` : vérifie si `auth.uid()` (l'utilisateur courant) a une ligne
  dans `admin_users`. EXECUTE révoqué pour `public`/`anon`, accordé à
  `authenticated` uniquement — cohérent avec `has_permission()` sur le socle
  central (`atebs-inspire-core`).

3. Important Notes
- Pas de paramètre user_id sur `is_admin()` : elle ne renseigne jamais que sur
  l'utilisateur courant, jamais sur un tiers.
- Premier compte admin accordé manuellement lors de cette migration (voir
  DECISION-LOG.md pour l'identifiant exact) — pas d'interface de gestion des
  admins pour l'instant, ajout/retrait par requête SQL directe.
*/

create table if not exists admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  granted_at timestamptz not null default now()
);

alter table admin_users enable row level security;

create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from admin_users where user_id = auth.uid());
$$;

revoke all on function is_admin() from public, anon;
grant execute on function is_admin() to authenticated;
