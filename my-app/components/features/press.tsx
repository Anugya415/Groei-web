"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Newspaper, Download, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const PRESS_RELEASES = [
    {
        title: "Groei Raises Series A to Revolutionize Tech Hiring",
        date: "January 15, 2026",
        source: "TechCrunch",
        excerpt: "The AI-powered recruitment platform has secured funding to expand its global reach and enhance its matching algorithms."
    },
    {
        title: "Groei Launches New Feature for Remote Teams",
        date: "December 10, 2025",
        source: "VentureBeat",
        excerpt: "New tools designed to help companies build and manage distributed teams more effectively."
    },
    {
        title: "The Future of Work: Interview with Groei CEO",
        date: "November 05, 2025",
        source: "Forbes",
        excerpt: "Groei's CEO discusses the changing landscape of employment and how technology is bridging the gap."
    }
];

export function PressContent() {
    return (
        <div className="min-h-screen pt-20 sm:pt-24 lg:pt-28">
            {/* Hero Section */}
            <section className="relative py-12 sm:py-16 md:py-20 bg-transparent overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="fade-grid" />
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full blur-3xl"
                            style={{
                                width: `${250 + i * 60}px`,
                                height: `${250 + i * 60}px`,
                                background: `radial-gradient(circle, rgba(99, 102, 241, ${0.12 - i * 0.015}) 0%, transparent 70%)`,
                                left: `${10 + i * 20}%`,
                                top: `${10 + i * 15}%`,
                            }}
                            animate={{
                                scale: [1, 1.3, 1],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 15 + i * 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5,
                            }}
                        />
                    ))}
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#041f2b]/05 backdrop-blur-sm border border-[#041f2b]/10 mb-2">
                            <Newspaper className="h-4 w-4 text-[#6366f1]" />
                            <span className="text-xs font-medium text-[#041f2b] uppercase tracking-wide">
                                Newsroom
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#041f2b]">
                            Groei in the News
                        </h1>
                        <p className="text-lg text-[#041f2b]/70">
                            Latest updates, press releases, and media coverage about Groei and our mission.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Press Releases */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-[#041f2b] mb-6">Press Releases</h2>
                        <div className="grid gap-6">
                            {PRESS_RELEASES.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Card className="hover:border-[#6366f1]/50 transition-colors group">
                                        <CardHeader className="p-6">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                                                <Badge variant="secondary" className="w-fit bg-[#6366f1]/10 text-[#6366f1]">{item.source}</Badge>
                                                <span className="text-sm text-[#041f2b]/60">{item.date}</span>
                                            </div>
                                            <CardTitle className="text-xl font-bold text-[#041f2b] group-hover:text-[#6366f1] transition-colors">{item.title}</CardTitle>
                                            <CardDescription className="text-[#041f2b]/70 mt-2">{item.excerpt}</CardDescription>
                                            <div className="pt-4 flex items-center gap-2 text-sm font-medium text-[#6366f1]">
                                                Read More <ArrowRight className="h-4 w-4" />
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#041f2b] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#6366f1]/20 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold">Media Kit</h2>
                                <p className="text-white/70 max-w-md">
                                    Download our official brand assets, including logos, color palettes, and executive headshots.
                                </p>
                            </div>
                            <Button className="bg-white text-[#041f2b] hover:bg-white/90 shrink-0 h-12 px-6">
                                <Download className="h-4 w-4 mr-2" />
                                Download Assets
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
