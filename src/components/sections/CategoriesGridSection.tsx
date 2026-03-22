import Link from "next/link";
import {
  UserCheck,
  Radio,
  Building2,
  HandHeart,
  Briefcase,
  Lightbulb,
  FolderHeart,
  Music,
  BookOpen,
  Camera,
  Disc3,
  PartyPopper,
  Trophy,
  Users,
  Flame,
  Crown,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { categories } from "@/lib/data/categories";
import type { LucideIcon } from "lucide-react";
import { getCategoriesFromDB } from "@/lib/data/queries";

const iconMap: Record<string, LucideIcon> = {
  UserCheck,
  Radio,
  Building2,
  HandHeart,
  Briefcase,
  Lightbulb,
  FolderHeart,
  Music,
  BookOpen,
  Camera,
  Disc3,
  PartyPopper,
  Trophy,
  Users,
  Flame,
  Crown,
  GraduationCap,
};

export async function CategoriesGridSection() {
  const [categories] = await Promise.all([
      getCategoriesFromDB(),
    ]);
  return (
    <section className="bg-lepi-cream px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = iconMap[category.icon];
            return (
              <Card
                key={category.id}
                className="border-lepi-indigo/10 transition-shadow hover:shadow-lg"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    {Icon && (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lepi-gold/10">
                        <Icon className="h-5 w-5 text-lepi-gold" />
                      </div>
                    )}
                    <CardTitle className="font-serif text-lg text-lepi-indigo">
                      {category.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="bg-lepi-indigo/10 text-lepi-indigo"
                    >
                      {category.nomineeCount} nominés
                    </Badge>
                    <Link
                      href={`/nomines?categorie=${category.slug}`}
                      className="text-sm font-semibold text-lepi-gold transition-colors hover:text-lepi-gold-dark"
                    >
                      Voir les nominés →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
