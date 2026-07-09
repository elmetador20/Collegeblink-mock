"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function CollegesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Colleges error:", error);
  }, [error]);

  return (
    <div className="page-shell flex min-h-screen items-center justify-center px-4">
      <div className="text-center max-w-md">
        <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Failed to load colleges</h2>
        <p className="text-muted-foreground mb-6">
          {error.message || "An error occurred while loading colleges"}
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset} className="bg-indigo-500 hover:bg-indigo-600">
            Try again
          </Button>
          <Link href="/">
            <Button className="border border-border/80 bg-transparent text-foreground hover:bg-accent/70">
              Go home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
