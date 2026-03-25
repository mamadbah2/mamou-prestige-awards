"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getInitials, getAvatarColor } from "@/lib/utils";
import { VoteButton } from "@/components/voting/VoteButton";
import { useCountdown } from "@/hooks/useCountdown";
import { Clock, Lock, Timer } from "lucide-react";

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

function CategoryCountdown({
  startDate,
  endDate,
}: {
  startDate: string | null;
  endDate: string | null;
}) {
  const { days, hours, minutes, seconds, isExpired, hasStarted } = useCountdown(
    startDate,
    endDate
  );

  if (!startDate && !endDate) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
        <Lock className="h-4 w-4 text-gray-400" />
        <span className="text-sm font-medium text-gray-500">
          Dates de vote non configurees
        </span>
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
        <Clock className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-500">
          Le vote n&apos;a pas encore commence
        </span>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
        <Lock className="h-4 w-4 text-gray-400" />
        <span className="text-sm font-medium text-gray-400">
          Le vote est termine pour cette categorie
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 rounded-xl border border-lepi-indigo/15 bg-lepi-indigo/5 px-4 py-3">
      <Timer className="h-4 w-4 text-lepi-indigo" />
      <span className="text-sm font-medium text-lepi-indigo">
        Fermeture dans
      </span>
      <div className="flex gap-2">
        {days > 0 && (
          <span className="rounded-md bg-lepi-indigo px-2 py-1 text-xs font-bold tabular-nums text-lepi-white">
            {days}j
          </span>
        )}
        <span className="rounded-md bg-lepi-indigo px-2 py-1 text-xs font-bold tabular-nums text-lepi-white">
          {String(hours).padStart(2, "0")}h
        </span>
        <span className="rounded-md bg-lepi-indigo px-2 py-1 text-xs font-bold tabular-nums text-lepi-white">
          {String(minutes).padStart(2, "0")}m
        </span>
        <span className="rounded-md bg-lepi-indigo px-2 py-1 text-xs font-bold tabular-nums text-lepi-white">
          {String(seconds).padStart(2, "0")}s
        </span>
      </div>
    </div>
  );
}

function useIsVotingOpen(category: Category | undefined): boolean {
  const { isExpired, hasStarted } = useCountdown(
    category?.votingStartDate ?? null,
    category?.votingEndDate ?? null
  );

  if (!category) return false;
  if (!category.votingStartDate && !category.votingEndDate) return false;
  return hasStarted && !isExpired;
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

  const activeCat = activeCategory
    ? categories.find((c) => c.id === activeCategory)
    : undefined;

  const isVotingOpen = useIsVotingOpen(activeCat);

  const filteredNominees = (
    activeCategory
      ? nominees.filter((n) => n.categoryId === activeCategory)
      : nominees
  ).sort((a, b) => b.voteCount - a.voteCount);

  return (
    <section className="bg-lepi-white px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Category filter bar */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
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

        {/* Single countdown for the active category */}
        {activeCat && (
          <div className="mb-8">
            <CategoryCountdown
              startDate={activeCat.votingStartDate}
              endDate={activeCat.votingEndDate}
            />
          </div>
        )}

        {/* Nominees grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNominees.map((nominee) => {
            // When viewing "Toutes", determine voting status per nominee's category
            const nomineeCat = activeCategory
              ? activeCat
              : categories.find((c) => c.id === nominee.categoryId);
            const hasVotingDates =
              !!nomineeCat?.votingStartDate || !!nomineeCat?.votingEndDate;
            const now = new Date();
            const hasStarted =
              !nomineeCat?.votingStartDate ||
              now >= new Date(nomineeCat.votingStartDate);
            const isExpiredNominee =
              !!nomineeCat?.votingEndDate &&
              now > new Date(nomineeCat.votingEndDate);
            const canVote = activeCategory
              ? isVotingOpen
              : hasVotingDates && hasStarted && !isExpiredNominee;

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
                      disabled={!canVote}
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
