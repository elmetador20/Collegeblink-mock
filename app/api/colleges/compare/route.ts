import { NextRequest, NextResponse } from "next/server";
import { generateComparisonSummary } from "@/lib/openai";
import * as backend from "@/lib/backend";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ids = searchParams.get("ids")?.split(",").slice(0, 4);

    if (!ids || ids.length < 2) {
      return NextResponse.json(
        { error: "Please provide at least 2 college IDs to compare" },
        { status: 400 }
      );
    }

    const colleges = await backend.compareColleges(ids);

    if (colleges.length < 2) {
      return NextResponse.json(
        { error: "Not all colleges found" },
        { status: 404 }
      );
    }

    let aiSummary = "";
    try {
      aiSummary = await generateComparisonSummary(colleges);
    } catch (error) {
      console.error("Error generating AI summary:", error);
      aiSummary = "Unable to generate AI comparison at this time.";
    }

    return NextResponse.json({
      colleges,
      aiSummary,
    });
  } catch (error) {
    console.error("Error comparing colleges:", error);
    return NextResponse.json(
      { error: "Failed to compare colleges" },
      { status: 500 }
    );
  }
}
