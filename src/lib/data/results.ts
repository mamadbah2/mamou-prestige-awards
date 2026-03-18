import type { EditionResult } from "@/types";

export const editionResults: EditionResult[] = [
  {
    edition: 2026,
    status: "ongoing",
    categories: [],
  },
  {
    edition: 2025,
    status: "completed",
    categories: [
      {
        categoryId: "cat-1",
        categoryName: "Education",
        winner: {
          nomineeId: "prev-1",
          name: "Hadja Mariama Bah",
          publicScorePercent: 82,
          juryScorePercent: 90,
          finalScore: 86.4,
        },
        runnerUp: {
          nomineeId: "prev-2",
          name: "Boubacar Diallo",
          publicScorePercent: 75,
          juryScorePercent: 78,
          finalScore: 76.65,
        },
      },
      {
        categoryId: "cat-2",
        categoryName: "Entrepreneuriat",
        winner: {
          nomineeId: "prev-3",
          name: "Fatoumata Diallo",
          publicScorePercent: 88,
          juryScorePercent: 85,
          finalScore: 86.35,
        },
        runnerUp: {
          nomineeId: "prev-4",
          name: "Ousmane Barry",
          publicScorePercent: 70,
          juryScorePercent: 82,
          finalScore: 76.6,
        },
      },
      {
        categoryId: "cat-4",
        categoryName: "Culture & Arts",
        winner: {
          nomineeId: "prev-5",
          name: "Mamadou Conde",
          publicScorePercent: 91,
          juryScorePercent: 88,
          finalScore: 89.35,
        },
        runnerUp: {
          nomineeId: "prev-6",
          name: "Aissatou Sow",
          publicScorePercent: 78,
          juryScorePercent: 80,
          finalScore: 79.1,
        },
      },
      {
        categoryId: "cat-5",
        categoryName: "Sport",
        winner: {
          nomineeId: "prev-7",
          name: "Ibrahima Sory Camara",
          publicScorePercent: 85,
          juryScorePercent: 92,
          finalScore: 88.85,
        },
        runnerUp: {
          nomineeId: "prev-8",
          name: "Kadiatou Barry",
          publicScorePercent: 79,
          juryScorePercent: 75,
          finalScore: 76.8,
        },
      },
      {
        categoryId: "cat-7",
        categoryName: "Jeunesse & Leadership",
        winner: {
          nomineeId: "prev-9",
          name: "Abdoulaye Balde",
          publicScorePercent: 86,
          juryScorePercent: 89,
          finalScore: 87.65,
        },
        runnerUp: {
          nomineeId: "prev-10",
          name: "Mariama Camara",
          publicScorePercent: 72,
          juryScorePercent: 80,
          finalScore: 76.4,
        },
      },
      {
        categoryId: "cat-8",
        categoryName: "Solidarite & Humanitaire",
        winner: {
          nomineeId: "prev-11",
          name: "Elhadj Mamadou Sow",
          publicScorePercent: 90,
          juryScorePercent: 94,
          finalScore: 92.2,
        },
        runnerUp: {
          nomineeId: "prev-12",
          name: "Hawa Barry",
          publicScorePercent: 80,
          juryScorePercent: 76,
          finalScore: 77.8,
        },
      },
    ],
  },
];
