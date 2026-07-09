"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface UseAdminFormOptions<TValues, TPayload = unknown> {
  mode: "create" | "edit";
  /** e.g. "colleges" → hits /api/admin/colleges */
  baseUrl: string;
  entityId?: string;
  /** Called before submission; return an error string to abort, or null to proceed. */
  validate?: (values: TValues) => string | null;
  /** Transform form state into the API payload. */
  buildPayload: (values: TValues) => TPayload;
  /** Where to navigate on success. Defaults to /admin/{baseUrl} */
  redirectTo?: string;
}

interface UseAdminFormReturn<TValues> {
  submitting: boolean;
  error: string | null;
  clearError: () => void;
  handleSubmit: (values: TValues) => Promise<void>;
}

export function useAdminForm<TValues, TPayload = unknown>({
  mode,
  baseUrl,
  entityId,
  validate,
  buildPayload,
  redirectTo,
}: UseAdminFormOptions<TValues, TPayload>): UseAdminFormReturn<TValues> {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(values: TValues) {
    setError(null);

    if (validate) {
      const validationError = validate(values);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setSubmitting(true);

    try {
      const url =
        mode === "create"
          ? `/api/admin/${baseUrl}`
          : `/api/admin/${baseUrl}/${entityId}`;

      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(values)),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong while saving.");
      }

      const destination = redirectTo ?? `/admin/${baseUrl}`;
      router.push(destination);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Couldn't save. Try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return {
    submitting,
    error,
    clearError: () => setError(null),
    handleSubmit,
  };
}