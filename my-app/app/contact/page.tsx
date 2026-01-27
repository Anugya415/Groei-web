import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactContent } from "@/components/features/contact";

export const metadata = {
    title: "Contact Us - GROEI",
    description: "Get in touch with the GROEI team",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col bg-transparent">
            <Navbar />
            <main className="flex-1">
                <ContactContent />
            </main>
            <Footer />
        </div>
    );
}
