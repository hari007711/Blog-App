import api from "@/lib/api";
import { MoveRight } from "lucide-react";
import Link from "next/link";

interface TextNode {
  type: "text";
  text: string;
}

interface ParagraphNode {
  type: "paragraph";
  children: TextNode[];
}

type ContentBlock = ParagraphNode;

interface Blog {
  id: number;
  // attributes: {
  Title: string;
  Content: ContentBlock[];
  Time: string;
  Tags: string;
  Image: {
    url: string;
  }[];
  Author: string;
  Domain: string;
  slug: string;
  // };
}

async function getBlogs(): Promise<Blog[]> {
  const { data } = await api.get("/api/blogs?populate=*");
  return data.data || [];
}

export default async function HomePageArticles() {
  const blogs = await getBlogs();
  function getDomains(domain: string) {
    let bgColor = "";
    switch (domain) {
      case "HTML":
        bgColor = "#3b82f6";
        break;
      case "CSS":
        bgColor = "#14a44D";
        break;
      case "Javascript":
        bgColor = "#a855f7";
        break;
      case "React":
        bgColor = "#54b4d3";
        break;
      case "Next":
        bgColor = "#E4A11B";
        break;
      default:
        return null;
    }

    return (
      <div
        className="absolute bottom-42 left-2 bg-opacity-60 text-white text-xs px-3 py-1 rounded-full"
        style={{ backgroundColor: bgColor }}
      >
        {domain}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="flex justify-center text-3xl font-bold mb-4 ">
        Latest Blogs
      </h1>
      <h5 className="flex justify-center text-lg font-normal text-[#4b5563]">
        Stay updated with our latest posts on web development, programming tips
        and technology insights
      </h5>
      <br />

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="pl-10">
          <div className="flex flex-wrap gap-6">
            {blogs.map((blog) => {
          
              const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${blog.Image[0]?.url}`;
              return (
                <div key={blog.id} className="">
                  <div className="border p-4 rounded-2xl shadow w-[30vw] min-w-[30vw] max-w-[32vw] transition-all duration-300 ">
                    <div className="overflow-hidden rounded-t-2xl h-[30vh] relative">
                      <img
                        src={imageUrl}
                        alt={blog.Title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute bottom-2 left-2  bg-opacity-60 text-white text-xs px-3 py-1 rounded">
                        {getDomains(blog.Domain)}
                      </div>
                    </div>

                    <div className="mt-2">
                      <ul className="list-disc list-outside pl-5 flex justify-between text-gray-500">
                        <li>{blog.Author}</li>
                        <li>{blog.Domain}</li>
                        <li>{blog.Time}</li>
                      </ul>

                      <h1 className="font-bold mt-2">
                        {blog.Title}
                      </h1>
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="flex items-center text-blue-400 cursor-pointer mt-1 hover:text-[#1d4ed8] transition-transform duration-300"
                      >
                        Read More <MoveRight className="mt-1 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
