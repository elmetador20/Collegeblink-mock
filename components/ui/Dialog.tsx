"use client";

import React from "react";
import { X, AlertTriangle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  confirmLoading?: boolean;
  type?: "danger" | "warning" | "info";
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  confirmLabel = "Confirm",
  onConfirm,
  confirmLoading = false,
  type = "info",
}: DialogProps) {
  const iconColors = {
    danger: "bg-red-50 text-[#A23B2E] border-red-100 dark:bg-rose-950/20 dark:border-rose-900/30",
    warning: "bg-amber-50 text-[#8C6422] border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30",
    info: "bg-blue-50 text-[#1F3A5C] border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30",
  };

  const confirmColors = {
    danger: "bg-[#A23B2E] hover:bg-[#A23B2E]/90 text-white",
    warning: "bg-[#8C6422] hover:bg-[#8C6422]/90 text-white",
    info: "bg-[#1F3A5C] hover:bg-[#1F3A5C]/90 text-white",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1C1B19]/35 backdrop-blur-[1.5px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            className="relative w-full max-w-md overflow-hidden rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xl z-10"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-md text-[#6B6660] hover:text-[#1C1B19] dark:hover:text-white p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex gap-4">
              <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-sm", iconColors[type])}>
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#1C1B19] dark:text-zinc-100">
                  {title}
                </h3>
                <p className="mt-2.5 text-sm text-[#6B6660] dark:text-zinc-400 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#E3DFD6]/60 dark:border-zinc-800/60 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={confirmLoading}
                className="rounded-xl border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2 text-sm font-semibold text-[#6B6660] dark:text-zinc-400 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={confirmLoading}
                className={cn("rounded-xl px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-1.5", confirmColors[type])}
              >
                {confirmLoading ? (
                  <>
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  confirmLabel
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
