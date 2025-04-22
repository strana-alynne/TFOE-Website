"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
// Remove MongoDB connection
// import connectMongo from "@/lib/mongodb";   
import { createSession } from "@/lib/session";
import { hash } from "bcrypt";
// Remove Member model
// import Member from "@/models/Member";

// Define validation schema with all required fields
const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  nameExtensions: z.string().optional(),
  age: z.string().transform(val => parseInt(val, 10)),
  address: z.string().min(1, { message: "Address is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  contact: z.string().min(1, { message: "Contact number is required" }),
  profession: z.string().min(1, { message: "Profession is required" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// In-memory storage for registered members (will reset when server restarts)
const registeredMembers = [
  {
    _id: "user1",
    email: "member@example.com"
  },
  {
    _id: "user2",
    email: "admin@example.com"
  }
];

export async function register(prevState: any, formData: FormData) {
  // Validate form data
  const result = signupSchema.safeParse(Object.fromEntries(formData));
  
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  
  try {
    // Check if email already exists in our dummy data
    const memberExist = registeredMembers.find(member => member.email === result.data.email);
    
    if (memberExist) {
      return {
        errors: {
          email: ["Email already in use"],
        },
      };
    }
    
    // Hash the password
    const hashedPassword = await hash(result.data.password, 10);
    
    // Create a new member ID
    const newId = `user${registeredMembers.length + 1}`;
    
    // Prepare user data
    const userData = {
      _id: newId,
      firstName: result.data.firstName,
      middleName: result.data.middleName || "",
      lastName: result.data.lastName,
      nameExtensions: result.data.nameExtensions || "",
      age: result.data.age,
      address: result.data.address,
      email: result.data.email,
      password: hashedPassword,
      contact: result.data.contact,
      status: "Pending", // Default status for new registrations
      dateJoined: Date.now().toString(), // Current date
      position: "None", // To be assigned later
      contribution: "0", // Default contribution
      absences: "0", // Default absences
      profession: result.data.profession,
      role: "member",
      feedback: "N/A" // Default feedback
    };
    
    // Instead of saving to MongoDB, store in our array
    registeredMembers.push({ _id: newId, email: result.data.email });
    
    console.log("Member registered successfully:", newId);
    
    // Create session for the new member
    await createSession(newId, "member");
    
  } catch (error) {
    console.error("Registration error:", error);
    return {
      errors: {
        _form: ["Failed to register. Please try again."],
      },
    };
  }
  
  // Redirect to member portal
  redirect("/portal-member");
}