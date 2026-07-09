import { NextRequest, NextResponse } from "next/server";
import * as backend from "@/lib/backend";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const type = searchParams.get("type");
    const minAmount = searchParams.get("minAmount");
    const maxAmount = searchParams.get("maxAmount");
    const deadline = searchParams.get("deadline");
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const level = searchParams.get("level");
    const location = searchParams.get("location");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const result = await backend.listScholarships({
      type,
      minAmount: minAmount ? parseInt(minAmount) : undefined,
      maxAmount: maxAmount ? parseInt(maxAmount) : undefined,
      deadline,
      search,
      category,
      level,
      location,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    return NextResponse.json(
      { error: "Failed to fetch scholarships" },
      { status: 500 }
    );
  }
}
