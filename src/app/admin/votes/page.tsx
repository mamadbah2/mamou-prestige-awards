import { getAllVotes, getAllCategories } from "@/lib/data/admin-queries";
import { VOTE_PRICE } from "@/lib/services/payment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function AdminVotesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page ?? "1", 10);
  const categoryFilter = params.category;

  const [result, categories] = await Promise.all([
    getAllVotes({ page, categoryId: categoryFilter }),
    getAllCategories(),
  ]);

  const formatDate = (d: Date) =>
    new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);

  const formatGNF = (n: number) =>
    new Intl.NumberFormat("fr-GN").format(n) + " GNF";

  function buildUrl(overrides: Record<string, string | undefined>) {
    const p = new URLSearchParams();
    if (overrides.page) p.set("page", overrides.page);
    else if (params.page) p.set("page", params.page);
    if (overrides.category !== undefined) {
      if (overrides.category) p.set("category", overrides.category);
    } else if (categoryFilter) {
      p.set("category", categoryFilter);
    }
    const qs = p.toString();
    return `/admin/votes${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-lepi-indigo">
        Suivi des votes
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Link href={buildUrl({ category: undefined, page: "1" })}>
          <Button
            variant={!categoryFilter ? "default" : "outline"}
            size="sm"
            className={!categoryFilter ? "bg-lepi-indigo hover:bg-lepi-indigo-light" : ""}
          >
            Toutes les categories
          </Button>
        </Link>
        {categories.map((cat) => (
          <Link key={cat.id} href={buildUrl({ category: cat.id, page: "1" })}>
            <Button
              variant={categoryFilter === cat.id ? "default" : "outline"}
              size="sm"
              className={categoryFilter === cat.id ? "bg-lepi-indigo hover:bg-lepi-indigo-light" : ""}
            >
              {cat.name}
            </Button>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {result.total} vote{result.total !== 1 ? "s" : ""} au total
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nomine</TableHead>
                  <TableHead>Categorie</TableHead>
                  <TableHead>Telephone</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Ref. transaction</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.votes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      Aucun vote enregistre
                    </TableCell>
                  </TableRow>
                ) : (
                  result.votes.map((vote) => (
                    <TableRow key={vote.id}>
                      <TableCell className="font-medium">
                        {vote.nominee.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {vote.nominee.category.name}
                      </TableCell>
                      <TableCell>{vote.voterIdentifier}</TableCell>
                      <TableCell>{formatGNF(vote.score * VOTE_PRICE)}</TableCell>
                      <TableCell className="font-mono text-xs">
                        {vote.transactionRef ?? "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={vote.verified ? "default" : "secondary"}>
                          {vote.verified ? "Verifie" : "En attente"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatDate(vote.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {result.totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Page {result.page} sur {result.totalPages}
              </p>
              <div className="flex gap-2">
                {result.page > 1 && (
                  <Link href={buildUrl({ page: String(result.page - 1) })}>
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="mr-1 h-4 w-4" />
                      Precedent
                    </Button>
                  </Link>
                )}
                {result.page < result.totalPages && (
                  <Link href={buildUrl({ page: String(result.page + 1) })}>
                    <Button variant="outline" size="sm">
                      Suivant
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
