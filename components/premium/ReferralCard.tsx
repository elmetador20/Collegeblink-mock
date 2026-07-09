"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Gift, Users, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { generateReferralLink, getReferralProgress } from "@/lib/referral";

interface ReferralCardProps {
  userId: string;
  referralCount: number;
}

export function ReferralCard({ userId, referralCount }: ReferralCardProps) {
  const [copied, setCopied] = useState(false);
  
  const referralLink = generateReferralLink(userId);
  const progress = getReferralProgress(referralCount);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success("Referral link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join CollegeBlink",
          text: "Use my referral link to unlock premium features!",
          url: referralLink,
        });
      } catch (error) {
        toast.error("Failed to share");
      }
    } else {
      handleCopy();
    }
  };

  return (
    <Card className="glass-card border-gradient-to-r from-purple-500/30 to-blue-500/30 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Gift className="h-6 w-6 text-white" />
            </div>
          </div>
          
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-700 dark:text-purple-400" />
                Refer & Earn Premium
              </h3>
              <p className="text-sm text-muted-foreground">
                Invite {progress.remaining} more friends to unlock 7 days of Premium
              </p>
            </div>
            
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-purple-700 dark:text-purple-400 font-semibold">{progress.current}/{progress.required}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress.percentage}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                />
              </div>
            </div>

            
            <div className="flex gap-2">
              <div className="flex-1 bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm text-muted-foreground truncate">
                {referralLink}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                onClick={handleShare}
                className="bg-gradient-to-r from-purple-500 to-blue-500 shrink-0"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
