"use client";
import { Key, useState } from "react";
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
import { PortableText } from "next-sanity";
import Link from "next/link";

interface HomeClientProps {
  activities: Array<{
    _id: string;
    category: string;
    title: string;
    description: string;
    image: string;
    buttonText: string;
    link: string;
  }>;
  formLinks: {
    PersonalSheetDownload?: string;
    NationalIDForm?: string;
    NationIDOnlineForm?: string;
  };
  blog: any[];
  about: {
    Description: any;
    AboutImage: {
      asset: {
        url: string;
      };
    };
  };
  statistics: {
    Members: number;
    Branches: number;
    Years: number;
  };
  certificate: {
    Title: string;
    Description: any;
    CertificateImage: {
      asset: {
        url: string;
      };
    };
  };
  contacts: {
    Email: string;
    EmailCC: string;
    Address: string;
    SocialMediaLinks: [];
  };
}

export default function HomeClient({
  activities,
  formLinks,
  blog,
  statistics,
  about,
  certificate,
  contacts,
}: HomeClientProps) {
  function handleOpenLink(url?: string): void {
    if (url) {
      window.open(url, "_blank");
    } else {
      console.error("Invalid URL provided");
    }
  }
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="sm:h-12 sm:w-12 lg:h-16 lg:w-16 h-10 w-10"
            fill="#FFFFFF"
          >
            <path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c.37-.06.74-.1 1.13-.1.99 0 1.93.21 2.78.58.74.32 1.22 1.04 1.22 1.85V18h-4.5v-1.61c0-.83-.23-1.61-.63-2.29zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z" />
          </svg>
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl text-white font-bold">
              {statistics.Members}
            </h2>
            <p className="text-base sm:text-xl lg:text-2xl text-white">
              Members
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="54px"
            height="54px"
            viewBox="0 0 24 24"
          >
            <path
              fill="#FFFFFF"
              d="M4 19q-.825 0-1.412-.587T2 17v-6.175q0-.4.15-.762t.425-.638l2.85-2.85q.275-.275.638-.425T6.825 6H7V5q0-.425.288-.712T8 4t.713.288T9 5v1h8.175q.4 0 .763.15t.637.425l2.85 2.85q.275.275.425.638t.15.762V17q0 .825-.587 1.413T20 19zm12-2h4v-6.175l-2-2l-2 2zm-2 0v-5H4v5z"
            />
          </svg>
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl text-white font-bold">
              {statistics.Branches}
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
              {statistics.Years}
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
          src={about.AboutImage?.asset?.url || "/image-2.png"}
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
          <div className="max-w-2xl my-4 sm:my-6 md:my-8 text-sm sm:text-base md:text-lg text-center md:text-left">
            <PortableText value={about.Description} />
          </div>
        </div>
      </section>
      {/* About Certs */}
      <section
        id="Certs"
        className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8 p-4 md:p-8 lg:p-16"
      >
        <div className="text-center md:text-left px-4 md:px-0">
          <div className="flex flex-col text-center md:text-left">
            <p className="text-yellow-500 text-sm sm:text-base md:text-lg font-bold">
              Certificate
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              {certificate.Title}
            </h2>
          </div>
          <div className="max-w-2xl my-4 sm:my-6 md:my-8 text-sm sm:text-base md:text-lg text-center md:text-left">
            <PortableText value={certificate.Description} />
          </div>
        </div>
        <img
          src={certificate.CertificateImage.asset.url}
          alt="Eagle Members"
          className="w-full md:w-1/2 max-w-md"
        />
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
                onClick={() => window.open(formLinks.NationalIDForm, "_blank")}
                // onClick={() => console.log(formLinks.NationIDOnlineForm)}
              >
                <Download className="text-sm sm:text-base" />
                <span className="text-xs sm:text-sm">Download Form</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center space-x-2 w-full sm:w-auto mt-2 sm:mt-0"
                onClick={() =>
                  window.open(formLinks.NationIDOnlineForm, "_blank")
                }
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
              <Button
                variant="outline"
                className="flex items-center space-x-2"
                onClick={() =>
                  window.open(formLinks.PersonalSheetDownload, "_blank")
                }
              >
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
          </div>

          {/* Right Side - Scrollable Cards */}
          <div className="flex overflow-x-auto space-x-4 pb-4 no-scrollbar w-full">
            {blog
              .sort(
                (a, b) =>
                  new Date(b.Date).getTime() - new Date(a.Date).getTime()
              ) // Sort by most recent date
              .slice(0, 5) // Take only the first 5 blogs
              .map(
                (
                  event: {
                    _id: string;
                    Image: string;
                    Category: string;
                    Details: any;
                    Date: string;
                    Title: string;
                  },
                  index: Key | null | undefined
                ) => (
                  <Link
                    key={index}
                    href={`/blog/${event._id}`}
                    className="no-underline"
                  >
                    <Card_Component
                      imageSrc={event.Image}
                      title={event.Category}
                      description={event.Title}
                      date={event.Date}
                    />
                  </Link>
                )
              )}
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
              {contacts.Email}
            </span>{" "}
            and cc{" "}
            <span className="text-blue-600 font-bold block mt-2 text-base sm:text-xl md:text-2xl">
              {contacts.EmailCC}
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
    </main>
  );
}
