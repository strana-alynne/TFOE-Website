// lib/getMemberData.js
import { getCurrentUser } from "@/lib/session";
import connectMongo from "@/lib/mongodb";
import Member from "@/models/Member";

export async function getMemberData() {
  try {
    await connectMongo();

    const user = await getCurrentUser();
    if (!user) {
      console.log("No user found in session");
      return null;
    }

    console.log("Looking for member with ID:", user.userId);

    // Fetch by ObjectId
    const memberDoc = await Member.findById(user.userId).lean();
    if (!memberDoc) {
      console.log("No member found with ID:", user.userId);
      return null;
    }

    console.log("Found member:", memberDoc);

    return {
      id: memberDoc._id.toString(),
      firstName: memberDoc.firstName,
      middleName: memberDoc.middleName || "",
      lastName: memberDoc.lastName,
      nameExtensions: memberDoc.name_extensions || "",
      age: memberDoc.age,
      address: memberDoc.address,
      email: memberDoc.email,
      contact: memberDoc.contact,
      status: memberDoc.status,
      position: memberDoc.position,
      profession: memberDoc.profession,
      dateJoined: memberDoc.datejoined.toISOString(),
      contribution: memberDoc.contribution,
      absences: memberDoc.absences,
      feedback: memberDoc.feedback || "",
    };
  } catch (err) {
    console.error("getMemberData error:", err);
    throw err;
  }
}
