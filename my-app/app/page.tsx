import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/features/hero";
import { Stats } from "@/components/features/stats";
import { Features } from "@/components/features/features";
import { HowItWorks } from "@/components/features/how-it-works";
import { Testimonials } from "@/components/features/testimonials";
import { CTA } from "@/components/features/cta";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#041f2b]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
