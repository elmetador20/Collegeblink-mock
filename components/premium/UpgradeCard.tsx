"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles, TrendingUp, Zap, Crown } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface UpgradeCardProps {
  feature: string;
  title?: string;
  description?: string;
  compact?: boolean;
}

export function UpgradeCard({ feature, title, description, compact = false }: UpgradeCardProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
        <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
          <Lock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">Unlock {feature}</p>
          <p className="text-xs text-muted-foreground">Upgrade to Premium</p>
        </div>
        <Link href="/pricing">
          <Button size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500 text-xs">
            Upgrade
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Card className="glass-card border-purple-500/30 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Lock className="h-6 w-6 text-white" />
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Crown className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              {title || "Premium Feature"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {description || `Unlock ${feature} and all advanced features`}
            </p>
            
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md">
                <Sparkles className="h-3 w-3" />
                <span>Advanced Smart</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-blue-700 dark:text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">
                <TrendingUp className="h-3 w-3" />
                <span>Unlimited Access</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-accent dark:text-accent bg-accent/10 px-2 py-1 rounded-md">
                <Zap className="h-3 w-3" />
                <span>Priority Support</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border/50">
          <Link href="/pricing">
            <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              Upgrade Now
            </Button>
          </Link>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Starting at ₹99/month • Cancel anytime
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function FeatureLock({ children, feature }: { children: React.ReactNode; feature: string }) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
        <div className="text-center p-4">
          <Lock className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-white">{feature}</p>
          <Link href="/pricing">
            <Button size="sm" className="mt-2 bg-gradient-to-r from-purple-500 to-blue-500">
              Unlock
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
