import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, format, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatIndianNumber(num: number): string {
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)}Cr`;
  }
  if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)}L`;
  }
  return formatCurrency(num);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "MMM d, yyyy");
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

export function formatDeadline(date: string | Date): { text: string; urgent: boolean; expired: boolean } {
  const d = typeof date === "string" ? parseISO(date) : date;
  const now = new Date();
  const diffDays = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return {
    text: formatDate(d),
    urgent: diffDays <= 7 && diffDays > 0,
    expired: diffDays < 0,
  };
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 100);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    General: "bg-accent/15 text-accent dark:text-accent border-accent/30",
    OBC: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-400/30",
    SC: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-400/30",
    ST: "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-400/30",
    EWS: "bg-pink-500/15 text-pink-700 dark:text-pink-300 border-pink-400/30",
  };
  return colors[category] || "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-400/30";
}

export function getCollegeTypeColor(type: string): string {
  const colors: Record<string, string> = {
    GOVT: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-400/30",
    PRIVATE: "bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-400/30",
    DEEMED: "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-400/30",
    AUTONOMOUS: "bg-accent/15 text-accent dark:text-accent border-accent/30",
  };
  return colors[type] || "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-400/30";
}

export function getApplicationStatusColor(status: string): string {
  const colors: Record<string, string> = {
    DRAFT: "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-400/30",
    APPLIED: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-400/30",
    UNDER_REVIEW: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border-yellow-400/30",
    ACCEPTED: "bg-accent/15 text-accent dark:text-accent border-accent/30",
    REJECTED: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-400/30",
    WAITLISTED: "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-400/30",
  };
  return colors[status] || "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-400/30";
}

export function calculateAverageRating(reviews: { rating: number }[]): number {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export function generateAvatarColor(name: string): string {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-accent",
    "bg-accent",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-purple-500",
    "bg-fuchsia-500",
    "bg-pink-500",
    "bg-rose-500",
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function getFileIcon(mimeType: string): string {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType === "application/pdf") return "file-text";
  if (mimeType.includes("word")) return "file-text";
  if (mimeType.includes("excel") || mimeType.includes("sheet")) return "table";
  return "file";
}

export function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function sortByRelevance(
  colleges: any[],
  userProfile: {
    preferredCities?: string[];
    preferredStreams?: string[];
    budgetRange?: number | null;
  }
): any[] {
  return colleges.map((college) => {
    let score = 0;

    if (userProfile.preferredCities?.includes(college.city)) {
      score += 20;
    }

    if (userProfile.budgetRange && college.tuitionFees) {
      if (college.tuitionFees <= userProfile.budgetRange) {
        score += 15;
      }
    }

    if (userProfile.preferredStreams?.length && college.courses) {
      const hasMatchingStream = college.courses.some((c: any) =>
        userProfile.preferredStreams?.some((s) =>
          c.name.toLowerCase().includes(s.toLowerCase())
        )
      );
      if (hasMatchingStream) score += 25;
    }

    if (college.nirfRank) {
      score += Math.max(0, 30 - college.nirfRank / 10);
    }

    return { ...college, relevanceScore: score };
  }).sort((a, b) => b.relevanceScore - a.relevanceScore);
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function toTitleCase(str: string): string {
  return str
    .split("_")
    .map((word) => capitalize(word))
    .join(" ");
}
