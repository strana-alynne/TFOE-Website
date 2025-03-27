import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import BlogContent from "./content";

const BLOG_QUERY = defineQuery(`*[_type == "blog" && _id == $blogId][0]{
  _id, 
  Title, 
  Category, 
  Image, 
  Link, 
  Details, 
  Date, 
  HeroSection,
}`);

export default async function Blog({ params }: { params: { id: string } }) {
  const blogId = await params.id;

  // Fetch specific blog content using the ID
  const { data: blogContent } = await sanityFetch({
    query: BLOG_QUERY,
    params: { blogId },
  });

  if (!blogContent) {
    return <div>Error: Blog not found</div>;
  }

  return (
    <BlogContent
      title={blogContent.Title}
      date={blogContent.Date}
      image={blogContent.Image}
      content={blogContent.Details}
      heroText={blogContent.HeroSection}
      category={blogContent.Category}
    />
  );
}
