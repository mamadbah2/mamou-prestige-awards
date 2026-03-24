"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createCategoryAction, updateCategoryAction } from "@/lib/actions/admin";

interface CategoryFormProps {
  category?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    votingStartDate?: Date | null;
    votingEndDate?: Date | null;
  };
  trigger: React.ReactNode;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatDateForInput(date?: Date | null): string {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 16);
}

export function CategoryForm({ category, trigger }: CategoryFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState(category?.name ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [isPending, startTransition] = useTransition();

  function handleNameChange(value: string) {
    setName(value);
    if (!category) {
      setSlug(slugify(value));
    }
  }

  async function handleSubmit(formData: FormData) {
    setError("");
    startTransition(async () => {
      const result = category
        ? await updateCategoryAction(category.id, formData)
        : await createCategoryAction(formData);

      if (result.success) {
        setOpen(false);
        setName("");
        setSlug("");
        router.refresh();
      } else {
        setError(result.error ?? "Une erreur est survenue.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {category ? "Modifier la categorie" : "Nouvelle categorie"}
          </DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={category?.description ?? ""}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon">Icone (nom lucide-react)</Label>
            <Input
              id="icon"
              name="icon"
              defaultValue={category?.icon ?? "award"}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="votingStartDate">Debut des votes</Label>
              <Input
                id="votingStartDate"
                name="votingStartDate"
                type="datetime-local"
                defaultValue={formatDateForInput(category?.votingStartDate)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="votingEndDate">Fin des votes</Label>
              <Input
                id="votingEndDate"
                name="votingEndDate"
                type="datetime-local"
                defaultValue={formatDateForInput(category?.votingEndDate)}
              />
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-lepi-indigo hover:bg-lepi-indigo-light"
              disabled={isPending}
            >
              {isPending
                ? "Enregistrement..."
                : category
                ? "Mettre a jour"
                : "Creer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
