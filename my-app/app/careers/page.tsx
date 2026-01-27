import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CareersContent } from "@/components/features/careers";

export const metadata = {
    title: "Careers at GROEI",
    description: "Join our team and help us revolutionize the job market",
};

export default function CareersPage() {
    return (
        <div className="min-h-screen flex flex-col bg-transparent">
            <Navbar />
            <main className="flex-1">
                <CareersContent />
            </main>
            <Footer />
        </div>
    );
}
