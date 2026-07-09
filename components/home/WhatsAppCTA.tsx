"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppCTA() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "919278115957"; 
    const message = encodeURIComponent("Hi! I need help with college admissions.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 1 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleWhatsAppClick}
        className="relative flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all"
      >
        
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-green-500/30 blur-lg"
        />
        
        <div className="relative flex items-center gap-3">
          <MessageCircle className="h-6 w-6" />
          <span className="font-semibold text-base hidden sm:inline-block">
            Talk to Expert
          </span>
        </div>
      </motion.button>
    </motion.div>
  );
}
