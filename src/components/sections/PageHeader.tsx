import { LepiPattern } from "@/components/patterns/LepiPattern";

interface PageHeaderProps {
  title: string;
  highlightedWord: string;
  description: string;
}

export function PageHeader({ title, highlightedWord, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-lepi-indigo px-4 py-16 sm:py-20">
      <LepiPattern opacity={0.06} patternId="lepi-page-header" />
      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <h1 className="font-serif text-3xl font-bold text-lepi-white sm:text-4xl md:text-5xl">
          {title} <span className="text-lepi-gold">{highlightedWord}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-lepi-white/80">
          {description}
        </p>
      </div>
    </section>
  );
}
