"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 50;
      const contentElement = document.querySelector("main");
      const backgroundColor = contentElement
        ? window.getComputedStyle(contentElement).backgroundColor
        : "rgba(0,0,0,0)";

      const rgbValues = backgroundColor.match(/\d+/g);
      const isWhiteBackground = !!(
        rgbValues &&
        Number(rgbValues[0]) > 240 &&
        Number(rgbValues[1]) > 240 &&
        Number(rgbValues[2]) > 240
      );

      setIsScrolled(scrollPosition > threshold || isWhiteBackground);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to scroll to section smoothly
  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed w-full z-50 py-8 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={` flex items-center justify-between h-16 rounded-full px-6
          ${
            isScrolled
              ? "bg-white/80 backdrop-blur-md border border-gray-200"
              : "bg-transparent backdrop-blur-sm border border-white/50"
          }`}
        >
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-10 w-10" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: "Home", id: "home" },
              { name: "About Us", id: "about" },
              { name: "Membership", id: "membership" },
              { name: "Blogs", id: "blogs" },
              { name: "Contact Us", id: "contact" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollToSection(link.id)}
                className={`  transition-colors cursor-pointer 
                  ${
                    isScrolled
                      ? "text-black hover:text-[#CC9A02]"
                      : "text-white hover:text-[#CC9A02]"
                  }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              asChild
              className={` hover:bg-yellow-500 hover:text-white
                ${isScrolled ? "text-black" : "text-[#CC9A02]"}`}
            >
              <Link href={"/pages/login"}>Login</Link>
            </Button>
            <Button
              asChild
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              <Link href={"/pages/signup"}>Join Us!</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
