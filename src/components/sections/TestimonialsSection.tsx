"use client";

import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/lib/data/homepage";

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <section className="bg-lepi-cream px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold text-lepi-indigo sm:text-4xl">
              Ils en <span className="text-lepi-gold">Parlent</span>
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Temoignages de laureats et partenaires du MPA.
            </p>
          </div>

          {/* Scroll controls (desktop) */}
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-lepi-indigo/20 text-lepi-indigo transition-colors hover:bg-lepi-indigo hover:text-lepi-white"
              aria-label="Precedent"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-lepi-indigo/20 text-lepi-indigo transition-colors hover:bg-lepi-indigo hover:text-lepi-white"
              aria-label="Suivant"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="min-w-[280px] max-w-[320px] flex-shrink-0 snap-start border-lepi-indigo/10 sm:min-w-[300px]"
            >
              <CardContent className="pt-6">
                {/* Quote icon */}
                <svg
                  className="mb-3 h-8 w-8 text-lepi-gold/40"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" />
                </svg>

                <p className="text-sm leading-relaxed text-foreground/80">
                  {testimonial.content}
                </p>

                <div className="mt-4 border-t border-lepi-indigo/10 pt-4">
                  <p className="font-semibold text-lepi-indigo">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
