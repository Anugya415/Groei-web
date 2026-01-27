import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FreelancersContent } from "@/components/features/freelancers";

export const metadata = {
    title: "Find Freelancers - GROEI",
    description: "Hire top freelance talent for your projects",
};

export default function FreelancersPage() {
    return (
        <div className="min-h-screen flex flex-col bg-transparent">
            <Navbar />
            <main className="flex-1">
                <FreelancersContent />
            </main>
            <Footer />
        </div>
    );
}
