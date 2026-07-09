"use client";

import { Button } from "@/components/ui/button";
import { Heart, Share2, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { track } from "@/lib/track";
import { toast } from "sonner";

export function CollegeDetailActions({ college, isInternational }: { college: any; isInternational: boolean }) {
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!", {
      description: "You can now share this college's details.",
    });
    track("college_shared", { collegeId: college.id, collegeName: college.name });
  };

  const handleApply = () => {
    window.dispatchEvent(new CustomEvent("open-inquiry-modal"));
    track("college_apply_clicked", { collegeId: college.id, collegeName: college.name });
  };

  return (
    <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
      <Button
        variant="outline"
        size="sm"
        className="rounded-xl border-border/50 hover:border-red-400/40 hover:bg-red-400/8 hover:text-red-400 transition-all gap-2"
        onClick={() => {
          toast.info("Coming soon!", { description: "Saving colleges to your profile is being enabled." });
          track("college_saved", { collegeId: college.id, collegeName: college.name });
        }}
      >
        <Heart className="h-4 w-4" />
        Save
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="rounded-xl border-border/50 gap-2"
        onClick={handleShare}
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>
      <Link href="/compare">
        <Button variant="outline" size="sm" className="rounded-xl border-border/50 gap-2 w-full">
          ⚔️ Compare
        </Button>
      </Link>
      <Button
        size="sm"
        className="rounded-xl bg-gradient-to-r from-accent to-violet-500 text-white hover:shadow-accent/30 hover:shadow-lg gap-2 font-semibold"
        onClick={handleApply}
      >
        Apply Now
        <ExternalLink className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

export function CollegeStickyActions({ college, isInternational }: { college: any; isInternational: boolean }) {
    const handleApply = () => {
        window.dispatchEvent(new CustomEvent("open-inquiry-modal"));
        track("college_apply_clicked", { collegeId: college.id, collegeName: college.name });
    };

    return (
        <div className="flex items-center gap-3">
            <Link href="/compare">
                <Button variant="outline" size="sm" className="rounded-xl border-border/50 gap-2 hidden sm:flex">
                    ⚔️ Compare
                </Button>
            </Link>
            <Button
                size="sm"
                className="rounded-xl bg-gradient-to-r from-accent to-violet-500 text-white font-semibold shadow-lg shadow-accent/25 gap-2"
                onClick={handleApply}
            >
                Apply Now
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
