import { z } from "zod";

const GUINEA_PHONE_REGEX = /^6\d{8}$/;

export const voteSubmissionSchema = z.object({
  nomineeId: z.string().min(1, "L'identifiant du nomine est requis."),
  categoryId: z.string().min(1, "L'identifiant de la categorie est requis."),
  voterPhone: z
    .string()
    .regex(
      GUINEA_PHONE_REGEX,
      "Numero invalide. Format attendu : 6XXXXXXXX (9 chiffres)."
    ),
  captchaToken: z.string().min(1, "La verification CAPTCHA est requise."),
  voteCount: z
    .number()
    .int("Le nombre de votes doit etre un entier.")
    .min(1, "Vous devez accorder au moins 1 vote.")
    .max(100, "Maximum 100 votes par transaction."),
});

export type VoteSubmissionInput = z.infer<typeof voteSubmissionSchema>;
