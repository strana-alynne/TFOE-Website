"use client";
import { Key } from "react";
import Card_Component from "@/components/card-component";
import Navbar from "@/components/Navbar";
import ReusableCarousel from "@/components/ReusableCarousel";
import { Button } from "@/components/ui/button";
import { ArrowForward, CreditCard, Download } from "@mui/icons-material";
import { PortableText } from "next-sanity";
import Link from "next/link";

import {
  UsersIcon,
  OfficeBuildingIcon,
  BadgeCheckIcon,
} from "@heroicons/react/outline";

type Stat = {
  label: string;
  value: number | string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

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

  const stats: Stat[] = [
    { label: "Members", value: statistics.Members, Icon: UsersIcon },
    { label: "Branches", value: statistics.Branches, Icon: OfficeBuildingIcon },
    { label: "Years", value: statistics.Years, Icon: BadgeCheckIcon },
  ];

  return (
    <main className='max-w-full overflow-x-hidden'>
      <Navbar />
      {/* Hero Section */}
      <section id='home'>
        <ReusableCarousel slides={activities} />
      </section>

      {/* Stats Section */}
      <section
        aria-labelledby='stats-heading'
        className='animate-gradient text-white py-12'
      >
        <h2 id='stats-heading' className='sr-only'>
          Organization Statistics
        </h2>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <dl className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
            {stats.map(({ label, value, Icon }) => (
              <div
                key={label}
                className='flex flex-col items-center text-center'
              >
                <Icon
                  className='h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20'
                  aria-hidden='true'
                />
                <dd className='mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold'>
                  {value}
                </dd>
                <dt className='mt-2 text-base sm:text-lg lg:text-xl uppercase tracking-wide'>
                  {label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* About Section */}
      <section
        id='about'
        className='flex flex-col md:flex-row items-center justify-evenly space-y-8 md:space-y-0 md:space-x-8 p-4 md:p-8 lg:p-16'
      >
        <img
          src='/logo.png'
          alt='Eagle Logo'
          className='w-full md:w-1/2 max-w-md'
        />
        <div className='text-center md:text-left px-4 md:px-0'>
          <div>
            <p className='text-yellow-500 text-sm sm:text-base md:text-lg font-bold mt-4'>
              The Fraternal Order of Eagles (Philippine Eagles)
            </p>
          </div>
          <div className='max-w-2xl my-4 sm:my-2 md:my-4 text-sm sm:text-base md:text-lg text-center md:text-left'>
            <PortableText value={about.Description} />
          </div>
        </div>
      </section>
      {/* About Certs */}
      <section
        id='Certs'
        className='flex flex-col md:flex-row items-center justify-evenly space-y-8 md:space-y-0 md:space-x-8 p-4 md:p-8 lg:p-16'
      >
        <div className='text-center md:text-left px-4 md:px-0'>
          <div className='flex flex-col text-center md:text-left'>
            <p className='text-yellow-500 text-sm sm:text-base md:text-lg font-bold'>
              Certificate
            </p>
            <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold'>
              {certificate.Title}
            </h2>
          </div>
          <div className='max-w-2xl my-4 sm:my-2 md:my-4 text-sm sm:text-base md:text-lg text-center md:text-left'>
            <PortableText value={certificate.Description} />
          </div>
        </div>
        <img
          src={certificate.CertificateImage.asset.url}
          alt='Eagle Members'
          className='w-full md:w-1/2 max-w-md'
        />
      </section>
      {/* Club Membership Section */}
      <section
        id='membership'
        className='space-y-8 py-8 sm:py-12 md:py-24 lg:py-36 px-4'
      >
        <div className='flex flex-col items-center justify-center text-center gap-4'>
          <p className='text-yellow-500 text-sm sm:text-base md:text-lg font-bold'>
            Club Membership
          </p>
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center'>
            BE PART OF THE <br />
            BROTHERHOOD
          </h2>
        </div>
        <div className='flex flex-col md:flex-row items-center justify-center pace-y-4 md:space-y-0 md:space-x-8'>
          <div className='bg-yellow-600 p-4 sm:p-6 rounded-xl space-y-4 sm:space-y-8 w-full md:w-[428px] md:h-[254px] max-w-md'>
            <div className='flex flex-col items-center justify-center text-center'>
              <p className='text-white text-xl sm:text-2xl md:text-3xl font-bold'>
                National ID Application
              </p>
              <p className='text-white text-xs sm:text-sm md:text-xl'>
                *Renewal for KCDOGCEC only
              </p>
            </div>
            <div className='flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4'>
              <Button
                variant='outline'
                className='flex items-center space-x-2 w-full sm:w-auto'
                onClick={() => window.open(formLinks.NationalIDForm, "_blank")}
                // onClick={() => console.log(formLinks.NationIDOnlineForm)}
              >
                <Download className='text-sm sm:text-base' />
                <span className='text-xs sm:text-sm'>Download Form</span>
              </Button>
              <Button
                variant='outline'
                className='flex items-center space-x-2 w-full sm:w-auto mt-2 sm:mt-0'
                onClick={() =>
                  window.open(formLinks.NationIDOnlineForm, "_blank")
                }
              >
                <Download className='text-sm sm:text-base' />
                <span className='text-xs sm:text-sm'>Apply Online Form</span>
              </Button>
            </div>
          </div>
          <div className='bg-blue-600 p-4 sm:p-6 rounded-xl space-y-4 sm:space-y-8 w-full md:w-[428px] md:h-[254px] max-w-md'>
            <div className='flex flex-col items-center justify-center text-center'>
              <p className='text-white text-xl sm:text-2xl md:text-3xl font-bold text-center'>
                Applicant Date <br />
                Personal Sheet
              </p>
              <p className='text-white text-xs sm:text-sm md:text-xl'>
                *Applicant Membership
              </p>
            </div>
            <div className='flex items-center justify-center'>
              <Button
                variant='outline'
                className='flex items-center space-x-2'
                onClick={() =>
                  window.open(formLinks.PersonalSheetDownload, "_blank")
                }
              >
                <Download className='text-sm sm:text-base' />
                <span className='text-xs sm:text-sm'>Download Form</span>
              </Button>
            </div>
          </div>
        </div>
        <div className='flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 text-center sm:text-left px-4'>
          <CreditCard className='text-base sm:text-lg text-gray-600' />
          <p className='text-xs sm:text-sm md:text-base text-gray-600'>
            Payment to be sent via GCash, Bank Transfer Local / International,
            Checking, Remittance or Cash
          </p>
        </div>
      </section>
      {/* Latest News Section */}
      <section
        id='blogs'
        className='space-y-6 sm:space-y-8 md:space-y-10 px-4 md:mx-16 lg:mx-32 py-8 sm:py-12 md:py-24 lg:py-36'
      >
        <div className='flex flex-col text-center md:text-left'>
          <p className='text-yellow-500 text-sm sm:text-base md:text-lg font-bold'>
            News
          </p>
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold'>
            LATEST NEWS <br /> FROM OUR <br />
            COMMUNITY
          </h2>
        </div>

        <div className='flex flex-col md:flex-row items-stretch justify-center space-y-4 md:space-y-0 md:space-x-8 w-full'>
          {/* Left Side - Buttons */}
          <div className='flex flex-col items-center md:items-start justify-between w-full md:w-auto'>
            <Button className='bg-yellow-500 hover:bg-yellow-600 text-white mb-4 md:mb-0 text-xs sm:text-sm md:text-base'>
              View More Stories
              <ArrowForward className='ml-2 text-sm sm:text-base' />
            </Button>
          </div>

          {/* Right Side - Scrollable Cards */}
          <div className='flex overflow-x-auto space-x-4 pb-4 no-scrollbar w-full'>
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
                    className='no-underline'
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
        id='contact'
        className='flex flex-col md:flex-row items-center justify-center lg:gap-8 space-y-8 md:space-y-0 md:space-x-8 py-12 sm:py-16 md:py-20 px-4 text-center md:text-left'
      >
        <div className='flex flex-col'>
          <p className='text-yellow-500 text-sm sm:text-base md:text-lg font-bold'>
            Contact Us
          </p>
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold'>
            Would like <br />
            to reach <br />
            TFOE-PE?
          </h2>
        </div>
        <div className='flex flex-col space-y-6 sm:space-y-8'>
          <h2 className='text-xl sm:text-2xl md:text-3xl'>
            Email us at <br />
            <span className='text-blue-600 font-bold block mt-2 text-base sm:text-xl md:text-2xl'>
              {contacts.Email}
            </span>{" "}
            and cc{" "}
            <span className='text-blue-600 font-bold block mt-2 text-base sm:text-xl md:text-2xl'>
              {contacts.EmailCC}
            </span>
          </h2>
          <Button
            className='bg-yellow-500 hover:bg-yellow-600 text-white self-center md:self-start text-xs sm:text-sm md:text-base'
            size='lg'
          >
            Contact Us
            <ArrowForward className='ml-2 text-sm sm:text-base' />
          </Button>
        </div>
      </section>
    </main>
  );
}
