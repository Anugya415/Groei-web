import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ResumeScannerContent } from "@/components/features/resume-scanner";

export const metadata = {
  title: "Resume Scanner - GROEI",
  description: "AI-powered resume scanner to optimize your resume for better job matches",
};

export default function ResumeScannerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Navbar />
      <main className="flex-1">
        <ResumeScannerContent />
      </main>
      <Footer />
    </div>
  );
}

