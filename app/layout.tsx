import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/shared/SessionProvider";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "CollegeBlink",
  description: "College discovery and application platform",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-sans`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
