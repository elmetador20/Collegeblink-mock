import { Resend } from "resend";
import WelcomeEmail from "@/emails/WelcomeEmail";
import DeadlineReminderEmail from "@/emails/DeadlineReminderEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to: string, name: string) {
  try {
    const loginUrl = `${process.env.NEXTAUTH_URL}/login`;
    
    await resend.emails.send({
      from: "CollegeBlink <hello@collegeblink.com>",
      to,
      subject: "Welcome to CollegeBlink! Start Your College Journey",
      react: WelcomeEmail({ name, loginUrl }) as any,
    });
    
    return { success: true };
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return { success: false, error };
  }
}

export async function sendDeadlineReminderEmail(
  to: string,
  name: string,
  collegeName: string,
  deadline: Date,
  applicationId: string
) {
  try {
    const daysLeft = Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    const applicationUrl = `${process.env.NEXTAUTH_URL}/applications`;
    
    await resend.emails.send({
      from: "CollegeBlink <reminders@collegeblink.com>",
      to,
      subject: `⏰ Application Deadline: ${collegeName} (${daysLeft} days left)`,
      react: DeadlineReminderEmail({
        name,
        collegeName,
        deadline: deadline.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        daysLeft,
        applicationUrl,
      }) as any,
    });
    
    return { success: true };
  } catch (error) {
    console.error("Failed to send deadline reminder:", error);
    return { success: false, error };
  }
}

export async function sendApplicationStatusEmail(
  to: string,
  name: string,
  collegeName: string,
  status: string,
  courseName?: string
) {
  try {
    const statusMessages: Record<string, string> = {
      ACCEPTED: "Congratulations! Your application has been accepted.",
      REJECTED: "We regret to inform you that your application was not accepted.",
      UNDER_REVIEW: "Your application is currently under review.",
      WAITLISTED: "You have been placed on the waitlist.",
    };

    await resend.emails.send({
      from: "CollegeBlink <updates@collegeblink.com>",
      to,
      subject: `Application Update: ${collegeName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0e27; color: #fff; padding: 32px; border-radius: 8px;">
          <h1 style="color: #6366f1; margin-bottom: 24px;">CollegeBlink</h1>
          <h2 style="color: #fff;">Hi ${name},</h2>
          <p style="color: #94a3b8; font-size: 16px; line-height: 1.6;">
            ${statusMessages[status] || "Your application status has been updated."}
          </p>
          <div style="background: rgba(99, 102, 241, 0.1); padding: 20px; border-radius: 8px; margin: 24px 0;">
            <p style="margin: 0; color: #e2e8f0;"><strong>College:</strong> ${collegeName}</p>
            ${courseName ? `<p style="margin: 8px 0 0; color: #e2e8f0;"><strong>Course:</strong> ${courseName}</p>` : ""}
            <p style="margin: 8px 0 0; color: #e2e8f0;"><strong>Status:</strong> ${status}</p>
          </div>
          <a href="${process.env.NEXTAUTH_URL}/applications" 
             style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%); color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600;">
            View Application
          </a>
        </div>
      `,
    });
    
    return { success: true };
  } catch (error) {
    console.error("Failed to send status email:", error);
    return { success: false, error };
  }
}

export async function sendWeeklyDigestEmail(
  to: string,
  name: string,
  stats: {
    newScholarships: number;
    upcomingDeadlines: number;
    savedCollegesCount: number;
  }
) {
  try {
    await resend.emails.send({
      from: "CollegeBlink <digest@collegeblink.com>",
      to,
      subject: "Your Weekly CollegeBlink Digest",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0e27; color: #fff; padding: 32px; border-radius: 8px;">
          <h1 style="color: #6366f1; margin-bottom: 24px;">CollegeBlink</h1>
          <h2 style="color: #fff;">Hi ${name}, here's your weekly update!</h2>
          
          <div style="display: grid; gap: 16px; margin: 24px 0;">
            <div style="background: rgba(99, 102, 241, 0.1); padding: 20px; border-radius: 8px;">
              <p style="margin: 0; font-size: 32px; font-weight: bold; color: #6366f1;">${stats.newScholarships}</p>
              <p style="margin: 4px 0 0; color: #94a3b8;">New scholarships matching your profile</p>
            </div>
            <div style="background: rgba(234, 179, 8, 0.1); padding: 20px; border-radius: 8px;">
              <p style="margin: 0; font-size: 32px; font-weight: bold; color: #fbbf24;">${stats.upcomingDeadlines}</p>
              <p style="margin: 4px 0 0; color: #94a3b8;">Upcoming application deadlines</p>
            </div>
            <div style="background: rgba(6, 182, 212, 0.1); padding: 20px; border-radius: 8px;">
              <p style="margin: 0; font-size: 32px; font-weight: bold; color: #06b6d4;">${stats.savedCollegesCount}</p>
              <p style="margin: 4px 0 0; color: #94a3b8;">Colleges saved</p>
            </div>
          </div>
          
          <a href="${process.env.NEXTAUTH_URL}/dashboard" 
             style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%); color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600;">
            View Dashboard
          </a>
        </div>
      `,
    });
    
    return { success: true };
  } catch (error) {
    console.error("Failed to send digest email:", error);
    return { success: false, error };
  }
}
