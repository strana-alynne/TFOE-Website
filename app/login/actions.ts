"use server";

import { z } from "zod";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  username: z.string().trim(),
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

  const { username, password } = result.data;

  const url = "https://tfoe-backend.onrender.com/user/login";
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username: username,
      password: password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    await createSession(data.id, data.isAdmin ? "admin" : "member");
    if (data.isAdmin) {
      redirect("/portal");
    } else {
      redirect("/portal-member");
    }
  } else {
    console.error(response.status);
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

