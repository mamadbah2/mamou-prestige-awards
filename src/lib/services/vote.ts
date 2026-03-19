import { prisma } from "@/lib/db";
import { voteSubmissionSchema, type VoteSubmissionInput } from "@/lib/validations/vote";
import { verifyCaptchaToken } from "./captcha";
import { processPayment, VOTE_PRICE } from "./payment";

interface VoteResult {
  success: boolean;
  transactionRef?: string;
  voteCount?: number;
  totalAmount?: number;
  error?: string;
}

export async function submitVote(input: VoteSubmissionInput): Promise<VoteResult> {
  // 1. Validate input
  const parsed = voteSubmissionSchema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Donnees invalides.";
    return { success: false, error: firstError };
  }

  const { nomineeId, voterPhone, captchaToken, voteCount } = parsed.data;

  try {
    // 2. Verify nominee exists
    const nominee = await prisma.nominee.findUnique({
      where: { id: nomineeId },
      include: { category: true },
    });

    if (!nominee) {
      return { success: false, error: "Ce nomine n'existe pas." };
    }

    // 3. Verify CAPTCHA
    const captchaValid = await verifyCaptchaToken(captchaToken);
    if (!captchaValid) {
      return { success: false, error: "La verification CAPTCHA a echoue. Veuillez reessayer." };
    }

    // 4. Calculate total amount
    const totalAmount = voteCount * VOTE_PRICE;

    // 5. Process payment
    const payment = await processPayment(voterPhone, totalAmount);
    if (!payment.success) {
      return { success: false, error: payment.error ?? "Le paiement a echoue. Veuillez reessayer." };
    }

    // 6. Create vote record
    await prisma.vote.create({
      data: {
        nomineeId,
        voterIdentifier: voterPhone,
        voteType: "PUBLIC",
        score: voteCount,
        transactionRef: payment.transactionRef,
        captchaToken,
        verified: true,
      },
    });

    // 7. Return success
    return {
      success: true,
      transactionRef: payment.transactionRef,
      voteCount,
      totalAmount,
    };
  } catch (error) {
    console.error("Vote submission error:", error);
    return { success: false, error: "Une erreur est survenue. Veuillez reessayer." };
  }
}

interface NomineeVoteCount {
  nomineeId: string;
  nomineeName: string;
  totalVotes: number;
}

interface CategoryVoteResult {
  categoryId: string;
  categoryName: string;
  nominees: NomineeVoteCount[];
}

export async function getVoteCountsByCategory(): Promise<CategoryVoteResult[]> {
  try {
    // Get the active edition
    const activeEdition = await prisma.edition.findFirst({
      where: { isActive: true },
    });

    if (!activeEdition) return [];

    // Get all nominees with vote aggregation
    const nominees = await prisma.nominee.findMany({
      where: { editionId: activeEdition.id },
      include: {
        category: true,
        votes: {
          where: { verified: true },
          select: { score: true },
        },
      },
    });

    // Group by category
    const categoryMap = new Map<string, CategoryVoteResult>();

    for (const nominee of nominees) {
      const totalVotes = nominee.votes.reduce((sum, v) => sum + v.score, 0);

      if (!categoryMap.has(nominee.categoryId)) {
        categoryMap.set(nominee.categoryId, {
          categoryId: nominee.categoryId,
          categoryName: nominee.categoryName,
          nominees: [],
        });
      }

      categoryMap.get(nominee.categoryId)!.nominees.push({
        nomineeId: nominee.id,
        nomineeName: nominee.name,
        totalVotes,
      });
    }

    // Sort nominees by total votes descending
    const results = Array.from(categoryMap.values());
    for (const cat of results) {
      cat.nominees.sort((a, b) => b.totalVotes - a.totalVotes);
    }

    return results;
  } catch (error) {
    console.error("Error fetching vote counts:", error);
    return [];
  }
}
