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
    <section ref={ref} className="relative bg-[#0a0a0f] overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              width: `${200 + i * 40}px`,
              height: `${200 + i * 40}px`,
              background: `radial-gradient(circle, rgba(99, 102, 241, ${0.08 - i * 0.008}) 0%, transparent 70%)`,
              left: `${15 + i * 12}%`,
              top: `${15 + (i % 2) * 50}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 50, -35, 0],
              y: [0, -50, 35, 0],
            }}
            transition={{
              duration: 16 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
      </div>

      <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-4"
          >
          <Badge variant="secondary" className="mb-4 px-4 py-2 bg-[#151520]/50 backdrop-blur-sm border border-[#6366f1]/20 text-[#a5b4fc]">
            Simple Process
          </Badge>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight px-4">
            <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
              How It
            </span>
            <br />
            <span className="text-[#9ca3af]">Works</span>
          </h2>
          <p className="text-lg md:text-xl text-[#9ca3af] max-w-3xl mx-auto px-4">
            Get started in four easy steps and land your next opportunity faster than ever before
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
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative lg:[&:nth-child(even)]:mt-16"
                >
                  <Card className="group relative overflow-hidden border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:bg-[#151520] hover:border-[#6366f1]/30 transition-all duration-500 h-full">
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
                          className={`w-18 h-18 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl shadow-[#6366f1]/30 transition-all duration-500`}
                          whileHover={{ scale: 1.15, rotate: -5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          animate={{
                            boxShadow: [
                              `0 0 0px rgba(99, 102, 241, 0)`,
                              `0 0 20px rgba(99, 102, 241, 0.4)`,
                              `0 0 0px rgba(99, 102, 241, 0)`,
                            ],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.4,
                          }}
                        >
                          <Icon className="h-9 w-9 text-white" />
                        </motion.div>
                        <span className="text-6xl font-black text-[#1e1e2e] group-hover:text-[#2a2a3a] transition-colors duration-500">
                          {step.number}
                        </span>
                      </div>
                      <CardTitle className="text-xl mb-3 text-[#e8e8f0] group-hover:text-[#a5b4fc] transition-colors">
                        {step.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed text-[#9ca3af]">
                        {step.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                      whileHover={{ scaleX: 1 }}
                    />
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
