const CSRF_HEADER_NAME = "x-csrf-token";
let csrfToken: string | null = null;

export async function fetchCSRFToken(): Promise<string | null> {
  try {
    const response = await fetch("/api/v1/csrf", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.error("[CSRF] Failed to fetch token");
      return null;
    }

    const headerToken = response.headers.get(CSRF_HEADER_NAME);
    if (headerToken) {
      csrfToken = headerToken;
    }

    return csrfToken;
  } catch (error) {
    console.error("[CSRF] Error fetching token:", error);
    return null;
  }
}

async function getCSRFToken(): Promise<string | null> {
  if (csrfToken) return csrfToken;
  return await fetchCSRFToken();
}

export async function initializeSession(): Promise<{ success: boolean; metadata?: any }> {
  try {
    const response = await fetch("/api/v1/session/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      }),
    });

    if (!response.ok) {
      console.error("[Session] Failed to create session");
      return { success: false };
    }

    const headerToken = response.headers.get(CSRF_HEADER_NAME);
    if (headerToken) {
      csrfToken = headerToken;
    }

    const data = await response.json();
    return { success: true, metadata: data.metadata };
  } catch (error) {
    console.error("[Session] Error creating session:", error);
    return { success: false };
  }
}

export async function clearSession(): Promise<void> {
  try {
    await fetch("/api/v1/session/revoke", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("[Session] Logout error:", error);
  }

  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

export async function secureFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const method = options.method || "GET";
  const isMutating = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (isMutating) {
    const token = await getCSRFToken();
    if (token) {
      headers[CSRF_HEADER_NAME] = token;
    }
  }

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers,
  });

  if (response.status === 401) {
    if (typeof window !== "undefined") {
      window.location.href = "/login?error=session_expired";
    }
  }

  if (response.status === 403) {
    const errorData = await response.clone().json().catch(() => null);
    if (errorData?.message?.includes("CSRF")) {
      console.warn("[CSRF] Token invalid, refreshing...");
      csrfToken = null;
      const newToken = await fetchCSRFToken();
      if (newToken && isMutating) {
        headers[CSRF_HEADER_NAME] = newToken;
        return fetch(url, {
          ...options,
          credentials: "include",
          headers,
        });
      }
    }
  }

  return response;
}

export async function get(url: string, params?: Record<string, string>) {
  let fullUrl = url;
  if (params) {
    const query = new URLSearchParams(params).toString();
    fullUrl = `${url}?${query}`;
  }
  return secureFetch(fullUrl, { method: "GET" });
}

export async function post(url: string, body: unknown) {
  return secureFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function patch(url: string, body: unknown) {
  return secureFetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function del(url: string) {
  return secureFetch(url, { method: "DELETE" });
}

export function createSecureApiClient() {
  return {
    get,
    post,
    patch,
    delete: del,
    fetch: secureFetch,
  };
}

export default createSecureApiClient;
