import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import * as backend from "@/lib/backend";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const config = await req.json();

    const result = await backend.saveAIConfig(config);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error saving AI config:", error);
    return NextResponse.json(
      { error: "Failed to save AI configuration" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const result = await backend.getAIConfig();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching AI config:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI configuration" },
      { status: 500 }
    );
  }
}
