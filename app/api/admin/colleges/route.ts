import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import * as collegeService from "@/services/college.service";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const searchParams = req.nextUrl.searchParams;

    const result = await collegeService.getColleges({
      search: searchParams.get("search") ?? undefined,
      page: Number(searchParams.get("page") ?? "1"),
      limit: Number(searchParams.get("limit") ?? "10"),
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return NextResponse.json({ error: "Failed to fetch colleges" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const data = await req.json();
    const result = await collegeService.createCollege(auth.user, data);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating college:", error);
    return NextResponse.json({ error: "Failed to create college" }, { status: 500 });
  }
}