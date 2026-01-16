import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AboutContent } from "@/components/about";

export const metadata = {
  title: "About Us - GROEI",
  description: "Learn about GROEI and our mission to revolutionize the job market",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1">
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}

