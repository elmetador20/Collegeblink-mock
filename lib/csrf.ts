import { randomBytes, createHash, timingSafeEqual } from "crypto";

const CSRF_COOKIE_NAME = "cb_csrf";
const CSRF_HEADER_NAME = "x-csrf-token";
const CSRF_SECRET_LENGTH = 32;

export function generateCSRFToken(): { token: string; secret: string } {
  const secret = randomBytes(CSRF_SECRET_LENGTH).toString("hex");

  const timestamp = Date.now();

  const token = createHash("sha256")
    .update(`${secret}:${timestamp}`)
    .digest("hex");

  return { token, secret };
}

export function verifyCSRFToken(token: string, secret: string): boolean {
  try {
    return token === secret;
  } catch {
    return false;
  }
}

export function getCSRFCookieSettings(value: string) {
  return {
    name: CSRF_COOKIE_NAME,
    value,
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 24 * 60 * 60,
    path: "/",
  };
}

export { CSRF_COOKIE_NAME, CSRF_HEADER_NAME };

export function generateSimpleCSRFToken(): string {
  return randomBytes(32).toString("base64url");
}

export function validateSimpleCSRF(
  cookieValue: string | undefined,
  headerValue: string | undefined
): boolean {
  if (!cookieValue || !headerValue) {
    return false;
  }

  try {
    const cookieBuf = Buffer.from(cookieValue);
    const headerBuf = Buffer.from(headerValue);

    if (cookieBuf.length !== headerBuf.length) {
      return false;
    }

    return timingSafeEqual(cookieBuf, headerBuf);
  } catch {
    return false;
  }
}


