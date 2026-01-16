import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LoginContent } from "@/components/login";

export const metadata = {
  title: "Login - GROEI",
  description: "Sign in to your GROEI account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1">
        <LoginContent />
      </main>
      <Footer />
    </div>
  );
}

