"use client";

import { Button } from "@/components/ui/button";
import { Upload, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export function Hero() {
  const [particles, setParticles] = useState<Array<{ left: number; top: number; duration: number; delay: number }>>([]);
  const [initialized, setInitialized] = useState(false);

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

  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
    setInitialized(true);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-white text-[#041f2b]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {initialized && (
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              background: {
                color: "transparent",
              },
              fpsLimit: 60,
              particles: {
                number: {
                  value: 80,
                  density: {
                    enable: true,
                    value_area: 1200,
                  },
                },
                color: {
                  value: "#041f2b",
                },
                shape: {
                  type: "circle",
                },
                opacity: {
                  value: 0.5,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false,
                  },
                },
                size: {
                  value: 2,
                  random: true,
                },
                move: {
                  enable: true,
                  speed: 1,
                  direction: "none",
                  random: false,
                  straight: false,
                  outModes: {
                    default: "bounce",
                  },
                  attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200,
                  },
                },
              },
              interactivity: {
                events: {
                  onHover: {
                    enable: true,
                    mode: "repulse",
                  },
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                },
                modes: {
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                  },
                  push: {
                    quantity: 4,
                  },
                },
              },
              retina_detect: true,
            }}
          />
        )}
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
                className="inline-flex items-center gap-2.5 pl-4 pr-0 py-2.5 rounded-full bg-[#041f2b]/05 backdrop-blur-md border border-[#041f2b]/10 shadow-lg shadow-[#041f2b]/10"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative flex items-center justify-center"
                >
                  <Sparkles className="h-5 w-5 text-[#041f2b]" />
                </motion.div>
                <span className="text-sm font-semibold text-[#041f2b] tracking-tight uppercase leading-tight whitespace-nowrap">
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
                  <span className="text-[#041f2b]">
                    Upload Once.
                  </span>
                  <br />
                  <span className="text-[#041f2b]/60">Get Matched</span>
                  <br />
                  <motion.span
                    className="relative inline-block text-[#041f2b]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    Instantly.
                    <motion.span
                      className="absolute -bottom-3 left-0 right-0 h-1 bg-[#041f2b] rounded-full"
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
                  className="text-lg md:text-xl lg:text-2xl text-[#041f2b]/70 max-w-xl leading-relaxed"
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
                  className="group bg-[#041f2b] text-white hover:bg-[#041f2b]/90 border-0 shadow-xl shadow-[#041f2b]/20 px-8 py-6 text-base font-semibold w-full sm:w-auto transition-all duration-300" 
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
                  className="px-8 py-6 text-base font-semibold border-2 border-[#041f2b]/20 hover:bg-[#041f2b]/08 hover:border-[#041f2b]/40 text-[#041f2b] w-full sm:w-auto transition-all duration-300" 
                  asChild
                >
                  <Link href="/resume-scanner" className="flex items-center justify-center gap-2">
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
                  <div className="w-12 h-12 rounded-xl bg-[#041f2b]/08 backdrop-blur-sm border border-[#041f2b]/20 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-[#041f2b]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#041f2b] text-lg">98% Match</div>
                    <div className="text-xs text-[#041f2b]/60">Accuracy</div>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-[#041f2b]/15"></div>
                <div>
                  <div className="font-semibold text-[#041f2b] text-lg">50K+ Jobs</div>
                  <div className="text-xs text-[#041f2b]/60">Available</div>
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
                  className="absolute inset-0 bg-gradient-to-br from-[#041f2b]/10 to-[#041f2b]/5 rounded-3xl -rotate-6 blur-xl"
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
                  className="absolute inset-0 bg-gradient-to-br from-[#041f2b]/10 to-[#041f2b]/5 rounded-3xl rotate-6 blur-xl"
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
                  className="relative bg-white backdrop-blur-xl rounded-3xl border border-[#041f2b]/15 p-12 shadow-2xl shadow-[#041f2b]/10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="space-y-8">
                    <motion.div
                      className="w-28 h-28 rounded-2xl bg-[#041f2b] flex items-center justify-center mx-auto shadow-xl shadow-[#041f2b]/25"
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
                      <h3 className="text-3xl font-bold text-[#041f2b]">
                        AI Resume Parser
                      </h3>
                      <p className="text-sm text-[#041f2b]/70 max-w-xs mx-auto leading-relaxed">
                        Advanced parsing technology extracts and analyzes your professional profile with precision
                      </p>
                    </div>
                    
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-[#041f2b]"
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
