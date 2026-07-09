import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as backend from "@/lib/backend";
import { track } from "@/lib/track";
import bcrypt from "bcryptjs";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  stream: z.string().optional(),
  board: z.string().optional(),
  percentage: z.string().optional(),
  rank: z.string().optional(),
  targetYear: z.string().optional(),
  preferredCities: z.array(z.string()).optional(),
  budget: z.number().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validation.error.errors },
        { status: 400 }
      );
    }

    const { email: rawEmail, name, password, stream, board, percentage, rank, targetYear, preferredCities, budget } = validation.data;
    const email = rawEmail.trim().toLowerCase();

    const passwordHash = await bcrypt.hash(password, 10);

    const result: any = await backend.registerUser({
      email,
      name,
      password: passwordHash,
      stream: stream || null,
      board: board || null,
      percentage: percentage ? parseFloat(percentage) : null,
      jeemainsRank: rank ? parseInt(rank) : null,
      targetYear: targetYear ? parseInt(targetYear) : null,
      preferredCities: preferredCities || [],
      budgetRange: budget || null,
    });

    if (result?.error === "user_exists") {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 400 }
      );
    }

    const user = result;

    track("signup", { userId: user.id, email: user.email });

    return NextResponse.json(
      { id: user.id, email: user.email, name: user.name },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
