import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { NomineesListSection } from "@/components/sections/NomineesListSection";
import { VotingHowItWorksSection } from "@/components/sections/VotingHowItWorksSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nomines | Mamou Prestige Award 2026",
  description:
    "Decouvrez les candidats en lice pour le Mamou Prestige Award 2026 et votez pour vos favoris.",
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
        description="Decouvrez les candidats et votez pour vos favoris."
      />
      <NomineesListSection initialCategory={params.categorie} />
      <VotingHowItWorksSection />
    </main>
  );
}
