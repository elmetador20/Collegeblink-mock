import * as React from "react";

interface DeadlineReminderEmailProps {
  name: string;
  collegeName: string;
  deadline: string;
  daysLeft: number;
  applicationUrl: string;
}

export const DeadlineReminderEmail: React.FC<DeadlineReminderEmailProps> = ({
  name,
  collegeName,
  deadline,
  daysLeft,
  applicationUrl,
}) => (
  <div style={styles.container}>
    <div style={styles.header}>
      <h1 style={styles.logo}>CollegeBlink</h1>
    </div>
    <div style={styles.content}>
      <div style={styles.alertBox}>
        <span style={styles.alertIcon}>⏰</span>
        <span style={styles.alertText}>Application Deadline Approaching</span>
      </div>

      <h2 style={styles.heading}>Hi {name},</h2>
      <p style={styles.text}>
        This is a friendly reminder that your application deadline for{" "}
        <strong style={styles.highlight}>{collegeName}</strong> is approaching.
      </p>

      <div style={styles.deadlineBox}>
        <p style={styles.deadlineLabel}>Application Deadline</p>
        <p style={styles.deadlineDate}>{deadline}</p>
        <p style={styles.daysLeft}>
          {daysLeft === 0
            ? "Today is the last day!"
            : daysLeft === 1
            ? "1 day left"
            : `${daysLeft} days left`}
        </p>
      </div>

      <div style={styles.actionSection}>
        <a href={applicationUrl} style={styles.button}>
          Complete Application
        </a>
      </div>

      <div style={styles.tipsSection}>
        <h3 style={styles.tipsHeading}>Before you submit:</h3>
        <ul style={styles.tipsList}>
          <li style={styles.tipItem}>✓ Review all required documents</li>
          <li style={styles.tipItem}>✓ Double-check personal information</li>
          <li style={styles.tipItem}>✓ Proofread your essay/SOP</li>
          <li style={styles.tipItem}>✓ Verify entrance exam scores are updated</li>
        </ul>
      </div>

      <p style={styles.footer}>
        Need help? Contact our support team at{" "}
        <a href="mailto:support@collegeblink.com" style={styles.link}>
          support@collegeblink.com
        </a>
      </p>
    </div>
    <div style={styles.footerSection}>
      <p style={styles.footerText}>
        © 2024 CollegeBlink. All rights reserved.
      </p>
    </div>
  </div>
);

const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#0a0e27",
    borderRadius: "8px",
    overflow: "hidden",
  },
  header: {
    background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
    padding: "24px",
    textAlign: "center" as const,
  },
  logo: {
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
  },
  content: {
    padding: "32px",
    color: "#ffffff",
  },
  alertBox: {
    backgroundColor: "rgba(234, 179, 8, 0.2)",
    border: "1px solid rgba(234, 179, 8, 0.3)",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center" as const,
    marginBottom: "24px",
  },
  alertIcon: {
    fontSize: "24px",
    marginRight: "8px",
  },
  alertText: {
    color: "#fbbf24",
    fontWeight: "600",
    fontSize: "16px",
  },
  heading: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "16px",
    color: "#ffffff",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#94a3b8",
    marginBottom: "24px",
  },
  highlight: {
    color: "#6366f1",
  },
  deadlineBox: {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderRadius: "8px",
    padding: "24px",
    textAlign: "center" as const,
    marginBottom: "24px",
  },
  deadlineLabel: {
    fontSize: "14px",
    color: "#94a3b8",
    marginBottom: "8px",
  },
  deadlineDate: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: "8px",
  },
  daysLeft: {
    fontSize: "18px",
    color: "#ef4444",
    fontWeight: "600",
  },
  actionSection: {
    textAlign: "center" as const,
    marginBottom: "32px",
  },
  button: {
    display: "inline-block",
    background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
    color: "#ffffff",
    textDecoration: "none",
    padding: "14px 32px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
  },
  tipsSection: {
    backgroundColor: "rgba(6, 182, 212, 0.1)",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "24px",
  },
  tipsHeading: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#06b6d4",
    marginBottom: "12px",
  },
  tipsList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  tipItem: {
    fontSize: "14px",
    color: "#e2e8f0",
    marginBottom: "8px",
  },
  footer: {
    fontSize: "14px",
    color: "#64748b",
    textAlign: "center" as const,
  },
  link: {
    color: "#6366f1",
    textDecoration: "none",
  },
  footerSection: {
    backgroundColor: "#070a1c",
    padding: "20px",
    textAlign: "center" as const,
  },
  footerText: {
    fontSize: "12px",
    color: "#475569",
    margin: 0,
  },
};

export default DeadlineReminderEmail;
