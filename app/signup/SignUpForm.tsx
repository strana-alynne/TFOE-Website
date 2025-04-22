"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { register } from "./actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

// Define a type for our form errors
type FormErrors = {
  firstName?: string[];
  middleName?: string[];
  lastName?: string[];
  nameExtensions?: string[];
  age?: string[];
  address?: string[];
  email?: string[];
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

  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button
        disabled={pending}
        type="submit"
        className="bg-yellow-600 w-full mt-6"
        variant="default"
      >
        Sign Up
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
            <form action={registerAction} className="space-y-4">
              {/* Personal Information Section */}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Personal Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* First Name */}
                  <div className="relative">
                    <div className="absolute left-2.5 top-1.5 h-4 w-4 text-muted-foreground">
                      <Person className="h-4 w-4" />
                    </div>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      className="w-full rounded-lg bg-background pl-8"
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
                  {/* Age */}
                  {/* <div className="relative"> */}
                  {/*   <div className="absolute left-2.5 top-1.5 h-4 w-4 text-muted-foreground"> */}
                  {/*     <CalendarToday className="h-4 w-4" /> */}
                  {/*   </div> */}
                  {/*   <Input */}
                  {/*     id="age" */}
                  {/*     name="age" */}
                  {/*     type="number" */}
                  {/*     placeholder="Age" */}
                  {/*     className="w-full rounded-lg bg-background pl-8" */}
                  {/*   /> */}
                  {/*   {state?.errors?.age && ( */}
                  {/*     <p className="text-red-500 text-xs mt-1"> */}
                  {/*       {state.errors.age[0]} */}
                  {/*     </p> */}
                  {/*   )} */}
                  {/* </div> */}

                  {/* Profession */}
                  {/* <div className="relative"> */}
                  {/*   <div className="absolute left-2.5 top-1.5 h-4 w-4 text-muted-foreground"> */}
                  {/*     <Work className="h-4 w-4" /> */}
                  {/*   </div> */}
                  {/*   <Input */}
                  {/*     id="profession" */}
                  {/*     name="profession" */}
                  {/*     type="text" */}
                  {/*     placeholder="Profession" */}
                  {/*     className="w-full rounded-lg bg-background pl-8" */}
                  {/*   /> */}
                  {/*   {state?.errors?.profession && ( */}
                  {/*     <p className="text-red-500 text-xs mt-1"> */}
                  {/*       {state.errors.profession[0]} */}
                  {/*     </p> */}
                  {/*   )} */}
                  {/* </div> */}
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

                {/* Email */}
                <div className="relative">
                  <div className="absolute left-2.5 top-1.5 h-4 w-4 text-muted-foreground">
                    <Email className="h-4 w-4" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="w-full rounded-lg bg-background pl-8"
                  />
                  {state?.errors?.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {state.errors.email[0]}
                    </p>
                  )}
                </div>

                {/* Contact Number */}
                <div className="relative">
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
    </div>
  );
}
