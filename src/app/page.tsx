import { HeroSection } from "@/components/sections/HeroSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { KeyFiguresSection } from "@/components/sections/KeyFiguresSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <EventsSection />
      <KeyFiguresSection />
      <PartnersSection />
      <TestimonialsSection />
    </main>
  );
}
