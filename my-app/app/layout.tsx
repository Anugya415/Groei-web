import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Chatbot } from "@/components/features/chatbot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GROEI - AI-Powered Freelance Marketplace & Job Portal",
  description: "Upload once, get matched instantly. AI-powered freelance marketplace and job portal connecting talented freelancers with top companies worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
