import Navbar from "@/app/components/layout/Navbar";
import Hero from "@/app/components/sections/Hero";
import FeatureCards from "@/app/components/sections/FeatureCards";
import Footer from "@/app/components/layout/Footer";



export default function Page() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeatureCards />
      <Footer />
    </main>
  );
}
