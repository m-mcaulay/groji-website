import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = body.email;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    const airtableResponse = await axios.post(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`,
      {
        records: [
          {
            fields: {
              Email: email,
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({ success: true, data: airtableResponse.data });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Airtable error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to submit to Airtable" },
      { status: 500 }
    );
  }
}
