import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import * as backend from "@/lib/backend";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const notifications = await backend.listNotifications(session.user.id);

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const schema = z.object({
      id: z.string().optional(),
      read: z.boolean(),
    });

    const validation = schema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validation.error.errors },
        { status: 400 }
      );
    }

    const { id, read } = validation.data;

    if (id) {
      const result: any = await backend.markNotifications(session.user.id, read, id);

      if (result?.error === "not_found") {
        return NextResponse.json(
          { error: "Notification not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(result.notification);
    } else {
      await backend.markNotifications(session.user.id, read);

      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error("Error updating notifications:", error);
    return NextResponse.json(
      { error: "Failed to update notifications" },
      { status: 500 }
    );
  }
}
