import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, data, timestamp } = body;

    const session = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/session`, {
      cache: "no-store",
    }).then((res) => res.json()).catch(() => null);
    
    const userId = session?.user?.id || data?.userId || null;

    await prisma.analyticsEvent.create({
      data: {
        event,
        metadata: data || {},
        userId,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return NextResponse.json({ success: false, error: "Failed to track event" }, { status: 500 });
  }
}
