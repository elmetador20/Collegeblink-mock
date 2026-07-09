import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import ResponsiveLayout from "@/components/layout/ResponsiveLayout";
import { InquiryModalManager } from "@/components/marketing/InquiryModalManager";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResponsiveLayout>
      <div className="relative min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="relative flex-1">{children}</main>
        <Footer />
        <InquiryModalManager />
      </div>
    </ResponsiveLayout>
  );
}
