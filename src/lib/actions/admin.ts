"use server";

import { revalidatePath } from "next/cache";
import { categoryFormSchema, nomineeFormSchema } from "@/lib/validations/admin";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  createNominee,
  updateNominee,
  deleteNominee,
  getCategoryById,
} from "@/lib/data/admin-queries";
import { getActiveEdition } from "@/lib/data/queries";

type ActionResult = { success: boolean; error?: string };

// ─── Categories ──────────────────────────────────────────

export async function createCategoryAction(
  formData: FormData
): Promise<ActionResult> {
  try {
    const raw = {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
      icon: formData.get("icon") as string,
      votingStartDate: (formData.get("votingStartDate") as string) || undefined,
      votingEndDate: (formData.get("votingEndDate") as string) || undefined,
    };

    const parsed = categoryFormSchema.safeParse(raw);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const edition = await getActiveEdition();
    if (!edition) {
      return { success: false, error: "Aucune edition active trouvee." };
    }

    await createCategory({
      ...parsed.data,
      editionId: edition.id,
      votingStartDate: parsed.data.votingStartDate
        ? new Date(parsed.data.votingStartDate)
        : undefined,
      votingEndDate: parsed.data.votingEndDate
        ? new Date(parsed.data.votingEndDate)
        : undefined,
    });

    revalidatePath("/admin/categories");
    revalidatePath("/categories");
    return { success: true };
  } catch (e) {
    return { success: false, error: `Erreur lors de la creation: ${e instanceof Error ? e.message : "Erreur inconnue"}` };
  }
}

export async function updateCategoryAction(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  try {
    const raw = {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
      icon: formData.get("icon") as string,
      votingStartDate: (formData.get("votingStartDate") as string) || undefined,
      votingEndDate: (formData.get("votingEndDate") as string) || undefined,
    };

    const parsed = categoryFormSchema.safeParse(raw);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    await updateCategory(id, {
      ...parsed.data,
      votingStartDate: parsed.data.votingStartDate
        ? new Date(parsed.data.votingStartDate)
        : null,
      votingEndDate: parsed.data.votingEndDate
        ? new Date(parsed.data.votingEndDate)
        : null,
    });

    revalidatePath("/admin/categories");
    revalidatePath("/categories");
    return { success: true };
  } catch (e) {
    return { success: false, error: `Erreur lors de la mise a jour: ${e instanceof Error ? e.message : "Erreur inconnue"}` };
  }
}

export async function deleteCategoryAction(id: string): Promise<ActionResult> {
  try {
    await deleteCategory(id);
    revalidatePath("/admin/categories");
    revalidatePath("/categories");
    return { success: true };
  } catch (e) {
    return { success: false, error: `Erreur lors de la suppression: ${e instanceof Error ? e.message : "Erreur inconnue"}` };
  }
}

// ─── Nominees ────────────────────────────────────────────

export async function createNomineeAction(
  formData: FormData
): Promise<ActionResult> {
  try {
    const raw = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      imageUrl: (formData.get("imageUrl") as string) || undefined,
      categoryId: formData.get("categoryId") as string,
    };

    const parsed = nomineeFormSchema.safeParse(raw);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const edition = await getActiveEdition();
    if (!edition) {
      return { success: false, error: "Aucune edition active trouvee." };
    }

    const category = await getCategoryById(parsed.data.categoryId);
    if (!category) {
      return { success: false, error: "Categorie introuvable." };
    }

    await createNominee({
      ...parsed.data,
      categoryName: category.name,
      editionId: edition.id,
    });

    revalidatePath("/admin/nominees");
    revalidatePath("/nomines");
    return { success: true };
  } catch (e) {
    return { success: false, error: `Erreur lors de la creation: ${e instanceof Error ? e.message : "Erreur inconnue"}` };
  }
}

export async function updateNomineeAction(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  try {
    const raw = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      imageUrl: (formData.get("imageUrl") as string) || undefined,
      categoryId: formData.get("categoryId") as string,
    };

    const parsed = nomineeFormSchema.safeParse(raw);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const category = await getCategoryById(parsed.data.categoryId);
    if (!category) {
      return { success: false, error: "Categorie introuvable." };
    }

    await updateNominee(id, {
      ...parsed.data,
      categoryName: category.name,
    });

    revalidatePath("/admin/nominees");
    revalidatePath("/nomines");
    return { success: true };
  } catch (e) {
    return { success: false, error: `Erreur lors de la mise a jour: ${e instanceof Error ? e.message : "Erreur inconnue"}` };
  }
}

export async function deleteNomineeAction(id: string): Promise<ActionResult> {
  try {
    await deleteNominee(id);
    revalidatePath("/admin/nominees");
    revalidatePath("/nomines");
    return { success: true };
  } catch (e) {
    return { success: false, error: `Erreur lors de la suppression: ${e instanceof Error ? e.message : "Erreur inconnue"}` };
  }
}
