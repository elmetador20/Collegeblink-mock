import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { forumPostSchema } from "@/types";
import * as backend from "@/lib/backend";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const tags = searchParams.getAll("tag");
    const sortBy = searchParams.get("sortBy") || "newest";

    const result = await backend.listForumPosts(page, limit, tags, sortBy);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching forum posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

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
    const validation = forumPostSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validation.error.errors },
        { status: 400 }
      );
    }

    const result = await backend.createForumPost(
      session.user.id,
      validation.data.title,
      validation.data.body,
      validation.data.tags
    );

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating forum post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
