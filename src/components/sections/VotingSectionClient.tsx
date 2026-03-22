"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VoteButton } from "@/components/voting/VoteButton";
import { getInitials, getAvatarColor } from "@/lib/utils";

interface CategoryData {
  id: string;
  name: string;
  slug: string;
  nomineeCount: number;
}

interface NomineeData {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  description: string;
  imageUrl: string | null;
  voteCount: number;
}

interface VotingSectionClientProps {
  categories: CategoryData[];
  nominees: NomineeData[];
}

export function VotingSectionClient({
  categories,
  nominees,
}: VotingSectionClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredNominees = (
    activeCategory
      ? nominees.filter((n) => n.categoryId === activeCategory)
      : nominees
  ).sort((a, b) => b.voteCount - a.voteCount);

  return (
    <section className="bg-lepi-cream px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold text-lepi-indigo sm:text-4xl">
            Votez pour vos <span className="text-lepi-gold">Favoris</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Selectionnez une categorie puis cliquez sur &quot;Voter&quot; pour
            soutenir votre nomine.
          </p>
        </div>

        {/* Category filter bar — scrollable on mobile */}
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
          {filteredNominees.map((nominee) => (
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
                <div className="mt-4">
                  <VoteButton
                    nominee={{
                      id: nominee.id,
                      name: nominee.name,
                      categoryId: nominee.categoryId,
                      categoryName: nominee.categoryName,
                      imageUrl: nominee.imageUrl ?? undefined,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
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
