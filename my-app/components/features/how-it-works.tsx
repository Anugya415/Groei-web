"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Upload, Sparkles, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up in seconds with your email or social account. No credit card required for basic features.",
    gradient: "from-[#6366f1] to-[#8b5cf6]",
  },
  {
    number: "02",
    icon: Upload,
    title: "Upload Resume",
    description: "Upload your resume and let AI parse your skills, experience, and achievements instantly.",
    gradient: "from-[#8b5cf6] to-[#ec4899]",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Get Matched",
    description: "Receive instant job matches based on your profile, skills, and preferences using AI algorithms.",
    gradient: "from-[#ec4899] to-[#f59e0b]",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Apply & Interview",
    description: "Apply to matched jobs, schedule interviews, and track your applications all in one place.",
    gradient: "from-[#10b981] to-[#6366f1]",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-transparent overflow-hidden py-24 lg:py-40">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="fade-grid" />
        {/* Atmospheric Fog Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(4,31,43,0.02)_0%,transparent_70%)] z-[1]" />
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
              <span className="text-xs font-bold text-[#041f2b] uppercase tracking-widest">
                Simple Process
              </span>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#041f2b] leading-[1.1]">
              How It <br />
              <span className="text-[#041f2b]/40">Works</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#041f2b]/60 max-w-3xl mx-auto font-medium">
              Get started in four easy steps and land your next opportunity faster than ever before.
            </p>
          </motion.div>

          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: isEven ? -50 : 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                    transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative lg:[&:nth-child(even)]:mt-16"
                  >
                    <Card className="group relative overflow-hidden border border-[#041f2b]/05 bg-white shadow-[0_24px_48px_-15px_rgba(4,31,43,0.06)] hover:shadow-[0_48px_96px_-24px_rgba(4,31,43,0.12)] hover:border-[#041f2b]/10 transition-all duration-500 h-full">
                      <motion.div
                        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 rounded-full -mr-12 -mt-12 blur-2xl transition-opacity duration-500`}
                        animate={{
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                      />

                      <CardHeader className="relative pb-6">
                        <div className="flex items-start justify-between mb-6">
                          <motion.div
                            className={`w-18 h-18 rounded-2xl bg-[#041f2b] flex items-center justify-center shadow-xl shadow-[#041f2b]/20 transition-all duration-500`}
                            whileHover={{ scale: 1.15, rotate: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Icon className="h-9 w-9 text-white" />
                          </motion.div>
                          <span className="text-6xl font-black text-[#041f2b]/05 group-hover:text-[#041f2b]/10 transition-colors duration-500">
                            {step.number}
                          </span>
                        </div>
                        <CardTitle className="text-2xl font-black mb-3 text-[#041f2b] tracking-tight">
                          {step.title}
                        </CardTitle>
                        <CardDescription className="text-base leading-relaxed text-[#041f2b]/60 font-medium">
                          {step.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
