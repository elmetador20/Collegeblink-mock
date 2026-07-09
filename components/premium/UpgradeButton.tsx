"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Sparkles, Lock } from "lucide-react";
import { track } from "@/lib/track";

interface UpgradeButtonProps {
  plan?: "PRO" | "PREMIUM" | "LIFETIME";
  duration?: "monthly" | "yearly";
  children?: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export function UpgradeButton({
  plan = "PRO",
  duration = "monthly",
  children,
  variant = "default",
  size = "default",
  className,
}: UpgradeButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    track("upgrade_clicked", { plan, duration });

    try {

      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, duration }),
      });

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_mock_key",
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "CollegeBlink",
        description: `${plan} Plan (${duration})`,
        image: "/favicon.ico",
        handler: async function (response: any) {

          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              plan,
            }),
          });

          if (verifyRes.ok) {

            track("payment_success", { plan, duration, amount: order.amount });
            toast.success("Payment successful! Premium unlocked.");
            setTimeout(() => window.location.reload(), 1500);
          } else {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#6366f1",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };
      script.onerror = () => {
        toast.error("Failed to load payment gateway");
        setLoading(false);
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to initiate payment");
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      variant={variant}
      size={size}
      className={className}
    >
      {loading ? (
        "Processing..."
      ) : children ? (
        children
      ) : (
        <>
          <Sparkles className="h-4 w-4 mr-2" />
          Upgrade to {plan}
        </>
      )}
    </Button>
  );
}

export function PremiumLockButton({
  feature,
  onClick,
}: {
  feature: string;
  onClick?: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="border-purple-500/30 hover:bg-purple-500/10"
    >
      <Lock className="h-4 w-4 mr-2" />
      Unlock {feature}
    </Button>
  );
}
