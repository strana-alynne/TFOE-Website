"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowForward, ChevronLeft, ChevronRight } from "@mui/icons-material";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";

interface CarouselSlide {
  category: string;
  title: string;
  description: any;
  image: any;
  link: string;
}

interface ReusableTextCarouselProps {
  slides: CarouselSlide[];
}

export default function ReusableTextCarousel({
  slides,
}: ReusableTextCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Stationary Text Area */}
      <div className="absolute z-20 left-0 right-0 px-4 sm:px-8 md:left-0 md:w-1/2 mx-20 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <p className="text-yellow-500 text-sm sm:text-base md:text-lg font-bold">
              {slides[currentSlide].category}
            </p>
            <h2 className="text-white uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
              {slides[currentSlide].title}
            </h2>
            <div className="text-white text-sm sm:text-base md:text-lg max-w-2xl">
              <PortableText value={slides[currentSlide].description} />
            </div>

            <Button
              asChild
              className="bg-yellow-500 hover:bg-yellow-600 text-white items-center gap-2"
            >
              <Link href={slides[currentSlide].link}>
                {" "}
                <span>
                  {" "}
                  <ArrowForward className="w-5 h-5" />
                </span>
                View More
              </Link>
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Image Carousel */}
      <div className="absolute w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute w-full h-full"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="w-full h-full bg-cover bg-center filter brightness-50"
              style={{
                backgroundImage: `url(${urlFor(slides[currentSlide].image).url()})`,
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div
          onClick={handlePrev}
          role="button"
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 sm:p-4 text-white"
        >
          <ChevronLeft className="w-8 h-8 sm:w-12 sm:h-12" />
        </div>
        <div
          onClick={handleNext}
          role="button"
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 sm:p-4 text-white"
        >
          <ChevronRight className="w-8 h-8 sm:w-12 sm:h-12" />
        </div>
      </div>
    </div>
  );
}
