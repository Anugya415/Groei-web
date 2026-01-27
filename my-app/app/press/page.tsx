import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PressContent } from "@/components/features/press";

export const metadata = {
    title: "Newsroom - GROEI",
    description: "Latest updates and press releases from GROEI",
};

export default function PressPage() {
    return (
        <div className="min-h-screen flex flex-col bg-transparent">
            <Navbar />
            <main className="flex-1">
                <PressContent />
            </main>
            <Footer />
        </div>
    );
}
