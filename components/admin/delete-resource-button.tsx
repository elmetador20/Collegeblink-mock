"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  url: string;
  resourceName: string;
  label?: string;
}

export function DeleteResourceButton({
  url,
  resourceName,
  label = "Delete",
}: DeleteButtonProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete ${resourceName}? This can't be undone.`
    );

    if (!confirmed) return;

    setPending(true);

    try {
      const res = await fetch(url, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Couldn't delete ${resourceName}.`);
      }

      router.refresh();
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : `Couldn't delete ${resourceName}.`
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="text-sm font-medium text-[#A23B2E] hover:underline disabled:opacity-50"
    >
      {pending ? "Deleting…" : label}
    </button>
  );
}