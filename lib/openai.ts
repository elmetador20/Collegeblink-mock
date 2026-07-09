import OpenAI from "openai";

function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

const SYSTEM_PROMPTS = {
  COUNSELOR: `You are an expert Indian college admissions counselor with 20 years of experience. You have helped thousands of students get into top institutions like IITs, NITs, IIMs, AIIMS, and premier private colleges like BITS, VIT, Manipal, etc.

Your expertise covers:
- JEE Main & Advanced counseling
- NEET medical admissions
- CAT/MAT/XAT for MBA
- CUET for central universities
- State CETs (MHT CET, WBJEE, etc.)
- Study abroad (US, UK, Canada, Australia, Germany)

Guidelines:
1. Give specific, actionable advice based on ranks, scores, and categories
2. Always consider reservation categories (General, OBC, SC, ST, EWS)
3. Provide realistic assessments - don't give false hope
4. Suggest backup options always
5. Explain cutoff trends and predict changes
6. Mention scholarship opportunities when relevant
7. Keep responses concise but informative
8. Use bullet points for multiple options
9. Include fee information when discussing colleges
10. Suggest timeline and important dates

When discussing specific colleges, mention:
- NIRF ranking
- Average and highest packages
- Campus facilities
- Course strengths
- Notable alumni`,

  ESSAY_REVIEWER: `You are an expert college admissions essay reviewer. You have reviewed thousands of SOPs (Statement of Purpose), LORs (Letters of Recommendation), Common App essays, and personal statements for students applying to top universities worldwide.

Your review should include:
1. Overall score (0-100)
2. Dimension scores (0-100 each):
   - Clarity: How clear and understandable is the writing?
   - Relevance: How well does it address the prompt/college requirements?
   - Grammar: Grammatical correctness and language quality
   - Impact: How memorable and compelling is the story?
   - Structure: Organization and flow
   - Uniqueness: Originality and authenticity

3. Specific suggestions with:
   - The exact problematic text
   - The type of issue (grammar/style/content/structure)
   - Explanation of the problem
   - Suggested improvement

4. A rewritten version if the essay needs significant work

Guidelines:
- Be honest but constructive
- Highlight strengths, not just weaknesses
- Provide concrete examples for improvements
- Consider the target institution's culture and values
- Watch for clichés and generic statements
- Check for authentic voice
- Ensure the essay answers "Why this college/course?"
- Verify that personal stories connect to academic goals`,

  ADMIT_PREDICTOR: `You are an AI admissions predictor analyzing Indian college admission data. Your task is to predict admission probability based on student data and historical cutoffs.

Input format:
- Student rank/percentile in entrance exam
- Exam type (JEE, NEET, CAT, CUET)
- Reservation category
- College and course applying to
- Historical cutoff data

Output requirements:
1. Probability percentage (0-100%)
2. Confidence level (high/medium/low)
3. Detailed reasoning explaining the prediction
4. Safe rank range for admission
5. Historical cutoff comparison

Factors to consider:
- Category reservation impact
- Year-over-year cutoff trends
- Seat availability changes
- New course/program additions
- College popularity trends
- Home state quota (for NITs)
- Gender quota if applicable

Guidelines:
- Be conservative in predictions - better to under-promise
- Explain all assumptions clearly
- Provide context about previous years' data
- Mention alternative similar courses if applicable`,
};

export async function* streamCounselorChat(
  messages: { role: "user" | "assistant"; content: string }[],
  userContext?: {
    stream?: string | null;
    jeemainsRank?: number | null;
    jeeadvancedRank?: number | null;
    neetRank?: number | null;
    catPercentile?: number | null;
    category?: string | null;
    preferredCities?: string[];
    budgetRange?: number | null;
  }
) {
  const systemMessage = {
    role: "system" as const,
    content: SYSTEM_PROMPTS.COUNSELOR,
  };

  let userContextMessage = "";
  if (userContext) {
    userContextMessage = "\n\nStudent Context:\n";
    if (userContext.stream) userContextMessage += `Stream: ${userContext.stream}\n`;
    if (userContext.jeemainsRank) userContextMessage += `JEE Main Rank: ${userContext.jeemainsRank}\n`;
    if (userContext.jeeadvancedRank) userContextMessage += `JEE Advanced Rank: ${userContext.jeeadvancedRank}\n`;
    if (userContext.neetRank) userContextMessage += `NEET Rank: ${userContext.neetRank}\n`;
    if (userContext.catPercentile) userContextMessage += `CAT Percentile: ${userContext.catPercentile}\n`;
    if (userContext.category) userContextMessage += `Category: ${userContext.category}\n`;
    if (userContext.preferredCities?.length) {
      userContextMessage += `Preferred Cities: ${userContext.preferredCities.join(", ")}\n`;
    }
    if (userContext.budgetRange) userContextMessage += `Budget: ₹${userContext.budgetRange}L\n`;
    userContextMessage += "\nUse this context to personalize your advice.";
  }

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o",
    messages: [
      { ...systemMessage, content: systemMessage.content + userContextMessage },
      ...messages,
    ],
    stream: true,
    temperature: 0.7,
    max_tokens: 1500,
  });

  for await (const chunk of response) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      yield content;
    }
  }
}

export async function reviewEssay(
  essay: string,
  type: "SOP" | "LOR" | "COMMON_APP" | "PERSONAL_STATEMENT",
  targetCollege?: string,
  targetCourse?: string
) {
  const prompt = `${SYSTEM_PROMPTS.ESSAY_REVIEWER}

Essay Type: ${type}
${targetCollege ? `Target College: ${targetCollege}` : ""}
${targetCourse ? `Target Course: ${targetCourse}` : ""}

Please review the following essay and return your analysis in JSON format:

${essay}

Response format:
{
  "overallScore": number (0-100),
  "dimensionScores": {
    "clarity": number (0-100),
    "relevance": number (0-100),
    "grammar": number (0-100),
    "impact": number (0-100),
    "structure": number (0-100),
    "uniqueness": number (0-100)
  },
  "suggestions": [
    {
      "text": "the problematic text excerpt",
      "type": "grammar" | "style" | "content" | "structure",
      "explanation": "why this is an issue",
      "improvement": "suggested better version"
    }
  ],
  "rewrittenVersion": "complete rewritten essay if major issues exist, otherwise null",
  "summary": "brief summary of main strengths and areas for improvement"
}`;

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPTS.ESSAY_REVIEWER },
      { role: "user", content: prompt },
    ],
    temperature: 0.5,
    max_tokens: 2500,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from OpenAI");
  }

  return JSON.parse(content);
}

export async function rewriteEssay(
  essay: string,
  type: "SOP" | "LOR" | "COMMON_APP" | "PERSONAL_STATEMENT",
  targetCollege?: string,
  targetCourse?: string,
  improvements?: string[]
) {
  const prompt = `Rewrite the following ${type} for ${targetCollege || "college admission"} ${targetCourse ? `for ${targetCourse}` : ""}.

${improvements?.length ? `Focus on these improvements: ${improvements.join(", ")}` : ""}

Guidelines:
1. Maintain the student's authentic voice and personal stories
2. Improve clarity, flow, and impact
3. Fix grammatical errors
4. Ensure it answers "Why this college/course?"
5. Remove clichés and generic statements
6. Make it more compelling and memorable
7. Keep it concise but powerful

Original Essay:
${essay}

Provide only the rewritten essay without any additional commentary.`;

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are an expert admissions essay writer. Rewrite essays to improve their quality while maintaining authenticity.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  return response.choices[0]?.message?.content || "";
}

export async function predictAdmission(
  studentData: {
    rank: number;
    exam: "JEE" | "NEET" | "CAT" | "CUET";
    category: string;
    collegeName: string;
    courseName?: string;
  },
  historicalCutoffs: {
    year: number;
    openingRank: number;
    closingRank: number;
    category: string;
  }[]
) {
  const prompt = `${SYSTEM_PROMPTS.ADMIT_PREDICTOR}

Student Data:
- Exam: ${studentData.exam}
- Rank: ${studentData.rank}
- Category: ${studentData.category}
- Target College: ${studentData.collegeName}
${studentData.courseName ? `- Target Course: ${studentData.courseName}` : ""}

Historical Cutoffs:
${historicalCutoffs
  .map(
    (c) =>
      `- ${c.year}: Opening ${c.openingRank}, Closing ${c.closingRank} (${c.category})`
  )
  .join("\n")}

Analyze this data and return your prediction in JSON format:
{
  "probability": number (0-100),
  "confidence": "high" | "medium" | "low",
  "reasoning": "detailed explanation of the prediction",
  "safeRange": {
    "min": number,
    "max": number
  },
  "trendAnalysis": "analysis of year-over-year cutoff trends",
  "recommendations": ["suggestion 1", "suggestion 2", "suggestion 3"]
}`;

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPTS.ADMIT_PREDICTOR },
      { role: "user", content: prompt },
    ],
    temperature: 0.3,
    max_tokens: 1500,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from OpenAI");
  }

  return JSON.parse(content);
}

export async function generateComparisonSummary(colleges: any[]) {
  const prompt = `Generate a concise comparison summary for these colleges:

${colleges
  .map(
    (c, i) => `
College ${i + 1}: ${c.name}
- Type: ${c.type}
- NIRF Rank: ${c.nirfRank || "N/A"}
- Average Package: ₹${c.avgPackage || "N/A"}L
- Tuition Fees: ₹${c.tuitionFees || "N/A"}L/year
- Location: ${c.city}, ${c.state}
`
  )
  .join("\n")}

Provide a brief recommendation (2-3 sentences) on which college to choose based on:
1. Academic reputation (NIRF ranking)
2. Placement statistics
3. Value for money (ROI)
4. Overall recommendation

Keep it concise and actionable.`;

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are a concise college admissions advisor. Give brief, actionable recommendations.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.5,
    max_tokens: 300,
  });

  return response.choices[0]?.message?.content || "";
}

export async function generateCollegeMatches(
  profile: {
    stream?: string | null;
    jeemainsRank?: number | null;
    jeeadvancedRank?: number | null;
    neetRank?: number | null;
    catPercentile?: number | null;
    category?: string | null;
    preferredCities?: string[];
    budgetRange?: number | null;
  },
  availableColleges: any[]
) {
  const prompt = `Based on this student profile, rank and categorize these colleges into Reach, Match, and Safety:

Student Profile:
${profile.stream ? `- Stream: ${profile.stream}` : ""}
${profile.jeemainsRank ? `- JEE Main Rank: ${profile.jeemainsRank}` : ""}
${profile.jeeadvancedRank ? `- JEE Advanced Rank: ${profile.jeeadvancedRank}` : ""}
${profile.neetRank ? `- NEET Rank: ${profile.neetRank}` : ""}
${profile.catPercentile ? `- CAT Percentile: ${profile.catPercentile}` : ""}
${profile.category ? `- Category: ${profile.category}` : ""}
${profile.preferredCities?.length ? `- Preferred Cities: ${profile.preferredCities.join(", ")}` : ""}
${profile.budgetRange ? `- Budget: ₹${profile.budgetRange}L` : ""}

Available Colleges:
${availableColleges
  .map(
    (c) =>
      `- ${c.name} (${c.type}), NIRF: ${c.nirfRank || "N/A"}, Avg Package: ₹${c.avgPackage || "N/A"}L, Fees: ₹${c.tuitionFees || "N/A"}L`
  )
  .join("\n")}

Return JSON format:
{
  "reach": ["college name 1", "college name 2", "college name 3"],
  "match": ["college name 1", "college name 2", "college name 3", "college name 4"],
  "safety": ["college name 1", "college name 2", "college name 3"],
  "reasoning": "brief explanation of the categorization"
}`;

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are a college admissions expert. Categorize colleges accurately based on student profile and college data.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.4,
    max_tokens: 1000,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    return { reach: [], match: [], safety: [], reasoning: "" };
  }

  return JSON.parse(content);
}

export { getOpenAI, SYSTEM_PROMPTS };
