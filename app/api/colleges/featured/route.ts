import { NextResponse } from "next/server";
import * as backend from "@/lib/backend";

export async function GET() {
  try {

    const result = await backend.getColleges({
      limit: 10,
      sortBy: "nirfRank",
      sortOrder: "asc",
    });

    return NextResponse.json({
      colleges: result.colleges || [],
    });
  } catch (error) {
    console.error("Error fetching featured colleges:", error);

    return NextResponse.json({
      colleges: [],
    });
  }
}
