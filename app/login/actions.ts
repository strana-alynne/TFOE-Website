"use server";

import { z } from "zod";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import connectMongoDB from "@/lib/mongodb";
import Member from "@/models/Member";
import bcrypt from 'bcrypt';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

async function getUserByEmail(email: string) {
  await connectMongoDB();
  // include the hashed password (schema likely has select: false on password)
  return await Member
    .findOne({ email })
    .select('+password');
}

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;
  const user = await getUserByEmail(email);

  // defensive: ensure we actually got a hash back
  if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(user._id.toString(), user.role);

  if (user.role === "admin") {
    redirect("/portal");
  } else {
    redirect("/portal-member");
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
