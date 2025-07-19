"use client";
import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Star,
  Mail,
  Phone,
  Globe,
  Menu,
  X,
  BusFront,
  Handshake,
  Network,
  Award,
  PartyPopper,
  MessagesSquare,
  HandCoins,
  NotebookTabs,
  Earth,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const RGLIconLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [current, setCurrent] = useState(0);
  const [forward, setForward] = useState(true);

  const sponsorshipPackages = [
    {
      name: "PLATINUM SPONSOR",
      price: "$20,000",
      features: [
        {
          title: "Event Proper Mileage",
          subfeatures: [
            "Pullout banners by the Red Carpet Entrance 6pcs, 2x5 | Branded Red Carpet Interview | Logo Placement on LED Wall | Brand Live Acknowledgement by the Host all through out the event proper | Video Ad Playback before Event Proper (2x 30 seconder) | Logo Placement on Media Photowall | Branded VIP Table | Logo Placement on Red Carpet Photowall | 2x2 Booth Space | Brand or Product Presentation (15-20 Mins.)",
            "Brand Inclusion in Digital Billboard",
          ],
        },
        {
          title: "Digital Mileage",
          subfeatures: [
            "Logo Inclusion on Post - edited video of the RGL Icon | Logo Inclusion on RGL Website | Logo Inclusion on Raffle Winners Announcement | Dedicated Online Article as official sponsor/partner to be published in RGL soc med platforms (1x Original Article) | Logo Inclusion on Lower Third during Live Streaming | Web Banner Placement in RGL Website (Leaderboard (Prime) 1,600x400px)",
            "Dedicated announcement post as sponsor/partner on Website and Social Media Channels",
          ],
        },
        {
          title: "Print Mileage",
          subfeatures: [
            "2 page  Full Page Ad  | Advertorial (2x, c/o of Client)",
          ],
        },
      ],
      highlighted: true,
    },
    {
      name: "GOLD SPONSOR",
      price: "$10,000",
      features: [
        {
          title: "Event Proper Mileage",
          subfeatures: [
            "Pullout banners by the Red Carpet Entrance 3pcs, 2x5 | Branded Red Carpet Interview | Logo Placement on LED Wall | Brand Live Acknowledgement by the Host all through out the event proper | Video Ad Playback before Event Proper (1x 30 seconder) | Logo Placement on Media Photowall | Branded VIP Table | Logo Placement on Red Carpet Photowall | 1x1m Booth Space | Brand or Product Presentation (10-15 Mins.)",
            "Brand Inclusion in Digital Billboard",
          ],
        },
        {
          title: "Digital Mileage",
          subfeatures: [
            "Logo Inclusion on Post - edited video of the RGL Icon | Logo Inclusion on RGL Website | Logo Inclusion on Raffle Winners Announcement | Dedicated Online Article as official sponsor/partner to be published in RGL soc med platforms (1x Original Article) | Logo Inclusion on Lower Third during Live Streaming | Web Banner Placement in RGL Website (Leaderboard (Prime) 1,600x400px)",
            "Dedicated announcement post as sponsor/partner on Website and Social Media Channels",
          ],
        },
        {
          title: "Print Mileage",
          subfeatures: [
            "1 page  Full Page Ad  | Advertorial (1x, c/o of Client)",
          ],
        },
      ],
      highlighted: false,
    },

    {
      name: "SILVER SPONSOR",
      price: "$5,000",
      features: [
        {
          title: "Event Proper Mileage",
          subfeatures: [
            "Pullout banners by the Red Carpet Entrance 3pcs, 2x5 | Branded Red Carpet Interview | Logo Placement on LED Wall | Brand Live Acknowledgement by the Host all through out the event proper | Video Ad Playback before Event Proper (1x 30 seconder) | Logo Placement on Media Photowall | Branded VIP Table | Logo Placement on Red Carpet Photowall | 1x1m Booth Space | Brand or Product Presentation (10-15 Mins.)",
            "Brand Inclusion in Digital Billboard",
          ],
        },
        {
          title: "Digital Mileage",
          subfeatures: [
            "Logo Inclusion on Post - edited video of the RGL Icon | Logo Inclusion on RGL Website | Logo Inclusion on Raffle Winners Announcement | Dedicated Online Article as official sponsor/partner to be published in RGL soc med platforms (1x Original Article) | Logo Inclusion on Lower Third during Live Streaming | Web Banner Placement in RGL Website (Leaderboard (Prime) 1,600x400px)",
            "Dedicated announcement post as sponsor/partner on  RGL Website and Social Media Channels",
          ],
        },
        {
          title: "Print Mileage",
          subfeatures: [
            "1 page Full Page Ad  | Advertorial (1x, c/o of Client)",
          ],
        },
      ],
      highlighted: false,
    },
    {
      name: "BRONZE SPONSOR",
      price: "$1,000",
      features: [
        {
          title: "Event Proper Mileage",
          subfeatures: [
            "Pullout banners by the Red Carpet Entrance 1pc, 2x5 | Branded Red Carpet Interview | Logo Placement on LED Wall | Brand Live Acknowledgement by the Host all through out the event proper | Video Ad Playback before Event Proper (1x 30 seconder) | Logo Placement on Media Photowall | Branded VIP Table | Logo Placement on Red Carpet Photowall | 1x1m Booth Space | ",
            "Brand Inclusion in Digital Billboard",
          ],
        },
        {
          title: "Digital Mileage",
          subfeatures: [
            "Logo Inclusion on Post - edited video of the RGL Icon | Logo Inclusion on RGL Website | Logo Inclusion on Raffle Winners Announcement | Dedicated Online Article as official sponsor/partner to be published in RGL soc med platforms (1x Original Article) | Logo Inclusion on Lower Third during Live Streaming | Dedicated announcement post as sponsor/partner on  RGL Website and Social Media Channels",
          ],
        },
        {
          title: "Print Mileage",
          subfeatures: [
            "1 page Half Page Ad  | Advertorial (1x, c/o of Client)",
          ],
        },
      ],
      highlighted: false,
    },
  ];

  const navItems = [
    { id: "home", label: "Home" },
    { id: "venue", label: "Venue" },
    { id: "expect", label: "About" }, // Combines what to expect
    { id: "proper", label: "Event" }, // Combines event proper and digital/print
    { id: "partners", label: "Partners" },
    { id: "sponsorship", label: "Sponsorship" },
    { id: "contact", label: "Contact" },
  ];

  const sliderImages = [
    "/rglicon2025/location01.png",
    "/rglicon2025/location02.png",
    "/rglicon2025/location03.png",
  ];

  const mediaPartners = [
    "/rglicon2025/partners/1.png",
    "/rglicon2025/partners/2.png",
    "/rglicon2025/partners/3.png",
    "/rglicon2025/partners/4.png",
    "/rglicon2025/partners/5.png",
    "/rglicon2025/partners/6.png",
    "/rglicon2025/partners/7.png",
    "/rglicon2025/partners/8.png",
    "/rglicon2025/partners/9.png",
    "/rglicon2025/partners/10.png",
    "/rglicon2025/partners/11.png",
    "/rglicon2025/partners/12.png",
    "/rglicon2025/partners/13.png",
    "/rglicon2025/partners/14.png",
    "/rglicon2025/partners/15.png",
    "/rglicon2025/partners/16.png",
    "/rglicon2025/partners/17.png",
    "/rglicon2025/partners/18.png",
    "/rglicon2025/partners/19.png",
    "/rglicon2025/partners/20.png",
    "/rglicon2025/partners/21.png",
    "/rglicon2025/partners/22.png",
    "/rglicon2025/partners/23.png",
    "/rglicon2025/partners/24.png",
    "/rglicon2025/partners/25.png",
    "/rglicon2025/partners/26.png",
    "/rglicon2025/partners/27.png",
    "/rglicon2025/partners/28.png",
    "/rglicon2025/partners/29.png",
    "/rglicon2025/partners/30.png",
    "/rglicon2025/partners/31.png",
    "/rglicon2025/partners/32.png",
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        if (forward) {
          if (prev === sliderImages.length - 1) {
            setForward(false); // reverse direction
            return prev - 1;
          }
          return prev + 1;
        } else {
          if (prev === 0) {
            setForward(true); // switch back to forward
            return prev + 1;
          }
          return prev - 1;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [forward, sliderImages.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-amber-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-amber-400/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/rglicon2025/logo.png"
                alt="RGL Icon Logo"
                className="h-20 w-20 mr-2"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors duration-300 hover:text-amber-400 ${
                    activeSection === item.id
                      ? "text-amber-400"
                      : "text-gray-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="flex items-center space-x-4 ml-6">
                <Button
                  onClick={() => scrollToSection("sponsorship")}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold rounded-lg hover:from-amber-600 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105"
                >
                  Become a Sponsor
                </Button>
                <Button
                  onClick={() => scrollToSection("venue")}
                  className="px-8 py-4 border-2 border-amber-400 text-amber-400 font-bold rounded-lg hover:bg-amber-400 hover:text-black transition-all duration-300"
                >
                  Register Now!
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-amber-400" />
              ) : (
                <Menu className="w-6 h-6 text-amber-400" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-black/95 border-t border-amber-400/20">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors duration-300 hover:text-amber-400 ${
                      activeSection === item.id
                        ? "text-amber-400"
                        : "text-gray-300"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="px-4 pb-4 flex flex-col space-y-3">
                <Button className="w-full px-4 py-2 text-sm font-medium text-black bg-amber-400 rounded-lg hover:bg-amber-500 transition-colors">
                  Become a Sponsor
                </Button>
                <Button className="w-full px-4 py-2 text-sm font-medium text-amber-400 border border-amber-400 rounded-lg hover:bg-amber-400 hover:text-black transition-colors">
                  Register Now!
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Hero Section */}
      <div id="home" className="relative pt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-400/20 opacity-30"></div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold rounded-full text-sm uppercase tracking-wide">
                First Ever • Historic • Prestigious
              </span>
            </div>
            <div className="flex justify-center">
              <img
                src="/rglicon2025/logo.png"
                alt="RGL Icon"
                className="mb-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-2text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>November 27-30, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>Ho Chi Minh City, Vietnam</span>
              </div>
            </div>

            <div className="text-center mb-12">
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                A special gathering to foster unity, camaraderie and solidarity
                amongst the Fraternity
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection("sponsorship")}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold rounded-lg hover:from-amber-600 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105"
              >
                Become a Sponsor
              </Button>
              <Button
                onClick={() => scrollToSection("venue")}
                className="px-8 py-4 border-2 border-amber-400 text-amber-400 font-bold rounded-lg hover:bg-amber-400 hover:text-black transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Venue Section */}
      <div id="venue" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {" "}
              {/* Image Slider - LEFT */}
              <div className="w-full order-2 lg:order-1">
                <div className="relative h-64 sm:h-80 md:h-96 lg:h-full w-full overflow-hidden rounded-xl shadow-lg border border-amber-400/20">
                  <div
                    className="flex h-full transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                  >
                    {sliderImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Venue ${index + 1}`}
                        className="w-full h-full object-cover flex-shrink-0"
                      />
                    ))}
                  </div>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center items-center gap-2 mt-4">
                  {sliderImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`w-3 h-3 rounded-full border border-amber-400 transition-all duration-300 ${
                        index === current
                          ? "bg-amber-400 scale-110"
                          : "bg-transparent hover:bg-amber-400/50"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              {/* Content - RIGHT */}
              <div className="order-1 lg:order-2">
                <div className="mb-4">
                  <span className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold rounded-full text-sm uppercase tracking-wide">
                    Venue
                  </span>
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-2 text-amber-300">
                    Windsor Plaza Hotel
                  </h2>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-amber-400" />
                    <span>Ho Chi Minh City, Vietnam</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-6 mt-10 text-amber-400">
                  Venue Features
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      title: "Prime Location",
                      desc: "Situated in District 5, just minutes from Tan Son Nhat International Airport (SGN) and major business districts like District 1.",
                    },
                    {
                      title: "State-of-the-Art Facilities",
                      desc: "Grand ballrooms, modern meeting rooms, and a fully equipped business center to host successful events.",
                    },
                    {
                      title: "Executive Comfort",
                      desc: "Spacious rooms and suites with high-speed Wi-Fi, work desks, and 24/7 room service.",
                    },
                    {
                      title: "Networking & Dining",
                      desc: "Enjoy rooftop dining at The 28th Floor Restaurant & Bar with stunning city views, perfect for sealing deals or unwinding.",
                    },
                    {
                      title: "Wellness & Relaxation",
                      desc: "Recharge at our fitness center, outdoor pool, and spa after a busy day.",
                    },
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold">{feature.title}</p>
                        <p className="text-gray-300">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* What to expect Section */}
      <div id="expect" className="relative bg-black/50">
        {/* Hero Section */}
        <div
          className="relative z-0 px-4 pt-20 pb-24 md:pt-32 md:pb-48 text-center"
          style={{
            backgroundImage: "url('/rglicon2025/usp.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-75 z-10"></div>

          <div className="relative z-20 max-w-4xl mx-auto px-4">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold rounded-full text-sm uppercase tracking-wide">
              What to Expect
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-6 leading-tight">
              Revitalizing TFOE-PE:
              <span className="text-amber-500">
                {" "}
                The First-Ever RGL International Convention
              </span>
            </h1>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection("sponsorship")}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold rounded-lg hover:from-amber-600 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105"
              >
                Become a Sponsor
              </Button>
              <Button
                onClick={() => scrollToSection("venue")}
                className="px-8 py-4 border-2 border-amber-400 text-amber-400 font-bold rounded-lg hover:bg-amber-400 hover:text-black transition-all duration-300"
              >
                Learn More
              </Button>
            </div>

            <p className="mt-8 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-white/90">
              This prestigious event is all about rebuilding trust, stability,
              and unity within TFOE-PE. We’ll tackle key challenges head-on,
              anchored in our shared values and traditions, while crafting
              concrete strategies to strengthen leadership and restore
              confidence in the National Administration.
            </p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="relative z-10 -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24 px-4 pb-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: "RGL Convention",
                icon: (
                  <Handshake className="mx-auto w-20 h-20 text-amber-500" />
                ),
                description:
                  "A special gathering of all the Regional Governors to foster unity, camaraderie and solidarity amongst the Fraternity.",
              },
              {
                title: "Business Matching",
                icon: <Network className="mx-auto w-20 h-20 text-amber-500" />,
                description:
                  "Unlock new opportunities! Members will connect with entrepreneurs from the Philippines and Vietnam, explore partnerships, and elevate their businesses.",
              },
              {
                title: "Penaple Night",
                icon: <Award className="mx-auto w-20 h-20 text-amber-500" />,
                description:
                  "Honoring our past National Presidents for their enduring contributions. Resolve legitimacy concerns and solidify our place in history.",
              },
              {
                title: "Vietnam Tour",
                icon: <BusFront className="mx-auto w-20 h-20 text-amber-500" />,
                description:
                  "Ben Thanh Market, Tay Ninh & Cao Dai Temple, Notre-Dame Cathedral Basilica of Saigon, Jade Emperor Pagoda, Saigon Opera House, Cholon, Cu Chi Tunnels.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl text-center p-6"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg text-black dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Why Join Section */}
      <div id="join" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold rounded-full text-sm uppercase tracking-wide">
              Why Join
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-amber-300">
              Be part of History
            </h2>
          </div>

          {/* Grid of cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: (
                  <PartyPopper className="mx-auto w-16 h-16 text-amber-500" />
                ),
                title: "First-Ever Event",
                description:
                  "Be part of a historic inaugural convention, setting the tone for future gatherings.",
              },
              {
                icon: (
                  <MessagesSquare className="mx-auto w-16 h-16 text-amber-500" />
                ),
                title: "Networking Opportunities",
                description:
                  "Connect with regional governors, members, and officers from the fraternity around the world.",
              },
              {
                icon: (
                  <HandCoins className="mx-auto w-16 h-16 text-amber-500" />
                ),
                title: "Collaboration and Partnerships",
                description:
                  "Discuss joint initiatives to address common regional issues like economic development, sustainability, and infrastructure.",
              },
              {
                icon: (
                  <NotebookTabs className="mx-auto w-16 h-16 text-amber-500" />
                ),
                title: "Knowledge Exchange",
                description:
                  "Gain insights into global and regional governance challenges and solutions.",
              },
              {
                icon: <Users className="mx-auto w-16 h-16 text-amber-500" />,
                title: "Professional Development",
                description:
                  "Enhance your leadership and governance skills through workshops and panel discussions.",
              },
              {
                icon: <Earth className="mx-auto w-16 h-16 text-amber-500" />,
                title: "Cultural Experience",
                description:
                  "Enjoy the vibrant atmosphere of Ho Chi Minh City, a blend of tradition and modernity.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-black/40 border border-amber-400/20 rounded-xl p-6 text-center shadow-md hover:shadow-amber-500/10 transition duration-300"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-amber-300 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Proper Section */}
      <div id="proper" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Content - RIGHT */}
              <div className="order-2 lg:order-1">
                <div className="mb-4">
                  <span className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold rounded-full text-sm uppercase tracking-wide">
                    Event
                  </span>
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-amber-300">
                    Event Proper
                  </h2>
                </div>

                <div className="mb-6 mt-6 lg:mt-10 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-lg sm:text-xl lg:text-2xl">
                      Logo placement on red carpet and photo opt wall
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-lg sm:text-xl lg:text-2xl">
                      Brand exposure by the red carpet area & booth space
                      allocation
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-lg sm:text-xl lg:text-2xl">
                      AVP playback and logo placement on the led wall
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-lg sm:text-xl lg:text-2xl">
                      Brand inclusion during livestream
                    </p>
                  </div>
                </div>
              </div>
              {/* LEFT SIDE: Single Image Only */}

              <div className="order-1 lg:order-2 w-full h-64 sm:h-80 md:h-96 lg:h-full rounded-xl overflow-hidden shadow-lg border border-amber-400/20">
                <img
                  src="/rglicon2025/stage.png"
                  alt="Venue"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Digital/Print Section */}
      <div id="digital-print" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Content - RIGHT */}

              <div className="flex flex-col sm:flex-row gap-4 w-full h-auto">
                <div className="flex-1 h-48 sm:h-64 md:h-80 lg:h-full rounded-xl overflow-hidden shadow-lg border border-amber-400/20">
                  <img
                    src="/rglicon2025/print01.png"
                    alt="Stage"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 h-48 sm:h-64 md:h-80 lg:h-full rounded-xl overflow-hidden shadow-lg border border-amber-400/20">
                  <img
                    src="/rglicon2025/print02.png"
                    alt="Print"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* LEFT SIDE: Single Image Only */}
              <div>
                <div className="mb-4">
                  <span className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold rounded-full text-sm uppercase tracking-wide">
                    Advertisement
                  </span>
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-amber-300">
                    Digital And Print
                  </h2>
                </div>

                <div className="mb-6 mt-6 lg:mt-10 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-lg sm:text-xl lg:text-2xl">Cover page</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-lg sm:text-xl lg:text-2xl">
                      Advertorial
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-lg sm:text-xl lg:text-2xl">
                      Full and half page advertisement
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-lg sm:text-xl lg:text-2xl">
                      Logo inclusion on digital and print
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Partners Section */}
      <div id="partners" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold rounded-full text-sm uppercase tracking-wide">
              Partners
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-amber-300">
              Media Partners
            </h2>
          </div>

          <div className="flex justify-center items-center h-32">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={3}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                320: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {mediaPartners.map((logo, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex justify-center items-center h-32">
                    <img
                      src={logo}
                      alt={`Partner ${idx + 1}`}
                      width={120}
                      height={80}
                      className="object-contain max-h-full w-auto transition duration-300 grayscale hover:grayscale-0"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      {/* Sponsorship Packages */}
      <div id="sponsorship" className="py-20 bg-black/50 pt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="mb-4">
                <span className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold rounded-full text-sm uppercase tracking-wide">
                  Packages
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-16 text-amber-300">
                Sponsorship Packages
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 w-full justify-items-center">
              {sponsorshipPackages.map((pkg, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-between p-4 sm:p-6 rounded-lg border-2 w-full max-w-sm
                    ${
                      pkg.highlighted
                        ? "border-amber-400 bg-gradient-to-b from-amber-900/40 to-yellow-900/40"
                        : "border-amber-400/30 bg-gradient-to-b from-gray-900/40 to-black/40"
                    }`}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-amber-300 mb-2">
                      {pkg.name}
                    </h3>
                    <div className="text-3xl font-bold text-white mb-4">
                      {pkg.price}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-300">
                        <div className="flex items-start gap-2">
                          <span>{feature.title}</span>
                        </div>

                        {feature.subfeatures && (
                          <ul className="list-disc list-inside text-xs text-gray-400 ml-5 mt-1">
                            {feature.subfeatures.map((sub, subIndex) => (
                              <li key={subIndex}>{sub}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                      pkg.highlighted
                        ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-black hover:from-amber-600 hover:to-yellow-500"
                        : "border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black"
                    }`}
                  >
                    Choose Package
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="relative py-20">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/rglicon2025/cta.png" // Replace with your image path
            alt="CTA Background"
            className="w-full h-full object-cover"
          />
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black/75" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-amber-300">
              Ready to Make History?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join us for the first-ever RGL International Convention and be
              part of something extraordinary.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => scrollToSection("sponsorship")}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold rounded-lg hover:from-amber-600 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105"
              >
                Become a Sponsor Now
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-4 border-2 border-amber-400 text-amber-400 font-bold rounded-lg hover:bg-amber-400 hover:text-black transition-all duration-300"
              >
                Register for Event
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-amber-300">
              Get In Touch
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full flex items-center justify-center mb-4 text-black">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-amber-300">Phone</h3>
                <p className="text-gray-300">+63 908 966 2475</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full flex items-center justify-center mb-4 text-black">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-amber-300">Email</h3>
                <p className="text-gray-300">rglicon@gmail.com</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full flex items-center justify-center mb-4 text-black">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-amber-300">
                  Website
                </h3>
                <p className="text-gray-300">www.srtec.tfoe-ph.org</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="py-8 bg-gradient-to-r from-black to-gray-900 border-t border-amber-400/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 RGL ICON Convention. All rights reserved. |
            <span className="text-amber-400 ml-2">
              THIS IS HISTORY • THIS IS BIG • THIS IS FIRST
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RGLIconLanding;
