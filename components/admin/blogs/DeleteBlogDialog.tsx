"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Loader2 } from "lucide-react";

interface DeleteBlogDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  blogTitle: string;
  deleting: boolean;
}

export function DeleteBlogDialog({
  isOpen,
  onClose,
  onConfirm,
  blogTitle,
  deleting,
}: DeleteBlogDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1C1B19]/30 backdrop-blur-[1.5px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
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
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 dark:bg-rose-950/20 border border-red-100 dark:border-rose-900/30 text-[#A23B2E]">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-[#1C1B19] dark:text-zinc-100">Delete Blog Post?</h3>
                <p className="mt-2 text-sm text-[#6B6660] dark:text-zinc-400 leading-relaxed">
                  Are you sure you want to delete <span className="font-semibold text-[#1C1B19] dark:text-zinc-200">"{blogTitle}"</span>? This will permanently remove the article from the public index.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#E3DFD6] dark:border-zinc-800 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={deleting}
                className="rounded-lg border border-[#E3DFD6] dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2 text-sm font-semibold text-[#6B6660] dark:text-zinc-400 hover:bg-[#FAF8F4] dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={deleting}
                className="rounded-lg bg-[#A23B2E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#A23B2E]/90 transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                {deleting ? (
                  <>
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
