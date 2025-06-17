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
    profession: z.string().min(1, { message: "Profession is required" }), // Made required
    countryCode: z.string().optional(),
    dateJoined: z.string().optional().default(new Date().toISOString()),
    dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
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

    const text = await response.text();

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
  // Create a copy of formData entries for validation
  const formDataEntries = Object.fromEntries(formData);
  
  // Add default values for optional fields if they're empty
  if (!formDataEntries.middleName) {
    formDataEntries.middleName = "";
  }
  if (!formDataEntries.nameExtensions) {
    formDataEntries.nameExtensions = "";
  }
  
  console.log("Form data for validation:", formDataEntries);
  
  const result = signupSchema.safeParse(formDataEntries);

  if (!result.success) {
    console.log("Validation errors:", result.error.flatten().fieldErrors);
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

  return {
    success: true,
    data: result.data,
  };
}

// Function to register the user
export async function register(prevState: any, formData: FormData) {
  console.log("➡️ Starting registration");
  
  // Create a copy of formData entries for validation
  const formDataEntries = Object.fromEntries(formData);
  
  // Add default values for optional fields if they're empty
  if (!formDataEntries.middleName) {
    formDataEntries.middleName = "";
  }
  if (!formDataEntries.nameExtensions) {
    formDataEntries.nameExtensions = "";
  }
  
  console.log("Form data entries:", formDataEntries);
  
  // Validate form data
  const result = signupSchema.safeParse(formDataEntries);

  if (!result.success) {
    console.log("Validation failed:", result.error.flatten().fieldErrors);
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Check if OTP was verified
  const otpVerified = formData.get("otpVerified") === "true";
  if (!otpVerified) {
    console.log("OTP not verified");
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
        cellphone: result.data.contact, // Changed from 'contact' to 'cellphone'
        status: "ACTIVE",
        birthDate: result.data.dateOfBirth,
        absences: 0,
        contribution: 0,
        position: "",
        feedback: "",
        profession: result.data.profession || "",
        dateJoined: new Date().toISOString(),
      },
    };

    console.log("User Data to send:", JSON.stringify(userData, null, 2));

    const url = "https://tfoe-backend.onrender.com/user/register";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    
    console.log("Response Status:", response.status);
    console.log("Response Headers:", Object.fromEntries(response.headers.entries()));

    // Get response text first to handle both JSON and non-JSON responses
    const responseText = await response.text();
    console.log("Raw response:", responseText);

    if (!response.ok) {
      let errorMessage = "Registration failed";
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.message || errorMessage;
        console.log("Error Data:", errorData);
      } catch (e) {
        console.log("Could not parse error response as JSON");
        errorMessage = responseText || errorMessage;
      }
      
      return {
        success: false,
        errors: {
          _form: [errorMessage],
        },
      };
    }

    let registrationData;
    try {
      registrationData = JSON.parse(responseText);
      console.log("Registration successful:", registrationData);
    } catch (e) {
      console.log("Registration response not JSON, but status was OK");
      registrationData = { message: "Registration successful" };
    }
    
    // Automatically log the user in after successful registration
    try {
      const loginFormData = new FormData();
      loginFormData.append("username", result.data.username);
      loginFormData.append("password", result.data.password);
      
      const loginResult = await login(undefined, loginFormData);
      
      if (!loginResult.success) {
        console.log("Auto-login failed, but registration was successful");
        // Registration was successful, just redirect to login
        return {
          success: true,
          redirectTo: "/login",
          message: "Registration successful! Please log in.",
        };
      }
      
      return {
        success: true,
        redirectTo: "/login", // or wherever you want to redirect after login
        token: loginResult.token,
      };
    } catch (loginError) {
      console.error("Auto-login error:", loginError);
      // Registration was successful, just redirect to login
      return {
        success: true,
        redirectTo: "/login",
        message: "Registration successful! Please log in.",
      };
    }

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