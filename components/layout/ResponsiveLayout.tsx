"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BottomNav from "../mobile/BottomNav";

export default function ResponsiveLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia("(max-width: 768px)");
    setIsMobile(media.matches);

    const listener = () => setIsMobile(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  if (!isMobile) {
    return <>{children}</>; 
  }

  return (
    <div className="min-h-screen bg-background safe-area-all">
      <main>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {children}
        </motion.div>
      </main>
      <BottomNav />
    </div>
  );
}
