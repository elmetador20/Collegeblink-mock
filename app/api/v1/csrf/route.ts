

import { NextRequest, NextResponse } from "next/server";
import {
  generateSimpleCSRFToken,
  getCSRFCookieSettings,
  CSRF_HEADER_NAME,
} from "@/lib/csrf";
import { securityHeaders } from "@/lib/security";

export async function GET(req: NextRequest) {
  try {

    const csrfToken = generateSimpleCSRFToken();

    const response = NextResponse.json(
      { success: true },
      { headers: securityHeaders }
    );

    const cookieSettings = getCSRFCookieSettings(csrfToken);
    response.cookies.set(cookieSettings);

    response.headers.set(CSRF_HEADER_NAME, csrfToken);

    return response;
  } catch (error) {
    console.error("[CSRF] Error generating token:", error);
    return NextResponse.json(
      { error: "Failed to generate CSRF token" },
      { status: 500, headers: securityHeaders }
    );
  }
}
