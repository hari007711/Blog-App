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
  attributes: {
    Title: string;
    Content: ContentBlock[];
    Time: string;
    Tags: string;
    Image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    Author: string;
    Domain: string;
    slug: string;
  };
}

async function getBlogs(): Promise<Blog[]> {
  const res = await fetch("http://localhost:3000/api/blogs", {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch blogs from local API route");
    return [];
  }

  const data = await res.json();
  return data.data || [];
}

export default async function HomePageArticles() {
  const blogs = await getBlogs();

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
              const imageUrl = `${process.env.STRAPI_API_URL}${blog.attributes.Image?.data?.attributes?.url}`;
              return (
                <div key={blog.id} className="">
                  <div className="border p-4 rounded-2xl shadow w-[30vw] min-w-[30vw] max-w-[32vw] transition-all duration-300 ">
                    <div className="overflow-hidden rounded-t-2xl h-[30vh]">
                      <img
                        src={imageUrl}
                        alt={blog.attributes.Title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>

                    <div className="px-7 mt-2">
                      <ul className="list-disc list-outside pl-5 flex justify-between text-gray-500">
                        <li>{blog.attributes.Author}</li>
                        <li>{blog.attributes.Domain}</li>
                        <li>{blog.attributes.Time}</li>
                      </ul>

                      <h1 className="font-bold mt-2">
                        {blog.attributes.Title}
                      </h1>
                      <Link
                        href={`/blogs/${blog.attributes.slug}`}
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
