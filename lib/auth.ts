import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

import prisma from "@/lib/prisma";
import { UserRole, UserPlan } from "@/types";
import bcrypt from "bcryptjs";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const providers: any[] = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_CLIENT_ID !== "" && process.env.GOOGLE_CLIENT_SECRET !== "") {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          avatar: profile.picture,
          role: UserRole.USER as any,
          plan: UserPlan.FREE as any,
        };
      },
    })
  );
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET && process.env.GITHUB_CLIENT_ID !== "" && process.env.GITHUB_CLIENT_SECRET !== "") {
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          avatar: profile.avatar_url,
          role: UserRole.USER as any,
          plan: UserPlan.FREE as any,
        };
      },
    })
  );
}

providers.push(
  CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      try {
        if (!credentials) {
          console.log("AUTH - No credentials provided");
          return null;
        }
        const normalizedEmail = credentials.email.trim().toLowerCase();
        const { email, password } = credentialsSchema.parse({ ...credentials, email: normalizedEmail });

        console.log("AUTH - Attempting login for:", email);
        console.log("AUTH - Password length:", password.length);

        const user = await prisma.user.findUnique({ where: { email } });

        console.log("AUTH - User found:", !!user);
        if (user) {
          console.log("AUTH - User ID:", user.id);
          console.log("AUTH - User email:", user.email);
          console.log("AUTH - Has password:", !!user.password);
          if (user.password) {
            console.log("AUTH - Password hash:", user.password.substring(0, 20) + "...");
            console.log("AUTH - Password hash length:", user.password.length);
          }
        }

        if (!user) {
          console.log("AUTH - User not found");
          return null;
        }

        if (!user.password) {
          console.log("AUTH - No password set for user");
          return null;
        }

        let isValid = false;
        let needsMigration = false;

        if (user.password.startsWith("$2b$") || user.password.startsWith("$2a$")) {
          console.log("AUTH - Using bcrypt comparison");
          isValid = bcrypt.compareSync(password, user.password);
          console.log("AUTH - Password validation (bcrypt):", isValid);
        } else {
          const oldHash = btoa(password);
          isValid = oldHash === user.password;
          needsMigration = isValid;
          console.log("AUTH - Password validation (btoa):", isValid, "needs migration:", needsMigration);
        }

        if (!isValid) {
          console.log("AUTH - Password mismatch");
          return null;
        }

        if (needsMigration) {
          try {
            const newHash = bcrypt.hashSync(password, 10);
            await prisma.user.update({
              where: { id: user.id },
              data: { password: newHash },
            });
            console.log("AUTH - Password migrated to bcrypt for:", email);
          } catch (migrationError) {
            console.error("AUTH - Password migration failed:", migrationError);
          }
        }

        console.log("AUTH - Login successful for:", email);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          role: user.role as any,
          plan: user.plan as any,
        };
      } catch (error) {
        console.error("AUTH - Credentials auth error:", error);
        return null;
      }
    },
  })
);

export const authOptions: NextAuthOptions = {
  providers,
  callbacks: {
    async signIn({ user, account, profile }) {
      if ((account?.provider === "google" || account?.provider === "github") && !user.email) {
        return false;
      }
      return true;
    },
    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        let appUser: any = user;

        if (account && account.provider !== "credentials") {
          if (!user.email) {
            return token;
          }

          try {
            const existingUser = await prisma.user.findUnique({ where: { email: user.email } });
            if (existingUser) {
              appUser = await prisma.user.update({
                where: { id: existingUser.id },
                data: {
                  name: existingUser.name ?? user.name ?? null,
                  avatar: existingUser.avatar ?? (user as any).avatar ?? (user as any).image ?? null,
                }
              });
            } else {
              appUser = await prisma.user.create({
                data: {
                  email: user.email,
                  name: user.name ?? null,
                  avatar: (user as any).avatar ?? (user as any).image ?? null,
                  role: "USER",
                  plan: "FREE",
                }
              });
            }
            
            // Upsert OAuth Account
            await prisma.oAuthAccount.upsert({
              where: {
                provider_providerAccountId: {
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                }
              },
              update: {},
              create: {
                userId: appUser.id,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                email: user.email,
              }
            });
          } catch (error) {
            console.error("AUTH - OAuth user upsert failed:", error);

          }
        }

        token.id = appUser.id;
        token.role = appUser.role;
        token.plan = appUser.plan;
        token.avatar = appUser.avatar;
        token.email = appUser.email;
        token.name = appUser.name;
      }

      if (trigger === "update" && session) {
        token.name = session.name;
        token.avatar = session.avatar;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const typedUser = session.user as any;
        typedUser.id = token.id as string;
        typedUser.role = token.role as any;
        typedUser.plan = token.plan as any;
        typedUser.avatar = token.avatar as string | null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
    newUser: "/dashboard",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain: process.env.NODE_ENV === "production" ? undefined : undefined,
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "any-random-string-for-local-testing-12345",
};

export function hasRequiredRole(userRole: string, requiredRole: string) {
  const roleHierarchy = ["USER", "COUNSELOR", "ADMIN"];
  const userIndex = roleHierarchy.indexOf(userRole);
  const requiredIndex = roleHierarchy.indexOf(requiredRole);
  return userIndex >= requiredIndex;
}

export async function hasActiveSubscription(userId: string, minimumPlan: string = "PRO") {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true }
  });
  if (!user) return false;
  
  if (minimumPlan === "PRO" && (user.plan === "PRO" || user.plan === "PREMIUM")) return true;
  if (minimumPlan === "PREMIUM" && user.plan === "PREMIUM") return true;
  return false;
}

export async function checkRateLimit(
  userId: string,
  action: string,
  limit: number = 10,
  windowSeconds: number = 60
) {
  // Redis removed - always allow
  return { allowed: true, remaining: limit - 1 };
}


import crypto from "crypto";

const SIGNATURE_SECRET = process.env.APP_SIGNATURE_SECRET!;
const SIGNATURE_TTL = 5 * 60 * 1000;

export function generateSignature(timestamp: string): string {
  if (!SIGNATURE_SECRET) {
    throw new Error("APP_SIGNATURE_SECRET not configured");
  }
  return crypto
    .createHmac("sha256", SIGNATURE_SECRET)
    .update(timestamp)
    .digest("hex");
}

export function verifySignature(sig: string, timestamp: string): boolean {
  if (!SIGNATURE_SECRET) {
    console.warn("APP_SIGNATURE_SECRET not configured, skipping signature check");
    return true;
  }

  try {
    const ts = parseInt(timestamp, 10);
    const now = Date.now();
    if (isNaN(ts) || Math.abs(now - ts) > SIGNATURE_TTL) {
      return false;
    }

    const expected = generateSignature(timestamp);
    return crypto.timingSafeEqual(
      Buffer.from(sig, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    return false;
  }
}

export function generateAuthHeaders(): Record<string, string> {
  const timestamp = Date.now().toString();
  const signature = generateSignature(timestamp);

  return {
    "x-timestamp": timestamp,
    "x-signature": signature,
    "x-api-version": process.env.API_VERSION || "v1",
  };
}

export function validateRequestSignature(headers: Headers): boolean {
  const signature = headers.get("x-signature");
  const timestamp = headers.get("x-timestamp");

  if (!signature || !timestamp) {
    return false;
  }

  return verifySignature(signature, timestamp);
}
