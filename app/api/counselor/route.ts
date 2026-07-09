import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages payload" }, { status: 400 });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
        "X-Title": "CollegeBlink Smart Counselor",
      },
      body: JSON.stringify({
        // Free tier model — swap to any other free OpenRouter model as needed
        model: "poolside/laguna-xs.2:free",
        messages: [
          {
            role: "system",
            content: `You are CollegeBlink Smart, an expert college admissions counselor for Indian students.
You help students with:
- Choosing the right college and stream (engineering, medicine, law, arts, commerce, etc.)
- Understanding entrance exams (JEE, NEET, CUET, CLAT, CAT, GATE, etc.)
- Application strategies, deadlines, and documentation
- Scholarship opportunities and financial aid
- Career paths and course selections
- Study abroad options

Guidelines:
- Be concise, warm, and encouraging
- Use Indian context (CBSE, state boards, IITs, NITs, IIMs, AIIMS, etc.)
- Format responses clearly using markdown (bullet points, bold for key terms)
- If unsure, direct students to official college websites
- Keep answers under 300 words unless a detailed breakdown is explicitly needed`,
          },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
        max_tokens: 600,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("OpenRouter error:", err);
      return NextResponse.json(
        { error: "AI service unavailable. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Counselor API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}