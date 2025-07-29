import HomePageCarousel from "@/components/HomePageCarousel";
import HomePageArticles from "@/components/Articles/HomPageArticles";

export default async function Page() {
  return (
    <div className="w-full">
      <HomePageCarousel />
      <HomePageArticles />
    </div>
  );
}
