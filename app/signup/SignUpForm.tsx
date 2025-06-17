"use client";
import React, { startTransition, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "@mui/icons-material";
import { register, validateAndSendOTP, verifyOTP, sendOTP } from "./actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { format } from "date-fns";
import OtpModal from "@/components/otp-modal";
import * as countryCodes from "country-codes-list";
import { useRouter } from "next/navigation";

// Define a type for our form errors
type FormErrors = {
  firstName?: string[];
  middleName?: string[];
  lastName?: string[];
  nameExtensions?: string[];
  dateOfBirth?: string[];
  address?: string[];
  username?: string[];
  password?: string[];
  confirmPassword?: string[];
  contact?: string[];
  profession?: string[];
  _form?: string[];
  email?: string[];
};

// Define state type
type FormState = {
  errors?: FormErrors;
};

export default function SignUpPage({
  image,
  logo,
}: {
  image: string;
  logo: string;
}) {
  const [state, registerAction] = useActionState<FormState, FormData>(
    register,
    { errors: {} }
  );

  const myCountryCodesObject = countryCodes.customList(
    "countryCallingCode",
    "{countryNameEn}: +{countryCallingCode}"
  );

  const [date, setDate] = React.useState<Date | null>(null);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [formCache, setFormCache] = useState<FormData | null>(null);
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [nameExtension, setNameExtension] = useState("");
  const router = useRouter();

  // Function to handle form submission and OTP process
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (isLoading) return;

    const formElement = e.target as HTMLFormElement;

    if (formElement) {
      setIsLoading(true);
      setValidationErrors({}); // Clear previous errors

      try {
        const formData = new FormData(formElement);
        const selectedCountryCode = formData.get("countryCode");
        const contactNumber = formData.get("contact");
        const fullContactNumber = `${selectedCountryCode}${contactNumber}`;
        formData.set("contact", fullContactNumber);

        // Add the dateOfBirth to the form data
        if (date) {
          formData.set("dateOfBirth", format(date, "yyyy-MM-dd"));
        }

        // Client-side validation first
        const requiredFields = [
          "firstName",
          "middleName",
          "lastName",
          "dateOfBirth",
          "address",
          "username",
          "password",
          "confirmPassword",
          "countryCode",
          "contact",
          "profession",
          "email",
        ];

        const missingFields: FormErrors = {};

        for (const field of requiredFields) {
          const value = formData.get(field);
          if (!value || (typeof value === "string" && value.trim() === "")) {
            missingFields[field as keyof FormErrors] = [
              "This field is required.",
            ];
          }
        }

        // Special handling for contact
        if (!formData.get("contact") || !formData.get("countryCode")) {
          missingFields.contact = ["Contact number is required."];
        }

        if (Object.keys(missingFields).length > 0) {
          setValidationErrors(missingFields);
          return;
        }

        console.log("Sending OTP validation request...");

        // Add timeout to the validation request
        const timeoutPromise = new Promise(
          (_, reject) =>
            setTimeout(() => reject(new Error("Request timeout")), 30000) // 30 second timeout
        );

        const validationPromise = validateAndSendOTP({}, formData);

        const result = (await Promise.race([
          validationPromise,
          timeoutPromise,
        ])) as any;

        console.log("Validation result:", result);

        if (result.success) {
          // Store form data for later use after OTP verification
          setFormCache(formData);
          // Open OTP modal
          setIsOtpModalOpen(true);
          console.log("OTP modal should be opening now");
        } else {
          // Handle validation errors
          console.log("Validation errors:", result.errors);
          setValidationErrors(result.errors || {});
        }
      } catch (error) {
        console.error("Error in form submission:", error);
        setValidationErrors({
          _form: [
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
          ],
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleOtpVerify = async (otpValue: string) => {
    if (!formCache) return;

    const email = formCache.get("email") as string;
    setIsLoading(true);

    try {
      console.log("Verifying OTP:", otpValue);

      // Add timeout for OTP verification
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("OTP verification timeout")), 30000)
      );

      const verificationPromise = verifyOTP(email, otpValue);
      const verificationResult = (await Promise.race([
        verificationPromise,
        timeoutPromise,
      ])) as any;

      console.log("Verification Result:", verificationResult);

      if (verificationResult.success) {
        const verifiedFormData = new FormData();
        formCache.forEach((value, key) => {
          verifiedFormData.append(key, value);
        });
        verifiedFormData.append("otpVerified", "true");

        console.log("Calling register function...");

        // Add timeout for registration
        const registrationPromise = register({}, verifiedFormData);
        const registrationResult = (await Promise.race([
          registrationPromise,
          timeoutPromise,
        ])) as any;

        console.log("Registration result:", registrationResult);

        if (registrationResult?.errors) {
          console.error("Registration failed:", registrationResult.errors);
          setValidationErrors(registrationResult.errors);
        } else {
          console.log("Registration completed successfully");
          setIsOtpModalOpen(false);
          setFormCache(null);
          router.push(registrationResult.redirectTo || "/login");
        }
      } else {
        console.log("OTP verification failed:", verificationResult.message);
        setValidationErrors({
          _form: [verificationResult.message || "OTP verification failed"],
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setValidationErrors({
        _form: [error instanceof Error ? error.message : "Error verifying OTP"],
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add this function in your SignUpPage component
  const handleResendOTP = async () => {
    if (!formCache) return;

    const email = formCache.get("email") as string;

    try {
      const result = await sendOTP(email); // You'll need to import sendOTP
      if (!result.success) {
        setValidationErrors({
          _form: [result.message || "Failed to resend OTP"],
        });
      }
    } catch (error) {
      setValidationErrors({
        _form: ["Failed to resend OTP. Please try again."],
      });
    }
  };

  function SubmitButton() {
    return (
      <Button
        disabled={isLoading}
        type="submit" // Changed back to submit
        className="bg-yellow-600 w-full mt-6"
        variant="default"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Sign Up"
        )}
      </Button>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Background Image with Logo */}
      <div className="relative w-full md:w-1/2 h-64 md:h-screen">
        <Image
          src={image}
          alt="Philippine Eagles Group Photo"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={logo}
            alt="Philippine Eagles Logo"
            width={250}
            height={250}
            className="w-40 h-40 md:w-64 md:h-64"
          />
        </div>
      </div>

      {/* Right Side - Signup Section */}
      <div className="relative w-full md:w-1/2 flex flex-col items-center justify-center px-4 md:px-8 py-6">
        {/* Back Button */}
        <div className="absolute left-4 top-4">
          <Link
            href="/"
            className="flex items-center text-yellow-400 hover:underline"
          >
            <ChevronLeft />
            Back to Home
          </Link>
        </div>

        {/* Signup Form */}
        <Card className="w-full max-w-xl p-4 md:p-6 space-y-4 md:space-y-6 bg-white/95 mt-16 md:mt-0 mb-8">
          <CardHeader>
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
              Join the Eagles Community
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Create your account in just a few steps.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form
              onSubmit={handleFormSubmit} // Only form onSubmit, removed id
              className="space-y-4"
            >
              {/* Personal Information Section */}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Personal Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* First Name */}
                  <div className="relative">
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      className="w-full rounded-lg bg-background"
                    />
                    {(state?.errors?.firstName ||
                      validationErrors?.firstName) && (
                      <p className="text-red-500 text-xs mt-1">
                        {
                          (state?.errors?.firstName ||
                            validationErrors?.firstName)?.[0]
                        }
                      </p>
                    )}
                  </div>

                  {/* Middle Name */}
                  <div className="relative">
                    <Input
                      id="middleName"
                      name="middleName"
                      type="text"
                      placeholder="Middle Name"
                      className="w-full rounded-lg bg-background"
                    />
                    {(state?.errors?.middleName ||
                      validationErrors?.middleName) && (
                      <p className="text-red-500 text-xs mt-1">
                        {
                          (state?.errors?.middleName ||
                            validationErrors?.middleName)?.[0]
                        }
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Last Name */}
                  <div className="relative">
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      className="w-full rounded-lg bg-background"
                    />
                    {(state?.errors?.lastName ||
                      validationErrors?.lastName) && (
                      <p className="text-red-500 text-xs mt-1">
                        {
                          (state?.errors?.lastName ||
                            validationErrors?.lastName)?.[0]
                        }
                      </p>
                    )}
                  </div>

                  {/* Name Extensions */}
                  <div className="relative">
                    <Select
                      value={nameExtension}
                      onValueChange={(value) =>
                        setNameExtension(value === "none" ? "" : value)
                      }
                    >
                      <SelectTrigger className="w-full rounded-lg bg-background">
                        <SelectValue placeholder="Select Extension (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="Jr.">Jr.</SelectItem>
                        <SelectItem value="Sr.">Sr.</SelectItem>
                        <SelectItem value="II">II</SelectItem>
                        <SelectItem value="III">III</SelectItem>
                        <SelectItem value="IV">IV</SelectItem>
                      </SelectContent>
                    </Select>
                    <input
                      type="hidden"
                      name="nameExtensions"
                      value={nameExtension}
                    />

                    {state?.errors?.nameExtensions && (
                      <p className="text-red-500 text-xs mt-1">
                        {state.errors.nameExtensions[0]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Date of Birth */}
                  <div className="relative">
                    <Input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={date ? format(date, "yyyy-MM-dd") : ""}
                      onChange={(e) => setDate(new Date(e.target.value))}
                      className={`w-full rounded-lg bg-background ${state?.errors?.dateOfBirth ? "border-red-500" : ""}`}
                    />
                    {(state?.errors?.dateOfBirth ||
                      validationErrors?.dateOfBirth) && (
                      <p className="text-red-500 text-xs mt-1">
                        {
                          (state?.errors?.dateOfBirth ||
                            validationErrors?.dateOfBirth)?.[0]
                        }
                      </p>
                    )}
                  </div>

                  {/* Profession */}
                  <div className="relative">
                    <Input
                      id="profession"
                      name="profession"
                      type="text"
                      placeholder="Profession"
                      className="w-full rounded-lg bg-background h-12"
                    />
                    {(state?.errors?.profession ||
                      validationErrors?.profession) && (
                      <p className="text-red-500 text-xs mt-1">
                        {
                          (state?.errors?.profession ||
                            validationErrors?.profession)?.[0]
                        }
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="relative">
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Complete Address"
                    className="w-full rounded-lg bg-background "
                  />
                  {(state?.errors?.address || validationErrors?.address) && (
                    <p className="text-red-500 text-xs mt-1">
                      {
                        (state?.errors?.address ||
                          validationErrors?.address)?.[0]
                      }
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Contact Information</h2>

                {/* Email */}
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-lg bg-background "
                  />
                  {(state?.errors?.email || validationErrors?.email) && (
                    <p className="text-red-500 text-xs mt-1">
                      {(state?.errors?.email || validationErrors?.email)?.[0]}
                    </p>
                  )}
                </div>

                {/* Contact Number */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <Select
                      name="countryCode"
                      defaultValue={Object.keys(myCountryCodesObject)[0]}
                    >
                      <SelectTrigger className="w-full rounded-lg bg-background">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(myCountryCodesObject).map(
                          ([code, label]) => (
                            <SelectItem key={code} value={code}>
                              {label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 relative">
                    <Input
                      id="contact"
                      name="contact"
                      type="text"
                      placeholder="Contact Number"
                      className="w-full rounded-lg bg-background "
                    />
                    {(state?.errors?.contact || validationErrors?.contact) && (
                      <p className="text-red-500 text-xs mt-1">
                        {
                          (state?.errors?.contact ||
                            validationErrors?.contact)?.[0]
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Account Information Section */}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Account Information</h2>
                {/* Username */}
                <div className="relative">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="w-full rounded-lg bg-background "
                  />
                  {(state?.errors?.username || validationErrors?.username) && (
                    <p className="text-red-500 text-xs mt-1">
                      {
                        (state?.errors?.username ||
                          validationErrors?.username)?.[0]
                      }
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full rounded-lg bg-background "
                  />
                  {(state?.errors?.password || validationErrors?.password) && (
                    <p className="text-red-500 text-xs mt-1">
                      {
                        (state?.errors?.password ||
                          validationErrors?.password)?.[0]
                      }
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full rounded-lg bg-background "
                  />
                  {(state?.errors?.confirmPassword ||
                    validationErrors?.confirmPassword) && (
                    <p className="text-red-500 text-xs mt-1">
                      {
                        (state?.errors?.confirmPassword ||
                          validationErrors?.confirmPassword)?.[0]
                      }
                    </p>
                  )}
                </div>
              </div>

              {/* Error display for form-level errors */}
              {(state?.errors?._form || validationErrors?._form) && (
                <div className="bg-red-50 p-2 rounded border border-red-200">
                  <p className="text-red-500 text-sm">
                    {(state?.errors?._form || validationErrors?._form)?.[0]}
                  </p>
                </div>
              )}

              <SubmitButton />
            </form>
            <div className="text-center">
              <Link
                href="/login"
                className="text-primary hover:underline text-sm md:text-base"
              >
                Already a Member?{" "}
                <span className="text-yellow-500 font-bold"> Login Here</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* OTP Modal */}
      <OtpModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        onVerify={handleOtpVerify}
        onResend={handleResendOTP}
      />
    </div>
  );
}
