"use client";

import { useState } from "react";
import { Trophy, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { editionResults } from "@/lib/data/results";

export function ResultsSection() {
  const [activeEdition, setActiveEdition] = useState(2026);

  const currentResult = editionResults.find((r) => r.edition === activeEdition);

  return (
    <section className="bg-lepi-cream px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Edition tabs */}
        <div className="mb-10 flex justify-center gap-3">
          {editionResults.map((result) => (
            <button
              key={result.edition}
              onClick={() => setActiveEdition(result.edition)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                activeEdition === result.edition
                  ? "bg-lepi-indigo text-lepi-white"
                  : "border border-lepi-indigo/20 text-lepi-indigo hover:bg-lepi-indigo/5"
              }`}
            >
              Edition {result.edition}
              {result.status === "ongoing" && (
                <span className="ml-2 inline-block h-2 w-2 animate-pulse rounded-full bg-lepi-gold" />
              )}
            </button>
          ))}
        </div>

        {/* Ongoing edition banner */}
        {currentResult?.status === "ongoing" && (
          <div className="mx-auto max-w-2xl">
            <Card className="border-lepi-gold/30 bg-lepi-white">
              <CardContent className="py-10 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-lepi-gold/10">
                  <Calendar className="h-8 w-8 text-lepi-gold" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-lepi-indigo">
                  Edition 2026 — En Cours
                </h3>
                <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                  Les resultats de l&apos;edition 2026 seront annonces lors de la
                  Grande Ceremonie prevue le{" "}
                  <span className="font-semibold text-lepi-gold">
                    15 Aout 2026
                  </span>{" "}
                  a Mamou.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-lepi-gold/30 bg-lepi-gold/10 px-4 py-1.5">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-lepi-gold" />
                  <span className="text-sm font-semibold text-lepi-gold">
                    Nominations et votes en cours
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Completed edition results */}
        {currentResult?.status === "completed" && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentResult.categories.map((cat) => (
              <Card
                key={cat.categoryId}
                className="border-lepi-indigo/10 transition-shadow hover:shadow-lg"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="font-serif text-lg text-lepi-indigo">
                    {cat.categoryName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Winner */}
                  {cat.winner && (
                    <div className="rounded-lg bg-lepi-gold/5 p-3">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-lepi-gold" />
                        <Badge className="bg-lepi-gold text-lepi-indigo">
                          Laureat
                        </Badge>
                      </div>
                      <p className="mt-2 font-serif font-semibold text-lepi-indigo">
                        {cat.winner.name}
                      </p>
                      <div className="mt-1 text-xs text-muted-foreground">
                        <span>Public : {cat.winner.publicScorePercent}%</span>
                        {" | "}
                        <span>Jury : {cat.winner.juryScorePercent}%</span>
                        {" | "}
                        <span className="font-semibold text-lepi-gold-dark">
                          Final : {cat.winner.finalScore}%
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
