import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LepiPattern } from "@/components/patterns/LepiPattern";
import {
  getNomineesFromDB,
  getNomineeByIdFromDB,
  getNomineesByCategoryFromDB,
} from "@/lib/data/queries";
import { getInitials, getAvatarColor } from "@/lib/utils";

interface NomineePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NomineePageProps): Promise<Metadata> {
  const { id } = await params;
  const nominee = await getNomineeByIdFromDB(id);
  if (!nominee) return { title: "Nomine introuvable | MPA 2026" };
  return {
    title: `${nominee.name} — ${nominee.categoryName} | MPA 2026`,
    description: nominee.description,
  };
}

export async function generateStaticParams() {
  const nominees = await getNomineesFromDB();
  return nominees.map((n) => ({ id: n.id }));
}

export default async function NomineeDetailPage({ params }: NomineePageProps) {
  const { id } = await params;
  const nominee = await getNomineeByIdFromDB(id);

  if (!nominee) notFound();

  const category = nominee.category;
  const otherNominees = (await getNomineesByCategoryFromDB(nominee.categoryId)).filter(
    (n) => n.id !== nominee.id
  );

  return (
    <main>
      {/* Hero header */}
      <section className="relative overflow-hidden bg-lepi-indigo px-4 pb-24 pt-16 sm:pt-20">
        <LepiPattern opacity={0.06} patternId="lepi-nominee-detail" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <Link
            href="/nomines"
            className="mb-8 inline-flex items-center gap-2 text-sm text-lepi-white/70 transition-colors hover:text-lepi-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux nomines
          </Link>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
            {/* Avatar */}
            {nominee.imageUrl ? (
              <Image
                src={nominee.imageUrl}
                alt={nominee.name}
                width={128}
                height={128}
                className="h-32 w-32 shrink-0 rounded-full object-cover ring-4 ring-lepi-gold/30 shadow-xl"
              />
            ) : (
              <div
                className={`flex h-32 w-32 shrink-0 items-center justify-center rounded-full text-3xl font-bold text-lepi-white ring-4 ring-lepi-gold/30 shadow-xl ${getAvatarColor(nominee.name)}`}
              >
                {getInitials(nominee.name)}
              </div>
            )}

            <div className="text-center sm:text-left">
              <Badge className="bg-lepi-gold/20 text-lepi-gold">
                {nominee.categoryName}
              </Badge>
              <h1 className="mt-3 font-serif text-3xl font-bold text-lepi-white sm:text-4xl">
                {nominee.name}
              </h1>
              <p className="mt-2 text-sm text-lepi-white/60">
                Edition 2026 — {category?.name}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-lepi-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-bold text-lepi-indigo">
                A propos
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {nominee.description}
              </p>

              <div className="mt-8">
                <Link
                  href="/voter"
                  className="inline-block rounded-md bg-lepi-gold px-8 py-3 text-base font-bold text-lepi-indigo transition-colors hover:bg-lepi-gold-dark"
                >
                  Voter pour {nominee.name}
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Category info */}
              <div className="rounded-xl border border-lepi-indigo/10 bg-lepi-cream p-5">
                <h3 className="font-serif font-semibold text-lepi-indigo">
                  Categorie
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {category?.description}
                </p>
                <Link
                  href={`/nomines?categorie=${category?.slug}`}
                  className="mt-3 inline-block text-sm font-semibold text-lepi-gold transition-colors hover:text-lepi-gold-dark"
                >
                  Voir tous les nomines de cette categorie →
                </Link>
              </div>

              {/* Other nominees in same category */}
              {otherNominees.length > 0 && (
                <div className="rounded-xl border border-lepi-indigo/10 bg-lepi-cream p-5">
                  <h3 className="font-serif font-semibold text-lepi-indigo">
                    Autres nomines
                  </h3>
                  <div className="mt-3 space-y-3">
                    {otherNominees.map((other) => (
                      <Link
                        key={other.id}
                        href={`/nomines/${other.id}`}
                        className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-lepi-white"
                      >
                        {other.imageUrl ? (
                          <Image
                            src={other.imageUrl}
                            alt={other.name}
                            width={36}
                            height={36}
                            className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-lepi-gold/20"
                          />
                        ) : (
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-lepi-white ring-1 ring-lepi-gold/20 ${getAvatarColor(other.name)}`}
                          >
                            {getInitials(other.name)}
                          </div>
                        )}
                        <span className="text-sm font-medium text-lepi-indigo">
                          {other.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
