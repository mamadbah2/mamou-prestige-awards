import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(1, "Le nom est requis."),
  slug: z.string().min(1, "Le slug est requis."),
  description: z.string().min(1, "La description est requise."),
  icon: z.string().min(1, "L'icone est requise."),
  votingStartDate: z.string().optional(),
  votingEndDate: z.string().optional(),
});

export type CategoryFormInput = z.infer<typeof categoryFormSchema>;

export const nomineeFormSchema = z.object({
  name: z.string().min(1, "Le nom est requis."),
  description: z.string().min(1, "La description est requise."),
  imageUrl: z.string().optional(),
  categoryId: z.string().min(1, "La categorie est requise."),
});

export type NomineeFormInput = z.infer<typeof nomineeFormSchema>;
