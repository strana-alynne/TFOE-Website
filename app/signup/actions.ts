"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { login } from "../login/actions";

const signupSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    middleName: z.string().optional(),
    lastName: z.string().min(1, { message: "Last name is required" }),
    nameExtensions: z.string().optional(),
    address: z.string().min(1, { message: "Address is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    username: z.string().min(1, { message: "Username is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    contact: z.string().min(1, { message: "Contact number is required" }),
    profession: z.string().optional(), // <-- ADD THIS
    countryCode: z.string().optional(), // <-- AND THIS
    dateJoined: z.string().optional().default(Date().toString()),
    dateOfBirth: z.string().optional(),
    // Fix: Handle string boolean conversion
    otpVerified: z.union([
      z.boolean(),
      z.string().transform((val) => val === "true")
    ]).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
// Function to send OTP to user's email
export async function sendOTP(email: string) {
  try {
    // Call your OTP API endpoint
    const response = await fetch("https://tfoe-backend.onrender.com/otp/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send OTP");
    }

    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("OTP sending error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to send OTP",
    };
  }
}

// Function to verify OTP
export async function verifyOTP(email: string, otp: string) {
  try {
    const response = await fetch("https://tfoe-backend.onrender.com/otp/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    const text = await response.text(); // read response as text first

    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (err) {
      console.warn("Response not valid JSON:", text);
      data = {};
    }

    if (!response.ok) {
      throw new Error(data.message || "OTP verification failed");
    }

    return { success: true };
  } catch (error) {
    console.error("OTP verification error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "OTP verification failed",
    };
  }
}

// Function to validate form and send OTP
export async function validateAndSendOTP(prevState: any, formData: FormData) {
  // Validate form data
  const result = signupSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Send OTP to the user's email
  const otpResponse = await sendOTP(result.data.email);

  console.log("OTP Response:", otpResponse);

  if (!otpResponse.success) {
    return {
      success: false,
      errors: {
        _form: [otpResponse.message],
      },
    };
  }

  // Return the validated data
  return {
    success: true,
    data: result.data,
  };
}


// Function to register the user
export async function register(prevState: any, formData: FormData) {
  console.log("➡️ Starting registration");
  // Validate form data
  const result = signupSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Check if OTP was verified
  const otpVerified = formData.get("otpVerified") === "true";
  if (!otpVerified) {
    return {
      success: false,
      errors: {
        _form: [
          "Email verification required. Please complete the OTP verification.",
        ],
      },
    };
  }
  
  try {
    // Helper function to calculate age from date of birth
    function calculateAge(dateOfBirth: string): number {
      if (!dateOfBirth) return 0;
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }

    // Prepare user data to match the expected API structure
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
        status: "ACTIVE",
        age: result.data.dateOfBirth ? calculateAge(result.data.dateOfBirth) : 0,
        absences: 0,
        contribution: 0,
        position: "",
        feedback: "",
        profession: result.data.profession || "", // Get profession from form data
        dateJoined: new Date().toISOString(),
      },
    };

    console.log("User Data:", userData);

    const url = "https://tfoe-backend.onrender.com/user/register";
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    console.log("Response Status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const registrationData = await response.json();
    console.log("Registration successful:", registrationData);
    
    // Automatically log the user in after successful registration
    const loginFormData = new FormData();
    loginFormData.append("username", result.data.username);
    loginFormData.append("password", result.data.password);
    const loginResult = await login(undefined, loginFormData);
    
    if (!loginResult.success) {
      // Try to extract a message from errors, fallback to default
      const errorMsg =
        (loginResult.errors &&
          (loginResult.errors.form?.[0] ||
            Object.values(loginResult.errors)[0]?.[0])) ||
        "Auto-login failed after registration";
      throw new Error(errorMsg);
    }
    return {
      success: true,
      redirectTo: "/portal-member",
      token: loginResult.token, // Pass along the token from login
    };

  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      errors: {
        _form: [
          error instanceof Error
            ? error.message
            : "Failed to register. Please try again.",
        ],
      },
    };
  }
}