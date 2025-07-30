"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { Facebook, Link, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const fetchBlogBySlug = async (slug: string): Promise<Blog | null> => {
  const { data } = await api.get(
    `/api/blogs?filters[slug][$eq]=${slug}&populate=*`
  );
  return data.data?.[0] || null;
};

const fetchAllBlogs = async (): Promise<Blog[]> => {
  const { data } = await api.get("/api/blogs?populate=*");
  return data.data || [];
};

export default function BlogContent() {
  const params = useParams();
  const slug = params.slug as string;

  const {
    data: blog,
    isLoading: isLoadingBlog,
    isError: isErrorBlog,
  } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => fetchBlogBySlug(slug),
  });

  const {
    data: blogs,
    isLoading: isLoadingRelated,
    isError: isErrorRelated,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchAllBlogs,
  });

  if (isLoadingBlog) return <p>Loading blog...</p>;
  if (isErrorBlog || !blog) return notFound();

  const { Title, Content, Author, Domain, Time, Image, Date, Tags } =
    blog.attributes;

  const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${Image?.data?.attributes?.url}`;
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
        {isLoadingRelated && <p>Loading related posts...</p>}
        {isErrorRelated && <p>Failed to load related posts.</p>}
        <div className="flex flex-wrap gap-6">
          {blogs
            ?.filter((b) => b.attributes.slug !== slug)
            .map((related) => {
              const img = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${related.attributes.Image?.data?.attributes?.url}`;
              return (
                <div
                  key={related.id}
                  className="border p-4 rounded-2xl shadow w-50 transition-all duration-300 h-55"
                >
                  <a href={`/blogs/${related.attributes.slug}`}>
                    <div className="overflow-hidden rounded-t-2xl h-[20vh]">
                      <img
                        src={img}
                        alt={related.attributes.Title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  </a>
                  <div className="mt-2">
                    <h1 className="text-sm">{related.attributes.Title}</h1>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
