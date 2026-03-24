import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { ResultsSection } from "@/components/sections/ResultsSection";

export const metadata: Metadata = {
  title: "Resultats | Mamou Prestige Award 2026",
  description:
    "Retrouvez les laureats de chaque edition du Mamou Prestige Award.",
};

export default function ResultatsPage() {
  return (
    <main>
      <PageHeader
        title="Les"
        highlightedWord="Resultats"
        description="Retrouvez les laureats de chaque edition du Mamou Prestige Award."
      />
      <ResultsSection />
    </main>
  );
}
