"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    MapPin,
    Briefcase,
    Sparkles,
    TrendingUp,
    Star,
    CheckCircle2,
    DollarSign,
    Clock
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const MOCK_FREELANCERS = [
    {
        id: 1,
        name: "Alex Johnson",
        role: "Senior Full Stack Developer",
        location: "San Francisco, CA",
        rate: "$80/hr",
        experience: "8 years",
        rating: 4.9,
        verified: true,
        available: true,
        skills: ["React", "Node.js", "TypeScript", "AWS"],
        bio: "Passionate developer with expertise in building scalable web applications. specialize in modern stack including React, Next.js and Node.js.",
        avatar: "AJ"
    },
    {
        id: 2,
        name: "Sarah Williams",
        role: "UI/UX Designer",
        location: "London, UK",
        rate: "$65/hr",
        experience: "5 years",
        rating: 4.8,
        verified: true,
        available: true,
        skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
        bio: "Creative designer focused on crafting intuitive and beautiful user experiences. I bridge the gap between user needs and business goals.",
        avatar: "SW"
    },
    {
        id: 3,
        name: "Michael Brown",
        role: "DevOps Engineer",
        location: "Toronto, Canada",
        rate: "$95/hr",
        experience: "10 years",
        rating: 5.0,
        verified: true,
        available: false,
        skills: ["Docker", "Kubernetes", "CI/CD", "Azure"],
        bio: "Experienced DevOps engineer helping teams automate deployment pipelines and manage cloud infrastructure efficienty.",
        avatar: "MB"
    },
    {
        id: 4,
        name: "Emily Davis",
        role: "Content Strategist",
        location: "Remote",
        rate: "$50/hr",
        experience: "6 years",
        rating: 4.7,
        verified: true,
        available: true,
        skills: ["SEO", "Copywriting", "Content Marketing", "Social Media"],
        bio: "Strategic content creator helping brands tell their story and reach their target audience through compelling narratives.",
        avatar: "ED"
    },
    {
        id: 5,
        name: "David Wilson",
        role: "Mobile App Developer",
        location: "Austin, TX",
        rate: "$75/hr",
        experience: "7 years",
        rating: 4.8,
        verified: true,
        available: true,
        skills: ["React Native", "Swift", "Kotlin", "Firebase"],
        bio: "Mobile enthusiast building high-performance native and cross-platform applications for iOS and Android.",
        avatar: "DW"
    },
    {
        id: 6,
        name: "Lisa Garcia",
        role: "Data Scientist",
        location: "New York, NY",
        rate: "$90/hr",
        experience: "5 years",
        rating: 4.9,
        verified: true,
        available: true,
        skills: ["Python", "Machine Learning", "SQL", "Tableau"],
        bio: "Data scientist turning complex data into actionable insights. Expert in predictive modeling and data visualization.",
        avatar: "LG"
    }
];

export function FreelancersContent() {
    const [freelancers, setFreelancers] = useState(MOCK_FREELANCERS);

    return (
        <div className="min-h-screen pt-20 sm:pt-24 lg:pt-28">
            {/* Hero Section */}
            <section className="relative py-6 sm:py-8 md:py-10 bg-transparent overflow-hidden">
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
                        className="text-center mb-8 space-y-3"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#041f2b]/05 backdrop-blur-sm border border-[#041f2b]/10 mb-3">
                            <Sparkles className="h-4 w-4 text-[#6366f1]" />
                            <span className="text-xs font-medium text-[#041f2b] uppercase tracking-wide">
                                Top Talent
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                            <span className="bg-gradient-to-r from-[#041f2b] to-[#4338ca] bg-clip-text text-transparent">
                                Expert Freelancers
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-[#041f2b]/60 max-w-3xl mx-auto">
                            Find and hire verified professionals for your next project.
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-8 text-sm sm:text-base text-[#041f2b]/60"
                    >
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-[#6366f1]" />
                            <span className="font-semibold text-[#041f2b]">{freelancers.length}+</span>
                            <span>Experts Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#6366f1]" />
                            <span className="font-semibold text-[#041f2b]">100%</span>
                            <span>Verified Skills</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Freelancer Listings */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {freelancers.map((freelancer, index) => (
                        <motion.div
                            key={freelancer.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <Card className="group relative overflow-hidden border border-[#041f2b]/10 bg-white/50 backdrop-blur-sm hover:bg-white hover:border-[#6366f1]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#6366f1]/10 h-full flex flex-col">
                                <motion.div
                                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                                    whileHover={{ scaleX: 1 }}
                                />

                                <CardHeader className="pb-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#6366f1]/20">
                                            <span className="text-xl font-bold text-white">{freelancer.avatar}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <CardTitle className="text-xl font-bold text-[#041f2b] group-hover:text-[#6366f1] transition-colors">
                                                    {freelancer.name}
                                                </CardTitle>
                                                {freelancer.verified && (
                                                    <CheckCircle2 className="h-5 w-5 text-[#6366f1] flex-shrink-0" />
                                                )}
                                            </div>
                                            <p className="text-sm font-medium text-[#6366f1] mb-2">{freelancer.role}</p>

                                            <div className="flex items-center gap-1 text-sm text-[#041f2b]/60">
                                                <Star className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                                                <span className="font-semibold text-[#041f2b]">{freelancer.rating}</span>
                                                <span>({Math.floor(Math.random() * 50) + 10} reviews)</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4 pt-0 mt-auto">
                                    <div className="flex flex-wrap gap-2">
                                        {freelancer.skills.map(skill => (
                                            <Badge key={skill} variant="secondary" className="bg-[#041f2b]/5 text-[#041f2b]/70 hover:bg-[#041f2b]/10">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="space-y-2 text-sm text-[#041f2b]/60">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 flex-shrink-0" />
                                            <span>{freelancer.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 flex-shrink-0" />
                                            <span>{freelancer.experience} experience</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 flex-shrink-0" />
                                            <span className="font-semibold text-[#041f2b]">{freelancer.rate}</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-[#041f2b]/70 line-clamp-3">
                                        {freelancer.bio}
                                    </p>

                                    <Button className="w-full bg-[#041f2b] text-white hover:bg-[#041f2b]/90 border-0 shadow-lg shadow-[#041f2b]/20">
                                        <Link href={`#`} className="w-full h-full flex items-center justify-center">View Profile</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
