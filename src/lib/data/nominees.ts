import type { Nominee } from "@/types";

export const nominees: Nominee[] = [
  // ─── cat-1: Meilleure Personnalité Publique ──────────────
  {
    id: "nom-1",
    name: "Hadja Aissatou Balde",
    categoryId: "cat-1",
    categoryName: "Meilleure Personnalité Publique",
    description:
      "Directrice du Groupe Scolaire de Mamou, elle a révolutionné les méthodes pédagogiques et doublé le taux de réussite au brevet.",
    imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    edition: 2026,
  },
  {
    id: "nom-2",
    name: "Alpha Oumar Diallo",
    categoryId: "cat-1",
    categoryName: "Meilleure Personnalité Publique",
    description:
      "Fondateur d'une école gratuite pour les enfants défavorisés, offrant un accès à l'éducation de qualité depuis 2020.",
    imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    edition: 2026,
  },
  {
    id: "nom-3",
    name: "Mariama Sow",
    categoryId: "cat-1",
    categoryName: "Meilleure Personnalité Publique",
    description:
      "Enseignante pionnière de l'éducation numérique à Mamou, intégrant tablettes et contenus interactifs en classe.",
    imageUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    edition: 2026,
  },

  // ─── cat-2: Meilleur Media de Communication ─────────────
  {
    id: "nom-4",
    name: "Thierno Sadou Barry",
    categoryId: "cat-2",
    categoryName: "Meilleur Media de Communication",
    description:
      "Journaliste d'investigation à Radio Mamou FM, ses enquêtes ont contribué à améliorer la gouvernance locale.",
    imageUrl: "https://randomuser.me/api/portraits/men/21.jpg",
    edition: 2026,
  },
  {
    id: "nom-5",
    name: "Mariame Lamarana Bah",
    categoryId: "cat-2",
    categoryName: "Meilleur Media de Communication",
    description:
      "Blogueuse et influenceuse, elle promeut le tourisme et la culture de Mamou auprès de la diaspora.",
    imageUrl: "https://randomuser.me/api/portraits/women/22.jpg",
    edition: 2026,
  },

  // ─── cat-3: Meilleure Association de Développement ──────
  {
    id: "nom-6",
    name: "Hadja Djenabou Bah",
    categoryId: "cat-3",
    categoryName: "Meilleure Association de Développement",
    description:
      "Fondatrice d'un orphelinat accueillant 80 enfants et d'un programme de parrainage éducatif.",
    imageUrl: "https://randomuser.me/api/portraits/women/19.jpg",
    edition: 2026,
  },
  {
    id: "nom-7",
    name: "Mamadou Aliou Sow",
    categoryId: "cat-3",
    categoryName: "Meilleure Association de Développement",
    description:
      "Coordinateur d'ONG ayant distribué plus de 5000 kits alimentaires aux familles vulnérables pendant la crise.",
    imageUrl: "https://randomuser.me/api/portraits/men/20.jpg",
    edition: 2026,
  },

  // ─── cat-4: Meilleure Initiative Sociale ────────────────
  {
    id: "nom-8",
    name: "Dr. Thierno Amadou Bah",
    categoryId: "cat-4",
    categoryName: "Meilleure Initiative Sociale",
    description:
      "Médecin chef de l'hôpital régional, il a mis en place un programme de consultations gratuites pour les femmes enceintes.",
    imageUrl: "https://randomuser.me/api/portraits/men/7.jpg",
    edition: 2026,
  },
  {
    id: "nom-9",
    name: "Aissatou Lamarana Diallo",
    categoryId: "cat-4",
    categoryName: "Meilleure Initiative Sociale",
    description:
      "Sage-femme dévouée ayant assisté plus de 2000 accouchements en zone rurale sans infrastructure médicale.",
    imageUrl: "https://randomuser.me/api/portraits/women/8.jpg",
    edition: 2026,
  },

  // ─── cat-5: Meilleur Entrepreneur(e) ───────────────────
  {
    id: "nom-10",
    name: "Ibrahima Bah",
    categoryId: "cat-5",
    categoryName: "Meilleur Entrepreneur(e)",
    description:
      "Fondateur de MamouTech, une startup qui connecte les artisans locaux au marché national via une plateforme digitale.",
    imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
    edition: 2026,
  },
  {
    id: "nom-11",
    name: "Fatoumata Barry",
    categoryId: "cat-5",
    categoryName: "Meilleur Entrepreneur(e)",
    description:
      "Créatrice d'une coopérative féminine de transformation de produits agricoles exportés dans toute la sous-région.",
    imageUrl: "https://randomuser.me/api/portraits/women/5.jpg",
    edition: 2026,
  },
  {
    id: "nom-12",
    name: "Mamadou Cellou Diallo",
    categoryId: "cat-5",
    categoryName: "Meilleur Entrepreneur(e)",
    description:
      "Entrepreneur social ayant créé 50 emplois grâce à son entreprise de recyclage et de gestion des déchets.",
    imageUrl: "https://randomuser.me/api/portraits/men/6.jpg",
    edition: 2026,
  },

  // ─── cat-6: Meilleure Innovation Locale ─────────────────
  {
    id: "nom-13",
    name: "Alseny Toure",
    categoryId: "cat-6",
    categoryName: "Meilleure Innovation Locale",
    description:
      "Développeur d'une application mobile de télémédecine connectant les patients ruraux aux médecins spécialistes.",
    imageUrl: "https://randomuser.me/api/portraits/men/23.jpg",
    edition: 2026,
  },
  {
    id: "nom-14",
    name: "Fatoumata Binta Diallo",
    categoryId: "cat-6",
    categoryName: "Meilleure Innovation Locale",
    description:
      "Ingénieure en énergies renouvelables ayant installé des panneaux solaires dans 15 écoles de la préfecture.",
    imageUrl: "https://randomuser.me/api/portraits/women/24.jpg",
    edition: 2026,
  },
  {
    id: "nom-15",
    name: "Mohamed Lamine Sylla",
    categoryId: "cat-6",
    categoryName: "Meilleure Innovation Locale",
    description:
      "Concepteur d'un système de gestion agricole intelligent utilisant l'IoT pour optimiser l'irrigation.",
    imageUrl: "https://randomuser.me/api/portraits/men/25.jpg",
    edition: 2026,
  },

  // ─── cat-7: Meilleur Projet Communautaire ───────────────
  {
    id: "nom-16",
    name: "Moussa Sangare",
    categoryId: "cat-7",
    categoryName: "Meilleur Projet Communautaire",
    description:
      "Fondateur du mouvement 'Mamou Debout', mobilisant des centaines de jeunes pour des projets communautaires.",
    imageUrl: "https://randomuser.me/api/portraits/men/16.jpg",
    edition: 2026,
  },

  // ─── cat-8: Meilleure Révélation Musicale ───────────────
  {
    id: "nom-17",
    name: "Kadiatou Bah",
    categoryId: "cat-8",
    categoryName: "Meilleure Révélation Musicale",
    description:
      "Chanteuse et compositrice dont les œuvres en langue peule célèbrent l'héritage culturel du Fouta-Djallon.",
    imageUrl: "https://randomuser.me/api/portraits/women/10.jpg",
    edition: 2026,
  },

  // ─── cat-9: Meilleur Jeune Littéraire ───────────────────
  {
    id: "nom-18",
    name: "Ousmane Sall",
    categoryId: "cat-9",
    categoryName: "Meilleur Jeune Littéraire",
    description:
      "Réalisateur de documentaires primé, ses films mettent en valeur la richesse culturelle de la préfecture de Mamou.",
    imageUrl: "https://randomuser.me/api/portraits/men/11.jpg",
    edition: 2026,
  },

  // ─── cat-10: Meilleur Photographe ───────────────────────
  {
    id: "nom-19",
    name: "Sekou Kouyate",
    categoryId: "cat-10",
    categoryName: "Meilleur Photographe",
    description:
      "Maître tisserand du Lépi, il forme la nouvelle génération à cet art ancestral et expose dans les foires internationales.",
    imageUrl: "https://randomuser.me/api/portraits/men/9.jpg",
    edition: 2026,
  },

  // ─── cat-12: Meilleure Boîte de Nuit ───────────────────
  // (pas de nominé existant)

  // ─── cat-13: Meilleur Joueur de Football ────────────────
  {
    id: "nom-20",
    name: "Abdoulaye Camara",
    categoryId: "cat-13",
    categoryName: "Meilleur Joueur de Football",
    description:
      "Champion national de judo, il entraîne bénévolement les jeunes de Mamou et a remporté 3 médailles d'or régionales.",
    imageUrl: "https://randomuser.me/api/portraits/men/12.jpg",
    edition: 2026,
  },
  {
    id: "nom-21",
    name: "Aminata Conte",
    categoryId: "cat-13",
    categoryName: "Meilleur Joueur de Football",
    description:
      "Capitaine de l'équipe féminine de football de Mamou, promotrice du sport féminin dans la région.",
    imageUrl: "https://randomuser.me/api/portraits/women/13.jpg",
    edition: 2026,
  },

  // ─── cat-14: Meilleure Équipe de Football ───────────────
  // (pas de nominé existant)

  // ─── cat-15: Meilleur Jeune Engagé ──────────────────────
  {
    id: "nom-22",
    name: "Safiatou Camara",
    categoryId: "cat-15",
    categoryName: "Meilleur Jeune Engagé",
    description:
      "À 22 ans, elle dirige un programme de mentorat pour les jeunes filles dans les zones rurales de Mamou.",
    imageUrl: "https://randomuser.me/api/portraits/women/17.jpg",
    edition: 2026,
  },
  {
    id: "nom-23",
    name: "Oumar Balde",
    categoryId: "cat-15",
    categoryName: "Meilleur Jeune Engagé",
    description:
      "Créateur d'une plateforme de formation en ligne gratuite en langues locales pour les jeunes décrocheurs.",
    imageUrl: "https://randomuser.me/api/portraits/men/18.jpg",
    edition: 2026,
  },

  // ─── cat-16: Meilleure Miss ─────────────────────────────
  // (pas de nominé existant)

  // ─── cat-17: Meilleur Master ────────────────────────────
  // (pas de nominé existant)

  // ─── Extras: Agriculture ────────────────────────────────
  // Mapped to cat-7 (Projet Communautaire) as closest match
  {
    id: "nom-24",
    name: "Elhadj Boubacar Barry",
    categoryId: "cat-7",
    categoryName: "Meilleur Projet Communautaire",
    description:
      "Agriculteur innovant ayant introduit des techniques d'irrigation solaire augmentant les rendements de 40%.",
    imageUrl: "https://randomuser.me/api/portraits/men/14.jpg",
    edition: 2026,
  },
  {
    id: "nom-25",
    name: "Hawa Diallo",
    categoryId: "cat-7",
    categoryName: "Meilleur Projet Communautaire",
    description:
      "Présidente d'une coopérative maraîchère de 200 femmes, pionnière de l'agriculture biologique à Mamou.",
    imageUrl: "https://randomuser.me/api/portraits/women/15.jpg",
    edition: 2026,
  },
];

export function getNomineesByCategory(categoryId: string): Nominee[] {
  return nominees.filter((n) => n.categoryId === categoryId);
}
