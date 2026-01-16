"use client";

import { Button } from "@/components/ui/button";
import { Upload, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function Hero() {
  const [particles, setParticles] = useState<Array<{ left: number; top: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 15 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-[#0a0a0f]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-10" />
        
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${250 + i * 60}px`,
              height: `${250 + i * 60}px`,
              background: `radial-gradient(circle, rgba(99, 102, 241, ${0.15 - i * 0.015}) 0%, transparent 70%)`,
              left: `${10 + i * 12}%`,
              top: `${10 + i * 10}%`,
            }}
            animate={{
              scale: [1, 1.4 + i * 0.1, 1],
              x: [0, 60 + i * 25, -40, 0],
              y: [0, -60 - i * 25, 40, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 18 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
        
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 200, -120, 0],
            y: [0, -200, 120, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#8b5cf6]/20 to-[#ec4899]/20 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            x: [0, -200, 120, 0],
            y: [0, 200, -120, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        
        {particles.map((particle, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#6366f1]/40"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-32 relative z-10">
        <div className="mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center lg:min-h-[700px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 flex flex-col justify-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2.5 pl-4 pr-0 py-2.5 rounded-full bg-gradient-to-r from-[#6366f1]/10 to-[#8b5cf6]/10 backdrop-blur-md border border-[#6366f1]/20 shadow-lg shadow-[#6366f1]/10"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative flex items-center justify-center"
                >
                  <Sparkles className="h-5 w-5 text-[#6366f1]" />
                </motion.div>
                <span className="text-sm font-semibold text-[#a5b4fc] tracking-tight uppercase leading-tight whitespace-nowrap">
                  AI-Powered Matchmaking
                </span>
              </motion.div>

              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight"
                >
                  <span className="bg-gradient-to-r from-[#e8e8f0] via-[#a5b4fc] to-[#e8e8f0] bg-clip-text text-transparent">
                    Upload Once.
                  </span>
                  <br />
                  <span className="text-[#9ca3af]">Get Matched</span>
                  <br />
                  <motion.span
                    className="relative inline-block bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    Instantly.
                    <motion.span
                      className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                      style={{ originX: 0 }}
                    />
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-lg md:text-xl lg:text-2xl text-[#9ca3af] max-w-xl leading-relaxed"
                >
                  AI-powered platform connecting talented professionals with perfect opportunities through intelligent matching.
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-xl shadow-[#6366f1]/30 px-8 py-6 text-base font-semibold w-full sm:w-auto transition-all duration-300" 
                  asChild
                >
                  <Link href="/signup" className="flex items-center justify-center gap-2">
                    Get Started
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-6 text-base font-semibold border-2 border-[#2a2a3a] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50 text-[#e8e8f0] w-full sm:w-auto transition-all duration-300" 
                  asChild
                >
                  <Link href="/upload-resume" className="flex items-center justify-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Resume
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-8 text-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/20 backdrop-blur-sm border border-[#6366f1]/30 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-[#6366f1]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#e8e8f0] text-lg">98% Match</div>
                    <div className="text-xs text-[#9ca3af]">Accuracy</div>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-[#2a2a3a]"></div>
                <div>
                  <div className="font-semibold text-[#e8e8f0] text-lg">50K+ Jobs</div>
                  <div className="text-xs text-[#9ca3af]">Available</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden lg:flex items-center justify-center h-full"
            >
              <div className="relative w-full max-w-lg">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/20 rounded-3xl -rotate-6 blur-xl"
                  animate={{
                    rotate: [-6, -4, -6],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/20 to-[#ec4899]/20 rounded-3xl rotate-6 blur-xl"
                  animate={{
                    rotate: [6, 4, 6],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
                <motion.div
                  className="relative bg-[#151520]/80 backdrop-blur-xl rounded-3xl border border-[#6366f1]/20 p-12 shadow-2xl shadow-[#6366f1]/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="space-y-8">
                    <motion.div
                      className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center mx-auto shadow-xl shadow-[#6366f1]/40"
                      animate={{
                        y: [0, -12, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Upload className="h-14 w-14 text-white" />
                    </motion.div>
                    
                    <div className="text-center space-y-4">
                      <h3 className="text-3xl font-bold text-[#e8e8f0]">
                        AI Resume Parser
                      </h3>
                      <p className="text-sm text-[#9ca3af] max-w-xs mx-auto leading-relaxed">
                        Advanced parsing technology extracts and analyzes your professional profile with precision
                      </p>
                    </div>
                    
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-[#6366f1]"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
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
