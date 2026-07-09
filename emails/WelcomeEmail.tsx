import * as React from "react";

interface WelcomeEmailProps {
  name: string;
  loginUrl: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ name, loginUrl }) => (
  <div style={styles.container}>
    <div style={styles.header}>
      <h1 style={styles.logo}>CollegeBlink</h1>
    </div>
    <div style={styles.content}>
      <h2 style={styles.heading}>Welcome to CollegeBlink, {name}!</h2>
      <p style={styles.text}>
        We're excited to help you on your journey to find the perfect college. 
        With smart-powered recommendations and comprehensive college data, you're just 
        a few steps away from making informed decisions about your future.
      </p>
      
      <div style={styles.features}>
        <h3 style={styles.subheading}>Here's what you can do:</h3>
        <ul style={styles.list}>
          <li style={styles.listItem}>🔍 Search and compare colleges</li>
          <li style={styles.listItem}>🤖 Chat with our Smart counselor</li>
          <li style={styles.listItem}>📊 Track your applications</li>
          <li style={styles.listItem}>💰 Find matching scholarships</li>
          <li style={styles.listItem}>📈 Get admission predictions</li>
        </ul>
      </div>

      <a href={loginUrl} style={styles.button}>
        Get Started
      </a>

      <p style={styles.footer}>
        Need help? Reply to this email or visit our help center at{" "}
        <a href="https://collegeblink.com/help" style={styles.link}>collegeblink.com/help</a>
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
    padding: "32px",
    textAlign: "center" as const,
  },
  logo: {
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: "bold",
    margin: 0,
  },
  content: {
    padding: "32px",
    color: "#ffffff",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
    color: "#ffffff",
  },
  subheading: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#6366f1",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#94a3b8",
    marginBottom: "24px",
  },
  features: {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "24px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    fontSize: "15px",
    color: "#e2e8f0",
    marginBottom: "10px",
    paddingLeft: "8px",
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
    textAlign: "center" as const,
  },
  footer: {
    fontSize: "14px",
    color: "#64748b",
    marginTop: "32px",
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

export default WelcomeEmail;
