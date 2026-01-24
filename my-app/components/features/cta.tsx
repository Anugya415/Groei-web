"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

const benefits = [
    "24/7 AI Support",
    "100% Free to Start",
    "Instant Matching",
];

export function CTA() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <section ref={ref} className="relative bg-transparent overflow-hidden py-24 lg:py-40">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Precision Grid Layer */}
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#041f2b08_1px,transparent_1px),linear-gradient(to_bottom,#041f2b08_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]"
                    style={{
                        WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 10%, transparent 100%)",
                        maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 10%, transparent 100%)"
                    }}
                />

                {/* Atmospheric Fog Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(4,31,43,0.02)_0%,transparent_70%)] z-[1]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative rounded-[3.5rem] overflow-hidden border border-[#041f2b]/10 bg-white shadow-[0_40px_80px_-20px_rgba(4,31,43,0.12)] p-12 md:p-20 lg:p-28"
                    >
                        <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl" />
                        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#041f2b]/05 rounded-full blur-[100px]" />
                        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#041f2b]/05 rounded-full blur-[100px]" />

                        <div className="relative text-center space-y-12">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="space-y-6"
                            >
                                <h2 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-[#041f2b] leading-[1.05]">
                                    Start your career <br />
                                    <span className="text-[#041f2b]/40">smarter today</span>
                                </h2>

                                <p className="text-xl md:text-2xl text-[#041f2b]/60 max-w-2xl mx-auto font-medium leading-relaxed">
                                    Join thousands of professionals who found their perfect match using our next-generation AI technology.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="flex flex-col sm:flex-row gap-6 justify-center pt-4"
                            >
                                <Button
                                    size="lg"
                                    className="group bg-[#041f2b] text-white hover:bg-[#041f2b] hover:scale-105 active:scale-95 shadow-2xl shadow-[#041f2b]/20 px-12 py-8 text-xl font-bold rounded-[2rem] w-full sm:w-auto transition-all duration-300"
                                    asChild
                                >
                                    <Link href="/signup" className="flex items-center justify-center gap-3">
                                        Create Free Account
                                        <ArrowRight className="h-6 w-6 group-hover:translate-x-1.5 transition-transform" />
                                    </Link>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="bg-transparent border-2 border-[#041f2b]/10 text-[#041f2b] hover:bg-[#041f2b]/05 px-12 py-8 text-xl font-bold rounded-[2rem] w-full sm:w-auto transition-all duration-300"
                                    asChild
                                >
                                    <Link href="/demo">Watch Demo</Link>
                                </Button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="flex flex-wrap items-center justify-center gap-12 pt-12"
                            >
                                {benefits.map((benefit, index) => (
                                    <motion.div
                                        key={benefit}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
                                        transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-[#041f2b] flex items-center justify-center text-white shadow-lg shadow-[#041f2b]/20">
                                            <Check className="h-5 w-5" />
                                        </div>
                                        <span className="text-sm font-bold text-[#041f2b] uppercase tracking-widest">{benefit}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
