"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  username: z.string().trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

// Unified errors shape for all failure modes
type ErrorFields = {
  username?: string[];
  password?: string[];
  form?: string;
};

type LoginState =
  | { success?: undefined; errors: ErrorFields }
  | { success: true; redirectTo: string; errors?: undefined }
  | { success: false; errors: ErrorFields; redirectTo?: undefined };

export async function login(
  prevState: LoginState | undefined,
  formData: FormData
): Promise<LoginState> {
  console.log("Login action triggered", formData);
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    // Zod validation failed
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { username, password } = result.data;
  const url = "https://tfoe-backend.onrender.com/user/login";

  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ username, password }),
    });

    if (response.ok) {
      console.log("Login successful", response);
      const data = await response.json();
      return {
        success: true,
        redirectTo: data.isAdmin ? "/portal" : "/portal-member",
      };
    } else {
      console.error("Login failed with status:", response.status);
      return {
        success: false,
        errors: { form: "Invalid username or password" },
      };
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      errors: { form: "An error occurred during login" },
    };
  }
}

export async function logout() {
  redirect("/login");
}
