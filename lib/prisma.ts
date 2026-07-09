import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Next.js Dev/Turbopack Cache Buster:
// If the global client was cached before the new BlogPost schema was pushed,
// reset it to force a fresh PrismaClient instantiation with the updated model.
if (global.prisma && !("blogPost" in global.prisma)) {
  global.prisma = undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
