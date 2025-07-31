import HomePageCarousel from "@/components/HomePageCarousel";
import HomePageArticles from "@/components/Articles/HomPageArticles";

export default async function Page() {
  return (
    <div className="w-full mt-17">
      <HomePageCarousel />
      <HomePageArticles />
    </div>
  );
}
