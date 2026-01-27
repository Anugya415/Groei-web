import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TermsContent } from "@/components/features/legal";

export const metadata = {
    title: "Terms of Service - GROEI",
    description: "Read our terms of service",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-transparent">
            <Navbar />
            <main className="flex-1">
                <TermsContent />
            </main>
            <Footer />
        </div>
    );
}
