"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Sparkles, MessageSquare, TrendingUp, MapPin, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: FileText,
    title: "Resume Parsing",
    description: "Advanced AI-powered resume parsing extracts and analyzes key information with 99% accuracy",
    gradient: "from-[#6366f1] to-[#8b5cf6]",
  },
  {
    icon: Sparkles,
    title: "Smart Skill Matching",
    description: "Machine learning algorithms match your skills with perfect job opportunities in real-time",
    gradient: "from-[#8b5cf6] to-[#ec4899]",
  },
  {
    icon: MessageSquare,
    title: "Mock Interviews",
    description: "Practice with AI-powered mock interviews powered by advanced language models to ace your real interviews",
    gradient: "from-[#ec4899] to-[#f59e0b]",
  },
  {
    icon: TrendingUp,
    title: "Heatmap Analytics",
    description: "Track your application performance with detailed analytics, insights, and comprehensive success metrics",
    gradient: "from-[#f59e0b] to-[#10b981]",
  },
  {
    icon: MapPin,
    title: "Interview Location Map",
    description: "Find interview locations easily with integrated maps, directions, and intelligent route optimization",
    gradient: "from-[#10b981] to-[#6366f1]",
  },
  {
    icon: Briefcase,
    title: "Freelance + Full-time",
    description: "Access both freelance gigs and full-time opportunities in one unified, comprehensive platform",
    gradient: "from-[#6366f1] to-[#ec4899]",
  },
];

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-[#0a0a0f] overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              width: `${180 + i * 35}px`,
              height: `${180 + i * 35}px`,
              background: `radial-gradient(circle, rgba(99, 102, 241, ${0.08 - i * 0.006}) 0%, transparent 70%)`,
              left: `${i * 10}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              scale: [1, 1.25, 1],
              x: [0, 40, -30, 0],
              y: [0, -40, 30, 0],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
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
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151520]/50 backdrop-blur-sm border border-[#6366f1]/20 mb-4">
          <Sparkles className="h-4 w-4 text-[#6366f1]" />
          <span className="text-xs font-medium text-[#a5b4fc] uppercase tracking-wide">
            Platform Features
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight px-4">
          <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
            Powerful Features for
          </span>
          <br />
          <span className="text-[#9ca3af]">Modern Professionals</span>
        </h2>
        <p className="text-lg md:text-xl text-[#9ca3af] max-w-3xl mx-auto px-4">
          Everything you need to land your dream job or find the perfect freelancer in one place
        </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => {
          const Icon = feature.icon;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card 
                className="group relative overflow-hidden border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:bg-[#151520] hover:border-[#6366f1]/30 transition-all duration-500 h-full"
              >
                <motion.div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  whileHover={{ scaleX: 1 }}
                />
                
                <motion.div
                  className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500`}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
                
                <CardHeader className="relative pb-6">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-xl shadow-[#6366f1]/30 transition-all duration-500`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    animate={{
                      boxShadow: [
                        `0 0 0px rgba(99, 102, 241, 0)`,
                        `0 0 25px rgba(99, 102, 241, 0.3)`,
                        `0 0 0px rgba(99, 102, 241, 0)`,
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.4,
                    }}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <CardTitle className="text-xl mb-3 text-[#e8e8f0] group-hover:text-[#a5b4fc] transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed text-[#9ca3af]">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  style={{ originX: 0 }}
                />
              </Card>
            </motion.div>
          );
        })}
          </div>
        </div>
      </div>
    </section>
  );
}
