import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
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

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const result = await backend.getMaintenanceSettings();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching maintenance settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch maintenance settings" },
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

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const result = await backend.updateMaintenanceSettings(session.user.id, {
      maintenanceMode: body.maintenanceMode,
      maintenanceMessage: body.maintenanceMessage,
      maintenanceEta: body.maintenanceEta || null,
      contactEmail: body.contactEmail,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating maintenance settings:", error);
    return NextResponse.json(
      { error: "Failed to update maintenance settings" },
      { status: 500 }
    );
  }
}
