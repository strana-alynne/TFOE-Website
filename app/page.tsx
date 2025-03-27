import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import HomeClient from "./homeClient";

const EVENTS_QUERY = defineQuery(`*[_type == "blog"]{
  _id, Title, Category, Image, Link, Details, Date, HeroSection
}`);
const FORM_QUERY = defineQuery(`*[_type == "form"]{
  PersonalSheetDownload, NationalIDForm, NationIDOnlineForm
}`);
const ABOUT_QUERY = defineQuery(`*[_type == "about"]{
  Description, AboutImage
}`);
const STATISTICS_QUERY = defineQuery(`*[_type == "statistics"]{
  Members, Branches, Years
}`);

export default async function Home() {
  const { data: blog } = await sanityFetch({ query: EVENTS_QUERY });
  const { data: form } = await sanityFetch({ query: FORM_QUERY });
  const { data: about } = await sanityFetch({ query: ABOUT_QUERY });
  const { data: statistics } = await sanityFetch({ query: STATISTICS_QUERY });
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

  const formLinks = form[0] || {};
  const aboutData = about[0] || {
    Description: [], // Provide an empty array as default
    AboutImage: "", // Provide a default empty string for AboutImage
  };
  const statisticsData = statistics[0] || {
    Members: 0,
    Branches: 0,
    Years: 0,
  };
  return (
    <HomeClient
      activities={activities}
      formLinks={formLinks}
      blog={blog}
      about={aboutData}
      statistics={statisticsData}
    />
  );
}
