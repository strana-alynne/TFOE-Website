"use client";
import Card_Component from "@/components/card-component";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ReusableCarousel from "@/components/ReusableCarousel";
import { Button } from "@/components/ui/button";
import {
  ArrowBack,
  ArrowForward,
  CreditCard,
  Download,
  Gite,
} from "@mui/icons-material";
import GroupsIcon from "@mui/icons-material/Groups";
import { link } from "fs";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const activities = [
    {
      category: "Activities",
      title: "Service Through Strong Brotherhood",
      description:
        "Gintong Butil Ng Nueva Ecija Eagles Club Rise Of The New Aspirant.",
      image: "/image-2.png",
      buttonText: "View More",
      link: "/blog/1",
    },
    {
      category: "Activities",
      title: "Service Through Strong Brotherhood",
      description:
        "Gintong Butil Ng Nueva Ecija Eagles Club Rise Of The New Aspirant.",
      image: "/image-3.png",
      buttonText: "View More",
      link: "/blog/2",
    },
  ];

  return (
    <main className="max-w-full overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section id="home">
        <ReusableCarousel slides={activities} />
      </section>

      {/* Stats Section */}
      <section className="bg-yellow-600 px-4 sm:px-8 md:px-16 lg:px-32 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 place-items-center">
        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
          <GroupsIcon className="text-4xl sm:text-5xl lg:text-6xl text-white" />
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl text-white font-bold">
              5000+
            </h2>
            <p className="text-base sm:text-xl lg:text-2xl text-white">
              Members
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
          <Gite className="text-4xl sm:text-5xl lg:text-6xl text-white" />
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl text-white font-bold">
              50
            </h2>
            <p className="text-base sm:text-xl lg:text-2xl text-white">
              Branches
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48px"
            viewBox="0 -960 960 960"
            width="48px"
            fill="#FFFFFF"
            className="sm:h-16 sm:w-16 lg:h-20 lg:w-20"
          >
            <path d="M245.93-32.83V-384.2L117.22-591.91l181.63-294.31h362.3l181.63 294.31L714.07-384.2v351.37L480-111.26 245.93-32.83Zm90.46-785.02L196.78-591.91l139.61 225.69h287.22l139.61-225.69-139.61-225.94H336.39Zm102.33 374.7-128-127 46.35-46.35 81.65 81.65 163.74-164.5 46.58 45.11-210.32 211.09Z" />
          </svg>
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl text-white font-bold">
              46
            </h2>
            <p className="text-base sm:text-xl lg:text-2xl text-white">Years</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8 p-4 md:p-8 lg:p-16"
      >
        <img
          src="/image-2.png"
          alt="Eagle Members"
          className="w-full md:w-1/2 max-w-md"
        />
        <div className="text-center md:text-left px-4 md:px-0">
          <div>
            <img
              src="/logo.png"
              alt="Eagle Logo"
              className="mx-auto md:mx-0 w-16 sm:w-24 md:w-32"
            />
            <p className="text-yellow-500 text-sm sm:text-base md:text-lg font-bold mt-4">
              The Fraternal Order of Eagles (Philippine Eagles)
            </p>
          </div>
          <p className="max-w-2xl my-4 sm:my-6 md:my-8 text-sm sm:text-base md:text-lg text-center md:text-left">
            Founded in Quezon City in 1979, The Fraternal Order of Eagles
            (Philippine Eagles) is a socio-civic organization with a guiding
            principle of service through strong brotherhood and fraternal ties
            among its members as keystone to humanitarian service
          </p>
        </div>
      </section>

      {/* Club Membership Section */}
      <section
        id="membership"
        className="space-y-8 py-8 sm:py-12 md:py-24 lg:py-36 px-4"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-yellow-500 text-sm sm:text-base md:text-lg font-bold">
            Club Membership
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center">
            BE PART OF THE <br />
            BROTHERHOOD
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="bg-yellow-600 p-4 sm:p-6 rounded-xl space-y-4 sm:space-y-8 w-full md:w-[428px] md:h-[254px] max-w-md">
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
                National ID Application
              </p>
              <p className="text-white text-xs sm:text-sm md:text-xl">
                *Renewal for KCDOGCEC only
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Button
                variant="outline"
                className="flex items-center space-x-2 w-full sm:w-auto"
              >
                <Download className="text-sm sm:text-base" />
                <span className="text-xs sm:text-sm">Download Form</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center space-x-2 w-full sm:w-auto mt-2 sm:mt-0"
              >
                <Download className="text-sm sm:text-base" />
                <span className="text-xs sm:text-sm">Apply Online Form</span>
              </Button>
            </div>
          </div>
          <div className="bg-blue-600 p-4 sm:p-6 rounded-xl space-y-4 sm:space-y-8 w-full md:w-[428px] md:h-[254px] max-w-md">
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold text-center">
                Applicant Date <br />
                Personal Sheet
              </p>
              <p className="text-white text-xs sm:text-sm md:text-xl">
                *Applicant Membership
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="text-sm sm:text-base" />
                <span className="text-xs sm:text-sm">Download Form</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 text-center sm:text-left px-4">
          <CreditCard className="text-base sm:text-lg text-gray-600" />
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Payment to be sent via GCash, Bank Transfer Local / International,
            Checking, Remittance or Cash
          </p>
        </div>
      </section>

      {/* Latest News Section */}
      <section
        id="blogs"
        className="space-y-6 sm:space-y-8 md:space-y-10 px-4 md:mx-16 lg:mx-32 py-8 sm:py-12 md:py-24 lg:py-36"
      >
        <div className="flex flex-col text-center md:text-left">
          <p className="text-yellow-500 text-sm sm:text-base md:text-lg font-bold">
            News
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            LATEST NEWS <br /> FROM OUR <br />
            COMMUNITY
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-stretch justify-center space-y-4 md:space-y-0 md:space-x-8 w-full">
          {/* Left Side - Buttons */}
          <div className="flex flex-col items-center md:items-start justify-between w-full md:w-auto">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white mb-4 md:mb-0 text-xs sm:text-sm md:text-base">
              View More Stories
              <ArrowForward className="ml-2 text-sm sm:text-base" />
            </Button>
            <div className="flex space-x-4">
              <Button variant="ghost">
                <ArrowBack className="text-sm sm:text-base" />
              </Button>
              <Button variant="ghost">
                <ArrowForward className="text-sm sm:text-base" />
              </Button>
            </div>
          </div>

          {/* Right Side - Scrollable Cards */}
          <div className="flex overflow-x-auto space-x-4 pb-4 no-scrollbar w-full">
            {[
              "/image-4.png",
              "/image-5.png",
              "/image-6.png",
              "/image-6.png",
              "/image-6.png",
              "/image-6.png",
              "/image-6.png",
            ].map((imageSrc, index) => (
              <Card_Component
                key={index}
                imageSrc={imageSrc}
                title={"Activities"}
                description={"Kadaugan sa Mactan Eagles Club"}
                date={"21 November 2024"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section
        id="contact"
        className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8 py-12 sm:py-16 md:py-20 px-4 text-center md:text-left"
      >
        <div className="flex flex-col">
          <p className="text-yellow-500 text-sm sm:text-base md:text-lg font-bold">
            Contact Us
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            Would like <br />
            to reach <br />
            TFOE-PE?
          </h2>
        </div>
        <div className="flex flex-col space-y-6 sm:space-y-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl">
            Email us at <br />
            <span className="text-blue-600 font-bold block mt-2 text-base sm:text-xl md:text-2xl">
              tfoe.philippineeagles@gmail.com
            </span>{" "}
            and cc{" "}
            <span className="text-blue-600 font-bold block mt-2 text-base sm:text-xl md:text-2xl">
              support@tfoe-pe.com
            </span>
          </h2>
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-white self-center md:self-start text-xs sm:text-sm md:text-base"
            size="lg"
          >
            Contact Us
            <ArrowForward className="ml-2 text-sm sm:text-base" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
