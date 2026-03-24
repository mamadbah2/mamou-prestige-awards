"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createNomineeAction, updateNomineeAction } from "@/lib/actions/admin";

interface NomineeFormProps {
  nominee?: {
    id: string;
    name: string;
    description: string;
    imageUrl?: string | null;
    categoryId: string;
  };
  categories: { id: string; name: string }[];
  trigger: React.ReactNode;
}

export function NomineeForm({ nominee, categories, trigger }: NomineeFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [categoryId, setCategoryId] = useState(nominee?.categoryId ?? "");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError("");
    formData.set("categoryId", categoryId);
    startTransition(async () => {
      const result = nominee
        ? await updateNomineeAction(nominee.id, formData)
        : await createNomineeAction(formData);

      if (result.success) {
        setOpen(false);
        setCategoryId("");
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
            {nominee ? "Modifier le nomine" : "Nouveau nomine"}
          </DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              name="name"
              defaultValue={nominee?.name ?? ""}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={nominee?.description ?? ""}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL de l&apos;image (optionnel)</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              defaultValue={nominee?.imageUrl ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label>Categorie</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Selectionner une categorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                : nominee
                ? "Mettre a jour"
                : "Creer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
