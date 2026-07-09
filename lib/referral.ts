
export interface ReferralData {
  userId: string;
  referralCode: string;
  referralCount: number;
  unlockedPremium: boolean;
  premiumUnlockedAt: number | null;
}

const REFERRAL_THRESHOLD = 3; 
const PREMIUM_UNLOCK_DURATION = 7 * 24 * 60 * 60 * 1000; 

export function generateReferralCode(userId: string): string {

  const base = userId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${base}${random}`.toUpperCase();
}

export function generateReferralLink(userId: string): string {
  const code = generateReferralCode(userId);
  return `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/ref/${code}`;
}

export function checkReferralThreshold(referralCount: number): boolean {
  return referralCount >= REFERRAL_THRESHOLD;
}

export function calculatePremiumExpiry(referralCount: number): number | null {
  if (!checkReferralThreshold(referralCount)) return null;

  const cycles = Math.floor(referralCount / REFERRAL_THRESHOLD);
  return Date.now() + (cycles * PREMIUM_UNLOCK_DURATION);
}

export function getReferralProgress(referralCount: number): {
  current: number;
  required: number;
  percentage: number;
  remaining: number;
} {
  return {
    current: referralCount,
    required: REFERRAL_THRESHOLD,
    percentage: Math.min(100, (referralCount / REFERRAL_THRESHOLD) * 100),
    remaining: Math.max(0, REFERRAL_THRESHOLD - referralCount),
  };
}
