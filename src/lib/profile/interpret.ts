export type Level = "faible" | "modéré" | "élevé";

export interface BehavioralProfileRow {
  introversion_level: Level | null;
  stimulation_sociale: Level | null;
  introspection: Level | null;
  expression: Level | null;
  organisation: Level | null;
  adaptation: Level | null;
  decision: Level | null;
  profondeur_relationnelle: Level | null;
  version: number;
}

export interface ProfileResult {
  titre: string;
  description: string;
  niveauIntroversion: Level;
  caracteristiques: string[];
  forces: string[];
  vigilance: string[];
  fonctionnementSocial: string;
  communication: string;
  travail: string;
  relations: string;
  solitude: string;
  conseils: string[];
}

// Formulations volontairement non-déterministes : jamais "tu es X", toujours
// "tu sembles fonctionner ainsi actuellement" (voir PHASE-2A §7).

function titrePrincipal(level: Level): string {
  switch (level) {
    case "élevé":
      return "Un fonctionnement tourné vers l'intérieur";
    case "modéré":
      return "Un équilibre entre intériorité et engagement extérieur";
    case "faible":
      return "Un fonctionnement plutôt tourné vers l'extérieur";
  }
}

export function interpretBehavioralProfile(p: BehavioralProfileRow): ProfileResult {
  const introversion = p.introversion_level ?? "modéré";
  const stim = p.stimulation_sociale ?? "modéré";
  const intro = p.introspection ?? "modéré";
  const expr = p.expression ?? "modéré";
  const org = p.organisation ?? "modéré";
  const adapt = p.adaptation ?? "modéré";
  const dec = p.decision ?? "modéré";
  const prof = p.profondeur_relationnelle ?? "modéré";

  const caracteristiques: string[] = [];
  const forces: string[] = [];
  const vigilance: string[] = [];
  const conseils: string[] = [];

  // --- Stimulation sociale ---
  if (stim === "faible") {
    caracteristiques.push("un besoin de récupération important après les interactions sociales");
    forces.push("une bonne capacité à te ressourcer seul, sans dépendre du regard des autres");
  } else if (stim === "élevé") {
    caracteristiques.push("une énergie qui se nourrit facilement du contact avec les autres");
    forces.push("une aisance naturelle à aller vers les autres et les nouvelles situations");
  } else {
    caracteristiques.push("une énergie sociale qui varie selon le contexte et les personnes");
  }

  // --- Introspection ---
  if (intro === "élevé") {
    caracteristiques.push("un monde intérieur riche, avec un vrai goût pour la réflexion approfondie");
    forces.push("une capacité de réflexion en profondeur, utile pour les sujets complexes");
    vigilance.push("le risque de suranalyser certaines situations avant d'agir");
  } else if (intro === "faible") {
    caracteristiques.push("une tendance à avancer par l'action plutôt que par la réflexion prolongée");
    forces.push("une capacité à avancer vite, sans se laisser freiner par trop d'analyse");
  }

  // --- Expression ---
  if (expr === "élevé") {
    forces.push("une facilité à exprimer ce que tu penses et ressens, même dans l'instant");
  } else if (expr === "faible") {
    vigilance.push("une difficulté possible à exprimer tes besoins ou opinions dans l'instant");
    conseils.push("Entraîne-toi à formuler une opinion à voix haute avant de l'avoir totalement affinée — la clarté vient souvent en parlant.");
  }

  // --- Organisation ---
  if (org === "élevé") {
    forces.push("un vrai sens de l'organisation et de la méthode");
  } else if (org === "faible") {
    caracteristiques.push("une préférence pour la liberté et l'improvisation plutôt que la planification stricte");
  }

  // --- Adaptation ---
  if (adapt === "élevé") {
    forces.push("une bonne capacité à t'adapter rapidement à l'imprévu");
  } else if (adapt === "faible") {
    vigilance.push("un besoin de temps pour digérer les changements ou imprévus");
    conseils.push("Quand un imprévu arrive, autorise-toi un court temps de pause avant de réagir — ce n'est pas de la lenteur, c'est ta manière de bien intégrer le changement.");
  }

  // --- Décision ---
  if (dec === "élevé") {
    forces.push("une tendance à bien réfléchir avant de t'engager dans une décision importante");
  } else if (dec === "faible") {
    caracteristiques.push("une prise de décision rapide, souvent portée par l'échange avec les autres");
  }

  // --- Profondeur relationnelle ---
  if (prof === "élevé") {
    forces.push("une capacité à construire des relations peu nombreuses mais profondes");
  } else if (prof === "faible") {
    caracteristiques.push("une aisance à multiplier les échanges variés, sans forcément chercher la profondeur immédiate");
  }

  // --- Détection des configurations nuancées (PHASE-2A §6) ---
  if (introversion === "élevé" && expr === "élevé") {
    caracteristiques.push(
      "un fonctionnement introverti qui n'empêche pas une communication forte une fois à l'aise — tu n'as probablement pas besoin d'être \"moins introverti\" pour bien t'exprimer"
    );
  }
  if (introversion === "élevé" && expr === "faible") {
    vigilance.push(
      "une difficulté d'expression possible dans certains contextes — sans que cela signifie du manque de confiance en toi"
    );
  }
  if (introversion === "élevé" && prof === "élevé") {
    caracteristiques.push(
      "un profond attachement à quelques relations, combiné à un vrai besoin de solitude pour récupérer"
    );
  }
  if (introversion === "modéré" && intro === "élevé") {
    caracteristiques.push(
      "une réflexion profonde qui ne s'accompagne pas nécessairement d'un besoin de solitude très marqué"
    );
  }
  if (introversion === "élevé" && adapt === "élevé") {
    caracteristiques.push(
      "une capacité à bien fonctionner dans des environnements sociaux, à condition de pouvoir récupérer ensuite"
    );
  }

  // --- Textes de synthèse par section ---
  const fonctionnementSocial =
    stim === "faible"
      ? "Tu fonctionnes mieux avec des interactions choisies plutôt que subies. Le temps seul n'est pas un manque social, c'est une manière de recharger ton énergie."
      : stim === "élevé"
      ? "Les interactions sociales te stimulent plutôt qu'elles ne t'épuisent. Tu es probablement à l'aise pour multiplier les rencontres et les contextes nouveaux."
      : "Ton énergie sociale dépend beaucoup du contexte : certaines interactions te nourrissent, d'autres te demandent de la récupération ensuite.";

  const communication =
    expr === "élevé"
      ? "Tu exprimes assez naturellement ce que tu penses, même dans l'instant, ce qui facilite les échanges spontanés."
      : expr === "faible"
      ? "Tu préfères probablement structurer ta pensée avant de t'exprimer, ce qui peut donner l'impression d'être réservé — sans que ce soit un manque à combler."
      : "Ta manière de t'exprimer varie selon le contexte et la confiance que tu as dans la situation.";

  const travail =
    org === "élevé" && adapt === "faible"
      ? "Tu es probablement plus efficace dans un cadre structuré, avec le temps d'anticiper les imprévus plutôt que de les subir."
      : org === "faible" && adapt === "élevé"
      ? "Tu fonctionnes bien dans des environnements flexibles où tu peux ajuster ton approche en temps réel."
      : "Ton efficacité dépend d'un équilibre entre structure et liberté d'ajustement, propre à chaque projet.";

  const relations =
    prof === "élevé"
      ? "Tu sembles privilégier un cercle relationnel restreint mais profond, plutôt qu'un grand nombre de connexions superficielles."
      : "Tu sembles à l'aise avec un cercle relationnel plus large, quitte à ce que certaines relations restent moins approfondies.";

  const solitude =
    stim === "faible"
      ? "La solitude joue un rôle clé dans ta récupération — elle n'est pas à éviter, mais à intégrer consciemment dans ton rythme."
      : "La solitude te sert occasionnellement de pause, sans être un besoin central de ton fonctionnement.";

  if (conseils.length === 0) {
    conseils.push("Observe, dans les prochaines semaines, les situations où tu te sens le plus aligné avec toi-même — c'est souvent le meilleur indicateur de ce qui te correspond.");
  }

  return {
    titre: titrePrincipal(introversion),
    description:
      "Cette lecture décrit des tendances actuelles, pas une case définitive. Elle peut évoluer avec le temps — tu pourras d'ailleurs refaire ce questionnaire plus tard pour voir ce qui a changé.",
    niveauIntroversion: introversion,
    caracteristiques,
    forces: forces.length ? forces : ["Un fonctionnement encore à affiner — reviens une fois le questionnaire complété."],
    vigilance,
    fonctionnementSocial,
    communication,
    travail,
    relations,
    solitude,
    conseils,
  };
}
