import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ResumeScannerContent } from "@/components/resume-scanner";

export const metadata = {
  title: "Resume Scanner - GROEI",
  description: "AI-powered resume scanner to optimize your resume for better job matches",
};

export default function ResumeScannerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1">
        <ResumeScannerContent />
      </main>
      <Footer />
    </div>
  );
}

