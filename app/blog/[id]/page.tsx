import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowBack, ChevronLeft, ChevronRight } from "@mui/icons-material";
import Link from "next/link";

const BlogPost = () => {
  return (
    <main className="max-w-full overflow-x-hidden">
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 py-8 mt-[20vh]">
        <div className="pb-8">
          <Link
            href={"/"}
            className="hover:text-yellow-600 hover:text-decoration-line text-black items-center gap-2 "
          >
            {" "}
            <span>
              {" "}
              <ChevronLeft className="w-5 h-s5" />
            </span>
            Back to Home
          </Link>
        </div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            While We're Waiting, Why Not Do Something Productive?
          </h1>
          <p className="text-gray-600 mb-6">
            This might be a good time to prepare some of our old stories for
            another read
          </p>
        </div>
        {/* Featured Image */}
        <div className="mb-8">
          <img
            src="/image-2.png"
            alt="Featured"
            className="w-full rounded-lg object-cover h-[400px]"
          />
          <p className="text-sm text-gray-500 mt-2 text-center">
            Photo credit: Photographer Name on Unsplash
          </p>
        </div>
        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-800 leading-relaxed">
            One of my favorite pastimes has always been writing in a
            diary/journal at the end of the day and then turning some of those
            memories into stories.
          </p>
          {/* Add more content here */}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default BlogPost;
