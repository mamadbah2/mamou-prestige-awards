import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { events } from "@/lib/data/homepage";

export function EventsSection() {
  return (
    <section className="bg-lepi-cream px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-lepi-indigo sm:text-4xl">
            Evenements <span className="text-lepi-gold">a Venir</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Retrouvez les dates cles de l&apos;edition 2026 du Mamou Prestige Award.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event, index) => (
            <Card
              key={event.id}
              className="border-lepi-indigo/10 transition-shadow hover:shadow-lg"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="bg-lepi-indigo/10 text-lepi-indigo"
                  >
                    Etape {index + 1}
                  </Badge>
                </div>
                <CardTitle className="font-serif text-lg text-lepi-indigo">
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {event.description}
                </p>
                <div className="mt-4 space-y-1 text-sm">
                  <p className="font-semibold text-lepi-gold">{event.date}</p>
                  <p className="text-muted-foreground">{event.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
