import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { VotingComingSoonSection } from "@/components/sections/VotingComingSoonSection";
import { VotingHowItWorksSection } from "@/components/sections/VotingHowItWorksSection";

export const metadata: Metadata = {
  title: "Voter | Mamou Prestige Award 2026",
  description:
    "Votez pour vos favoris au Mamou Prestige Award 2026 via notre plateforme securisee.",
};

export default function VoterPage() {
  return (
    <main>
      <PageHeader
        title="Votez pour vos"
        highlightedWord="Favoris"
        description="Soutenez les nomines qui incarnent l'excellence a Mamou."
      />
      <VotingComingSoonSection />
      <VotingHowItWorksSection />
    </main>
  );
}
