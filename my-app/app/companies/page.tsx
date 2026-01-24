import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CompaniesContent } from "@/components/features/companies";

export const metadata = {
  title: "Companies - GROEI",
  description: "Explore top companies hiring on GROEI",
};

export default function CompaniesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Navbar />
      <main className="flex-1">
        <CompaniesContent />
      </main>
      <Footer />
    </div>
  );
}

