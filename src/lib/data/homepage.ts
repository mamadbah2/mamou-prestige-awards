import type { KeyFigure, Partner, Testimonial, MpaEvent } from "@/types";

export const keyFigures: KeyFigure[] = [
  {
    id: "nominees",
    value: 150,
    suffix: "+",
    label: "Nomines",
    description: "Candidats en lice pour l'edition 2026",
  },
  {
    id: "categories",
    value: 25,
    label: "Categories",
    description: "Domaines d'excellence recompenses",
  },
  {
    id: "voters",
    value: 50000,
    suffix: "+",
    label: "Votants",
    description: "Participants au vote public",
  },
  {
    id: "editions",
    value: 3,
    label: "Editions",
    description: "Annees de celebration du merite",
  },
];

export const partners: Partner[] = [
  { id: "p1", name: "Gouvernorat de Mamou" },
  { id: "p2", name: "Orange Guinee" },
  { id: "p3", name: "Universite de Mamou" },
  { id: "p4", name: "Chambre de Commerce" },
  { id: "p5", name: "Ministere de la Culture" },
  { id: "p6", name: "Radio Mamou FM" },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    author: "Hadja Mariama Bah",
    role: "Laureate MPA 2024 - Education",
    content:
      "Le Mamou Prestige Award a mis en lumiere le travail que nous faisons pour l'education de nos enfants. C'est une fierte immense pour toute la communaute.",
    edition: 2024,
  },
  {
    id: "t2",
    author: "Elhadj Ibrahima Sow",
    role: "President du Jury 2025",
    content:
      "La rigueur et la transparence du processus de selection font du MPA une reference en matiere de celebration de l'excellence en Guinee.",
    edition: 2025,
  },
  {
    id: "t3",
    author: "Fatoumata Diallo",
    role: "Laureate MPA 2025 - Entrepreneuriat",
    content:
      "Recevoir ce prix m'a donne la visibilite necessaire pour developper mon entreprise. MPA change des vies a Mamou.",
    edition: 2025,
  },
  {
    id: "t4",
    author: "Mamadou Barry",
    role: "Partenaire - Secteur Prive",
    content:
      "Soutenir le MPA, c'est investir dans l'avenir de Mamou. Chaque edition revele des talents extraordinaires.",
    edition: 2025,
  },
];

export const events: MpaEvent[] = [
  {
    id: "e1",
    title: "Ouverture des Nominations",
    date: "15 Avril 2026",
    location: "En ligne",
    description:
      "Soumettez vos candidatures pour l'edition 2026. Toutes les categories sont ouvertes.",
  },
  {
    id: "e2",
    title: "Debut du Vote Public",
    date: "1er Juin 2026",
    location: "En ligne & Points de vote",
    description:
      "Le vote public est ouvert ! Soutenez vos favoris via la plateforme en ligne ou les points de vote Orange Money.",
  },
  {
    id: "e3",
    title: "Deliberation du Jury",
    date: "15 Juillet 2026",
    location: "Mamou",
    description:
      "Le jury d'experts se reunit pour evaluer les candidats finalistes selon les criteres d'excellence.",
  },
  {
    id: "e4",
    title: "Grande Ceremonie MPA 2026",
    date: "15 Aout 2026",
    location: "Palais de la Culture, Mamou",
    description:
      "La soiree de gala tant attendue ! Remise des trophees aux laureats de l'edition 2026.",
  },
];
