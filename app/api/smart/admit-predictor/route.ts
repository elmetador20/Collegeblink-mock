import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { predictAdmission } from "@/lib/openai";
import { z } from "zod";
import * as backend from "@/lib/backend";

const predictorSchema = z.object({
  collegeId: z.string(),
  rank: z.number().positive(),
  percentage: z.number().min(0).max(100).optional(),
  category: z.string(),
  homeState: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validation = predictorSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validation.error.errors },
        { status: 400 }
      );
    }

    const { collegeId, rank, percentage, category, homeState } = validation.data;

    const college: any = await backend.getAdmitPredictorContext(collegeId, category);

    if (!college) {
      return NextResponse.json(
        { error: "College not found" },
        { status: 404 }
      );
    }

    let probability = 0;
    const latestCutoff = college.cutoffs[0];

    if (latestCutoff) {
      const rankDiff = rank - latestCutoff.closingRank;
      const rankPercentage = (rankDiff / latestCutoff.closingRank) * 100;

      if (rank <= latestCutoff.openingRank) {
        probability = 95;
      } else if (rank <= latestCutoff.closingRank) {
        probability = 75 + ((latestCutoff.closingRank - rank) / (latestCutoff.closingRank - latestCutoff.openingRank)) * 20;
      } else if (rankPercentage <= 10) {
        probability = 50 - rankPercentage * 2;
      } else if (rankPercentage <= 25) {
        probability = 30 - (rankPercentage - 10) * 1;
      } else {
        probability = 15;
      }
    } else {
      probability = percentage ? percentage : 50;
    }

    if (homeState && college.state === homeState) {
      probability += 10;
    }

    if (category !== "General") {
      probability += 5;
    }

    probability = Math.min(95, Math.max(5, probability));

    let tier = "Safety";
    if (probability >= 70) {
      tier = "Match";
    } else if (probability < 40) {
      tier = "Reach";
    }

    let explanation = "";
    try {
      const aiResult = await predictAdmission(
        {
          rank,
          exam: "JEE",
          category,
          collegeName: college.name,
        },
        college.cutoffs.map((c: any) => ({
          year: c.year,
          openingRank: c.openingRank,
          closingRank: c.closingRank,
          category: c.category,
        }))
      );
      explanation = aiResult.reasoning;
    } catch (error) {
      explanation = `Based on your rank of ${rank} in ${category} category, we estimate a ${probability.toFixed(0)}% chance of admission to ${college.name}.`;
    }

    return NextResponse.json({
      probability: Math.round(probability),
      tier,
      explanation,
      historicalCutoffs: college.cutoffs,
    });
  } catch (error) {
    console.error("Error in admit predictor:", error);
    return NextResponse.json(
      { error: "Failed to predict admission" },
      { status: 500 }
    );
  }
}
