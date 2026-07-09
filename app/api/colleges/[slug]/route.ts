import { NextRequest, NextResponse } from "next/server";
import * as backend from "@/lib/backend";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const college = await backend.getCollegeBySlug(slug);

    if (!college) {
      return NextResponse.json(
        { error: "College not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(college);
  } catch (error) {
    console.error("Error fetching college:", error);
    return NextResponse.json(
      { error: "Failed to fetch college" },
      { status: 500 }
    );
  }
}
