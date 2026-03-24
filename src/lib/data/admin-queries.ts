import { prisma } from "@/lib/db";
import { VOTE_PRICE } from "@/lib/services/payment";

export async function getAdminStats() {
  const [verifiedVotes, totalNominees, totalCategories] = await Promise.all([
    prisma.vote.findMany({
      where: { verified: true },
      select: { score: true },
    }),
    prisma.nominee.count(),
    prisma.category.count(),
  ]);

  const totalVotes = verifiedVotes.reduce((sum, v) => sum + v.score, 0);

  return {
    totalVotes,
    revenue: totalVotes * VOTE_PRICE,
    totalNominees,
    totalCategories,
  };
}

export async function getRecentVotes(limit = 20) {
  return prisma.vote.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { nominee: true },
  });
}

export async function getTopNominees(limit = 5) {
  const nominees = await prisma.nominee.findMany({
    include: {
      _count: { select: { votes: { where: { verified: true } } } },
      category: true,
    },
  });

  return nominees
    .map((n) => ({
      id: n.id,
      name: n.name,
      categoryName: n.categoryName,
      voteCount: n._count.votes,
    }))
    .sort((a, b) => b.voteCount - a.voteCount)
    .slice(0, limit);
}

export async function getAllVotes(options?: {
  page?: number;
  pageSize?: number;
  categoryId?: string;
}) {
  const page = options?.page ?? 1;
  const pageSize = options?.pageSize ?? 20;
  const skip = (page - 1) * pageSize;

  const where = options?.categoryId
    ? { nominee: { categoryId: options.categoryId } }
    : {};

  const [votes, total] = await Promise.all([
    prisma.vote.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: { nominee: { include: { category: true } } },
    }),
    prisma.vote.count({ where }),
  ]);

  return { votes, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
}

// ─── Categories CRUD ─────────────────────────────────────

export async function getAllCategories() {
  return prisma.category.findMany({
    include: { _count: { select: { nominees: true } } },
    orderBy: { name: "asc" },
  });
}

export async function getCategoryById(id: string) {
  return prisma.category.findUnique({ where: { id } });
}

export async function createCategory(data: {
  name: string;
  slug: string;
  description: string;
  icon: string;
  editionId: string;
  votingStartDate?: Date;
  votingEndDate?: Date;
}) {
  return prisma.category.create({ data });
}

export async function updateCategory(
  id: string,
  data: {
    name?: string;
    slug?: string;
    description?: string;
    icon?: string;
    votingStartDate?: Date | null;
    votingEndDate?: Date | null;
  }
) {
  return prisma.category.update({ where: { id }, data });
}

export async function deleteCategory(id: string) {
  return prisma.category.delete({ where: { id } });
}

// ─── Nominees CRUD ───────────────────────────────────────

export async function getAllNominees(categoryId?: string) {
  const where = categoryId ? { categoryId } : {};
  return prisma.nominee.findMany({
    where,
    include: {
      category: true,
      _count: { select: { votes: { where: { verified: true } } } },
    },
    orderBy: { name: "asc" },
  });
}

export async function getNomineeById(id: string) {
  return prisma.nominee.findUnique({
    where: { id },
    include: { category: true },
  });
}

export async function createNominee(data: {
  name: string;
  description: string;
  imageUrl?: string;
  categoryId: string;
  categoryName: string;
  editionId: string;
}) {
  return prisma.nominee.create({ data });
}

export async function updateNominee(
  id: string,
  data: {
    name?: string;
    description?: string;
    imageUrl?: string | null;
    categoryId?: string;
    categoryName?: string;
  }
) {
  return prisma.nominee.update({ where: { id }, data });
}

export async function deleteNominee(id: string) {
  return prisma.nominee.delete({ where: { id } });
}
