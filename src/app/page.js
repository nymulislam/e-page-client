import FeaturedEbooks from "@/components/Home/FeaturedEbooks";
import Genres from "@/components/Home/Genres";
import Hero from "@/components/Home/Hero";
import Newsletter from "@/components/Home/NewsLetter";
import TopWriters from "@/components/Home/TopWriters";


export default function Home() {
  return (
    <main className="bg-[#FDFBF7] min-h-screen">
      <Hero />
      <FeaturedEbooks />
      <TopWriters />
      <Genres />
      <Newsletter />
    </main>
  );
}