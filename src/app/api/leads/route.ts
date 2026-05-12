import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({ ok: true, received: body });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Lead capture failed";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}
