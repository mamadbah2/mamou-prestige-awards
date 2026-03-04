import { partners } from "@/lib/data/homepage";

export function PartnersSection() {
  return (
    <section className="bg-lepi-white px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-lepi-indigo sm:text-4xl">
            Nos <span className="text-lepi-gold">Partenaires</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Ils soutiennent l&apos;excellence a Mamou.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex h-24 items-center justify-center rounded-lg border border-lepi-indigo/10 bg-lepi-cream/50 px-4 transition-colors hover:border-lepi-gold/30"
            >
              <span className="text-center text-sm font-medium text-lepi-indigo/70">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
