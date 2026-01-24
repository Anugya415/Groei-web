"use client";

import { useCallback, useEffect } from "react";
import type { Engine } from "tsparticles-engine";
import { Particles } from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function GlobalBackground() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 40, stiffness: 250 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Background Spotlight Position
    const spotlightX = useTransform(smoothX, (val) => `${val}px`);
    const spotlightY = useTransform(smoothY, (val) => `${val}px`);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-white">
            {/* 1. Base Gradient Atmosphere (Fog) */}
            <div className="absolute inset-0 opacity-[0.4] blur-[160px]">
                {/* Indigo Mist */}
                <motion.div
                    className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-[#6366f1]/20"
                    animate={{
                        x: [0, 60, -40, 0],
                        y: [0, -50, 70, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Violet Glow */}
                <motion.div
                    className="absolute bottom-[-15%] right-[-10%] w-[90vw] h-[90vw] rounded-full bg-[#8b5cf6]/15"
                    animate={{
                        x: [0, -70, 50, 0],
                        y: [0, 60, -40, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 45, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
                {/* Deep Indigo Aura */}
                <motion.div
                    className="absolute top-[30%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#4338ca]/10"
                    animate={{
                        x: [0, 50, -60, 0],
                        y: [0, 80, -50, 0],
                        scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                />
                {/* Blue/Indigo Haze */}
                <motion.div
                    className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#6366f1]/10"
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* 2. Interactive Interactive Glow (Spotlight) */}
            <motion.div
                className="absolute inset-0 z-0 opacity-[0.15]"
                style={{
                    background: `radial-gradient(1000px circle at ${spotlightX} ${spotlightY}, rgba(4,31,43,0.1), transparent 80%)`,
                }}
            />

            {/* 3. Tri-Layer Parallax Grid System */}
            {/* Base Grid - Fine Detail */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#041f2b05_1px,transparent_1px),linear-gradient(to_bottom,#041f2b05_1px,transparent_1px)] bg-[size:2rem_2rem]" />

            {/* Mid Layer Grid - Structured */}
            <motion.div
                className="absolute inset-[-20%] bg-[linear-gradient(to_right,#041f2b08_1px,transparent_1px),linear-gradient(to_bottom,#041f2b08_1px,transparent_1px)] bg-[size:6rem_6rem]"
                style={{
                    x: useTransform(smoothX, (v) => v * -0.015),
                    y: useTransform(smoothY, (v) => v * -0.015)
                }}
            />

            {/* Large Layer Grid - Depth */}
            <motion.div
                className="absolute inset-[-50%] bg-[linear-gradient(to_right,#041f2b12_1.5px,transparent_1.5px),linear-gradient(to_bottom,#041f2b12_1.5px,transparent_1.5px)] bg-[size:18rem_18rem]"
                style={{
                    x: useTransform(smoothX, (v) => v * -0.03),
                    y: useTransform(smoothY, (v) => v * -0.03)
                }}
            />

            {/* 4. Scanning Analysis Lines */}
            <motion.div
                className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#041f2b08] to-transparent z-10"
                animate={{ top: ["-10%", "110%"] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#041f2b08] to-transparent z-10"
                animate={{ left: ["-10%", "110%"] }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear", delay: 2 }}
            />

            {/* 5. Advanced Constellation Particles */}
            <Particles
                id="fogUltraParticles"
                init={particlesInit}
                options={{
                    background: { color: { value: "transparent" } },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onHover: { enable: true, mode: "grab" },
                            resize: true
                        },
                        modes: {
                            grab: { distance: 220, links: { opacity: 0.25 } },
                        }
                    },
                    particles: {
                        color: { value: ["#6366f1", "#8b5cf6", "#4338ca"] },
                        links: {
                            enable: true,
                            distance: 180,
                            color: "#041f2b",
                            opacity: 0.05,
                            width: 0.6,
                        },
                        move: {
                            enable: true,
                            speed: 0.6,
                            direction: "none",
                            random: true,
                            straight: false,
                            outModes: { default: "bounce" },
                        },
                        number: {
                            density: { enable: true, area: 1000 },
                            value: 50,
                        },
                        opacity: {
                            value: { min: 0.05, max: 0.18 },
                            anim: { enable: true, speed: 0.8, opacity_min: 0.05, sync: false }
                        },
                        shape: { type: "circle" },
                        size: {
                            value: { min: 1, max: 2.5 },
                        },
                    },
                    detectRetina: true,
                }}
            />
        </div>
    );
}
