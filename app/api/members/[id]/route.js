import connectMongoDB from "../../../../lib/mongodb";
import Member from "../../../../models/Member";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectMongoDB();

    const member = await Member.findById(id);
    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    return NextResponse.json({ member }, { status: 200 });
  } catch (error) {
    console.error("Error fetching member:", error);
    return NextResponse.json(
      { error: "Failed to fetch member", details: error.message },
      { status: 500 }
    );
  }
}
