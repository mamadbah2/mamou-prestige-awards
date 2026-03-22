import {
  Award,
  Shield,
  Medal,
  Handshake,
  Lightbulb,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LepiPattern } from "@/components/patterns/LepiPattern";

interface Value {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

const values: Value[] = [
  { icon: Award, title: "EXCELLENCE", subtitle: "Récompenser le meilleur" },
  { icon: Shield, title: "INTÉGRITÉ", subtitle: "Transparence & équité" },
  { icon: Medal, title: "RECONNAISSANCE", subtitle: "Valoriser les talents méritants" },
  { icon: Handshake, title: "ENGAGEMENT", subtitle: "Servir le développement de Mamou" },
  { icon: Lightbulb, title: "INNOVATION", subtitle: "Encourager la créativité et l'initiative" },
  { icon: Users, title: "UNITÉ", subtitle: "Fierté locale & solidarité" },
];

export function ValuesSection() {
  return (
    <section className="relative overflow-hidden bg-lepi-indigo px-4 py-16 sm:py-20">
      <LepiPattern color="#c5a028" opacity={0.04} patternId="lepi-values" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold tracking-[0.3em] text-lepi-gold">
            CE QUI NOUS GUIDE
          </p>
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            NOS <span className="text-lepi-gold">VALEURS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="rounded-xl border border-lepi-gold/20 bg-white/5 p-6 backdrop-blur-sm"
              >
                <Icon className="mb-3 h-8 w-8 text-lepi-gold" />
                <h3 className="mb-1 text-base font-bold tracking-wider text-white">
                  {value.title}
                </h3>
                <p className="text-sm text-white/60">{value.subtitle}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs font-semibold tracking-[0.25em] text-lepi-gold/80">
          CÉLÉBRER LE MÉRITE • VALORISER L&apos;IMPACT
        </p>
      </div>
    </section>
  );
}
