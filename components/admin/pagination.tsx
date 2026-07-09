import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  search,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
  search?: string;
}) {
  if (totalPages <= 1) return null;

  function hrefFor(page: number) {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("page", String(page));
    return `${basePath}?${params.toString()}`;
  }

  return (
    <div className="mt-8 flex items-center justify-between text-sm border-t border-[#E3DFD6]/60 dark:border-zinc-800/60 pt-5 px-1 select-none">
      <p className="text-xs text-[#6B6660] dark:text-zinc-400 font-medium">
        Page <strong className="font-semibold text-[#1C1B19] dark:text-zinc-200">{currentPage}</strong> of{" "}
        <strong className="font-semibold text-[#1C1B19] dark:text-zinc-200">{totalPages}</strong>
      </p>
      <div className="flex gap-2">
        <Link
          href={hrefFor(Math.max(1, currentPage - 1))}
          className={`inline-flex items-center gap-1 rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-[#1C1B19] dark:text-zinc-300 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 transition-colors shadow-sm ${
            currentPage <= 1 ? "pointer-events-none opacity-40 bg-zinc-50 dark:bg-zinc-950" : ""
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Link>
        <Link
          href={hrefFor(Math.min(totalPages, currentPage + 1))}
          className={`inline-flex items-center gap-1 rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-[#1C1B19] dark:text-zinc-300 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 transition-colors shadow-sm ${
            currentPage >= totalPages ? "pointer-events-none opacity-40 bg-zinc-50 dark:bg-zinc-950" : ""
          }`}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}