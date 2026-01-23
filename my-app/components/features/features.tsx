"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Sparkles, MessageSquare, TrendingUp, MapPin, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
    {
        icon: FileText,
        title: "Resume Parsing",
        description: "Advanced AI-powered resume parsing extracts and analyzes key information with 99% accuracy",
    },
    {
        icon: Sparkles,
        title: "Smart Skill Matching",
        description: "Machine learning algorithms match your skills with perfect job opportunities in real-time",
    },
    {
        icon: MessageSquare,
        title: "Mock Interviews",
        description: "Practice with AI-powered mock interviews powered by advanced language models to ace your real interviews",
    },
    {
        icon: TrendingUp,
        title: "Heatmap Analytics",
        description: "Track your application performance with detailed analytics, insights, and comprehensive success metrics",
    },
    {
        icon: MapPin,
        title: "Interview Location",
        description: "Find interview locations easily with integrated maps, directions, and intelligent route optimization",
    },
    {
        icon: Briefcase,
        title: "Freelance + Full-time",
        description: "Access both freelance gigs and full-time opportunities in one unified, comprehensive platform",
    },
];

export function Features() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="relative py-24 lg:py-40 bg-transparent overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="fade-grid" />
                {/* Atmospheric Fog Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.7)_0%,transparent_70%)] z-[1]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center mb-24 space-y-6"
                    >
                        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#041f2b]/05 backdrop-blur-sm border border-[#041f2b]/10 mb-4">
                            <Sparkles className="h-4 w-4 text-[#041f2b]" />
                            <span className="text-xs font-bold text-[#041f2b] uppercase tracking-widest">
                                Platform Features
                            </span>
                        </div>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#041f2b] leading-[1.1]">
                            Powerful Features for <br />
                            <span className="text-[#041f2b]/40">Modern Professionals</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-[#041f2b]/60 max-w-3xl mx-auto font-medium">
                            Everything you need to land your dream job or find the perfect freelancer in one place.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                >
                                    <div className="group relative p-10 rounded-[3rem] bg-white border border-[#041f2b]/05 shadow-[0_24px_48px_-15px_rgba(4,31,43,0.06)] hover:shadow-[0_48px_96px_-24px_rgba(4,31,43,0.12)] hover:border-[#041f2b]/10 transition-all duration-500 h-full flex flex-col">
                                        <motion.div
                                            className="w-16 h-16 rounded-2xl bg-[#041f2b] flex items-center justify-center mb-10 shadow-xl shadow-[#041f2b]/20 text-white"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <Icon className="h-8 w-8" />
                                        </motion.div>

                                        <h3 className="text-2xl font-black mb-4 text-[#041f2b] tracking-tight group-hover:text-[#041f2b] transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-base leading-relaxed text-[#041f2b]/60 font-medium">
                                            {feature.description}
                                        </p>

                                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#041f2b]/02 rounded-full blur-3xl -mr-20 -mt-20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
