  "use server";

  import { z } from "zod";
  import { redirect } from "next/navigation";

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
      dateJoined: z.string().optional().default(Date().toString()),
      dateOfBirth: z.string().optional(),
      otpVerified: z.boolean().optional(),
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

  // Original register function with added OTP verification check
  export async function register(prevState: any, formData: FormData) {
    // Validate form data
    const result = signupSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    
    // Check if OTP was verified
    const otpVerified = formData.get("otpVerified") === "true";
    if (!otpVerified) {
      return {
        errors: {
          _form: [
            "Email verification required. Please complete the OTP verification.",
          ],
        },
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
          dateOfBirth: result.data.dateOfBirth || "",
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Registration error:", error);
      return {
        errors: {
          _form: [
            error instanceof Error
              ? error.message
              : "Failed to register. Please try again.",
          ],
        },
      };
    }

    // Redirect to member portal
    redirect("/portal-member");
  }

