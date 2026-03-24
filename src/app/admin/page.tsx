import { StatsCards } from "@/components/admin/StatsCards";
import { getAdminStats, getRecentVotes, getTopNominees } from "@/lib/data/admin-queries";
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

export default async function AdminDashboardPage() {
  const [stats, recentVotes, topNominees] = await Promise.all([
    getAdminStats(),
    getRecentVotes(20),
    getTopNominees(5),
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-lepi-indigo">
        Tableau de bord
      </h1>

      <StatsCards
        totalVotes={stats.totalVotes}
        revenue={stats.revenue}
        totalNominees={stats.totalNominees}
        totalCategories={stats.totalCategories}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Votes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Derniers votes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nomine</TableHead>
                    <TableHead>Telephone</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Ref. transaction</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentVotes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        Aucun vote enregistre
                      </TableCell>
                    </TableRow>
                  ) : (
                    recentVotes.map((vote) => (
                      <TableRow key={vote.id}>
                        <TableCell className="font-medium">
                          {vote.nominee.name}
                        </TableCell>
                        <TableCell>{vote.voterIdentifier}</TableCell>
                        <TableCell>{formatGNF(vote.score * VOTE_PRICE)}</TableCell>
                        <TableCell className="font-mono text-xs">
                          {vote.transactionRef ?? "—"}
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDate(vote.createdAt)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={vote.verified ? "default" : "secondary"}>
                            {vote.verified ? "Verifie" : "En attente"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Top Nominees */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top 5 nomines</CardTitle>
          </CardHeader>
          <CardContent>
            {topNominees.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucun vote enregistre</p>
            ) : (
              <div className="space-y-4">
                {topNominees.map((nominee, i) => (
                  <div key={nominee.id} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lepi-indigo text-sm font-bold text-lepi-white">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-sm">{nominee.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {nominee.categoryName}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-lepi-indigo">
                      {nominee.voteCount}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
