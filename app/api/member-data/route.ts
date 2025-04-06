// app/api/member-data/route.ts
import { NextResponse } from "next/server";
import { getMemberData } from "@/lib/getMemberData";

export async function GET() {
  try {
    const member = await getMemberData();
    if (!member) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(member, { status: 200 });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error", message: err.message },
      { status: 500 }
    );
  }
}
