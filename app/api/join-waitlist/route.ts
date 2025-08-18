// app/api/join-waitlist/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN!;
const BASE_ID = process.env.BASE_ID!;
const TABLE_NAME = process.env.TABLE_NAME!;

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    // Check for duplicates (optional)
    // const check = await axios.get(
    //   `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    //     },
    //     params: {
    //       filterByFormula: `LOWER({Email}) = "${email.toLowerCase()}"`,
    //       maxRecords: 1,
    //     },
    //   }
    // );

    // if (check.data.records.length > 0) {
    //   return NextResponse.json(
    //     { error: "Email already exists" },
    //     { status: 409 }
    //   );
    // }

    // Add email
    await axios.post(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`,
      {
        fields: { Email: email },
      },
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Airtable error:", err.response?.data || err.message || err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
