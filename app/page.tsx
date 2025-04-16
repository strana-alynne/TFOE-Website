import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import HomeClient from "./homeClient";
import Footer from "@/components/Footer";

const EVENTS_QUERY = defineQuery(`*[_type == "blog"]{
  _id, Title, Category, Image, Link, Details, Date, HeroSection
}`);
const MEMBERSHIP_QUERY = defineQuery(`*[_type == "membership"]{
  PersonalSheetDownload, NationalIDForm, NationIDOnlineForm
}`);
const ABOUT_QUERY = defineQuery(`*[_type == "about"]{
  Title,
  Description,
  AboutImage {
    asset -> {
      url
    }
  }
}`);
const STATISTICS_QUERY = defineQuery(`*[_type == "statistics"]{
  Members, Branches, Years
}`);

const CERTIFICATES_QUERY = defineQuery(
  `*[_type=="certificate"]{Description, CertificateImage{ asset -> {url}}}`
);

const CONTACTS_QUERY = defineQuery(
  `*[_type=="contacts"]{Email, EmailCC, Address, SocialMediaLinks}`
);

export default async function Home() {
  const { data: blog } = await sanityFetch({ query: EVENTS_QUERY });
  const { data: membership } = await sanityFetch({ query: MEMBERSHIP_QUERY });
  const { data: about } = await sanityFetch({ query: ABOUT_QUERY });
  const { data: statistics } = await sanityFetch({ query: STATISTICS_QUERY });
  const { data: contacts } = await sanityFetch({ query: CONTACTS_QUERY });
  const { data: certificate } = await sanityFetch({
    query: CERTIFICATES_QUERY,
  });
  const activities = blog
    .filter((item: { HeroSection: boolean }) => item.HeroSection === true)
    .map(
      (item: {
        _id: string;
        Category: any;
        Title: any;
        Details: any;
        Image: any;
        Link: any;
      }) => ({
        _id: item._id,
        category: item.Category,
        title: item.Title,
        description: item.Details,
        image: item.Image,
        buttonText: "View More",
        link: item.Link,
      })
    );

  const formLinks = membership[0] || {};
  const aboutData = about[0] || {
    Description: [], // Provide an empty array as default
    AboutImage: {
      asset: {
        url: "",
      },
    }, // Provide a default empty string for AboutImage
  };
  const statisticsData = statistics[0] || {
    Members: 0,
    Branches: 0,
    Years: 0,
  };

  const certificateData = certificate[0] || {
    Title: "",
    Description: [],
    CertificateImage: { asset: { url: "" } },
  };

  const contactsData = contacts[0] || {
    Email: "",
    EmailCC: "",
    Address: "",
    SocialMediaLinks: [],
  };
  return (
    <>
      <HomeClient
        activities={activities}
        formLinks={formLinks}
        blog={blog}
        about={aboutData}
        certificate={certificateData}
        statistics={statisticsData}
        contacts={contactsData}
      />
      <Footer contacts={contactsData} />
    </>
  );
}
