"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check, Copy } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
  url?: string;
  title?: string;
  text?: string;
}

export function ShareButton({ url, title, text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    const shareTitle = title || "Compare Colleges on CollegeBlink";
    const shareText = text || "I found this amazing tool to compare colleges!";

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        toast.success("Shared successfully!");
      } catch (error) {
        console.error("Share failed:", error);
      }
    } else {

      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      {copied ? (
        <Check className="h-4 w-4" />
      ) : (
        <Share2 className="h-4 w-4" />
      )}
      {copied ? "Copied!" : "Share"}
    </Button>
  );
}
