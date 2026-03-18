import { MousePointerClick, ShieldCheck, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    icon: MousePointerClick,
    badge: "Etape 1",
    title: "Choisissez",
    description:
      "Parcourez les categories et selectionnez votre nomine favori dans chacune d'elles.",
  },
  {
    icon: ShieldCheck,
    badge: "Etape 2",
    title: "Validez",
    description:
      "Confirmez votre identite grace a une verification CAPTCHA pour garantir l'integrite du vote.",
  },
  {
    icon: Smartphone,
    badge: "Etape 3",
    title: "Payez",
    description:
      "Finalisez votre vote avec un paiement symbolique via Orange Money Guinee.",
  },
];

export function VotingHowItWorksSection() {
  return (
    <section className="bg-lepi-white px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-lepi-indigo sm:text-4xl">
            Comment <span className="text-lepi-gold">Voter</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Un processus simple, securise et transparent en 3 etapes.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <Card
              key={step.title}
              className="border-lepi-indigo/10 text-center transition-shadow hover:shadow-lg"
            >
              <CardContent className="pt-8">
                <Badge
                  variant="secondary"
                  className="bg-lepi-indigo/10 text-lepi-indigo"
                >
                  {step.badge}
                </Badge>
                <div className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-full bg-lepi-gold/10">
                  <step.icon className="h-7 w-7 text-lepi-gold" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-lepi-indigo">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weighting explanation */}
        <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-lepi-gold/20 bg-lepi-gold/5 p-6 text-center">
          <p className="font-serif text-lg font-semibold text-lepi-indigo">
            Ponderation du Score Final
          </p>
          <p className="mt-2 text-muted-foreground">
            Le classement final combine le{" "}
            <span className="font-semibold text-lepi-indigo">vote du public (45%)</span>{" "}
            et l&apos;evaluation du{" "}
            <span className="font-semibold text-lepi-indigo">jury independant (55%)</span>{" "}
            pour garantir un resultat equilibre et meritocratique.
          </p>
          <p className="mt-3 font-mono text-sm text-lepi-gold-dark">
            Score Final = (Public × 0.45) + (Jury × 0.55)
          </p>
        </div>
      </div>
    </section>
  );
}
