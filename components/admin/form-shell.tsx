"use client";

import { useRouter } from "next/navigation";

import { Loader2, AlertCircle } from "lucide-react";

interface FormShellProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  cancelHref?: string;
  submitting: boolean;
  error: string | null;
  mode: "create" | "edit";
  label: string;
  children: React.ReactNode;
}

export function FormShell({
  onSubmit,
  cancelHref,
  submitting,
  error,
  mode,
  label,
  children,
}: FormShellProps) {
  const router = useRouter();

  function handleCancel() {
    if (cancelHref) {
      router.push(cancelHref);
    } else {
      router.back();
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {error && <FormError message={error} />}

      {children}

      <div className="flex items-center gap-3 border-t border-[#E3DFD6] dark:border-zinc-800 pt-6">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1F3A5C] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1F3A5C]/90 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-sm"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : mode === "create" ? (
            `Add ${label}`
          ) : (
            "Save Changes"
          )}
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-3 text-sm font-semibold text-[#6B6660] hover:text-[#1C1B19] dark:text-zinc-400 dark:hover:text-white transition-all active:scale-95 shadow-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export function FormError({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-[#A23B2E]/30 bg-[#A23B2E]/5 px-4 py-3.5 text-sm text-[#A23B2E]">
      <AlertCircle className="h-5 w-5 shrink-0" />
      <span className="font-semibold">{message}</span>
    </div>
  );
}