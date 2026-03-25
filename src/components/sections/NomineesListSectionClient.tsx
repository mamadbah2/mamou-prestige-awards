"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getInitials, getAvatarColor } from "@/lib/utils";
import { VoteButton } from "@/components/voting/VoteButton";
import { CountdownBadge } from "@/components/voting/CountdownBadge";

interface Category {
  id: string;
  name: string;
  slug: string;
  nomineeCount: number;
  votingStartDate: string | null;
  votingEndDate: string | null;
}

interface Nominee {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  description: string;
  imageUrl: string | null;
  voteCount: number;
}

interface NomineesListSectionClientProps {
  categories: Category[];
  nominees: Nominee[];
  initialCategory?: string;
}

export function NomineesListSectionClient({
  categories,
  nominees,
  initialCategory,
}: NomineesListSectionClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    initialCategory
      ? categories.find((c) => c.slug === initialCategory)?.id ?? null
      : null
  );

  const filteredNominees = (
    activeCategory
      ? nominees.filter((n) => n.categoryId === activeCategory)
      : nominees
  ).sort((a, b) => b.voteCount - a.voteCount);

  return (
    <section className="bg-lepi-white px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Category filter bar */}
        <div className="mb-10 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveCategory(null)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === null
                ? "bg-lepi-indigo text-lepi-white"
                : "border border-lepi-indigo/20 text-lepi-indigo hover:bg-lepi-indigo/5"
            }`}
          >
            Toutes ({nominees.length})
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-lepi-indigo text-lepi-white"
                  : "border border-lepi-indigo/20 text-lepi-indigo hover:bg-lepi-indigo/5"
              }`}
            >
              {category.name} ({category.nomineeCount})
            </button>
          ))}
        </div>

        {/* Nominees grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNominees.map((nominee) => {
            const cat = categories.find((c) => c.id === nominee.categoryId);
            const startDate = cat?.votingStartDate ?? null;
            const endDate = cat?.votingEndDate ?? null;
            const now = new Date();
            const hasStarted = !startDate || now >= new Date(startDate);
            const isExpired = !!endDate && now > new Date(endDate);
            const isVotingOpen = hasStarted && !isExpired;

            return (
              <Card
                key={nominee.id}
                className="border-lepi-indigo/10 transition-shadow hover:shadow-lg"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    {nominee.imageUrl ? (
                      <Image
                        src={nominee.imageUrl}
                        alt={nominee.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-lepi-gold/20"
                      />
                    ) : (
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-lepi-white ring-2 ring-lepi-gold/20 ${getAvatarColor(nominee.name)}`}
                      >
                        {getInitials(nominee.name)}
                      </div>
                    )}
                    <div>
                      <CardTitle className="font-serif text-lg text-lepi-indigo">
                        {nominee.name}
                      </CardTitle>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-lepi-gold/10 text-lepi-gold-dark"
                        >
                          {nominee.categoryName}
                        </Badge>
                        <span className="text-xs font-medium text-lepi-indigo/60">
                          {nominee.voteCount} vote{nominee.voteCount !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {nominee.description}
                  </p>
                  <div className="mt-3">
                    <CountdownBadge startDate={startDate} endDate={endDate} />
                  </div>
                  <div className="mt-3 flex gap-3">
                    <Link
                      href={`/nomines/${nominee.id}`}
                      className="flex-1 rounded-md border border-lepi-indigo/20 px-4 py-2 text-center text-sm font-semibold text-lepi-indigo transition-colors hover:bg-lepi-indigo/5"
                    >
                      Voir le profil
                    </Link>
                    <VoteButton
                      nominee={{
                        id: nominee.id,
                        name: nominee.name,
                        categoryId: nominee.categoryId,
                        categoryName: nominee.categoryName,
                        imageUrl: nominee.imageUrl ?? undefined,
                      }}
                      disabled={!isVotingOpen}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredNominees.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">
            Aucun nomine trouve dans cette categorie.
          </p>
        )}
      </div>
    </section>
  );
}
