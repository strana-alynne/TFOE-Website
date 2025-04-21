import Footer from "@/components/Footer";
import NavbarBlog from "@/components/NavbarBlog";
import { urlFor } from "@/sanity/lib/image";
import { ChevronLeft } from "@mui/icons-material";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from "next/image";

interface BlogContentProps {
  title: string;
  date?: string;
  image?: any;
  content: any;
  heroText?: string;
  category: string;
}

const BlogContent = ({
  title,
  date,
  image,
  content,
  category,
}: BlogContentProps) => {
  // Check if image exists and convert to URL
  const imageUrl = image ? urlFor(image).url() : null;

  return (
    <main className="max-w-full overflow-x-hidden">
      <NavbarBlog />
      <section className="max-w-3xl mx-auto px-4 py-8 mt-[20vh]">
        <div className="pb-8">
          <Link
            href={"/"}
            className="hover:text-yellow-600 hover:text-decoration-line text-black flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
        {/* Header */}
        <div className="mb-8">
          <p className="text-yellow-500 text-sm sm:text-base md:text-lg font-bold">
            {category}
          </p>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          {date && <p className="text-sm text-gray-500">Publihed on: {date}</p>}
        </div>
        {/* Featured Image */}
        {imageUrl && (
          <div className="mb-8">
            <Image
              src={imageUrl}
              alt={title}
              width={1200}
              height={400}
              className="w-full rounded-lg object-cover h-[400px]"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              Photo credit: Photographer Name
            </p>
          </div>
        )}
        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <PortableText value={content} />
        </div>
      </section>
    </main>
  );
};

export default BlogContent;
