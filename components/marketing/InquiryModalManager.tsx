"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { StudentInquiryModal } from "./StudentInquiryModal";

const STORAGE_KEY = "cb_inquiry_submitted";

// Routes that run their own dedicated inquiry-modal flow and should
// never trigger this global auto-popup manager.
const EXCLUDED_PATHS = ["/neetrankpredictor"];

function hasSubmittedInquiry() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "true";
}

export function InquiryModalManager() {
  const pathname = usePathname();
  const isExcludedPath = EXCLUDED_PATHS.some(
    (path) => pathname === path || pathname?.startsWith(`${path}/`)
  );

  const [isOpen, setIsOpen] = useState(false);
  const [initialTriggered, setInitialTriggered] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Read submission state on mount (client-only)
  useEffect(() => {
    setSubmitted(hasSubmittedInquiry());
  }, []);

  useEffect(() => {
    if (submitted || isExcludedPath) return; // already submitted, or page has its own flow

    const handleManualOpen = () => setIsOpen(true);
    window.addEventListener("open-inquiry-modal", handleManualOpen);
    return () => window.removeEventListener("open-inquiry-modal", handleManualOpen);
  }, [submitted, isExcludedPath]);

  useEffect(() => {
    if (submitted || initialTriggered || isExcludedPath) return;

    const timeout = setTimeout(() => {
      setIsOpen(true);
      setInitialTriggered(true);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [submitted, initialTriggered, isExcludedPath]);

  useEffect(() => {
    if (submitted || isOpen || isExcludedPath) return;

    const interval = setInterval(() => {
      setIsOpen(true);
    }, 30000);

    return () => clearInterval(interval);
  }, [submitted, isOpen, isExcludedPath]);

  const handleSuccess = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setSubmitted(true);
  };

  // Skip entirely on pages that manage their own inquiry-modal flow,
  // or once the user has already submitted.
  if (submitted || isExcludedPath) return null;

  return (
    <StudentInquiryModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSuccess={handleSuccess}
    />
  );
}