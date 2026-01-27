import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MockInterviewContent } from "@/components/features/mock-interview";

export const metadata = {
    title: "Mock Interview - GROEI",
    description: "Practice your interview skills with AI",
};

export default function MockInterviewPage() {
    return (
        <div className="min-h-screen flex flex-col bg-transparent">
            <Navbar />
            <main className="flex-1">
                <MockInterviewContent />
            </main>
            <Footer />
        </div>
    );
}
