import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { CategoriesGridSection } from "@/components/sections/CategoriesGridSection";

export const metadata: Metadata = {
  title: "Categories | Mamou Prestige Award 2026",
  description:
    "Decouvrez les 10 categories d'excellence recompensees par le Mamou Prestige Award 2026.",
};

export default function CategoriesPage() {
  return (
    <main>
      <PageHeader
        title="Nos"
        highlightedWord="Categories"
        description="Decouvrez les domaines d'excellence recompenses par le Mamou Prestige Award."
      />
      <CategoriesGridSection />
    </main>
  );
}
