import { Award, Heart, Shield, Star } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "Reconnaitre et celebrer les accomplissements exceptionnels.",
  },
  {
    icon: Shield,
    title: "Integrite",
    description: "Un processus de selection transparent et equitable.",
  },
  {
    icon: Heart,
    title: "Communaute",
    description: "Renforcer la cohesion et la fierte locale.",
  },
  {
    icon: Star,
    title: "Inspiration",
    description: "Motiver les generations futures par l'exemple.",
  },
];

export function MissionSection() {
  return (
    <section className="bg-lepi-white px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Mission text */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-lepi-indigo sm:text-4xl">
              Notre <span className="text-lepi-gold">Mission</span>
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Le Mamou Prestige Award (MPA) est ne de la volonte de celebrer
                les femmes et les hommes qui, par leur engagement et leur
                talent, contribuent au rayonnement de la prefecture de Mamou.
              </p>
              <p>
                Chaque edition met en lumiere des parcours exceptionnels dans
                des domaines aussi divers que l&apos;education, la sante,
                l&apos;entrepreneuriat, la culture ou encore l&apos;innovation
                technologique.
              </p>
              <p>
                Au-dela de la ceremonie, le MPA vise a creer un ecosysteme de
                reconnaissance qui inspire la communaute et encourage
                l&apos;excellence au quotidien.
              </p>
            </div>
          </div>

          {/* Right: Values grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-lepi-indigo/10 bg-lepi-cream p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lepi-gold/10">
                  <value.icon className="h-5 w-5 text-lepi-gold" />
                </div>
                <h3 className="mt-3 font-serif font-semibold text-lepi-indigo">
                  {value.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
