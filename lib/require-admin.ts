import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { ok: false as const, status: 401, error: "Unauthorized" };
  }

  if (session.user.role !== "ADMIN") {
    return { ok: false as const, status: 403, error: "Forbidden" };
  }

  return { ok: true as const, user: session.user };
}