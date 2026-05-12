import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "Missing GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const inputs = body?.inputs;

    if (!inputs) {
      return NextResponse.json(
        { ok: false, error: "Missing inputs" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const prompt = `
You are a professional gym coach.

Return ONLY valid JSON.

{
  "headline": string,
  "summary": string,
  "weeklySplit": [{"day": string, "focus": string, "workout": string}],
  "workoutRules": string[],
  "nutritionBasics": string[],
  "recovery": string[],
  "progression4Weeks": [{"week": string, "whatToDo": string}],
  "safetyNotes": string[],
  "whatToTellTrainer": string[]
}

User inputs:
Goal: ${inputs.goal}
Experience: ${inputs.experience}
Days per week: ${inputs.daysPerWeek}
Session time: ${inputs.sessionTime}
Equipment: ${inputs.equipment}
Injuries: ${inputs.injuries}
Diet: ${inputs.diet}
Schedule: ${inputs.schedulePref}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");

    if (first === -1 || last === -1) {
      return NextResponse.json(
        { ok: false, error: "Model did not return JSON" },
        { status: 500 }
      );
    }

    const jsonStr = text.slice(first, last + 1);
    const plan = JSON.parse(jsonStr);

    return NextResponse.json({ ok: true, plan });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Plan generation failed";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}
