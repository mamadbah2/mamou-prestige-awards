import { PrismaClient } from "@prisma/client";

// Static data imports (relative paths — tsx resolves TS + path aliases won't work here)
import { categories } from "../src/lib/data/categories";
import { nominees } from "../src/lib/data/nominees";
import { editionResults } from "../src/lib/data/results";
import { keyFigures } from "../src/lib/data/homepage";
import { partners } from "../src/lib/data/homepage";
import { testimonials } from "../src/lib/data/homepage";
import { events } from "../src/lib/data/homepage";
import { teamMembers, faqItems, mpaHistory } from "../src/lib/data/about";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  // ─── 0. Clean existing data (idempotent re-seed) ────
  console.log("🧹 Cleaning existing data...");
  await prisma.vote.deleteMany();
  await prisma.nominee.deleteMany();
  await prisma.categoryResult.deleteMany();
  await prisma.category.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.mpaEvent.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.faqItem.deleteMany();
  await prisma.keyFigure.deleteMany();
  await prisma.historyMilestone.deleteMany();
  console.log("  ✓ All collections cleaned");

  // ─── 1. Editions ─────────────────────────────────────
  console.log("📅 Creating editions...");

  const edition2025 = await prisma.edition.upsert({
    where: { year: 2025 },
    update: {},
    create: { year: 2025, status: "completed", isActive: false },
  });

  const edition2026 = await prisma.edition.upsert({
    where: { year: 2026 },
    update: {},
    create: { year: 2026, status: "ongoing", isActive: true },
  });

  // We also create 2024 since testimonials reference it
  await prisma.edition.upsert({
    where: { year: 2024 },
    update: {},
    create: { year: 2024, status: "completed", isActive: false },
  });

  console.log("  ✓ Editions 2024, 2025, 2026 created");

  // ─── 2. Categories (for 2026 edition) ────────────────
  console.log("📂 Creating categories...");

  const categoryMap = new Map<string, string>(); // static id → MongoDB ObjectId

  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: {
        slug_editionId: { slug: cat.slug, editionId: edition2026.id },
      },
      update: {
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        nomineeCount: cat.nomineeCount,
        votingStartDate: cat.votingStartDate ? new Date(cat.votingStartDate) : null,
        votingEndDate: cat.votingEndDate ? new Date(cat.votingEndDate) : null,
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon,
        nomineeCount: cat.nomineeCount,
        votingStartDate: cat.votingStartDate ? new Date(cat.votingStartDate) : null,
        votingEndDate: cat.votingEndDate ? new Date(cat.votingEndDate) : null,
        editionId: edition2026.id,
      },
    });
    categoryMap.set(cat.id, created.id);
  }

  console.log(`  ✓ ${categories.length} categories created`);

  // ─── 3. Nominees (for 2026 edition) ──────────────────
  console.log("👤 Creating nominees...");

  for (const nom of nominees) {
    const mongoCategoryId = categoryMap.get(nom.categoryId);
    if (!mongoCategoryId) {
      console.warn(`  ⚠ Category ${nom.categoryId} not found for nominee ${nom.name}`);
      continue;
    }

    await prisma.nominee.create({
      data: {
        name: nom.name,
        categoryId: mongoCategoryId,
        categoryName: nom.categoryName,
        description: nom.description,
        imageUrl: nom.imageUrl ?? null,
        editionId: edition2026.id,
      },
    });
  }

  console.log(`  ✓ ${nominees.length} nominees created`);

  // ─── 4. Category Results (2025 edition) ──────────────
  console.log("🏆 Creating results for 2025...");

  const results2025 = editionResults.find((r) => r.edition === 2025);
  if (results2025) {
    for (const catResult of results2025.categories) {
      await prisma.categoryResult.upsert({
        where: {
          categoryId_editionId: {
            categoryId: catResult.categoryId,
            editionId: edition2025.id,
          },
        },
        update: {
          categoryName: catResult.categoryName,
          winner: catResult.winner ?? undefined,
          runnerUp: catResult.runnerUp ?? undefined,
        },
        create: {
          categoryId: catResult.categoryId,
          categoryName: catResult.categoryName,
          winner: catResult.winner ?? undefined,
          runnerUp: catResult.runnerUp ?? undefined,
          editionId: edition2025.id,
        },
      });
    }
    console.log(`  ✓ ${results2025.categories.length} category results created`);
  }

  // ─── 5. Partners ─────────────────────────────────────
  console.log("🤝 Creating partners...");

  for (const partner of partners) {
    await prisma.partner.create({
      data: {
        name: partner.name,
        logoUrl: partner.logoUrl ?? null,
        websiteUrl: partner.websiteUrl ?? null,
      },
    });
  }

  console.log(`  ✓ ${partners.length} partners created`);

  // ─── 6. Testimonials ─────────────────────────────────
  console.log("💬 Creating testimonials...");

  for (const test of testimonials) {
    await prisma.testimonial.create({
      data: {
        author: test.author,
        role: test.role,
        content: test.content,
        avatarUrl: test.avatarUrl ?? null,
        edition: test.edition ?? null,
      },
    });
  }

  console.log(`  ✓ ${testimonials.length} testimonials created`);

  // ─── 7. Events ───────────────────────────────────────
  console.log("📆 Creating events...");

  for (const evt of events) {
    await prisma.mpaEvent.create({
      data: {
        title: evt.title,
        date: evt.date,
        location: evt.location,
        description: evt.description,
        imageUrl: evt.imageUrl ?? null,
      },
    });
  }

  console.log(`  ✓ ${events.length} events created`);

  // ─── 8. Team Members ─────────────────────────────────
  console.log("👥 Creating team members...");

  for (const member of teamMembers) {
    await prisma.teamMember.create({
      data: {
        name: member.name,
        role: member.role,
        imageUrl: member.imageUrl ?? null,
      },
    });
  }

  console.log(`  ✓ ${teamMembers.length} team members created`);

  // ─── 9. FAQ Items ────────────────────────────────────
  console.log("❓ Creating FAQ items...");

  for (const faq of faqItems) {
    await prisma.faqItem.create({
      data: {
        question: faq.question,
        answer: faq.answer,
      },
    });
  }

  console.log(`  ✓ ${faqItems.length} FAQ items created`);

  // ─── 10. Key Figures ─────────────────────────────────
  console.log("📊 Creating key figures...");

  for (const kf of keyFigures) {
    await prisma.keyFigure.upsert({
      where: { slug: kf.id },
      update: {
        value: kf.value,
        suffix: kf.suffix ?? null,
        label: kf.label,
        description: kf.description ?? null,
      },
      create: {
        slug: kf.id,
        value: kf.value,
        suffix: kf.suffix ?? null,
        label: kf.label,
        description: kf.description ?? null,
      },
    });
  }

  console.log(`  ✓ ${keyFigures.length} key figures created`);

  // ─── 11. History Milestones ──────────────────────────
  console.log("📜 Creating history milestones...");

  for (const h of mpaHistory) {
    await prisma.historyMilestone.upsert({
      where: { year: h.year },
      update: { milestone: h.milestone },
      create: { year: h.year, milestone: h.milestone },
    });
  }

  console.log(`  ✓ ${mpaHistory.length} milestones created`);

  console.log("\n✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
