import type { TeamMember, FaqItem } from "@/types";

export const teamMembers: TeamMember[] = [
  {
    id: "team-1",
    name: "Elhadj Ibrahima Sow",
    role: "President du Comite MPA",
  },
  {
    id: "team-2",
    name: "Hadja Mariama Barry",
    role: "Directrice Generale",
  },
  {
    id: "team-3",
    name: "Alpha Amadou Diallo",
    role: "President du Jury",
  },
  {
    id: "team-4",
    name: "Fatoumata Binta Bah",
    role: "Coordinatrice des Nominations",
  },
  {
    id: "team-5",
    name: "Mamadou Cellou Barry",
    role: "Responsable Communication",
  },
  {
    id: "team-6",
    name: "Aissatou Lamarana Sow",
    role: "Tresoriere",
  },
  {
    id: "team-7",
    name: "Thierno Boubacar Balde",
    role: "Responsable Technique",
  },
  {
    id: "team-8",
    name: "Kadiatou Camara",
    role: "Chargee des Partenariats",
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "Qu'est-ce que le Mamou Prestige Award ?",
    answer:
      "Le Mamou Prestige Award (MPA) est une ceremonie annuelle qui celebre l'excellence dans la prefecture de Mamou, en Guinee. Il recompense les individus et organisations qui contribuent au developpement et au rayonnement de Mamou dans divers domaines.",
  },
  {
    id: "faq-2",
    question: "Comment sont selectionnes les nomines ?",
    answer:
      "Les nominations sont ouvertes au public. Toute personne peut proposer un candidat dans l'une des 10 categories. Un comite de pre-selection valide les candidatures selon des criteres d'eligibilite definis, puis les nomines officiels sont annonces.",
  },
  {
    id: "faq-3",
    question: "Comment fonctionne le systeme de vote ?",
    answer:
      "Le score final combine le vote du public (45%) et l'evaluation d'un jury independant (55%). Le vote public se fait en ligne via notre plateforme securisee, avec verification par CAPTCHA et transaction Orange Money pour garantir l'integrite du scrutin.",
  },
  {
    id: "faq-4",
    question: "Qui compose le jury ?",
    answer:
      "Le jury est compose de personnalites reconnues dans les domaines concernes : universitaires, professionnels, leaders communautaires et experts independants. Les membres du jury sont selectionnes pour leur integrite et leur expertise.",
  },
  {
    id: "faq-5",
    question: "Quand aura lieu la ceremonie 2026 ?",
    answer:
      "La Grande Ceremonie du Mamou Prestige Award 2026 est prevue pour le 15 Aout 2026 a Mamou. Les nominations ouvrent le 15 Avril et le vote public debute le 1er Juin 2026.",
  },
  {
    id: "faq-6",
    question: "Comment devenir partenaire du MPA ?",
    answer:
      "Les entreprises et organisations souhaitant soutenir le MPA peuvent nous contacter a contact@mamouprestige.com. Nous proposons differents niveaux de partenariat avec des avantages de visibilite adaptes.",
  },
  {
    id: "faq-7",
    question: "Le vote est-il payant ?",
    answer:
      "Un montant symbolique est demande via Orange Money pour chaque vote afin de garantir l'authenticite des votes et eviter les fraudes. Ce montant contribue egalement au financement de la ceremonie.",
  },
  {
    id: "faq-8",
    question: "Peut-on consulter les resultats des editions precedentes ?",
    answer:
      "Oui, les resultats de toutes les editions precedentes sont disponibles dans la section Resultats de notre site. Les editions passees sont archivees en lecture seule.",
  },
];

export const mpaHistory: { year: number; milestone: string }[] = [
  {
    year: 2024,
    milestone:
      "Premiere edition du Mamou Prestige Award, lancee avec 5 categories et plus de 10 000 votants.",
  },
  {
    year: 2025,
    milestone:
      "Deuxieme edition avec 8 categories, introduction du vote en ligne securise et plus de 30 000 votants.",
  },
  {
    year: 2026,
    milestone:
      "Troisieme edition historique avec 10 categories, un nouveau site web et l'objectif de 50 000 votants.",
  },
];
