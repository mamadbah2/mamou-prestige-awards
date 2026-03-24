import { getAllCategories } from "@/lib/data/admin-queries";
import { deleteCategoryAction } from "@/lib/actions/admin";
import { CategoryForm } from "@/components/admin/CategoryForm";
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

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories();

  const formatDate = (d: Date | null) => {
    if (!d) return "—";
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(d));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-bold text-lepi-indigo">
          Categories
        </h1>
        <CategoryForm
          trigger={
            <Button className="bg-lepi-indigo hover:bg-lepi-indigo-light">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle categorie
            </Button>
          }
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {categories.length} categorie{categories.length !== 1 ? "s" : ""}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead className="text-center">Nomines</TableHead>
                  <TableHead>Debut votes</TableHead>
                  <TableHead>Fin votes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      Aucune categorie
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((cat) => (
                    <TableRow key={cat.id}>
                      <TableCell className="font-medium">{cat.name}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {cat.slug}
                      </TableCell>
                      <TableCell className="text-center">
                        {cat._count.nominees}
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatDate(cat.votingStartDate)}
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatDate(cat.votingEndDate)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <CategoryForm
                            category={cat}
                            trigger={
                              <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            }
                          />
                          <form
                            action={async () => {
                              "use server";
                              await deleteCategoryAction(cat.id);
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
