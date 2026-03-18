"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/lib/data/about";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggleItem(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section className="bg-lepi-white px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-lepi-indigo sm:text-4xl">
            Questions <span className="text-lepi-gold">Frequentes</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Tout ce que vous devez savoir sur le Mamou Prestige Award.
          </p>
        </div>

        <div className="mt-10 divide-y divide-lepi-indigo/10">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id}>
                <button
                  onClick={() => toggleItem(item.id)}
                  className="flex w-full items-center justify-between py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 font-medium text-lepi-indigo">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-lepi-indigo/50 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? "max-h-96 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
