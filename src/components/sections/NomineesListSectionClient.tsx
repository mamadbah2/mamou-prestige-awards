"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getInitials, getAvatarColor } from "@/lib/utils";
import { VoteButton } from "@/components/voting/VoteButton";

interface Category {
  id: string;
  name: string;
  slug: string;
  nomineeCount: number;
}

interface Nominee {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  description: string;
  imageUrl: string | null;
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

  const filteredNominees = activeCategory
    ? nominees.filter((n) => n.categoryId === activeCategory)
    : nominees;

  return (
    <section className="bg-lepi-white px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Category filter bar */}
        <div className="mb-10 flex gap-2 overflow-x-auto pb-2">
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
          {categories.map((category) => {
            const count = nominees.filter((n) => n.categoryId === category.id).length;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-lepi-indigo text-lepi-white"
                    : "border border-lepi-indigo/20 text-lepi-indigo hover:bg-lepi-indigo/5"
                }`}
              >
                {category.name} ({count})
              </button>
            );
          })}
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
                    <Badge
                      variant="secondary"
                      className="mt-1 bg-lepi-gold/10 text-lepi-gold-dark"
                    >
                      {nominee.categoryName}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {nominee.description}
                </p>
                <div className="mt-4 flex gap-3">
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
