"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "@mui/icons-material";
import { login } from "./actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

export default function LoginForm({
  image,
  logo,
}: {
  image: string;
  logo: string;
}) {
  const [state, loginAction] = useActionState(login, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success && state?.redirectTo) {
      localStorage.setItem("access_token", state.token);
      router.push(state.redirectTo);
    }
  }, [state, router]);

  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button
        disabled={pending}
        type="submit"
        className="bg-yellow-600 w-full mt-8 md:mt-12"
        variant="default"
      >
        {pending ? "Logging in..." : "Login"}
      </Button>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
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

      {/* Right Side - Login Section */}
      <div className="relative flex flex-col w-full md:w-1/2 items-center justify-center px-4 md:px-0">
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

        {/* Login Card */}
        <Card className="w-full max-w-md p-4 md:p-6 space-y-4 md:space-y-8 bg-white/95 mt-16 md:mt-0">
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
                id="username"
                name="username"
                placeholder="Username"
                className="w-full"
              />
              {state?.errors?.username && (
                <p className="text-red-500 text-sm">
                  {state.errors.username[0]}
                </p>
              )}
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="w-full"
              />
              {state?.errors?.password && (
                <p className="text-red-500 text-sm">
                  {state.errors.password[0]}
                </p>
              )}
              {state?.errors?.form && (
                <p className="text-red-500 text-sm">{state.errors.form}</p>
              )}
              <SubmitButton />
            </form>
            <div className="text-center mt-6 md:mt-12">
              <Link
                href="/preregistration"
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
