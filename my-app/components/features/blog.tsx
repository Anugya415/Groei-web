"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const MOCK_POSTS = [
    {
        id: 1,
        title: "The Future of Remote Work in 2026",
        excerpt: "Explore the emerging trends that are shaping the landscape of remote work and what it means for job seekers.",
        category: "Trends",
        author: "Emma Wilson",
        date: "Jan 15, 2026",
        readTime: "5 min read",
        image: "/blog/remote-work.jpg"
    },
    {
        id: 2,
        title: "Mastering the Technical Interview",
        excerpt: "A comprehensive guide to preparing for technical interviews, from coding challenges to system design.",
        category: "Career Advice",
        author: "David Chen",
        date: "Jan 12, 2026",
        readTime: "8 min read",
        image: "/blog/interview.jpg"
    },
    {
        id: 3,
        title: "How AI is Transforming Recruitment",
        excerpt: "Discover how artificial intelligence is streamlining the hiring process for both recruiters and candidates.",
        category: "Technology",
        author: "Sarah Johnson",
        date: "Jan 10, 2026",
        readTime: "6 min read",
        image: "/blog/ai-hiring.jpg"
    },
    {
        id: 4,
        title: "Building a Personal Brand on LinkedIn",
        excerpt: "Tips and strategies for optimizing your LinkedIn profile to attract recruiters and opportunities.",
        category: "Personal Branding",
        author: "Michael Brown",
        date: "Jan 05, 2026",
        readTime: "4 min read",
        image: "/blog/linkedin.jpg"
    },
    {
        id: 5,
        title: "Top Skills in Demand for 2026",
        excerpt: "Stay ahead of the curve by learning the most sought-after skills in the current job market.",
        category: "Skills",
        author: "Jessica Lee",
        date: "Jan 02, 2026",
        readTime: "7 min read",
        image: "/blog/skills.jpg"
    },
    {
        id: 6,
        title: "Negotiating Your Salary Like a Pro",
        excerpt: "Learn effective negotiation techniques to ensure you get the compensation you deserve.",
        category: "Salary",
        author: "Robert Taylor",
        date: "Dec 28, 2025",
        readTime: "5 min read",
        image: "/blog/salary.jpg"
    }
];

export function BlogContent() {
    return (
        <div className="min-h-screen pt-20 sm:pt-24 lg:pt-28">
            {/* Hero Section */}
            <section className="relative py-12 sm:py-16 bg-transparent overflow-hidden">
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
                        className="text-center max-w-2xl mx-auto space-y-4"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#041f2b]/05 backdrop-blur-sm border border-[#041f2b]/10 mb-2">
                            <Sparkles className="h-4 w-4 text-[#6366f1]" />
                            <span className="text-xs font-medium text-[#041f2b] uppercase tracking-wide">
                                Latest Insights
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#041f2b]">
                            Groei Blog
                        </h1>
                        <p className="text-lg text-[#041f2b]/70">
                            Expert advice, industry trends, and career tips to help you grow.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_POSTS.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full border border-[#041f2b]/10 bg-white/50 backdrop-blur-sm hover:bg-white hover:border-[#6366f1]/30 transition-all duration-300 hover:shadow-xl group flex flex-col">
                                <CardHeader className="p-0">
                                    <div className="h-48 bg-gradient-to-br from-[#6366f1]/10 to-[#8b5cf6]/10 w-full relative overflow-hidden rounded-t-xl">
                                        {/* Placeholder for actual images */}
                                        <div className="absolute inset-0 flex items-center justify-center text-[#6366f1]/20">
                                            <Sparkles className="h-12 w-12" />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 mb-3 text-xs font-medium">
                                        <Badge variant="secondary" className="bg-[#6366f1]/10 text-[#6366f1] hover:bg-[#6366f1]/20">
                                            {post.category}
                                        </Badge>
                                        <span className="text-[#041f2b]/40">•</span>
                                        <span className="text-[#041f2b]/60">{post.readTime}</span>
                                    </div>
                                    <CardTitle className="text-xl font-bold text-[#041f2b] mb-2 group-hover:text-[#6366f1] transition-colors line-clamp-2">
                                        {post.title}
                                    </CardTitle>
                                    <CardDescription className="text-[#041f2b]/60 mb-4 line-clamp-3 flex-1">
                                        {post.excerpt}
                                    </CardDescription>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#041f2b]/05">
                                        <div className="flex items-center gap-2 text-xs text-[#041f2b]/60">
                                            <User className="h-3 w-3" />
                                            <span>{post.author}</span>
                                        </div>
                                        <span className="text-xs text-[#041f2b]/40">{post.date}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
