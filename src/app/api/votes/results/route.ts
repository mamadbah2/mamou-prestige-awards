import { NextResponse } from "next/server";
import { getVoteCountsByCategory } from "@/lib/services/vote";

export async function GET() {
  try {
    const results = await getVoteCountsByCategory();
    return NextResponse.json(results);
  } catch {
    return NextResponse.json(
      { error: "Impossible de recuperer les resultats." },
      { status: 500 }
    );
  }
}
