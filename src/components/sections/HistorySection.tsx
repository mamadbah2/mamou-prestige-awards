import { LepiPattern } from "@/components/patterns/LepiPattern";
import { mpaHistory } from "@/lib/data/about";

export function HistorySection() {
  return (
    <section className="relative overflow-hidden bg-lepi-indigo px-4 py-16 sm:py-20">
      <LepiPattern opacity={0.06} patternId="lepi-history" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-lepi-white sm:text-4xl">
            Notre <span className="text-lepi-gold">Histoire</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lepi-white/70">
            Le parcours du Mamou Prestige Award depuis sa creation.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <div className="relative border-l-2 border-lepi-gold/30 pl-8">
            {mpaHistory.map((item, index) => (
              <div
                key={item.year}
                className={`relative ${index !== mpaHistory.length - 1 ? "pb-10" : ""}`}
              >
                {/* Dot on the line */}
                <div className="absolute -left-[calc(2rem+5px)] top-0 flex h-3 w-3 items-center justify-center rounded-full bg-lepi-gold" />
                <span className="font-serif text-2xl font-bold text-lepi-gold">
                  {item.year}
                </span>
                <p className="mt-2 text-lepi-white/80">{item.milestone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
