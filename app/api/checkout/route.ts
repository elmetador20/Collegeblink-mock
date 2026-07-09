import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { plan, duration } = await req.json();

    const pricing: Record<string, Record<string, number>> = {
      PRO: {
        monthly: 99,
        yearly: 79,
      },
      PREMIUM: {
        monthly: 299,
        yearly: 249,
      },
      LIFETIME: {
        monthly: 499,
        yearly: 499,
      },
    };

    const amount = pricing[plan]?.[duration] || 99;


    const mockOrderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return NextResponse.json({
      orderId: mockOrderId,
      amount: amount,
      currency: "INR",
      keyId: process.env.RAZORPAY_KEY_ID || "rzp_mock_key",

      mock: true,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}
