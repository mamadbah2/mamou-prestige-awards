import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { NomineesListSection } from "@/components/sections/NomineesListSection";

export const metadata: Metadata = {
  title: "Nomines | Mamou Prestige Award 2026",
  description:
    "Decouvrez les candidats en lice pour le Mamou Prestige Award 2026 dans chaque categorie.",
};

export default async function NominesPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const params = await searchParams;

  return (
    <main>
      <PageHeader
        title="Nos"
        highlightedWord="Nomines"
        description="Les candidats en lice pour le Mamou Prestige Award 2026."
      />
      <NomineesListSection initialCategory={params.categorie} />
    </main>
  );
}
