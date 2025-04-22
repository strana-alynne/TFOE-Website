"use server";

import { z } from "zod";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

const testUser = {
    id: "1",
    email: "admin@email.com",
    password: "12345678",
    role: "admin" // Add role field
  };
  
  // Example of another user with member role
  const anotherUser = {
    id: "2",
    email: "member@email.com",
    password: "12345678",
    role: "member"
  };

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

function getUserByEmail(email: string) {
    if (email === testUser.email) return testUser;
    if (email === anotherUser.email) return anotherUser;
    return null;
  }
  
export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  const user = getUserByEmail(email);

  if (!user || user.password !== password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(user.id, user.role);

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