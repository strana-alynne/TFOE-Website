"use client";
import React from "react";
import { useRouter } from "next/navigation";

const SponsorshipPackages = () => {
  const router = useRouter();

  // Add this handler function
  const handlePackageSelect = (packageName: any, price: string) => {
    // Remove $ and comma from price for easier handling
    const cleanPrice = price.replace(/[$,]/g, "");

    // Navigate to registration page with package details as query params
    const query = new URLSearchParams({
      package: packageName,
      price: cleanPrice,
    }).toString();

    router.push(`/events/rglicon2025/registration/sponsor/register?${query}`);
  };

  const sponsorshipPackages = [
    {
      name: "PLATINUM SPONSOR",
      price: "$20,000",
      price_code: "price_1RnEGT2MVcHoWIBewGPfTjXU",
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
      price_code: " price_1RnEHA2MVcHoWIBek2C5HeAQ",
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
      price_code: "price_1RnEHn2MVcHoWIBeY0Tm69XZ",
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
      price_code: "price_1RnEIP2MVcHoWIBebcYl8NpN",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-amber-900 text-white overflow-hidden">
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
                Join Us as a Valued Sponsor
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 w-full justify-items-center">
              {sponsorshipPackages.map((pkg, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-between p-4 sm:p-6 rounded-lg border-2 w-full max-w-sm ${
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
                    onClick={() =>
                      handlePackageSelect(pkg.name, pkg.price_code)
                    }
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
    </div>
  );
};

export default SponsorshipPackages;
