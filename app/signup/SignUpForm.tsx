"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Email,
  Lock,
  Person,
  Home,
  Phone,
  Work,
  CalendarToday,
  Badge,
} from "@mui/icons-material";
import { register, validateAndSendOTP, verifyOTP } from "./actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { format } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import OtpModal from "@/components/otp-modal";
import * as countryCodes from "country-codes-list";

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

  // Function to handle form submission and OTP process
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formElement = document.getElementById(
      "signupForm"
    ) as HTMLFormElement;

    if (formElement) {
      setIsLoading(true); // Set loading state to true when form is submitted

      const formData = new FormData(formElement);
      const selectedCountryCode = formData.get("countryCode");
      const contactNumber = formData.get("contact");
      const fullContactNumber = `${selectedCountryCode}${contactNumber}`;
      formData.set("contact", fullContactNumber);

      // Add the dateOfBirth to the form data
      if (date) {
        formData.set("dateOfBirth", format(date, "yyyy-MM-dd"));
      }

      try {
        // Validate form data and send OTP
        const result = await validateAndSendOTP({}, formData);

        if (result.success) {
          // Store form data for later use after OTP verification
          setFormCache(formData);
          // Open OTP modal
          setIsOtpModalOpen(true);
        } else {
          // Handle validation errors
          setValidationErrors(result.errors || {});
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
      } finally {
        setIsLoading(false); // Set loading state to false when process is complete
      }
    }
  };

  const handleOtpVerify = async (otpValue: string) => {
    if (!formCache) return;

    const email = formCache.get("email") as string;

    setIsLoading(true); // Set loading state to true during OTP verification

    try {
      // Verify OTP
      const verificationResult = await verifyOTP(email, otpValue);

      if (verificationResult.success) {
        // OTP is verified, add the verification flag to form data
        const verifiedFormData = new FormData();
        formCache.forEach((value, key) => {
          verifiedFormData.append(key, value);
        });
        verifiedFormData.append("otpVerified", "true"); // This becomes a string, not a boolean

        registerAction(verifiedFormData);
        setIsOtpModalOpen(false);
      } else {
        // Show error message to user
        alert("OTP verification failed: " + verificationResult.message);
        console.error("OTP verification failed:", verificationResult.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setIsLoading(false); // Set loading state to false when process is complete
    }
  };

  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button
        disabled={pending || isLoading}
        type="button" // Changed from "submit" to "button"
        className="bg-yellow-600 w-full mt-6"
        variant="default"
        onClick={handleFormSubmit}
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
        {/* Background Image */}
        <Image
          src={image}
          alt="Philippine Eagles Group Photo"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Logo Positioned on Top */}
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
              id="signupForm"
              onSubmit={handleFormSubmit}
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
                    {state?.errors?.firstName && (
                      <p className="text-red-500 text-xs mt-1">
                        {state.errors.firstName[0]}
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
                    {state?.errors?.middleName && (
                      <p className="text-red-500 text-xs mt-1">
                        {state.errors.middleName[0]}
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
                    {state?.errors?.lastName && (
                      <p className="text-red-500 text-xs mt-1">
                        {state.errors.lastName[0]}
                      </p>
                    )}
                  </div>

                  {/* Name Extensions */}
                  <div className="relative">
                    <Input
                      id="nameExtensions"
                      name="nameExtensions"
                      type="text"
                      placeholder="Name Extensions (Jr., Sr., etc.)"
                      className="w-full rounded-lg bg-background"
                    />
                    {state?.errors?.nameExtensions && (
                      <p className="text-red-500 text-xs mt-1">
                        {state.errors.nameExtensions[0]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Date of Birth - MUI DatePicker */}
                  <div className="relative">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Date of Birth"
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                        disableFuture
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            variant: "outlined",
                          },
                        }}
                      />
                    </LocalizationProvider>
                    {state?.errors?.dateOfBirth && (
                      <p className="text-red-500 text-xs mt-1">
                        {state.errors.dateOfBirth[0]}
                      </p>
                    )}
                  </div>

                  {/* Profession */}
                  <div className="relative">
                    <div className="absolute left-2.5 top-1.5 h-8 w-4 text-muted-foreground">
                      <Work className="h-4 w-4" />
                    </div>
                    <Input
                      id="profession"
                      name="profession"
                      type="text"
                      placeholder="Profession"
                      className="w-full rounded-lg bg-background pl-8 h-12"
                    />
                    {state?.errors?.profession && (
                      <p className="text-red-500 text-xs mt-1">
                        {state.errors.profession[0]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="relative">
                  <div className="absolute left-2.5 top-1.5 h-4 w-4 text-muted-foreground">
                    <Home className="h-4 w-4" />
                  </div>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Complete Address"
                    className="w-full rounded-lg bg-background pl-8"
                  />
                  {state?.errors?.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {state.errors.address[0]}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Contact Information</h2>

                {/* username */}
                <div className="relative">
                  <div className="absolute left-2.5 top-1.5 h-4 w-4 text-muted-foreground">
                    <Email className="h-4 w-4" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-lg bg-background pl-8"
                  />
                  {state?.errors?.username && (
                    <p className="text-red-500 text-xs mt-1">
                      {state.errors.username[0]}
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
                    <div className="absolute left-2.5 top-1.5 h-4 w-4 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                    </div>
                    <Input
                      id="contact"
                      name="contact"
                      type="text"
                      placeholder="Contact Number"
                      className="w-full rounded-lg bg-background pl-8"
                    />
                    {state?.errors?.contact && (
                      <p className="text-red-500 text-xs mt-1">
                        {state.errors.contact[0]}
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
                  <div className="absolute left-2.5 top-1.5 h-4 w-4 text-muted-foreground">
                    <Person className="h-4 w-4" />
                  </div>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="w-full rounded-lg bg-background pl-8"
                  />
                  {state?.errors?.username && (
                    <p className="text-red-500 text-xs mt-1">
                      {state.errors.username[0]}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <div className="absolute left-2.5 top-1.5 h-4 w-4 text-muted-foreground">
                    <Lock className="h-4 w-4" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full rounded-lg bg-background pl-8"
                  />
                  {state?.errors?.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {state.errors.password[0]}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <div className="absolute left-2.5 top-1.5 h-4 w-4 text-muted-foreground">
                    <Lock className="h-4 w-4" />
                  </div>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full rounded-lg bg-background pl-8"
                  />
                  {state?.errors?.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {state.errors.confirmPassword[0]}
                    </p>
                  )}
                </div>
              </div>

              {/* Error display for form-level errors */}
              {state?.errors?._form && (
                <div className="bg-red-50 p-2 rounded border border-red-200">
                  <p className="text-red-500 text-sm">
                    {state.errors._form[0]}
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
      />
    </div>
  );
}
