import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans">
      <Navbar />
      <Footer />
    </div>
  );
}
