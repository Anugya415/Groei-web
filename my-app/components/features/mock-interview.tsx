"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Video, Mic, BrainCircuit, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function MockInterviewContent() {
    return (
        <div className="min-h-screen pt-20 sm:pt-24 lg:pt-28">
            {/* Hero Section */}
            <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
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
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#041f2b]/05 backdrop-blur-sm border border-[#041f2b]/10 mb-4">
                                <BrainCircuit className="h-4 w-4 text-[#6366f1]" />
                                <span className="text-xs font-medium text-[#041f2b] uppercase tracking-wide">
                                    AI-Powered Practice
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                                <span className="bg-gradient-to-r from-[#041f2b] to-[#4338ca] bg-clip-text text-transparent">
                                    Master Your Interview Skills
                                </span>
                            </h1>
                            <p className="text-lg sm:text-xl text-[#041f2b]/70 max-w-2xl mx-auto">
                                Practice with our advanced AI interviewer. Get real-time feedback on your answers, body language, and speaking pace.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Button
                                size="lg"
                                className="h-14 px-8 text-lg bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-lg shadow-[#6366f1]/30 rounded-xl"
                            >
                                Start Practice Session <ArrowRight className="h-5 w-5 ml-2" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-14 px-8 text-lg border-2 border-[#041f2b]/20 text-[#041f2b] hover:bg-[#041f2b]/05 rounded-xl"
                            >
                                View Sample Questions
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="border border-[#041f2b]/10 bg-white/50 backdrop-blur-sm">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-[#6366f1]/10 flex items-center justify-center mb-4">
                                <Video className="h-6 w-6 text-[#6366f1]" />
                            </div>
                            <CardTitle className="text-xl font-bold text-[#041f2b]">Video Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[#041f2b]/70">
                                Get feedback on your eye contact, posture, and facial expressions during the interview.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border border-[#041f2b]/10 bg-white/50 backdrop-blur-sm">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-[#6366f1]/10 flex items-center justify-center mb-4">
                                <Mic className="h-6 w-6 text-[#6366f1]" />
                            </div>
                            <CardTitle className="text-xl font-bold text-[#041f2b]">Speech Recognition</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[#041f2b]/70">
                                Analyze your speaking pace, tone, and clarity. Identify filler words and hesitation.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border border-[#041f2b]/10 bg-white/50 backdrop-blur-sm">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-[#6366f1]/10 flex items-center justify-center mb-4">
                                <BrainCircuit className="h-6 w-6 text-[#6366f1]" />
                            </div>
                            <CardTitle className="text-xl font-bold text-[#041f2b]">Smart Feedback</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[#041f2b]/70">
                                Receive detailed suggestions on how to improve your answers based on industry standards.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
