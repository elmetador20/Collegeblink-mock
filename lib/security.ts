// Redis and Ratelimit removed to eliminate external dependencies


const CSRF_COOKIE_NAME = "cb_csrf";
const CSRF_HEADER_NAME = "x-csrf-token";

export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function validateCSRFToken(
  cookieValue: string | undefined,
  headerValue: string | undefined
): boolean {
  if (!cookieValue || !headerValue) {
    return false;
  }

  try {
    const cookieBytes = new TextEncoder().encode(cookieValue);
    const headerBytes = new TextEncoder().encode(headerValue);

    if (cookieBytes.length !== headerBytes.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < cookieBytes.length; i++) {
      result |= cookieBytes[i] ^ headerBytes[i];
    }
    return result === 0;
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

export const ratelimit = {
  api: {
    limit: async () => ({ success: true, limit: 10, remaining: 10, reset: Date.now() + 10000 }),
  },
  auth: {
    limit: async () => ({ success: true, limit: 5, remaining: 5, reset: Date.now() + 60000 }),
  },
  ai: {
    limit: async () => ({ success: true, limit: 20, remaining: 20, reset: Date.now() + 60000 }),
  },
  search: {
    limit: async () => ({ success: true, limit: 30, remaining: 30, reset: Date.now() + 60000 }),
  },
};


export function getAllowedDomains(): string[] {
  const domains = process.env.ALLOWED_DOMAINS || "collegeblink.vercel.app,collegeblink.in,www.collegeblink.in";
  return domains.split(",").map(d => d.trim().toLowerCase());
}

export function isValidDomain(origin?: string | null): boolean {
  if (!origin) return false;

  const allowedDomains = getAllowedDomains();
  const lowerOrigin = origin.toLowerCase();

  return allowedDomains.some(domain => {
    if (lowerOrigin === domain || lowerOrigin.endsWith(`.${domain}`)) {
      return true;
    }
    if (domain.includes(":") && lowerOrigin.startsWith(domain)) {
      return true;
    }
    return false;
  });
}

export function getOriginFromHeaders(headers: Headers): string | null {
  return (
    headers.get("origin") ||
    headers.get("referer") ||
    headers.get("x-forwarded-host") ||
    headers.get("host") ||
    null
  );
}

export async function isBlocked(identifier: string): Promise<boolean> {
  return false;
}

export async function blockIdentifier(identifier: string, durationHours: number = 24): Promise<void> {
  // No-op
}

export async function unblockIdentifier(identifier: string): Promise<void> {
  // No-op
}


export function getClientIP(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

export const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

export function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}
