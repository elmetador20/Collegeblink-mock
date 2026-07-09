import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Razorpay from "razorpay";

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
        monthly: 9900, 
        yearly: 7900, 
      },
      PREMIUM: {
        monthly: 29900, 
        yearly: 24900, 
      },
      LIFETIME: {
        monthly: 49900, 
        yearly: 49900,
      },
    };

    const amount = pricing[plan]?.[duration] || 9900;

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "",
    });

    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: session.user.id,
        plan,
        duration,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
