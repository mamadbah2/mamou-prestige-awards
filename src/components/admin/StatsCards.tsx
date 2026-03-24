import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Vote, Users, FolderOpen } from "lucide-react";

interface StatsCardsProps {
  totalVotes: number;
  revenue: number;
  totalNominees: number;
  totalCategories: number;
}

const formatGNF = (amount: number) =>
  new Intl.NumberFormat("fr-GN").format(amount) + " GNF";

export function StatsCards({
  totalVotes,
  revenue,
  totalNominees,
  totalCategories,
}: StatsCardsProps) {
  const cards = [
    {
      title: "Revenu total",
      value: formatGNF(revenue),
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Votes totaux",
      value: totalVotes.toLocaleString("fr-FR"),
      icon: Vote,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Nomines",
      value: totalNominees.toString(),
      icon: Users,
      color: "text-lepi-gold-dark",
      bg: "bg-amber-50",
    },
    {
      title: "Categories",
      value: totalCategories.toString(),
      icon: FolderOpen,
      color: "text-lepi-indigo",
      bg: "bg-indigo-50",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <div className={`rounded-lg p-2 ${card.bg}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
