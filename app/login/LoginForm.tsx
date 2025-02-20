"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "@mui/icons-material";
import { login } from "./actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export default function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);
  
  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button
        disabled={pending}
        type="submit"
        className="bg-yellow-600 w-full mt-8 md:mt-12"
        variant="default"
      >
        Login
      </Button>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Group Photo (hidden on mobile) */}
      <div className="hidden md:block md:w-1/2 relative">
        {/* Black overlay for the first image */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <Image
          src="/image-7.png"
          alt="Philippine Eagles Group Photo"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute left-1 top-4 z-20">
          <Link
            href="/"
            className="flex items-center text-yellow-400 hover:underline"
          >
            <span>
              <ChevronLeft />
            </span>
            Back to Home
          </Link>
        </div>
        <div className="absolute top-1/4 left-1/3 z-20">
          <div className="p-3 rounded-full">
            <Image
              src="/logo.png"
              alt="Philippine Eagles Logo"
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>

      {/* Mobile header with logo and back button */}
      <div className="md:hidden bg-yellow-600 p-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center text-white hover:underline"
        >
          <span>
            <ChevronLeft />
          </span>
          Back
        </Link>
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            alt="Philippine Eagles Logo"
            width={60}
            height={60}
          />
        </div>
        <div className="w-6"></div> {/* Empty div for spacing */}
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4 md:p-0">
        <Card className="w-full max-w-md p-4 md:p-6 space-y-4 md:space-y-8">
          <CardHeader>
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
              Welcome Back!
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Hello Eagle! Please login to your Account
            </p>
          </CardHeader>
          <CardContent className="space-y-6 md:space-y-12">
            <form action={loginAction} className="space-y-4">
              <Input
                type="text"
                id="email"
                name="email"
                placeholder="Username"
                className="w-full"
              />
              {state?.errors?.email && (
                <p className="text-red-500 text-sm">{state.errors.email}</p>
              )}
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="w-full"
              />
              {state?.errors?.password && (
                <p className="text-red-500 text-sm">{state.errors.password}</p>
              )}
              <SubmitButton />
            </form>
            <div className="text-center mt-6 md:mt-12">
              <Link
                href="/pages/signup"
                className="text-primary hover:underline text-sm md:text-base"
              >
                Not a member yet?{" "}
                <span className="text-yellow-500 font-bold">Join Us NOW!</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
