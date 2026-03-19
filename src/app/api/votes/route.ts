import { NextResponse } from "next/server";
import { submitVote } from "@/lib/services/vote";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await submitVote(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      transactionRef: result.transactionRef,
      voteCount: result.voteCount,
      totalAmount: result.totalAmount,
    });
  } catch {
    return NextResponse.json(
      { error: "Une erreur interne est survenue. Veuillez reessayer." },
      { status: 500 }
    );
  }
}
