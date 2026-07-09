import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { generateCollegeMatches } from "@/lib/openai";
import * as backend from "@/lib/backend";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const context: any = await backend.getShortlistContext(session.user.id);

    if (!context) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    const { user, colleges } = context;

    let shortlist = {
      reach: [] as string[],
      match: [] as string[],
      safety: [] as string[],
      reasoning: "",
    };

    try {
      const aiResult = await generateCollegeMatches(user, colleges);
      shortlist = {
        reach: aiResult.reach || [],
        match: aiResult.match || [],
        safety: aiResult.safety || [],
        reasoning: aiResult.reasoning || "",
      };
    } catch (error) {
      const sortedColleges = colleges
        .filter((c: any) => c.nirfRank)
        .sort((a: any, b: any) => (a.nirfRank || 999) - (b.nirfRank || 999));

      shortlist.reach = sortedColleges.slice(0, 3).map((c: any) => c.id);
      shortlist.match = sortedColleges.slice(3, 7).map((c: any) => c.id);
      shortlist.safety = sortedColleges.slice(7, 10).map((c: any) => c.id);
      shortlist.reasoning = "Based on NIRF rankings and your profile.";
    }

    const reachColleges = colleges.filter((c: any) => shortlist.reach.includes(c.name) || shortlist.reach.includes(c.id));
    const matchColleges = colleges.filter((c: any) => shortlist.match.includes(c.name) || shortlist.match.includes(c.id));
    const safetyColleges = colleges.filter((c: any) => shortlist.safety.includes(c.name) || shortlist.safety.includes(c.id));

    return NextResponse.json({
      shortlist: {
        reach: reachColleges.map((c: any) => ({ ...c, tier: "Reach" })),
        match: matchColleges.map((c: any) => ({ ...c, tier: "Match" })),
        safety: safetyColleges.map((c: any) => ({ ...c, tier: "Safety" })),
      },
      reasoning: shortlist.reasoning,
    });
  } catch (error) {
    console.error("Error generating shortlist:", error);
    return NextResponse.json(
      { error: "Failed to generate shortlist" },
      { status: 500 }
    );
  }
}
