import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Link, Linkedin, Twitter } from "lucide-react";
import { notFound } from "next/navigation";
import Link2 from "next/link";
import Loading from "./Loading";

interface Blog {
  id: number;
  attributes: {
    Title: string;
    Content: { type: string; children: { text: string }[] }[];
    Time: string;
    Tags: string;
    Author: string;
    Domain: string;
    slug: string;
    Date: string;
    Image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

interface Props {
  params: { slug: string };
}

async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const res = await fetch(
    `${process.env.STRAPI_API_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: "no-store",
    }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.data?.[0] || null;
} 

async function getBlogs(): Promise<Blog[]> {
  const res = await fetch(
    `${process.env.STRAPI_API_URL}/api/blogs?populate=*`,
    { 
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },      
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch blogs from Strapi");
    return [];
  }

  const data = await res.json();
  return data.data || [];
}

export default function BlogDetail({ params }: Props) {
  const { slug } = params;

  return (
    <Suspense fallback={<Loading />}>
      <BlogContent slug={slug} />
    </Suspense>
  );
}

async function BlogContent({ slug }: { slug: string }) {
  const blog = await getBlogBySlug(slug);
  const blogs = await getBlogs();

  if (!blog) return notFound();
  const { Title, Content, Author, Domain, Time, Image, Date, Tags } =
    blog.attributes;
  const imageUrl = `${process.env.STRAPI_API_URL}${Image?.data?.attributes?.url}`;
  const formattedDate = Date?.split("-").reverse().join("-");

  return (
    <div className="px-100 mb-20">
      <h2 className="text-2xl font-bold mt-5">{Title}</h2>
      <p className="text-sm text-gray-500 mt-2">
        By {Author} <span className="ml-2">{formattedDate}</span>
      </p>
      <img src={imageUrl} alt={Title} className="mt-4 rounded-lg w-full" />
      <hr className="my-5" />
      <div className="mt-6 space-y-4">
        {Content.map((block, idx) => (
          <p key={idx}>{block.children.map((c) => c.text).join("")}</p>
        ))}
      </div>
      <hr className="my-5" />

      {Tags && (
        <>
          <h2 className="text-xl font-semibold mt-5">Tags</h2>
          <div className="flex flex-wrap gap-2 mt-6">
            {Tags.split(",").map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
          <hr className="my-5" />
        </>
      )}

      <div>
        <h2 className="text-xl font-semibold mt-5 mb-5">Share this post</h2>
        <div className="flex items-center flex-wrap gap-4">
          <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] cursor-pointer">
            <Twitter />
            Twitter
          </Button>
          <Button className="bg-[#1e40af] hover:bg-[#1e3a8a] cursor-pointer">
            <Facebook /> Facebook
          </Button>
          <Button className="bg-[#1d4ed8] hover:bg-[#1e40af] cursor-pointer">
            <Linkedin /> LinkedIn
          </Button>
          <Button className="bg-[#4b5563] hover:bg-[#374151] cursor-pointer">
            <Link /> Copy Link
          </Button>
        </div>
      </div>

      <hr className="my-5" />
      <div>
        <h2 className="text-xl font-semibold mt-5 mb-5">Related Posts</h2>
        <div className="flex flex-wrap gap-6">
          {blogs
            .filter((b) => b.attributes.slug !== slug)
            .map((blog) => {
              const imageUrl = `${process.env.STRAPI_API_URL}${blog.attributes.Image?.data?.attributes?.url}`;
              return (
                <div
                  key={blog.id}
                  className="border p-4 rounded-2xl shadow w-50 transition-all duration-300 h-55"
                >
                  <Link2 href={`/blogs/${blog.attributes.slug}`}>
                    <div className="overflow-hidden rounded-t-2xl h-[20vh]">
                      <img
                        src={imageUrl}
                        alt={blog.attributes.Title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  </Link2>
                  <div className="mt-2">
                    <h1 className="text-sm">{blog.attributes.Title}</h1>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.STRAPI_API_URL}/api/blogs?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  );

  const data = await res.json();

  return data.data.map((blog: any) => ({
    slug: blog.attributes.slug,
  }));
}

export const revalidate = 60;
