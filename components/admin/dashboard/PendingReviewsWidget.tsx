"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle, XCircle, Star, Clock } from "lucide-react";

interface Review {
  id: string;
  reviewer: string;
  college: string;
  rating: number;
  submitted: string;
  avatar: string;
}

const MOCK_REVIEWS: Review[] = [
  { id: "r1", reviewer: "Aarav Sharma", college: "IIT Bombay", rating: 5, submitted: "2h ago", avatar: "AS" },
  { id: "r2", reviewer: "Priya Nair", college: "NIT Trichy", rating: 4, submitted: "5h ago", avatar: "PN" },
  { id: "r3", reviewer: "Rohan Mehta", college: "BITS Pilani", rating: 3, submitted: "Yesterday", avatar: "RM" },
  { id: "r4", reviewer: "Sneha Gupta", college: "VIT Vellore", rating: 5, submitted: "2d ago", avatar: "SG" },
];

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`h-3 w-3 ${s <= value ? "fill-amber-400 text-amber-400" : "text-zinc-200 dark:text-zinc-700"}`} />
      ))}
    </div>
  );
}

export function PendingReviewsWidget() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Pending Reviews</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Student reviews awaiting moderation</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-700 dark:text-rose-400 text-[10px] font-bold px-2.5 py-0.5">
          {MOCK_REVIEWS.length} pending
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-800">
              <th className="px-6 py-3">Reviewer</th>
              <th className="px-4 py-3">College</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/80">
            {MOCK_REVIEWS.map((r) => (
              <tr key={r.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-colors duration-150 group">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                      {r.avatar}
                    </div>
                    <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 whitespace-nowrap">{r.reviewer}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap">{r.college}</td>
                <td className="px-4 py-3"><StarRating value={r.rating} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
                    <Clock className="h-3 w-3" />
                    {r.submitted}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 text-xs font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors duration-150">
                      <CheckCircle className="h-3 w-3" /> Approve
                    </button>
                    <button className="inline-flex items-center gap-1 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-700 dark:text-rose-400 px-2.5 py-1 text-xs font-semibold hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors duration-150">
                      <XCircle className="h-3 w-3" /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 border-t border-zinc-100 dark:border-zinc-800">
        <Link href="/admin/colleges" className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
          View all reviews →
        </Link>
      </div>
    </div>
  );
}
