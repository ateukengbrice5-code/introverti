# PHASE-2A-TEST-PERSONNALITE.md — Ateb's Inspire

Fichier unique pour tout ce qui concerne le test de personnalité : questions, dimensions, scoring, structure de données, résultat, décisions. Ne pas éclater en plusieurs fichiers.

## 1. Objectif

Questionnaire de 40 questions produisant un **profil de fonctionnement personnel**, pas un diagnostic. Distingue explicitement l'introversion d'autres traits souvent confondus (timidité, confiance en soi, anxiété sociale) — voir §6.

## 2. Les 8 dimensions

| id | label | mesurée directement ? |
|---|---|---|

| `introversion` | Introversion | Non — score **composite dérivé** (§5) |

| `stimulation_sociale` | Stimulation sociale | Oui |

| `introspection` | Introspection | Oui |

| `expression` | Expression | Oui |

| `organisation` | Organisation | Oui |

| `adaptation` | Adaptation | Oui |

| `decision` | Décision | Oui |

| `profondeur_relationnelle` | Profondeur relationnelle | Oui |

## 3. Les 40 questions

Chaque question a une dimension principale et, pour beaucoup, une dimension secondaire (contribution à demi-poids). L'utilisateur ne voit jamais ces dimensions ni les pondérations.


**Q01** — Après une journée très sociale, tu...  
*Dimension principale : `stimulation_sociale`*

- A. As généralement envie de continuer à voir du monde.
- B. Vas bien, mais apprécies ensuite un moment tranquille.
- C. Ressens un vrai besoin de te retrouver seul.
- D. Cela dépend surtout des personnes avec qui tu étais.


**Q02** — Lorsqu'une idée importante te vient, tu...  
*Dimension principale : `introspection`*

- A. En parles rapidement pour la développer avec quelqu'un.
- B. La gardes un moment pour voir où elle mène.
- C. La développes longuement seul avant de la partager.
- D. Choisis selon l'importance de l'idée.


**Q03** — Dans une conversation avec plusieurs personnes, tu...  
*Dimension principale : `expression`*

- A. Interviens facilement même si la discussion est déjà lancée.
- B. Interviens lorsque tu as quelque chose à apporter.
- C. Préfères observer avant de prendre la parole.
- D. Parles beaucoup plus lorsque le sujet te passionne.


**Q04** — Lorsqu'on te demande ton avis immédiatement sur un sujet complexe...  
*Dimension principale : `introspection` / secondaire : `decision`*

- A. Tu réponds facilement et construis ta réflexion en parlant.
- B. Tu donnes une première impression puis approfondis ensuite.
- C. Tu préfères avoir un peu de temps pour réfléchir.
- D. Tu peux répondre immédiatement si le sujet t'est familier.


**Q05** — Un week-end entièrement libre te donne plutôt envie de...  
*Dimension principale : `stimulation_sociale`*

- A. Sortir et multiplier les activités.
- B. Faire quelques activités puis garder du temps pour toi.
- C. Profiter largement du calme et de ton espace personnel.
- D. Décider au dernier moment selon ton énergie.


**Q06** — Quand tu rencontres quelqu'un pour la première fois...  
*Dimension principale : `expression`*

- A. Tu engages facilement la conversation.
- B. Tu es à l'aise après quelques minutes.
- C. Tu préfères que l'autre fasse le premier pas.
- D. Tu observes d'abord avant de savoir comment interagir.


**Q07** — Pour résoudre un problème difficile, tu préfères...  
*Dimension principale : `introspection` / secondaire : `decision`*

- A. En discuter avec plusieurs personnes.
- B. Chercher quelques idées puis réfléchir seul.
- C. T'isoler pour analyser profondément le problème.
- D. Alterner réflexion personnelle et discussion.


**Q08** — Lorsqu'une discussion reste très superficielle...  
*Dimension principale : `introspection`*

- A. Cela ne te dérange pas particulièrement.
- B. Tu apprécies parfois mais préfères progressivement aller plus loin.
- C. Tu perds rapidement ton intérêt.
- D. Cela dépend beaucoup de la personne.


**Q09** — Dans un groupe où personne ne prend les choses en main...  
*Dimension principale : `expression`*

- A. Tu prends naturellement l'initiative.
- B. Tu interviens si nécessaire.
- C. Tu attends généralement qu'une personne se manifeste.
- D. Tu peux prendre la direction si tu maîtrises le sujet.


**Q10** — Quand tu as besoin de prendre une décision importante...  
*Dimension principale : `decision`*

- A. Tu en parles rapidement avec plusieurs personnes.
- B. Tu demandes quelques avis avant de décider.
- C. Tu préfères d'abord réfléchir seul.
- D. Tu alternes entre réflexion et échanges.


**Q11** — Après plusieurs heures passées seul...  
*Dimension principale : `stimulation_sociale`*

- A. Tu ressens rapidement le besoin de retrouver des personnes.
- B. Tu es bien seul mais apprécies ensuite une interaction.
- C. Tu peux rester seul longtemps sans ressentir de manque particulier.
- D. Cela dépend de ce que tu fais pendant ce temps.


**Q12** — Lorsqu'une personne te confie quelque chose de personnel...  
*Dimension principale : `expression` / secondaire : `profondeur_relationnelle`*

- A. Tu réponds spontanément avec ce que tu ressens.
- B. Tu prends le temps de comprendre avant de répondre.
- C. Tu écoutes beaucoup et réfléchis avant de parler.
- D. Tu adaptes ta réponse à la relation.


**Q13** — Ton esprit fonctionne souvent comme...  
*Dimension principale : `introspection`*

- A. Une succession d'idées rapides que tu explores en parlant ou en agissant.
- B. Plusieurs idées que tu examines progressivement.
- C. Un espace intérieur très actif où tu réfléchis longuement.
- D. Quelque chose qui change selon le contexte.


**Q14** — Lorsqu'un imprévu bouleverse ton programme...  
*Dimension principale : `adaptation`*

- A. Tu t'adaptes rapidement et passes à autre chose.
- B. Tu ajustes ton organisation sans trop de difficulté.
- C. Tu as besoin d'un moment pour réorganiser mentalement les choses.
- D. Cela dépend de l'importance de l'imprévu.


**Q15** — Lorsque tu dois présenter quelque chose devant plusieurs personnes...  
*Dimension principale : `expression`*

- A. Tu apprécies généralement ce type de situation.
- B. Tu peux être à l'aise si tu es bien préparé.
- C. Tu préfères largement les échanges individuels ou les petits groupes.
- D. Tu peux être très à l'aise lorsque tu maîtrises parfaitement le sujet.


**Q16** — Lorsque tu entres dans un environnement où tu ne connais presque personne...  
*Dimension principale : `stimulation_sociale`*

- A. Tu vas facilement vers les autres.
- B. Tu attends quelques instants puis tu participes.
- C. Tu observes d'abord l'ambiance et les personnes.
- D. Tu cherches une personne avec laquelle tu te sens à l'aise.


**Q17** — Quand tu apprends quelque chose de nouveau, tu préfères...  
*Dimension principale : `introspection`*

- A. Essayer directement et apprendre en faisant.
- B. Comprendre les bases puis pratiquer.
- C. Comprendre en profondeur avant de commencer.
- D. Alterner théorie et pratique.


**Q18** — Quand quelque chose te préoccupe...  
*Dimension principale : `introspection`*

- A. Tu en parles rapidement à quelqu'un.
- B. Tu réfléchis un peu puis cherches éventuellement un avis.
- C. Tu gardes d'abord cela pour toi afin de comprendre ce que tu ressens.
- D. Tu écris ou réfléchis seul avant d'en parler.


**Q19** — Lorsqu'une personne n'est pas d'accord avec toi...  
*Dimension principale : `expression`*

- A. Tu défends facilement ton point de vue.
- B. Tu échanges calmement pour comprendre les arguments.
- C. Tu préfères réfléchir avant de répondre.
- D. Tu évites parfois le débat si tu estimes qu'il n'apportera rien.


**Q20** — Pour travailler efficacement sur une tâche importante...  
*Dimension principale : `introspection` / secondaire : `stimulation_sociale`*

- A. Tu apprécies un environnement vivant avec des interactions.
- B. Tu peux travailler dans différents environnements.
- C. Tu es particulièrement efficace dans un environnement calme.
- D. Cela dépend surtout du type de tâche.


**Q21** — Lorsque tu arrives dans un nouvel endroit...  
*Dimension principale : `adaptation`*

- A. Tu explores rapidement et te familiarises avec les lieux.
- B. Tu prends quelques repères puis avances.
- C. Tu observes d'abord avant de te sentir pleinement à l'aise.
- D. Tu t'adaptes rapidement si tu connais quelqu'un sur place.


**Q22** — Lorsque tu as beaucoup de choses à faire...  
*Dimension principale : `organisation`*

- A. Tu commences rapidement et ajustes en cours de route.
- B. Tu définis quelques priorités avant de commencer.
- C. Tu as besoin d'organiser mentalement les choses avant d'agir.
- D. Tu alternes entre planification et improvisation.


**Q23** — Une conversation vraiment intéressante pour toi est généralement...  
*Dimension principale : `introspection`*

- A. Spontanée, dynamique et pleine d'idées.
- B. Équilibrée entre légèreté et profondeur.
- C. Profonde, réfléchie et significative.
- D. Surtout intéressante lorsque la personne te stimule intellectuellement.


**Q24** — Lorsque tu dois faire connaissance avec beaucoup de personnes...  
*Dimension principale : `stimulation_sociale`*

- A. Cela peut être énergisant.
- B. C'est agréable pendant un certain temps.
- C. Tu préfères rencontrer quelques personnes réellement.
- D. Tu apprécies surtout les rencontres lorsqu'il existe un intérêt commun.


**Q25** — Quand tu dois exprimer une émotion importante...  
*Dimension principale : `expression` / secondaire : `profondeur_relationnelle`*

- A. Tu en parles assez facilement.
- B. Tu peux en parler lorsque tu te sens en confiance.
- C. Tu as besoin de comprendre toi-même ce que tu ressens avant de l'exprimer.
- D. Tu trouves parfois plus facile de l'écrire.


**Q26** — Face à une tâche complexe sans consignes précises...  
*Dimension principale : `decision` / secondaire : `introspection`*

- A. Tu commences et construis ta méthode en avançant.
- B. Tu cherches rapidement quelques repères.
- C. Tu prends le temps de comprendre le problème avant de commencer.
- D. Tu demandes des précisions puis adaptes ton approche.


**Q27** — Lorsque tu es dans un groupe d'amis proches...  
*Dimension principale : `expression` / secondaire : `profondeur_relationnelle`*

- A. Tu deviens facilement très expressif et animé.
- B. Tu es beaucoup plus ouvert qu'avec des inconnus.
- C. Tu restes relativement calme même avec eux.
- D. Ton comportement change fortement selon l'ambiance.


**Q28** — Lorsqu'une journée devient très intense...  
*Dimension principale : `stimulation_sociale`*

- A. L'activité t'aide parfois à rester motivé.
- B. Tu continues mais ralentis progressivement.
- C. Tu cherches rapidement un moment de calme.
- D. Tu peux tenir longtemps si ce que tu fais a du sens pour toi.


**Q29** — Quand tu as une idée que tu trouves excellente...  
*Dimension principale : `introspection`*

- A. Tu veux rapidement la partager.
- B. Tu la partages avec quelques personnes de confiance.
- C. Tu préfères d'abord la développer complètement.
- D. Tu la testes avant de décider d'en parler.


**Q30** — Lorsqu'on te donne une critique sur ton travail...  
*Dimension principale : `adaptation` / secondaire : `introspection`*

- A. Tu réagis rapidement et discutes du point soulevé.
- B. Tu écoutes puis prends le temps d'y réfléchir.
- C. Tu analyses longuement la critique avant de répondre.
- D. Ta réaction dépend surtout de la manière dont elle est formulée.


**Q31** — Pour organiser une semaine importante...  
*Dimension principale : `organisation`*

- A. Tu préfères garder beaucoup de liberté.
- B. Tu définis les grandes priorités.
- C. Tu aimes savoir précisément ce qui doit être fait.
- D. Tu planifies l'essentiel mais gardes des espaces libres.


**Q32** — Lorsque tu dois parler de toi...  
*Dimension principale : `expression` / secondaire : `profondeur_relationnelle`*

- A. Cela vient naturellement.
- B. Tu peux le faire lorsque le contexte s'y prête.
- C. Tu préfères parler de tes idées ou de tes expériences plutôt que de toi-même.
- D. Tu peux en parler facilement avec certaines personnes mais pas avec tout le monde.


**Q33** — Lorsqu'un conflit commence à apparaître...  
*Dimension principale : `adaptation` / secondaire : `expression`*

- A. Tu préfères l'aborder immédiatement.
- B. Tu attends parfois que les émotions retombent.
- C. Tu préfères d'abord comprendre ce qui se passe intérieurement.
- D. Tu cherches surtout une solution qui évite l'escalade.


**Q34** — Lorsque tu travailles sur quelque chose qui te passionne...  
*Dimension principale : `introspection`*

- A. Tu peux facilement parler de ton projet à tout le monde.
- B. Tu en parles surtout avec les personnes intéressées.
- C. Tu peux passer beaucoup de temps seul à approfondir le sujet.
- D. Tu alternes périodes d'isolement intense et moments de partage.


**Q35** — Si tu dois choisir entre une grande fête et une soirée calme...  
*Dimension principale : `stimulation_sociale`*

- A. La grande fête t'attire davantage.
- B. Tu pourrais choisir l'un ou l'autre selon ton humeur.
- C. La soirée calme te semble généralement plus attirante.
- D. Tu préférerais une petite soirée avec quelques personnes proches.


**Q36** — Lorsqu'une nouvelle opportunité se présente...  
*Dimension principale : `decision`*

- A. Tu saisis rapidement l'occasion.
- B. Tu regardes les avantages et les risques avant de décider.
- C. Tu prends beaucoup de temps pour réfléchir à ce qu'elle implique.
- D. Tu demandes parfois l'avis de quelqu'un avant de te décider.


**Q37** — Quand tu es particulièrement à l'aise avec quelqu'un...  
*Dimension principale : `profondeur_relationnelle` / secondaire : `expression`*

- A. Tu deviens très expressif et spontané.
- B. Tu partages progressivement davantage de choses personnelles.
- C. Tu restes réservé mais beaucoup plus ouvert.
- D. Tu peux devenir très différent de l'image que les autres ont habituellement de toi.


**Q38** — Lorsque tu dois apprendre à connaître une personne...  
*Dimension principale : `profondeur_relationnelle` / secondaire : `introspection`*

- A. Tu poses facilement beaucoup de questions.
- B. Tu échanges naturellement et observes progressivement sa personnalité.
- C. Tu observes beaucoup avant de réellement t'ouvrir.
- D. Tu préfères souvent les conversations profondes aux nombreuses petites interactions.


**Q39** — Quand tu as enfin du temps complètement libre...  
*Dimension principale : `stimulation_sociale`*

- A. Tu cherches spontanément quelque chose à faire avec d'autres personnes.
- B. Tu alternes activités personnelles et moments sociaux.
- C. Tu apprécies particulièrement pouvoir ne rien devoir à personne.
- D. Tu choisis selon ton niveau d'énergie du moment.


**Q40** — Si tu devais décrire ton fonctionnement idéal...  
*Dimension principale : `stimulation_sociale` / secondaire : `introspection`*

- A. Beaucoup d'action, d'échanges et de nouvelles expériences.
- B. Un équilibre entre stimulation extérieure et temps personnel.
- C. Du calme, de la profondeur et suffisamment de temps pour réfléchir.
- D. La liberté de choisir selon les personnes, les projets et les circonstances.


## 4. Règles de scoring (matrice de pondération)

Deux familles de dimensions, selon le pôle que représente chaque lettre :

- **Famille 1** (`stimulation_sociale`, `expression`, `adaptation`) : A = +3, B = +1, C = -2, D = 0 (contexte).
- **Famille 2** (`introspection`, `decision`, `organisation`, `profondeur_relationnelle`) : A = -2, B = +1, C = +3, D = 0.

Quand une dimension est secondaire pour une question, elle reçoit la moitié du poids (A/C = ±1, B/D = 0), pour ne pas écraser la dimension principale.

Le score final par dimension = moyenne des poids reçus sur toutes les questions qui la mesurent, traduite en formulation qualitative :
- moyenne ≤ -0.5 → **faible**
- -0.5 < moyenne ≤ 1.2 → **modéré**
- moyenne > 1.2 → **élevé**

Ces seuils sont un premier réglage raisonnable, à affiner avec des données réelles (voir §10).

## 5. Le score d'introversion est un score composite, pas un axe brut

Aucune question ne mesure "l'introversion" directement — c'est un choix technique délibéré, cohérent avec la mise en garde de la spec (§5-6 : ne jamais réduire l'introversion à une seule question ou à un seul axe).

Formule retenue :

```
introversion = 0.6 x (- moyenne stimulation_sociale) + 0.4 x (moyenne introspection)
```

Autrement dit : une personne à faible besoin de stimulation sociale ET à forte introspection aura un score d'introversion élevé — mais quelqu'un de très introspectif et modérément sociable peut avoir un score d'introversion modéré, pas nécessairement élevé. Ça correspond directement à l'exemple donné dans la spec : *"Introversion modérée + forte introspection → personne très réflexive qui n'est pas nécessairement fortement introvertie."*

## 6. Détection des configurations nuancées

Les combinaisons suivantes (issues de la spec) doivent être détectées **au niveau applicatif** (dans l'API, lors de la génération du résultat), pas dans le scoring SQL lui-même :

- Introversion élevée + expression élevée → communique fortement quand à l'aise
- Introversion élevée + expression faible → difficulté d'expression possible, sans conclure à de la timidité
- Introversion élevée + profondeur_relationnelle élevée → apprécie les relations profondes tout en ayant besoin de solitude pour récupérer
- Introversion modérée + introspection élevée → réflexif sans être fortement introverti
- Introversion élevée + adaptation élevée → fonctionne bien socialement mais a besoin de récupération ensuite

**Statut d'implémentation** : la table de scores bruts existe et permet ces croisements ; la génération du texte de résultat (§7) qui les exploite n'est pas encore codée — prochaine étape logique une fois le test intégré au site.

## 7. Structure du résultat attendu (à générer par l'API, pas encore implémenté)

1. Profil principal
2. Description générale
3. Niveau d'introversion
4. Principales caractéristiques
5. Forces
6. Points de vigilance
7. Fonctionnement social
8. Communication
9. Travail / environnement
10. Relations
11. Rapport à la solitude
12. Conseils d'évolution
13. Contenus Ateb's Inspire recommandés

Toujours présenté comme une **lecture du fonctionnement**, jamais comme une étiquette définitive — formulations du type *"tu sembles fonctionner ainsi actuellement"*, jamais *"tu es X"*.

## 8. Structure de données (implémentée sur atebs-inspire-core)

| Table | Rôle |
|---|---|
| `test_dimensions` | les 8 dimensions ; `is_derived=true` pour `introversion` |
| `test_questions` | 40 questions, `dimension_id` (principale) + `secondary_dimension` (optionnelle) |
| `test_question_options` | 4 options (A-D) par question, `weights` en jsonb (ex: `{"stimulation_sociale": 3}`) |
| `test_sessions` | une session par passage du test |
| `test_responses` | une réponse = un `option_id` choisi par question |

RLS : dimensions/questions/options en lecture publique (nécessaire pour afficher le test) ; sessions/réponses restreintes au propriétaire.

`behavioral_profile` a été restructuré pour porter les 8 dimensions officielles (colonnes : `introversion_level`, `stimulation_sociale`, `introspection`, `expression`, `organisation`, `adaptation`, `decision`, `profondeur_relationnelle`) — l'ancien modèle placeholder (8 dimensions différentes, scoring 1-5 uniforme) a été entièrement remplacé, aucune donnée réelle n'existait encore.

Fonction `score_test_session(session_id)` : calcule les 7 dimensions mesurées + le score composite d'introversion, formulation qualitative, archive l'historique, incrémente la version. Sécurisée, sans accès public (appelée uniquement via un client service role depuis `/api/test/complete`).

**Testé** : simulation "toujours répondre C" → introversion élevée, stimulation sociale faible, introspection/organisation/décision/profondeur_relationnelle élevés (cohérent) ; simulation "toujours répondre A" → inversion symétrique complète ; archivage de version confirmé.

## 9. API Next.js

- `POST /api/test/start` — crée une session, renvoie les 40 questions avec leurs options (id, lettre, libellé). Les dimensions et pondérations ne sont jamais exposées au frontend.
- `POST /api/test/answer` — enregistre le choix d'une option (`option_id`), idempotent, vérifie que l'option appartient bien à la question envoyée.
- `POST /api/test/complete` — vérifie que toutes les questions actives ont une réponse, déclenche `score_test_session` via le client service role, renvoie le `behavioral_profile` à jour.

## 10. Reste à faire

- Génération du texte de résultat riche (§7) exploitant les combinaisons de §6 — actuellement seuls les scores bruts qualitatifs existent.
- Affiner les seuils faible/modéré/élevé et les poids une fois des réponses réelles disponibles.
- Intégrer le test dans le frontend existant (remplace `TestClient.tsx`, qui utilisait l'ancien modèle à 6 archétypes).
- Recommandations de contenu Ateb's Inspire en fin de résultat (§9 de la spec) — dépend du contenu éditorial (Phase 2b).
