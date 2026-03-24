import { getAllNominees, getAllCategories } from "@/lib/data/admin-queries";
import { deleteNomineeAction } from "@/lib/actions/admin";
import { NomineeForm } from "@/components/admin/NomineeForm";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function AdminNomineesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const categoryFilter = params.category;

  const [nominees, categories] = await Promise.all([
    getAllNominees(categoryFilter),
    getAllCategories(),
  ]);

  const categoryList = categories.map((c) => ({ id: c.id, name: c.name }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-bold text-lepi-indigo">
          Nomines
        </h1>
        <NomineeForm
          categories={categoryList}
          trigger={
            <Button className="bg-lepi-indigo hover:bg-lepi-indigo-light">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau nomine
            </Button>
          }
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <Link href="/admin/nominees">
          <Button
            variant={!categoryFilter ? "default" : "outline"}
            size="sm"
            className={!categoryFilter ? "bg-lepi-indigo hover:bg-lepi-indigo-light" : ""}
          >
            Toutes
          </Button>
        </Link>
        {categories.map((cat) => (
          <Link key={cat.id} href={`/admin/nominees?category=${cat.id}`}>
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
            {nominees.length} nomine{nominees.length !== 1 ? "s" : ""}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Categorie</TableHead>
                  <TableHead className="text-center">Votes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nominees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      Aucun nomine
                    </TableCell>
                  </TableRow>
                ) : (
                  nominees.map((nominee) => (
                    <TableRow key={nominee.id}>
                      <TableCell className="font-medium">
                        {nominee.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {nominee.category.name}
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {nominee._count.votes}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <NomineeForm
                            nominee={nominee}
                            categories={categoryList}
                            trigger={
                              <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            }
                          />
                          <form
                            action={async () => {
                              "use server";
                              await deleteNomineeAction(nominee.id);
                            }}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              type="submit"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </form>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
