import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isBlocked, getClientIP } from "./lib/security";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Maintenance mode override or check if needed
  const isMaintenanceMode = false;
  if (isMaintenanceMode && pathname !== "/maintenance") {
    return NextResponse.redirect(new URL("/maintenance", req.url));
  }

  // Security check for blocked IPs
  const clientIP = getClientIP(req.headers);
  if (await isBlocked(clientIP)) {
    return NextResponse.json(
      { error: "Access denied", message: "Your IP has been temporarily blocked" },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.png|images|api).*)",
    "/api/:path*",
  ],
};
