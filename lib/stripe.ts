import Stripe from "stripe";
import * as backend from "./backend";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export const PRICE_IDS = {
  PRO_MONTHLY: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || "price_pro_monthly",
  PRO_YEARLY: process.env.STRIPE_PRO_YEARLY_PRICE_ID || "price_pro_yearly",
  PREMIUM_MONTHLY: process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID || "price_premium_monthly",
  PREMIUM_YEARLY: process.env.STRIPE_PREMIUM_YEARLY_PRICE_ID || "price_premium_yearly",
};

export const PLAN_FEATURES = {
  FREE: {
    name: "Free",
    price: 0,
    features: [
      "Browse all colleges",
      "Basic college search & filters",
      "View college details",
      "Save up to 5 colleges",
      "Community forum access",
      "Basic scholarship listings",
    ],
    limits: {
      savedColleges: 5,
      aiChatsPerDay: 0,
      essayReviewsPerMonth: 0,
      applications: 3,
      documents: 3,
    },
  },
  PRO: {
    name: "Pro",
    monthlyPrice: 499,
    yearlyPrice: 4790, 
    features: [
      "Everything in Free, plus:",
      "AI College Counselor (20 chats/day)",
      "Save unlimited colleges",
      "Application tracker",
      "Deadline notifications",
      "AI Admit Predictor",
      "Scholarship matcher",
      "Document vault (10 documents)",
      "Compare up to 4 colleges",
      "Priority support",
    ],
    limits: {
      savedColleges: Infinity,
      aiChatsPerDay: 20,
      essayReviewsPerMonth: 2,
      applications: 10,
      documents: 10,
    },
  },
  PREMIUM: {
    name: "Premium",
    monthlyPrice: 999,
    yearlyPrice: 9590, 
    features: [
      "Everything in Pro, plus:",
      "Unlimited AI chats",
      "Essay/SOP Reviewer (unlimited)",
      "1-on-1 Alumni Connect",
      "Advanced AI features",
      "Personalized shortlist builder",
      "Document vault (unlimited)",
      "Export data & reports",
      "Calendar sync for deadlines",
      "24/7 Priority support",
    ],
    limits: {
      savedColleges: Infinity,
      aiChatsPerDay: Infinity,
      essayReviewsPerMonth: Infinity,
      applications: Infinity,
      documents: Infinity,
    },
  },
};

export async function createCheckoutSession(
  userId: string,
  plan: "PRO" | "PREMIUM",
  billingCycle: "monthly" | "yearly",
  customerEmail: string
) {
  const priceId =
    plan === "PRO"
      ? billingCycle === "yearly"
        ? PRICE_IDS.PRO_YEARLY
        : PRICE_IDS.PRO_MONTHLY
      : billingCycle === "yearly"
      ? PRICE_IDS.PREMIUM_YEARLY
      : PRICE_IDS.PREMIUM_MONTHLY;

  const existingSubscription = await backend.getSubscriptionByUserId(userId);

  const session = await stripe.checkout.sessions.create({
    customer: existingSubscription?.stripeCustomerId || undefined,
    customer_email: existingSubscription?.stripeCustomerId ? undefined : customerEmail,
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    allow_promotion_codes: true,
    subscription_data: {
      metadata: {
        userId,
        plan,
      },
    },
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?payment=success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/pricing?payment=cancelled`,
  });

  return session;
}

export async function createPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXTAUTH_URL}/dashboard`,
  });

  return session;
}

export async function handleWebhookEvent(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = (session as any).metadata?.userId;
      const plan = (session as any).metadata?.plan;

      if (!userId || !plan) {
        console.error("Missing userId or plan in checkout session");
        return;
      }

      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

      await backend.upsertSubscriptionFromCheckout({
        userId,
        plan,
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0].price.id,
        status: subscription.status,
        currentPeriodStart: subscription.current_period_start * 1000,
        currentPeriodEnd: subscription.current_period_end * 1000,
      });

      break;
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);

      await backend.updateSubscriptionByStripeId({
        stripeSubscriptionId: subscription.id,
        status: subscription.status,
        currentPeriodStart: subscription.current_period_start * 1000,
        currentPeriodEnd: subscription.current_period_end * 1000,
      });

      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);

      await backend.updateSubscriptionByStripeId({
        stripeSubscriptionId: subscription.id,
        status: subscription.status,
      });

      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;

      await backend.deleteSubscriptionByStripeId(subscription.id);

      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;

      await backend.updateSubscriptionByStripeId({
        stripeSubscriptionId: subscription.id,
        status: subscription.status,
        currentPeriodStart: subscription.current_period_start * 1000,
        currentPeriodEnd: subscription.current_period_end * 1000,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      });

      break;
    }
  }
}

export async function checkPlanLimit(
  userId: string,
  limitType: keyof (typeof PLAN_FEATURES)["FREE"]["limits"]
): Promise<{ allowed: boolean; current: number; limit: number }> {
  return await backend.checkPlanLimit(userId, limitType);
}
