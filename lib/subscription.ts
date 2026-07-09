import * as backend from "@/lib/backend";

export type SubscriptionPlan = "FREE" | "PRO" | "PREMIUM";

export interface SubscriptionLimits {
  maxComparisons: number;
  maxSavedColleges: number;
  advancedInsights: boolean;
  smartRecommendations: boolean;
  admissionStrategy: boolean;
  profileBoost: boolean;
}

export const SUBSCRIPTION_LIMITS: Record<SubscriptionPlan, SubscriptionLimits> = {
  FREE: {
    maxComparisons: 3,
    maxSavedColleges: 10,
    advancedInsights: false,
    smartRecommendations: false,
    admissionStrategy: false,
    profileBoost: false,
  },
  PRO: {
    maxComparisons: 10,
    maxSavedColleges: 50,
    advancedInsights: true,
    smartRecommendations: true,
    admissionStrategy: false,
    profileBoost: false,
  },
  PREMIUM: {
    maxComparisons: Infinity,
    maxSavedColleges: Infinity,
    advancedInsights: true,
    smartRecommendations: true,
    admissionStrategy: true,
    profileBoost: true,
  },
};

export async function getUserPlan(userId: string): Promise<SubscriptionPlan> {
  try {
    const user = await backend.getUserById(userId);
    return (user as any)?.plan || "FREE";
  } catch (error) {
    return "FREE";
  }
}

export function hasFeature(plan: SubscriptionPlan, feature: keyof SubscriptionLimits): boolean {
  const value = SUBSCRIPTION_LIMITS[plan][feature];
  return typeof value === 'boolean' ? value : value > 0;
}

export function canCompare(collegeId: string, userId: string, currentComparisons: number, plan: SubscriptionPlan): boolean {
  const limits = SUBSCRIPTION_LIMITS[plan];
  return currentComparisons < (limits.maxComparisons === Infinity ? 1000 : limits.maxComparisons);
}

export function canSaveCollege(userId: string, currentSaved: number, plan: SubscriptionPlan): boolean {
  const limits = SUBSCRIPTION_LIMITS[plan];
  return currentSaved < limits.maxSavedColleges;
}

export function isPremium(plan: SubscriptionPlan): boolean {
  return plan === "PRO" || plan === "PREMIUM";
}

export function getUpgradePath(currentPlan: SubscriptionPlan): SubscriptionPlan {
  if (currentPlan === "FREE") return "PRO";
  if (currentPlan === "PRO") return "PREMIUM";
  return "PREMIUM";
}
