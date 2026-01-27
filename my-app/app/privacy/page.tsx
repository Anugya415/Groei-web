import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PrivacyContent } from "@/components/features/legal";

export const metadata = {
    title: "Privacy Policy - GROEI",
    description: "Read our privacy policy to understand how we protect your data",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-transparent">
            <Navbar />
            <main className="flex-1">
                <PrivacyContent />
            </main>
            <Footer />
        </div>
    );
}
