


export type TrackEvent = 
  | "signup"
  | "login"
  | "onboarding_complete"
  | "search_used"
  | "college_viewed"
  | "college_saved"
  | "compare_started"
  | "compare_completed"
  | "upgrade_clicked"
  | "payment_success"
  | "college_shared"
  | "college_apply_clicked"
  | "institute_callback_clicked"
  | "page_view";

export interface TrackData {
  userId?: string;
  collegeId?: string;
  collegeName?: string;
  plan?: string;
  amount?: number;
  [key: string]: any;
}

export function track(event: TrackEvent, data?: TrackData) {
  console.log("TRACK:", event, data);

  if (typeof window !== "undefined") {
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, data, timestamp: new Date().toISOString() }),
    }).catch((err) => console.error("Analytics tracking failed:", err));
  }




}
