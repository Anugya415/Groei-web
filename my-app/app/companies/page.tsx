import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CompaniesContent } from "@/components/companies";

export const metadata = {
  title: "Companies - GROEI",
  description: "Explore top companies hiring on GROEI",
};

export default function CompaniesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1">
        <CompaniesContent />
      </main>
      <Footer />
    </div>
  );
}

