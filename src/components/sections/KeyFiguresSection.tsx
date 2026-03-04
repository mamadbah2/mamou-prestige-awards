import { LepiPattern } from "@/components/patterns/LepiPattern";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { keyFigures } from "@/lib/data/homepage";

export function KeyFiguresSection() {
  return (
    <section className="relative overflow-hidden bg-lepi-indigo px-4 py-16 sm:py-20">
      <LepiPattern opacity={0.06} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-lepi-white sm:text-4xl">
            MPA en <span className="text-lepi-gold">Chiffres</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lepi-white/70">
            L&apos;impact du Mamou Prestige Award depuis sa creation.
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {keyFigures.map((figure) => (
            <div key={figure.id} className="text-center">
              <p className="font-serif text-4xl font-bold text-lepi-gold sm:text-5xl">
                <AnimatedCounter
                  target={figure.value}
                  suffix={figure.suffix}
                />
              </p>
              <p className="mt-2 text-lg font-semibold text-lepi-white">
                {figure.label}
              </p>
              {figure.description && (
                <p className="mt-1 text-sm text-lepi-white/60">
                  {figure.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
