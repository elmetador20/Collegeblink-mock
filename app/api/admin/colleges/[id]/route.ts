import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import * as collegeService from "@/services/college.service";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const auth = await requireAdmin();
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { id } = await context.params;

    const college = await collegeService.getCollegeById(id);

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

export async function PUT(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const auth = await requireAdmin();
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { id } = await context.params;

    const data = await req.json();
    const result = await collegeService.updateCollege(auth.user, id, data);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating college:", error);
    return NextResponse.json(
      { error: "Failed to update college" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const auth = await requireAdmin();
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { id } = await context.params;

    await collegeService.deleteCollege(auth.user, id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting college:", error);
    return NextResponse.json(
      { error: "Failed to delete college" },
      { status: 500 }
    );
  }
}