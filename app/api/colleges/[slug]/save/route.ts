import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import * as backend from "@/lib/backend";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { slug } = await params;

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const result = await backend.toggleSavedCollege(session.user.id, slug);

    if (result?.error === "college_not_found") {
      return NextResponse.json(
        { error: "College not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ saved: result.saved });
  } catch (error) {
    console.error("Error toggling save:", error);
    return NextResponse.json(
      { error: "Failed to toggle save" },
      { status: 500 }
    );
  }
}
