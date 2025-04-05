import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Email, Lock, Person, Search } from "@mui/icons-material";

export default function SignUpPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Background Image with Logo */}
      <div className="relative w-full md:w-1/2 h-64 md:h-screen">
        {/* Background Image */}
        <Image
          src="/image-8.png"
          alt="Philippine Eagles Group Photo"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Logo Positioned on Top */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Philippine Eagles Logo"
            width={250}
            height={250}
            className="w-40 h-40 md:w-64 md:h-64"
          />
        </div>
      </div>

      {/* Right Side - Login Section */}
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
        <Card className="w-full max-w-md p-4 md:p-6 space-y-4 md:space-y-8 bg-white/95 mt-16 md:mt-0">
          <CardHeader>
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
              Join the Community
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Create your account in just a few steps.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
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
              <Button className="bg-yellow-600 w-full mt-6" variant="default">
                Sign Up
              </Button>
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
