"use client";

import { Send, Sparkles } from "lucide-react";

export function BlogCTA() {
  return (
    <div className="bg-gradient-to-br from-indigo-500/15 via-purple-500/5 to-cyan-500/5 rounded-3xl border border-indigo-500/20 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-500/[0.02]">
      <div className="space-y-2 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-bold uppercase tracking-wider">
          <Sparkles className="h-3 w-3" /> Need Customized Assistance?
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-foreground">
          Get Free Expert Counselling Today
        </h3>
        <p className="text-muted-foreground text-sm max-w-md">
          Struggling with exam strategy or selecting target colleges? Talk to our top counselors absolutely free.
        </p>
      </div>
      
      <button
        onClick={() => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("open-inquiry-modal"));
          }
        }}
        className="px-6 h-12 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
      >
        Get Free Counselling <Send className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
