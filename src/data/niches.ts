export interface NichePage {
  slug: string
  seoTitle: string
  seoDescription: string
  headline: string
  headlineEm: string
  lede: string
  problem: { title: string; text: string }
  solution: { title: string; text: string }
  deliverables: string[]
  relatedService: string
  relatedServiceLabel: string
  cta: string
}

export const niches: NichePage[] = [
  // ─── BRANDING × SECTEURS ───────────────────────────────────────────────
  {
    slug: 'branding-startup-bruxelles',
    seoTitle: 'Branding pour Startups — Advanguard Studio · Bruxelles',
    seoDescription:
      'Identité de marque pour startups tech et scale-ups à Bruxelles. Naming, logotype, système visuel complet. Studio indépendant, livraison 4–6 semaines.',
    headline: 'Branding pour',
    headlineEm: 'startups ambitieuses.',
    lede:
      'Votre produit est prêt. Votre marque doit l\'être aussi. On construit des identités visuelles qui survivent à la seed round, au pivot et à l\'internationalisation.',
    problem: {
      title: 'Le problème des startups',
      text:
        'Un logo Canva et une palette copiée sur Dribbble ne suffisent plus dès que vous levez des fonds ou recrutez. Les investisseurs voient des centaines de pitchs : une marque faible signale un manque de maturité opérationnelle.',
    },
    solution: {
      title: 'Notre approche',
      text:
        'On part de votre positionnement, pas d\'une moodboard. Stratégie de marque, naming si nécessaire, système visuel modulaire pensé pour scaler, du favicon à l\'investor deck.',
    },
    deliverables: ['Plateforme de marque', 'Logotype + variantes', 'Système visuel complet', 'Brand guidelines', 'Kit investisseurs'],
    relatedService: 'branding',
    relatedServiceLabel: 'Branding & identité',
    cta: 'Démarrer votre identité',
  },
  {
    slug: 'branding-immobilier',
    seoTitle: 'Branding Agence Immobilière — Advanguard Studio · Belgique',
    seoDescription:
      'Identité visuelle pour agences immobilières et promoteurs. Différenciation marché, logotype, supports print & digital. Studio design Bruxelles.',
    headline: 'Branding pour',
    headlineEm: 'l\'immobilier belge.',
    lede:
      'Dans un secteur où les agences se ressemblent toutes, une identité forte est le premier filtre de qualification client. On vous aide à sortir du lot, sans quitter le sérieux.',
    problem: {
      title: 'Indifférenciation visuelle',
      text:
        'Bleu corporate, Helvetica et photo de skyline : le secteur immobilier souffre d\'une uniformité visuelle qui force la compétition sur le seul prix. Votre marque peut faire mieux.',
    },
    solution: {
      title: 'Distinction sans compromis',
      text:
        'Territoire visuel unique, typographie propriétaire, charte adaptée print (panneaux, brochures) et digital (site, réseaux). Une identité qui qualifie vos prospects avant le premier contact.',
    },
    deliverables: ['Identité complète', 'Charte print & digital', 'Signalétique', 'Templates réseaux sociaux', 'Panneaux & affiches'],
    relatedService: 'branding',
    relatedServiceLabel: 'Branding & identité',
    cta: 'Demander un devis',
  },
  {
    slug: 'branding-cabinet-conseil',
    seoTitle: 'Branding Cabinet de Conseil — Advanguard Studio · Bruxelles',
    seoDescription:
      'Identité visuelle pour cabinets de conseil, consultants indépendants et practices B2B. Crédibilité, autorité, différenciation. Bruxelles & Europe.',
    headline: 'Branding pour',
    headlineEm: 'cabinets qui comptent.',
    lede:
      'Dans le conseil, vous vendez de la confiance avant de vendre du savoir. Une identité rigoureuse signale la qualité de votre pensée avant même le premier appel.',
    problem: {
      title: 'La crédibilité se voit',
      text:
        'Un site générique et un logo Times New Roman ne suffisent plus face à des concurrents qui investissent dans leur présence. Vos prospects décident en 8 secondes si vous méritez un RDV.',
    },
    solution: {
      title: 'Autorité par le design',
      text:
        'Identité sobre, précise et mémorable. Système visuel cohérent de la carte de visite au rapport d\'audit. On code votre expertise dans chaque détail graphique.',
    },
    deliverables: ['Plateforme de marque', 'Identité complète', 'Templates de livrables', 'Présentation corporate', 'Cartes de visite'],
    relatedService: 'branding',
    relatedServiceLabel: 'Branding & identité',
    cta: 'Parler de votre cabinet',
  },

  // ─── WEB × SECTEURS ────────────────────────────────────────────────────
  {
    slug: 'site-web-saas-belgique',
    seoTitle: 'Site Web SaaS & Startups Tech — Advanguard Studio · Belgique',
    seoDescription:
      'Conception et développement de sites web pour SaaS, startups tech et scale-ups belges. Astro, React, performances > 95. Studio indépendant Bruxelles.',
    headline: 'Sites web pour',
    headlineEm: 'produits SaaS.',
    lede:
      'Votre landing page convertit ou elle coûte. On conçoit des sites qui transforment des visiteurs sceptiques en trials actifs, sans template ni compromis.',
    problem: {
      title: 'Le template ne suffit plus',
      text:
        'Webflow templates et thèmes WordPress racontent tous la même histoire. Quand votre produit est différencié, votre site doit l\'être aussi, et performer à 95+ sur PageSpeed.',
    },
    solution: {
      title: 'Stack moderne, résultats mesurables',
      text:
        'Astro + React pour les performances, design sur mesure pour la conversion. On livre des sites statiques ultra-rapides, optimisés SEO dès le départ, avec analytics RGPD.',
    },
    deliverables: ['Design UI/UX complet', 'Développement Astro/React', 'Intégration CMS headless', 'Score PageSpeed > 95', 'SEO technique'],
    relatedService: 'web',
    relatedServiceLabel: 'Web & SaaS',
    cta: 'Démarrer votre projet web',
  },
  {
    slug: 'site-web-ecommerce',
    seoTitle: 'Site E-commerce Sur Mesure — Advanguard Studio · Belgique',
    seoDescription:
      'Conception e-commerce sur mesure pour marques belges. UX orientée conversion, design de produit, intégration paiement. Studio indépendant Bruxelles.',
    headline: 'E-commerce',
    headlineEm: 'orienté conversion.',
    lede:
      'Un e-commerce performant n\'est pas une question de plateforme : c\'est une question de design. On conçoit des expériences d\'achat qui réduisent l\'abandon panier et augmentent le panier moyen.',
    problem: {
      title: 'L\'UX fait la différence',
      text:
        'La majorité des abandons de panier viennent de problèmes d\'expérience utilisateur, pas de prix. Navigation confuse, checkout trop long, confiance visuelle insuffisante.',
    },
    solution: {
      title: 'Design qui convertit',
      text:
        'Audit UX de votre funnel, redesign orienté conversion, identité produit cohérente du catalogue à la confirmation de commande. On mesure, on optimise.',
    },
    deliverables: ['Audit UX complet', 'Design UI e-commerce', 'Optimisation checkout', 'Identité produit', 'Intégration Shopify/custom'],
    relatedService: 'web',
    relatedServiceLabel: 'Web & SaaS',
    cta: 'Auditer votre boutique',
  },
  {
    slug: 'site-web-bruxelles',
    seoTitle: 'Création Site Web Bruxelles — Advanguard Studio',
    seoDescription:
      'Agence web indépendante à Bruxelles. Création de sites sur mesure, rapides et bien référencés. Devis sous 24h. Stack moderne Astro/React.',
    headline: 'Votre site web,',
    headlineEm: 'fait à Bruxelles.',
    lede:
      'Studio de design indépendant au cœur de Bruxelles. On conçoit des sites qui ressemblent à votre entreprise, pas à un template vu mille fois.',
    problem: {
      title: 'Trop de sites, pas assez de sites',
      text:
        'À Bruxelles, les agences web sont nombreuses mais les sites livrés se ressemblent : lents, génériques, mal référencés. Vous méritez mieux, à un tarif de studio et pas de grande agence.',
    },
    solution: {
      title: 'Studio indépendant, qualité senior',
      text:
        'Interlocuteur unique du brief au lancement. Design sur mesure, développement propre, SEO intégré dès le départ. Pas de sous-traitance, pas de template imposé.',
    },
    deliverables: ['Design sur mesure', 'Développement responsive', 'SEO technique', 'CMS simple à gérer', 'Mise en ligne & suivi'],
    relatedService: 'web',
    relatedServiceLabel: 'Web & SaaS',
    cta: 'Demander un devis gratuit',
  },

  // ─── FORMATION IA × AUDIENCE ────────────────────────────────────────────
  {
    slug: 'formation-ia-equipe',
    seoTitle: 'Formation IA pour Équipes — Advanguard Studio · Bruxelles',
    seoDescription:
      'Formation intelligence artificielle sur mesure pour équipes marketing, design et produit. Pratique, applicable en 48h. Bruxelles & distanciel.',
    headline: 'Formation IA',
    headlineEm: 'pour vos équipes.',
    lede:
      'L\'IA ne remplace pas vos équipes : elle multiplie leur capacité. On forme vos collaborateurs aux outils concrets, pas aux concepts abstraits. Résultats en 48h garantis.',
    problem: {
      title: 'Adoption bloquée au théorique',
      text:
        'Webinaires génériques, demos impressionnantes mais inapplicables, peur du changement : la plupart des formations IA n\'aboutissent pas sur une adoption réelle dans le quotidien des équipes.',
    },
    solution: {
      title: 'Formation par des praticiens',
      text:
        'On forme sur les outils qu\'on utilise nous-mêmes : Midjourney, ChatGPT, Claude, Cursor, Make. Cas d\'usage concrets tirés de votre secteur, exercices pratiques, résultats immédiats.',
    },
    deliverables: ['Audit des cas d\'usage équipe', 'Formation 1 ou 2 jours', 'Playbook outils personnalisé', 'Suivi 30 jours', 'Accès ressources'],
    relatedService: 'branding',
    relatedServiceLabel: 'Formation IA',
    cta: 'Organiser une formation',
  },
  {
    slug: 'formation-ia-dirigeant',
    seoTitle: 'Formation IA pour Dirigeants — Advanguard Studio · Belgique',
    seoDescription:
      'Formation intelligence artificielle pour dirigeants, managers et décideurs. Enjeux stratégiques, outils clés, cas d\'usage business. Format executive.',
    headline: 'IA pour',
    headlineEm: 'décideurs pressés.',
    lede:
      'Vous n\'avez pas besoin de savoir coder, vous devez comprendre ce que l\'IA change dans votre secteur, quelles décisions elle modifie et comment piloter son adoption dans votre organisation.',
    problem: {
      title: 'Décider sans comprendre',
      text:
        'L\'IA va transformer votre secteur. Sans compréhension stratégique, vous risquez de sous-investir, sur-investir ou déléguer des décisions critiques à des consultants qui ne connaissent pas votre business.',
    },
    solution: {
      title: 'Format executive, substance réelle',
      text:
        'Session de 4h ou journée complète. Panorama des enjeux sectoriels, démonstrations concrètes, cadre décisionnel pour piloter l\'IA dans votre organisation. Pas de jargon.',
    },
    deliverables: ['Session executive 4h ou 1 jour', 'Cartographie IA × votre secteur', 'Framework de décision', 'Guide d\'implémentation', 'Suivi stratégique'],
    relatedService: 'branding',
    relatedServiceLabel: 'Formation IA',
    cta: 'Organiser une session',
  },
  {
    slug: 'formation-ia-pme',
    seoTitle: 'Formation IA pour PME Belges — Advanguard Studio',
    seoDescription:
      'Formation intelligence artificielle adaptée aux PME belges. Automatisation, marketing IA, gain de temps concret. Bruxelles, distanciel, sur site.',
    headline: 'L\'IA accessible',
    headlineEm: 'pour les PME.',
    lede:
      'Les PME belges peuvent tirer autant profit de l\'IA que les grandes entreprises, à condition d\'avoir accès aux bons outils et à une formation pratique, pas théorique.',
    problem: {
      title: 'IA réservée aux grandes entreprises ?',
      text:
        'Formation coûteuses, consultants inaccessibles, outils complexes : les PME ont l\'impression que l\'IA est hors de portée. Ce n\'est plus vrai si vous avez les bons guides.',
    },
    solution: {
      title: 'Pratique, abordable, immédiat',
      text:
        'Formation sur mesure pour votre taille et votre secteur. On identifie les 3 cas d\'usage qui vont changer votre quotidien cette semaine : marketing, admin, production de contenu.',
    },
    deliverables: ['Audit besoins PME', 'Formation 1 journée', 'Sélection outils adaptés', 'Workflows automatisés', 'Support 60 jours'],
    relatedService: 'branding',
    relatedServiceLabel: 'Formation IA',
    cta: 'Former votre PME',
  },

  // ─── CONSULTING × BESOIN ────────────────────────────────────────────────
  {
    slug: 'consulting-design-system',
    seoTitle: 'Consulting Design System — Advanguard Studio · Bruxelles',
    seoDescription:
      'Mise en place et audit de design system pour startups et scale-ups. Composants, tokens, documentation. Studio design indépendant Bruxelles.',
    headline: 'Design system',
    headlineEm: 'solide et scalable.',
    lede:
      'Un design system n\'est pas une bibliothèque de composants : c\'est une langue commune entre design et développement. On vous aide à la construire ou à la réparer.',
    problem: {
      title: 'Incohérence qui coûte cher',
      text:
        'Chaque sprint ajoute de nouvelles variantes de boutons, de couleurs et de composants. L\'incohérence s\'accumule, le design dette ralentit l\'équipe et dégrade l\'expérience utilisateur.',
    },
    solution: {
      title: 'Audit → structure → adoption',
      text:
        'On audite l\'existant, on structure les tokens et composants, on documente pour l\'adoption réelle par les équipes. Figma + code (React/Tailwind) si nécessaire.',
    },
    deliverables: ['Audit système existant', 'Design tokens complets', 'Bibliothèque composants Figma', 'Documentation d\'usage', 'Handoff développement'],
    relatedService: 'web',
    relatedServiceLabel: 'Consulting design',
    cta: 'Auditer votre système',
  },
  {
    slug: 'audit-identite-visuelle',
    seoTitle: 'Audit Identité Visuelle — Advanguard Studio · Belgique',
    seoDescription:
      'Audit complet de votre identité de marque : cohérence, impact, perception. Rapport actionnable + recommandations. Studio indépendant Bruxelles.',
    headline: 'Audit de votre',
    headlineEm: 'identité visuelle.',
    lede:
      'Votre marque a-t-elle vieilli ? Est-elle cohérente sur tous les points de contact ? Crée-t-elle la bonne impression ? On répond à ces questions avec des données, pas des opinions.',
    problem: {
      title: 'On ne voit plus sa propre marque',
      text:
        'Quand vous la regardez tous les jours, vous ne voyez plus ce que vos clients voient. Un regard extérieur expert identifie les incohérences et les opportunités que vous ne voyez plus.',
    },
    solution: {
      title: 'Diagnostic complet et actionnable',
      text:
        'Analyse de tous les points de contact (print, digital, réseaux, packaging), benchmark sectoriel, rapport structuré avec priorités d\'action classées par impact et effort.',
    },
    deliverables: ['Audit 360° des supports', 'Benchmark concurrents', 'Rapport détaillé', 'Priorités d\'action', 'Session de restitution'],
    relatedService: 'branding',
    relatedServiceLabel: 'Branding & identité',
    cta: 'Commander un audit',
  },
  {
    slug: 'consulting-strategie-marque',
    seoTitle: 'Consulting Stratégie de Marque — Advanguard Studio · Bruxelles',
    seoDescription:
      'Accompagnement stratégie de marque : positionnement, plateforme de marque, architecture de marque. Pour entreprises en croissance. Bruxelles & remote.',
    headline: 'Stratégie de marque',
    headlineEm: 'pour la croissance.',
    lede:
      'Le design sans stratégie, c\'est de la décoration. On travaille en amont des pixels : positionnement, territoire, personnalité de marque. Pour que chaque livrable soit ancré dans une intention claire.',
    problem: {
      title: 'Croître sans cap de marque',
      text:
        'En croissance, les incohérences de marque se multiplient : nouveaux marchés, nouveaux produits, nouvelle équipe. Sans plateforme de marque solide, chaque prise de parole part dans une direction différente.',
    },
    solution: {
      title: 'Plateforme qui structure tout',
      text:
        'Ateliers de positionnement, définition de la plateforme de marque (raison d\'être, valeurs, personnalité, ton), architecture de portefeuille si nécessaire. Un document de référence pour les 3–5 prochaines années.',
    },
    deliverables: ['Ateliers de positionnement', 'Plateforme de marque complète', 'Architecture de marque', 'Territoire verbal', 'Guide de prise de parole'],
    relatedService: 'branding',
    relatedServiceLabel: 'Branding & identité',
    cta: 'Structurer votre marque',
  },
]

export function getNicheBySlug(slug: string): NichePage | undefined {
  return niches.find((n) => n.slug === slug)
}
