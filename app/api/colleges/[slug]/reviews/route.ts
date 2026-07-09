import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { reviewSchema } from "@/types";
import * as backend from "@/lib/backend";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const rating = searchParams.get("rating");
    const sortBy = searchParams.get("sortBy") || "newest";

    const result: any = await backend.listCollegeReviews(
      slug,
      page,
      limit,
      rating ? parseInt(rating) : null,
      sortBy
    );

    if (result?.error === "college_not_found") {
      return NextResponse.json(
        { error: "College not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

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

    const body = await req.json();
    const validation = reviewSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validation.error.errors },
        { status: 400 }
      );
    }

    const result: any = await backend.createCollegeReview(session.user.id, slug, validation.data);

    if (result?.error === "college_not_found") {
      return NextResponse.json(
        { error: "College not found" },
        { status: 404 }
      );
    }

    if (result?.error === "review_exists") {
      return NextResponse.json(
        { error: "You have already reviewed this college" },
        { status: 400 }
      );
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
