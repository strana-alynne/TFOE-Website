import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Email, Lock, Person, Search } from "@mui/icons-material";

export default function SignUpPage() {
  return (
    <div className="min-h-screen relative">
      {/* Background image for both mobile and desktop */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <Image
          src="/image-8.png"
          alt="Philippine Eagles Group Photo"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>

      {/* Desktop layout */}
      <div className="relative z-10 min-h-screen flex flex-col md:flex-row">
        {/* Left Side - only visible on desktop */}
        <div className="hidden md:flex md:w-1/2 relative items-center justify-center">
          <div className="p-3 rounded-full">
            <Image
              src="/logo.png"
              alt="Philippine Eagles Logo"
              width={300}
              height={300}
            />
          </div>
        </div>

        {/* Back button - visible on all screens */}
        <div className="absolute left-4 top-4 z-20">
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

        {/* Mobile header with logo - only visible on mobile */}
        <div className="md:hidden pt-16 pb-6 flex justify-center">
          <div className="p-3 rounded-full">
            <Image
              src="/logo.png"
              alt="Philippine Eagles Logo"
              width={120}
              height={120}
            />
          </div>
        </div>

        {/* Right Side - Signup Form (full width on mobile, half width on desktop) */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-0 py-6 md:py-0">
          <Card className="w-full max-w-md p-4 md:p-6 space-y-4 md:space-y-8 bg-white/95">
            <CardHeader>
              <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold">
                Join the Community
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Create your account in just a few steps.
              </p>
            </CardHeader>
            <CardContent className="space-y-6 md:space-y-12">
              <form className="space-y-4">
                <div className="relative">
                  <div className="absolute left-2.5 top-1.5 h-4 w-4 text-muted-foreground">
                    <Person className="h-4 w-4" />
                  </div>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Username"
                    className="w-full rounded-lg bg-background pl-8"
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-2.5 top-1.5 h-4 w-4 text-muted-foreground">
                    <Email className="h-4 w-4" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-lg bg-background pl-8"
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-2.5 top-1.5 h-4 w-4 text-muted-foreground">
                    <Lock className="h-4 w-4" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="w-full rounded-lg bg-background pl-8"
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-2.5 top-1.5 h-4 w-4 text-muted-foreground">
                    <Lock className="h-4 w-4" />
                  </div>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full rounded-lg bg-background pl-8"
                  />
                </div>
                <Button
                  className="bg-yellow-600 w-full mt-6 md:mt-12"
                  variant="default"
                >
                  Sign Up
                </Button>
              </form>
              <div className="text-center mt-6 md:mt-12">
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
    </div>
  );
}
