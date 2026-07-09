import { useState, useEffect } from "react";
import { getUserPlan, SubscriptionPlan, hasFeature, isPremium, SubscriptionLimits } from "@/lib/subscription";

export function useSubscription() {
  const [plan, setPlan] = useState<SubscriptionPlan>("FREE");
  const [loading, setLoading] = useState(true);

  useEffect(() => {


    setPlan("FREE");
    setLoading(false);
  }, []);

  return {
    plan,
    loading,
    isPremium: isPremium(plan),
    hasFeature: (feature: keyof SubscriptionLimits) => hasFeature(plan, feature),
    canUpgrade: plan === "FREE",
  };
}

export function useFeatureGate(feature: keyof SubscriptionLimits) {
  const { plan, loading, hasFeature } = useSubscription();
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    if (!loading && !hasFeature(feature)) {

      const timer = setTimeout(() => setShowUpgrade(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [loading, hasFeature, feature]);

  return {
    canAccess: hasFeature(feature),
    loading,
    showUpgrade,
    dismissUpgrade: () => setShowUpgrade(false),
  };
}
