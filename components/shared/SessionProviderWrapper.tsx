"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { type ReactNode } from "react";

export function SessionProviderWrapper({ children }: { children: ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
