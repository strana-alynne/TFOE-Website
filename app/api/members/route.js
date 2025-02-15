import connectMongoDB from "../../../lib/mongodb";
import Member from "../../../models/Member";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("Received data:", data); // Add this line

    const {
      firstname,
      middlename,
      lastname,
      name_extensions,
      age,
      address,
      email,
      contact,
      status,
      datajoined,
      position,
      contribution,
      absences,
      profession,
      feedback,
    } = data;

    await connectMongoDB();

    const newMember = await Member.create({
      firstname,
      middlename,
      lastname,
      name_extensions,
      age,
      address,
      email,
      contact,
      status,
      datejoined: datajoined,
      position,
      contribution,
      absences,
      profession,
      feedback,
    });

    console.log("Created member:", newMember); // Add this line

    return NextResponse.json(
      { message: "Member created successfully", member: newMember }, // Add member to response
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating member:", error); // Add error logging
    return NextResponse.json(
      { error: "Failed to create member", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();

    const members = await Member.find();

    return NextResponse.json({ members }, { status: 200 });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { error: "Failed to fetch members", details: error.message },
      { status: 500 }
    );
  }
}
