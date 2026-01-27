import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BlogContent } from "@/components/features/blog";

export const metadata = {
    title: "Blog - GROEI",
    description: "Latest insights, career advice, and industry trends",
};

export default function BlogPage() {
    return (
        <div className="min-h-screen flex flex-col bg-transparent">
            <Navbar />
            <main className="flex-1">
                <BlogContent />
            </main>
            <Footer />
        </div>
    );
}
