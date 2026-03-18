import Link from "next/link";
import { Clock } from "lucide-react";

export function VotingComingSoonSection() {
  return (
    <section className="bg-lepi-cream px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-lepi-gold/10">
          <Clock className="h-10 w-10 text-lepi-gold" />
        </div>

        <h2 className="font-serif text-3xl font-bold text-lepi-indigo">
          Bientot Disponible
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Le vote public pour l&apos;edition 2026 ouvrira le{" "}
          <span className="font-semibold text-lepi-gold">1er Juin 2026</span>.
          En attendant, decouvrez les categories et les nomines de cette annee.
        </p>

        <div className="mt-6">
          <button
            disabled
            className="cursor-not-allowed rounded-md bg-lepi-gold/30 px-8 py-3 text-base font-bold text-lepi-indigo/50"
          >
            Voter Maintenant
          </button>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/categories"
            className="rounded-md border border-lepi-indigo/20 px-6 py-2.5 text-sm font-semibold text-lepi-indigo transition-colors hover:bg-lepi-indigo/5"
          >
            Explorer les Categories
          </Link>
          <Link
            href="/nomines"
            className="rounded-md border border-lepi-indigo/20 px-6 py-2.5 text-sm font-semibold text-lepi-indigo transition-colors hover:bg-lepi-indigo/5"
          >
            Voir les Nomines
          </Link>
        </div>
      </div>
    </section>
  );
}
