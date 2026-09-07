# ROADMAP.md — Ateb's Inspire

| Phase | Contenu | Statut |
|---|---|---|
| 0 | Cadrage technique, schéma central | ✅ Terminée |
| 1 | Compte unique, auth, permissions | ✅ Terminée |
| 2a | Site + test de personnalité → `behavioral_profile` | 🔄 En cours |
| 2b | Inspire Studio / CMS de contenus riches | ⏳ Après 2a |
| 3 | Inspire Companion | ⏳ |
| 4 | Inspire Dating | ⏳ |
| 5 | Inspire Finance AI | ⏳ |
| 6 | Inspire SaaS | ⏳ (proposition de valeur à définir) |

## Phase 2a — détail des étapes restantes

1. ~~Auditer le site existant~~ ✅
2. ~~Décider du projet Supabase cible (`atebs-inspire-core`)~~ ✅
3. ~~Reconstruire/adapter le schéma~~ ✅
4. ~~Finaliser le questionnaire (40 questions) et le scoring~~ ✅
5. ~~Intégrer le test au site (remplacer `TestClient.tsx` existant)~~ ✅
6. ~~Connecter le test au compte Ateb's Inspire (vraie authentification)~~ ✅
7. ~~Persister et afficher les résultats (résultat riche, pas juste des scores bruts)~~ ✅
8. Améliorer la navigation et les points de connexion avec le reste de l'écosystème (dashboard fait, liens depuis le reste du site à ajouter)
9. Tester l'ensemble en conditions réelles (build local, non-régression complète : inscription, connexion, déconnexion, navigation, responsive, test de bout en bout, profil) — pas encore fait, nécessite un environnement avec les vraies clés Supabase
10. ~~Mettre à jour `DECISION-LOG.md`~~ ✅ (mis à jour à chaque étape)
