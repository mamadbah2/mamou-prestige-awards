import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { MissionSection } from "@/components/sections/MissionSection";
import { HistorySection } from "@/components/sections/HistorySection";
import { TeamSection } from "@/components/sections/TeamSection";
import { FaqSection } from "@/components/sections/FaqSection";

export const metadata: Metadata = {
  title: "A Propos | Mamou Prestige Award 2026",
  description:
    "Decouvrez la mission, l'histoire et l'equipe du Mamou Prestige Award.",
};

export default function AProposPage() {
  return (
    <main>
      <PageHeader
        title="A"
        highlightedWord="Propos"
        description="Decouvrez la mission et l'histoire du Mamou Prestige Award."
      />
      <MissionSection />
      <HistorySection />
      <TeamSection />
      <FaqSection />
    </main>
  );
}
