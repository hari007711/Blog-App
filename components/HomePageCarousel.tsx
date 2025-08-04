"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

// interface Blog {
//   id: number;
//   // attributes: {
//   Title: string;
//   Image: {
//     // data: {
//       // attributes: {
//       url: string;
//       // };
//     // };
//   };
//   slug: string;
//   // };
// }

interface Blog {
  id: number;
  Title: string;
  Image: {
    url: string;
  }[]; // 👈 Now it's an array of images
  slug: string;
}


export default function HomePageCarousel() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const { data } = await api.get("/api/blogs?populate=*");
        setBlogs(data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }

    fetchBlogs();
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="overflow-hidden w-full h-[85vh]" ref={emblaRef}>
      <div className="flex h-[85vh]">
        <>
          {Array.isArray(blogs) &&
            blogs.map((blog, index) => {
              const imageUrl = blog.Image[0]?.url;

              if (!imageUrl) return null;
              
              return (
                <div
                  key={index}
                  className="flex-[0_0_100%] relative h-[80vh] w-full"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}`}
                    alt={blog.Title}
                    fill
                    style={{ objectFit: "cover" }}
                    className=""
                    priority
                  />

                  <div className="absolute inset-0 bg-black/50 z-10" />

                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                text-white text-center px-6 py-6 drop-shadow-lg z-20 
                  rounded-lg w-[90%] max-w-4xl"
                  >
                    <h1 className="text-5xl font-bold mb-4">
                      Welcome to Tech Blog
                    </h1>
                    <p>
                      Discover the latest insights in web-development,
                      programming <br />
                      and technology trends
                    </p>
                    <div className="flex justify-center mt-4">
                      <Button
                        variant="outline"
                        className="text-black h-[8vh] w-[10vw] mr-4 text-xl cursor-pointer hover:scale-110 transition-transform duration-200"
                      >
                        Start Reading
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-background-none h-[8vh] w-[10vw] text-xl cursor-pointer border-2 hover:scale-110 transition-transform duration-200 hover:bg-background-none hover:text-white"
                      >
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      </div>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10 mb-8">
        {Array.isArray(blogs) &&
          blogs.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full cursor-pointer ${
                index === selectedIndex ? "bg-black" : "bg-gray-200"
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
      </div>
    </div>
  );
}
