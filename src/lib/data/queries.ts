import { prisma } from "@/lib/db";

export async function getActiveEdition() {
  return prisma.edition.findFirst({ where: { isActive: true } });
}

export async function getCategoriesFromDB(editionYear?: number) {
  const edition = editionYear
    ? await prisma.edition.findUnique({ where: { year: editionYear } })
    : await getActiveEdition();

  if (!edition) return [];

  return prisma.category.findMany({
    where: { editionId: edition.id },
    orderBy: { name: "asc" },
  });
}

export async function getNomineesFromDB(editionYear?: number) {
  const edition = editionYear
    ? await prisma.edition.findUnique({ where: { year: editionYear } })
    : await getActiveEdition();

  if (!edition) return [];

  return prisma.nominee.findMany({
    where: { editionId: edition.id },
    include: { category: true },
    orderBy: { name: "asc" },
  });
}

export async function getNomineeByIdFromDB(id: string) {
  return prisma.nominee.findUnique({
    where: { id },
    include: { category: true },
  });
}

export async function getNomineesByCategoryFromDB(categoryId: string) {
  return prisma.nominee.findMany({
    where: { categoryId },
    orderBy: { name: "asc" },
  });
}
