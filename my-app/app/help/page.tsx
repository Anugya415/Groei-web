import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HelpContent } from "@/components/features/help";

export const metadata = {
    title: "Help Center - GROEI",
    description: "Get support and answers to your questions",
};

export default function HelpPage() {
    return (
        <div className="min-h-screen flex flex-col bg-transparent">
            <Navbar />
            <main className="flex-1">
                <HelpContent />
            </main>
            <Footer />
        </div>
    );
}
