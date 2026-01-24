import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AboutContent } from "@/components/features/about";

export const metadata = {
  title: "About Us - GROEI",
  description: "Learn about GROEI and our mission to revolutionize the job market",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Navbar />
      <main className="flex-1">
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}

