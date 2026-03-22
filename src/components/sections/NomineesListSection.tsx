import { getCategoriesFromDB, getNomineesFromDB } from "@/lib/data/queries";
import { NomineesListSectionClient } from "./NomineesListSectionClient";

interface NomineesListSectionProps {
  initialCategory?: string;
}

export async function NomineesListSection({ initialCategory }: NomineesListSectionProps) {
  const [categories, nominees] = await Promise.all([
    getCategoriesFromDB(),
    getNomineesFromDB(),
  ]);

  const serializedCategories = categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    nomineeCount: c.nomineeCount,
  }));

  const serializedNominees = nominees.map((n) => ({
    id: n.id,
    name: n.name,
    categoryId: n.categoryId,
    categoryName: n.categoryName,
    description: n.description,
    imageUrl: n.imageUrl,
  }));

  if (serializedNominees.length === 0) {
    return (
      <section className="bg-lepi-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-muted-foreground">
            Aucun nomine disponible pour le moment. Revenez bientot !
          </p>
        </div>
      </section>
    );
  }

  return (
    <NomineesListSectionClient
      categories={serializedCategories}
      nominees={serializedNominees}
      initialCategory={initialCategory}
    />
  );
}
