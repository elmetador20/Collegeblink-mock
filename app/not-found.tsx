"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, GraduationCap, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="page-shell flex min-h-screen items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="relative mb-8">
          <div className="text-[150px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400/20 to-cyan-400/20 leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            className="border-border/80 text-foreground hover:bg-accent/70"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button
            className="bg-gradient-to-r from-indigo-500 to-cyan-500"
            asChild
          >
            <Link href="/colleges">
              <Search className="mr-2 h-4 w-4" />
              Search Colleges
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
