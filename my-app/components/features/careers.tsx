"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const POSITIONS = [
    {
        title: "Senior Frontend Engineer",
        department: "Engineering",
        location: "San Francisco, CA",
        type: "Full-time",
        description: "We are looking for an experienced Frontend Engineer to help us build the next generation of our platform."
    },
    {
        title: "Product Designer",
        department: "Design",
        location: "Remote",
        type: "Full-time",
        description: "Join our design team to create intuitive and beautiful experiences for our users."
    },
    {
        title: "Marketing Manager",
        department: "Marketing",
        location: "New York, NY",
        type: "Full-time",
        description: "Lead our marketing efforts and help us reach more job seekers and companies."
    },
    {
        title: "Customer Success Specialist",
        department: "Support",
        location: "Remote",
        type: "Full-time",
        description: "Help our users get the most out of Groei and resolve any issues they encounter."
    }
];

export function CareersContent() {
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
                            <Briefcase className="h-4 w-4 text-[#6366f1]" />
                            <span className="text-xs font-medium text-[#041f2b] uppercase tracking-wide">
                                Join Our Team
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#041f2b]">
                            Build the Future of Hiring
                        </h1>
                        <p className="text-lg text-[#041f2b]/70">
                            We're on a mission to revolutionize how people find work and companies find talent. Come do the best work of your life at Groei.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button className="bg-[#041f2b] text-white hover:bg-[#041f2b]/90 h-12 px-8 rounded-xl text-base">
                                View Open Roles
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h2 className="text-2xl font-bold text-[#041f2b]">Open Positions</h2>
                    <div className="grid gap-4">
                        {POSITIONS.map((position, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="hover:border-[#6366f1]/50 transition-colors cursor-pointer group">
                                    <CardHeader className="flex flex-row items-center justify-between p-6">
                                        <div className="space-y-1">
                                            <CardTitle className="text-xl font-semibold text-[#041f2b] group-hover:text-[#6366f1] transition-colors">{position.title}</CardTitle>
                                            <div className="flex items-center gap-4 text-sm text-[#041f2b]/60">
                                                <div className="flex items-center gap-1">
                                                    <Briefcase className="h-4 w-4" />
                                                    <span>{position.department}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{position.location}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{position.type}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                                            <ArrowRight className="h-5 w-5 text-[#041f2b]/40 group-hover:text-[#6366f1]" />
                                        </Button>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
