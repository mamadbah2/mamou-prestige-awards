import Link from "next/link";
import Image from "next/image";
import { LepiPattern } from "@/components/patterns/LepiPattern";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-lepi-indigo px-4 py-20 text-center sm:min-h-screen">
      <LepiPattern opacity={0.08} />

      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6">
        <Image
          src="/logo-mpa.PNG"
          alt="Logo Mamou Prestige Award"
          width={120}
          height={120}
          className="rounded-full shadow-2xl"
          priority
        />

        <h1 className="font-serif text-4xl font-bold leading-tight text-lepi-white sm:text-5xl md:text-6xl">
          Mamou Prestige{" "}
          <span className="text-lepi-gold">Award</span>
        </h1>

        <p className="text-lg leading-relaxed text-lepi-white/80 sm:text-xl">
          La ceremonie qui celebre l&apos;excellence et le merite
          dans la prefecture de Mamou
        </p>

        <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-lepi-gold/30 bg-lepi-gold/10 px-4 py-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-lepi-gold" />
          <span className="text-sm font-semibold text-lepi-gold">
            Edition 2026
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/voter"
            className="rounded-md bg-lepi-gold px-8 py-3 text-base font-bold text-lepi-indigo transition-colors hover:bg-lepi-gold-light"
          >
            Voter Maintenant
          </Link>
          <Link
            href="/categories"
            className="rounded-md border border-lepi-white/30 px-8 py-3 text-base font-medium text-lepi-white transition-colors hover:border-lepi-white hover:bg-lepi-white/10"
          >
            Decouvrir les Categories
          </Link>
        </div>
      </div>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-lepi-white to-transparent" />
    </section>
  );
}
