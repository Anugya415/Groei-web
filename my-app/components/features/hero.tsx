"use client";

import { Button } from "@/components/ui/button";
import { Upload, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

const HeadlineChar = ({ children, delay }: { children: string; delay: number }) => (
    <motion.span
        initial={{ opacity: 0, y: 50, rotateX: -90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{
            duration: 0.8,
            delay,
            ease: [0.215, 0.61, 0.355, 1],
        }}
        style={{ display: "inline-block", transformOrigin: "bottom" }}
    >
        {children === " " ? "\u00A0" : children}
    </motion.span>
);

export function Hero() {
    const [initialized, setInitialized] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const springConfig = { damping: 30, stiffness: 100 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Parallax transforms for different layers
    const contentX = useTransform(smoothX, [0, 1], [-20, 20]);
    const contentY = useTransform(smoothY, [0, 1], [-20, 20]);
    const cardRotateX = useTransform(smoothY, [0, 1], [5, -5]);
    const cardRotateY = useTransform(smoothX, [0, 1], [-5, 5]);

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
        setInitialized(true);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const headline1 = "Upload Once.";
    const headline2 = "Get Matched";
    const headline3 = "Instantly.";

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-transparent text-[#041f2b] perspective-1000"
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Standardized Fade Grid background */}
                <div className="fade-grid" />

                {/* Central Fog Glow matching reference */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8)_0%,transparent_60%)] z-[1]" />

                {/* Secondary Technical Grid Detail */}
                <motion.div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#041f2b04_1px,transparent_1px),linear-gradient(to_bottom,#041f2b04_1px,transparent_1px)] bg-[size:10rem_10rem] opacity-20"
                    animate={{
                        opacity: [0.05, 0.15, 0.05],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Sweeping Scanning Beam */}
                <motion.div
                    className="absolute left-0 right-0 h-[300px] bg-gradient-to-b from-transparent via-[#041f2b02] to-transparent z-0"
                    animate={{
                        top: ["-20%", "120%"],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                {/* Floating Decorative Elements */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-[#041f2b]/10"
                        style={{
                            top: `${20 + i * 15}%`,
                            left: `${10 + (i % 3) * 30}%`,
                            x: useTransform(smoothX, [0, 1], [i * 10, i * -10]),
                            y: useTransform(smoothY, [0, 1], [i * 15, i * -15]),
                        }}
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {initialized && (
                    <Particles
                        id="hero-particles"
                        init={particlesInit}
                        options={{
                            background: { color: "transparent" },
                            fpsLimit: 120,
                            particles: {
                                number: {
                                    value: 100,
                                    density: { enable: true, value_area: 1000 }
                                },
                                color: {
                                    value: ["#041f2b", "#6366f1", "#a5b4fc", "#8b5cf6"]
                                },
                                shape: {
                                    type: "circle"
                                },
                                opacity: {
                                    value: { min: 0.2, max: 0.6 },
                                    random: true,
                                    anim: {
                                        enable: true,
                                        speed: 1,
                                        opacity_min: 0.1,
                                        sync: false
                                    },
                                },
                                size: {
                                    value: { min: 1, max: 3.5 },
                                    random: true,
                                    anim: {
                                        enable: true,
                                        speed: 2,
                                        size_min: 0.1,
                                        sync: false
                                    }
                                },
                                move: {
                                    enable: true,
                                    speed: 1.2,
                                    direction: "none",
                                    random: true,
                                    straight: false,
                                    outModes: { default: "out" },
                                    attract: {
                                        enable: true,
                                        rotateX: 600,
                                        rotateY: 1200
                                    }
                                },
                                links: {
                                    enable: true,
                                    distance: 180,
                                    color: "#041f2b",
                                    opacity: 0.18,
                                    width: 1,
                                    triangles: {
                                        enable: true,
                                        opacity: 0.03
                                    }
                                },
                            },
                            interactivity: {
                                events: {
                                    onHover: {
                                        enable: true,
                                        mode: ["grab", "bubble"]
                                    },
                                    onClick: {
                                        enable: true,
                                        mode: "push"
                                    },
                                    resize: true
                                },
                                modes: {
                                    grab: {
                                        distance: 220,
                                        links: { opacity: 0.5 }
                                    },
                                    bubble: {
                                        distance: 250,
                                        size: 7,
                                        duration: 0.5,
                                        opacity: 0.9,
                                        color: "#6366f1"
                                    },
                                    push: { quantity: 4 },
                                },
                            },
                            retina_detect: true,
                        }}
                    />
                )}
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-32 relative z-10">
                <div className="mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <motion.div
                            style={{ x: contentX, y: contentY }}
                            className="space-y-10 flex flex-col justify-center"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                                className="inline-flex items-center gap-3 pl-5 pr-1 py-1 px-1 rounded-full bg-[#041f2b]/05 backdrop-blur-md border border-[#041f2b]/10 shadow-sm md:w-fit"
                            >
                                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#041f2b] text-white">
                                    <Sparkles className="h-4 w-4" />
                                </div>
                                <span className="text-xs font-bold text-[#041f2b] tracking-wider uppercase pr-4">
                                    AI-Powered Matchmaking
                                </span>
                            </motion.div>

                            <div className="space-y-8">
                                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.25rem] font-black tracking-tight leading-[0.95] text-[#041f2b]">
                                    <div className="overflow-hidden">
                                        {headline1.split("").map((char, i) => (
                                            <HeadlineChar key={i} delay={0.4 + i * 0.03}>{char}</HeadlineChar>
                                        ))}
                                    </div>
                                    <div className="overflow-hidden text-[#041f2b]/30">
                                        {headline2.split("").map((char, i) => (
                                            <HeadlineChar key={i} delay={0.8 + i * 0.03}>{char}</HeadlineChar>
                                        ))}
                                    </div>
                                    <div className="overflow-hidden relative inline-block">
                                        {headline3.split("").map((char, i) => (
                                            <HeadlineChar key={i} delay={1.2 + i * 0.03}>{char}</HeadlineChar>
                                        ))}
                                        <motion.span
                                            className="absolute -bottom-4 left-0 right-0 h-2 bg-[#041f2b] rounded-full"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ duration: 1.2, delay: 1.8, ease: "circOut" }}
                                            style={{ originX: 0 }}
                                        />
                                    </div>
                                </h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 1.8 }}
                                    className="text-xl md:text-2xl text-[#041f2b]/60 max-w-xl leading-relaxed font-medium"
                                >
                                    The next generation AI platform connecting world-class talent with exceptional opportunities through intelligent parsing.
                                </motion.p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 2.1 }}
                                className="flex flex-col sm:flex-row gap-5 pt-6"
                            >
                                <Button
                                    size="lg"
                                    className="group bg-[#041f2b] text-white hover:bg-[#041f2b] hover:scale-105 active:scale-95 border-0 shadow-2xl shadow-[#041f2b]/20 px-10 py-8 text-lg font-bold rounded-2xl w-full sm:w-auto transition-all duration-300"
                                    asChild
                                >
                                    <Link href="/signup" className="flex items-center justify-center gap-3">
                                        Get Started
                                        <ArrowRight className="h-6 w-6 group-hover:translate-x-1.5 transition-transform" />
                                    </Link>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="px-10 py-8 text-lg font-bold border-2 border-[#041f2b]/10 bg-white/50 backdrop-blur-sm hover:bg-[#041f2b]/05 hover:border-[#041f2b]/20 text-[#041f2b] rounded-2xl w-full sm:w-auto transition-all duration-300"
                                    asChild
                                >
                                    <Link href="/resume-scanner" className="flex items-center justify-center gap-3">
                                        <Upload className="h-6 w-6" />
                                        Upload Resume
                                    </Link>
                                </Button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 2.4 }}
                                className="flex flex-wrap items-center gap-10 pt-12"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-[#041f2b] flex items-center justify-center text-white shadow-xl shadow-[#041f2b]/20">
                                        <TrendingUp className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <div className="font-black text-[#041f2b] text-2xl">98%</div>
                                        <div className="text-xs font-bold text-[#041f2b]/40 uppercase tracking-widest">Accuracy</div>
                                    </div>
                                </div>
                                <div className="w-px h-12 bg-[#041f2b]/10 hidden sm:block"></div>
                                <div className="flex flex-col">
                                    <div className="font-black text-[#041f2b] text-2xl">50K+</div>
                                    <div className="text-xs font-bold text-[#041f2b]/40 uppercase tracking-widest">Active Jobs</div>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            style={{ rotateX: cardRotateX, rotateY: cardRotateY, x: contentX, y: contentY }}
                            className="relative hidden lg:flex items-center justify-center h-full transform-style-3d"
                        >
                            <div className="relative w-full max-w-lg">
                                <motion.div
                                    className="absolute inset-0 bg-[#041f2b]/5 rounded-[3rem] -rotate-6 blur-3xl"
                                    animate={{ scale: [1, 1.1, 1], rotate: [-6, -4, -6] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <motion.div
                                    className="relative bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-[#041f2b]/10 p-16 shadow-[0_32px_64px_-16px_rgba(4,31,43,0.15)] overflow-hidden"
                                    whileHover={{ y: -10, scale: 1.02 }}
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#041f2b]/5 rounded-full blur-2xl -mr-16 -mt-16" />
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#041f2b]/5 rounded-full blur-2xl -ml-16 -mb-16" />

                                    <div className="relative space-y-12">
                                        <motion.div
                                            className="w-32 h-32 rounded-[2.5rem] bg-[#041f2b] flex items-center justify-center mx-auto shadow-2xl shadow-[#041f2b]/30"
                                            animate={{ y: [0, -15, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <Upload className="h-16 w-16 text-white" />
                                        </motion.div>

                                        <div className="text-center space-y-6">
                                            <h3 className="text-4xl font-black text-[#041f2b] tracking-tight">AI Parser</h3>
                                            <p className="text-base text-[#041f2b]/60 max-w-[280px] mx-auto leading-relaxed font-medium">
                                                Proprietary AI technology that understands intent, skills, and potential.
                                            </p>
                                        </div>

                                        <div className="flex justify-center gap-3">
                                            {[1, 2, 3, 4].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-2.5 h-2.5 rounded-full bg-[#041f2b]"
                                                    animate={{ scale: [1, 1.6, 1], opacity: [0.2, 1, 0.2] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
