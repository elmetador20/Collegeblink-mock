"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CircularScoreProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showLabel?: boolean;
}

export default function CircularScore({
  score,
  size = 48,
  strokeWidth = 3,
  className,
  showLabel = true,
}: CircularScoreProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 80) return "from-accent to-accent";
    if (score >= 60) return "from-cyan-400 to-blue-500";
    if (score >= 40) return "from-yellow-400 to-orange-500";
    return "from-red-400 to-pink-500";
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />
        
        
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
          }}
        />
        
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      
      {showLabel && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className={cn(
            "text-sm font-bold",
            score >= 80 ? "text-accent dark:text-accent" :
            score >= 60 ? "text-cyan-700 dark:text-cyan-400" :
            score >= 40 ? "text-yellow-700 dark:text-yellow-400" :
            "text-red-600 dark:text-red-400"
          )}>
            {score}%
          </span>
        </motion.div>
      )}
    </div>
  );
}
