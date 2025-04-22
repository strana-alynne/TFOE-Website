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
const signupSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    middleName: z.string().optional(),
    lastName: z.string().min(1, { message: "Last name is required" }),
    nameExtensions: z.string().optional(),
    // age: z.string().transform((val) => parseInt(val, 10)),
    address: z.string().min(1, { message: "Address is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    username: z.string().min(1, { message: "Username is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    contact: z.string().min(1, { message: "Contact number is required" }),
    // profession: z.string().min(1, { message: "Profession is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// In-memory storage for registered members (will reset when server restarts)
const registeredMembers = [
  {
    _id: "user1",
    email: "member@example.com",
  },
  {
    _id: "user2",
    email: "admin@example.com",
  },
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
    // Prepare user data
    const userData = {
      user: {
        username: result.data.username,
        password: result.data.password,
        isAdmin: false,
      },
      member: {
        firstName: result.data.firstName,
        middleName: result.data.middleName || "",
        lastName: result.data.lastName,
        nameExtension: result.data.nameExtensions || "",
        address: result.data.address,
        email: result.data.email,
        contact: result.data.contact,
        dateJoined: Date.now().toString(), // Current date
      },
    };

    const url = "https://tfoe-backend.onrender.com/user/register";
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log(data);
    // Create session for the new member
    await createSession(data.id, "member");
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

