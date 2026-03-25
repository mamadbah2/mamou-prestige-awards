import { getCategoriesFromDB, getNomineesFromDB } from "@/lib/data/queries";
import { getVoteCountsByCategory } from "@/lib/services/vote";
import { NomineesListSectionClient } from "./NomineesListSectionClient";

interface NomineesListSectionProps {
  initialCategory?: string;
}

export async function NomineesListSection({ initialCategory }: NomineesListSectionProps) {
  const [categories, nominees, voteCounts] = await Promise.all([
    getCategoriesFromDB(),
    getNomineesFromDB(),
    getVoteCountsByCategory(),
  ]);

  // Build a map of nomineeId → totalVotes
  const voteCountMap = new Map<string, number>();
  for (const category of voteCounts) {
    for (const nominee of category.nominees) {
      voteCountMap.set(nominee.nomineeId, nominee.totalVotes);
    }
  }

  const serializedCategories = categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    nomineeCount: c.nomineeCount,
    votingStartDate: c.votingStartDate?.toISOString() ?? null,
    votingEndDate: c.votingEndDate?.toISOString() ?? null,
  }));

  const serializedNominees = nominees
    .map((n) => ({
      id: n.id,
      name: n.name,
      categoryId: n.categoryId,
      categoryName: n.categoryName,
      description: n.description,
      imageUrl: n.imageUrl,
      voteCount: voteCountMap.get(n.id) ?? 0,
    }))
    .sort((a, b) => b.voteCount - a.voteCount);

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
