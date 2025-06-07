"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useFormStatus } from "react-dom";
import * as countryCodes from "country-codes-list";
import { addPrereg } from "./actions";

// Define a type for our form errors
type FormErrors = {
  firstName?: string[];
  lastName?: string[];
  email?: string[];
  contact?: string[];
  interest?: string[];
  _form?: string[];
};

export default function PreRegForm({
  image,
  logo,
}: {
  image: string;
  logo: string;
}) {
  const myCountryCodesObject = countryCodes.customList(
    "countryCallingCode",
    "{countryNameEn}: +{countryCallingCode}"
  );

  const [validationErrors, setValidationErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formElement = document.getElementById(
      "signupForm"
    ) as HTMLFormElement;

    if (formElement) {
      setIsLoading(true);
      setValidationErrors({}); // Clear previous errors

      const formData = new FormData(formElement);
      const selectedCountryCode = formData.get("countryCode");
      const contactNumber = formData.get("contact");
      const fullContactNumber = `${selectedCountryCode}${contactNumber}`;
      formData.set("contact", fullContactNumber);

      for (const [key, value] of formData.entries()) {
        console.log(`  ${key}: ${value}`);
      }

      try {
        // ... rest of your existing code

        const result = await addPrereg(formData);

        if (result.success) {
          setIsSubmitted(true);
        } else {
          setValidationErrors({
            _form: [result.message || "Failed to submit form"],
          });
        }
      } catch (error) {
        setValidationErrors({
          _form: ["An unexpected error occurred. Please try again."],
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("❌ Form element not found!");
    }
  };

  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button
        disabled={pending || isLoading}
        type='submit' // Changed from "button" to "submit"
        className='bg-yellow-600 w-full mt-6'
        variant='default'
      >
        {isLoading ? (
          <span className='flex items-center gap-2'>
            <svg
              className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Submit"
        )}
      </Button>
    );
  }

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* Left Side - Background Image with Logo */}
      <div className='relative w-full md:w-1/2 h-64 md:h-screen'>
        {/* Background Image */}
        <Image
          src={image}
          alt='Philippine Eagles Group Photo'
          layout='fill'
          objectFit='cover'
          className='absolute inset-0'
        />
        <div className='absolute inset-0 bg-black opacity-50'></div>

        {/* Logo Positioned on Top */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <Image
            src={logo}
            alt='Philippine Eagles Logo'
            width={250}
            height={250}
            className='w-40 h-40 md:w-64 md:h-64'
          />
        </div>
      </div>

      {/* Right Side - Signup Section */}
      <div className='relative w-full md:w-1/2 flex flex-col items-center justify-center px-4 md:px-8 py-6'>
        {/* Back Button */}
        <div className='absolute left-4 top-4'>
          <Link
            href='/'
            className='flex items-center text-yellow-400 hover:underline'
          >
            <ChevronLeft />
            Back to Home
          </Link>
        </div>

        {/* Signup Form */}
        {!isSubmitted ? (
          <Card className='w-full max-w-xl p-4 md:p-6 space-y-4 md:space-y-6 bg-white/95 mt-16 md:mt-0 mb-8'>
            <CardHeader>
              <h1 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold'>
                Join the Eagles Community
              </h1>
              <p className='text-muted-foreground text-sm md:text-base'>
                Create your account in just a few steps.
              </p>
            </CardHeader>
            <CardContent className='space-y-6'>
              <form
                id='signupForm'
                onSubmit={handleFormSubmit}
                className='space-y-4'
              >
                {/* Personal Information Section */}
                <div className='space-y-4'>
                  <h2 className='text-lg font-semibold'>
                    Personal Information
                  </h2>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    {/* First Name */}
                    <div className='relative'>
                      <Input
                        id='firstName'
                        name='firstName'
                        type='text'
                        placeholder='First Name'
                        className='w-full rounded-lg bg-background'
                      />
                      {validationErrors?.firstName && (
                        <p className='text-red-500 text-xs mt-1'>
                          {validationErrors.firstName[0]}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className='relative'>
                      <Input
                        id='lastName'
                        name='lastName'
                        type='text'
                        placeholder='Last Name'
                        className='w-full rounded-lg bg-background'
                      />
                      {validationErrors?.lastName && (
                        <p className='text-red-500 text-xs mt-1'>
                          {validationErrors.lastName[0]}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className='relative'>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      placeholder='Email Address'
                      className='w-full rounded-lg bg-background'
                    />
                    {validationErrors?.email && (
                      <p className='text-red-500 text-xs mt-1'>
                        {validationErrors.email[0]}
                      </p>
                    )}
                  </div>

                  {/* Contact Number */}
                  <div className='grid grid-cols-3 gap-2'>
                    <div className='col-span-1'>
                      <Select
                        name='countryCode'
                        defaultValue={Object.keys(myCountryCodesObject)[0]}
                      >
                        <SelectTrigger className='w-full rounded-lg bg-background'>
                          <SelectValue placeholder='Select country' />
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
                    <div className='col-span-2 relative'>
                      <Input
                        id='contact'
                        name='contact'
                        type='text'
                        placeholder='Contact Number'
                        className='w-full rounded-lg bg-background'
                      />
                      {validationErrors?.contact && (
                        <p className='text-red-500 text-xs mt-1'>
                          {validationErrors.contact[0]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Interest Statement Section */}
                <div className='space-y-4'>
                  <h2 className='text-lg font-semibold'>Interest Statement</h2>

                  {/* Interest Text Area */}
                  <div className='relative'>
                    <Textarea
                      id='interest'
                      name='interest'
                      placeholder='State your interest in joining our organization'
                      className='w-full rounded-lg bg-background min-h-[100px] resize-none'
                      maxLength={500}
                    />
                    {validationErrors?.interest && (
                      <p className='text-red-500 text-xs mt-1'>
                        {validationErrors.interest[0]}
                      </p>
                    )}
                    <p className='text-gray-500 text-xs mt-1'>
                      Maximum 500 characters
                    </p>
                  </div>
                </div>

                {/* Error display for form-level errors */}
                {validationErrors?._form && (
                  <div className='bg-red-50 p-2 rounded border border-red-200'>
                    <p className='text-red-500 text-sm'>
                      {validationErrors._form[0]}
                    </p>
                  </div>
                )}

                <SubmitButton />
              </form>
              <div className='text-center'>
                <Link
                  href='/login'
                  className='text-primary hover:underline text-sm md:text-base'
                >
                  Already a Member?{" "}
                  <span className='text-yellow-500 font-bold'> Login Here</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className='w-full max-w-xl p-4 md:p-6 space-y-4 md:space-y-6 bg-white/95 mt-16 md:mt-0 mb-8'>
            <CardHeader>
              <h1 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center'>
                Application Submitted
              </h1>
            </CardHeader>
            <CardContent className='space-y-6 text-center'>
              <div className='flex justify-center mb-6'>
                <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-8 h-8 text-green-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                </div>
              </div>

              <p className='text-muted-foreground text-sm md:text-base leading-relaxed'>
                This is to confirm that we received your intent. Admin will
                review your application and contact you for the next steps.
              </p>

              <Button
                asChild
                className='bg-yellow-600 w-full mt-6'
                variant='default'
              >
                <Link href='/'>Go to Home</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
