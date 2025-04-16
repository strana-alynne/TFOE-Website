"use client"; // Add this to mark as a client component

import React from "react";
import { Button } from "./ui/button";

export default function Footer({ contacts }: { contacts: any }) {
  return (
    <footer className="bg-[#1F1F1F] px-4 sm:px-6 py-8 sm:py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Logo */}
          <div className="flex justify-center sm:justify-start items-center">
            <img
              src="/logo.png"
              alt="Eagle Logo"
              className="w-24 sm:w-32 md:w-40"
            />
          </div>

          {/* Organization Name */}
          <div className="text-center sm:text-left">
            <p className="text-white text-sm sm:text-base lg:text-lg font-bold">
              The Fraternal Order of Eagles <br />
              (Philippine Eagles)
            </p>
          </div>

          {/* Address */}
          <div className="text-center sm:text-left">
            <p className="text-white text-xs sm:text-sm lg:text-base">
              <span className="font-bold text-sm sm:text-base lg:text-lg">
                Address:
              </span>{" "}
              <br />
              {contacts?.Address || "Address not available"}
            </p>
          </div>

          {/* Social Media */}
          <div className="text-center sm:text-left">
            <p className="text-white text-sm sm:text-base lg:text-lg font-bold mb-2">
              Social Media
            </p>
            <div className="space-y-1 sm:space-y-2">
              {contacts?.SocialMediaLinks &&
              contacts.SocialMediaLinks.length > 0 ? (
                contacts.SocialMediaLinks.map((link: any, index: any) => (
                  <a
                    key={link._key || index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="link"
                      className="text-white p-0 text-xs sm:text-sm lg:text-base"
                    >
                      {link.label}
                    </Button>
                  </a>
                ))
              ) : (
                <>
                  <Button
                    variant="link"
                    className="text-white p-0 text-xs sm:text-sm lg:text-base"
                  >
                    (PRIVATE) FACEBOOK
                  </Button>
                  <Button
                    variant="link"
                    className="text-white p-0 text-xs sm:text-sm lg:text-base block"
                  >
                    (PUBLIC - 1) FACEBOOK
                  </Button>
                  <Button
                    variant="link"
                    className="text-white p-0 text-xs sm:text-sm lg:text-base block"
                  >
                    (PUBLIC - 2) FACEBOOK
                  </Button>
                  <Button
                    variant="link"
                    className="text-white p-0 text-xs sm:text-sm lg:text-base block"
                  >
                    Eagle's Nest
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Copyright and Contact */}
        <div className="text-center space-y-2">
          <p className="text-white text-xs sm:text-sm lg:text-base">
            Copyright © 2025 Eagles Nest Online
          </p>
          <p className="text-white text-xs sm:text-sm lg:text-base">
            For more info, email us at {contacts?.Email || "email"}
            {contacts?.EmailCC && ` and cc ${contacts.EmailCC}`}.
          </p>
        </div>
      </div>
    </footer>
  );
}
