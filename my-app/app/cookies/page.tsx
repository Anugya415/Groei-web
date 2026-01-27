import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function CookiesPage() {
    return (
        <div className="min-h-screen flex flex-col bg-transparent">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8 mt-20">
                <h1 className="text-3xl font-bold mb-4 text-[#041f2b]">Cookies Policy</h1>
                <p className="text-[#041f2b]/70">This page is currently under development.</p>
            </main>
            <Footer />
        </div>
    );
}
