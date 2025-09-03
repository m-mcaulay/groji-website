/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ML_API_KEY = process.env.MAILERLITE_API_KEY!;
const WAITLIST_GROUP_ID = process.env.MAILERLITE_WAITLIST_GROUP_ID!; // string ok
const MARKETING_GROUP_ID = process.env.MAILERLITE_MARKETING_GROUP_ID; // optional

const Body = z.object({
  email: z.string().email(),
  marketingConsent: z.boolean().optional().default(false),
  source: z.string().max(64).optional(),
  ts: z.number().optional(),
  hp: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const parsed = Body.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { email, marketingConsent, source, ts, hp } = parsed.data;

    // Bot guards (optional)
    if (hp && hp.trim() !== "")
      return NextResponse.json({ ok: true }, { status: 200 });
    // if (ts && Date.now() - ts < 300) {
    //   return NextResponse.json({ error: "Slow down" }, { status: 400 });
    // }

    // Custom fields (appear in ML as fields)
    const fields = {
      source: source ?? "waitlist-landing",
      marketing_consent: marketingConsent ? "yes" : "no",
      consent_ts: new Date().toISOString(),
    };

    // Groups: Waitlist always; Marketing if opted in
    const groups = [WAITLIST_GROUP_ID];
    if (marketingConsent && MARKETING_GROUP_ID) groups.push(MARKETING_GROUP_ID);

    // ✅ Correct endpoint
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ML_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        fields,
        groups,
        resubscribe: true,
        autoresponders: true,
      }),
      cache: "no-store",
    });

    if (res.status === 200 || res.status === 201) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const text = await res.text();
    return NextResponse.json(
      { error: `MailerLite error: ${res.status} ${text}` },
      { status: 502 }
    );
  } catch (err: any) {
    console.error("join-waitlist error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
