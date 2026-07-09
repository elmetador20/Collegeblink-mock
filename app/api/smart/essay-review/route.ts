import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions, checkRateLimit } from "@/lib/auth";
import { reviewEssay } from "@/lib/openai";
import { z } from "zod";

const essayReviewSchema = z.object({
  essay: z.string().min(100).max(10000),
  type: z.enum(["SOP", "LOR", "COMMON_APP", "PERSONAL_STATEMENT"]),
  targetCollege: z.string().optional(),
  targetCourse: z.string().optional(),
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

    const rateLimit = await checkRateLimit(session.user.id, "essay-review", 5, 3600);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Max 5 reviews per hour." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validation = essayReviewSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validation.error.errors },
        { status: 400 }
      );
    }

    const { essay, type, targetCollege, targetCourse } = validation.data;

    const result = await reviewEssay(essay, type, targetCollege, targetCourse);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in essay review:", error);
    return NextResponse.json(
      { error: "Failed to review essay" },
      { status: 500 }
    );
  }
}
