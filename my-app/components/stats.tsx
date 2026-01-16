"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Building2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { 
    label: "Total Jobs", 
    value: 50, 
    suffix: "K+", 
    icon: TrendingUp, 
    delay: 0, 
    gradient: "from-[#6366f1] to-[#8b5cf6]",
  },
  { 
    label: "Freelancers", 
    value: 25, 
    suffix: "K+", 
    icon: Users, 
    delay: 0.1, 
    gradient: "from-[#8b5cf6] to-[#ec4899]",
  },
  { 
    label: "Companies", 
    value: 5, 
    suffix: "K+", 
    icon: Building2, 
    delay: 0.2, 
    gradient: "from-[#ec4899] to-[#f59e0b]",
  },
  { 
    label: "Successful Matches", 
    value: 100, 
    suffix: "K+", 
    icon: CheckCircle2, 
    delay: 0.3, 
    gradient: "from-[#10b981] to-[#6366f1]",
  },
];

function AnimatedNumber({ value, suffix, delay }: { value: number; suffix: string; delay: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-3 bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent"
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0 }}
      transition={{ duration: 0.5, delay: delay + 0.3, type: "spring", stiffness: 200 }}
    >
      {count}{suffix}
    </motion.div>
  );
}

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative z-20 bg-[#0a0a0f] overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${300 + i * 50}px`,
              height: `${300 + i * 50}px`,
              background: `radial-gradient(circle, rgba(99, 102, 241, ${0.1 - i * 0.01}) 0%, transparent 70%)`,
              left: `${i * 16}%`,
              top: `${10 + (i % 2) * 40}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
      <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: stat.delay, type: "spring", stiffness: 150 }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="relative"
            >
              <Card className="group relative overflow-hidden border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:bg-[#151520] hover:border-[#6366f1]/30 hover:shadow-2xl hover:shadow-[#6366f1]/10 transition-all duration-500 h-full">
                <motion.div
                  className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500`}
                  animate={{
                    scale: isInView ? [1, 1.3, 1] : 1,
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: stat.delay,
                    ease: "easeInOut",
                  }}
                />
                
                <CardContent className="p-8 text-center relative z-0">
                  <motion.div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} mb-6 shadow-xl shadow-[#6366f1]/30 relative`}
                    whileHover={{ scale: 1.15, rotate: -10 }}
                    initial={{ scale: 0, rotate: -180, y: -50 }}
                    animate={isInView ? { scale: 1, rotate: 0, y: 0 } : { scale: 0 }}
                    transition={{ duration: 0.8, delay: stat.delay + 0.2, type: "spring", stiffness: 200 }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: stat.delay,
                      }}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </motion.div>
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300`}
                    />
                  </motion.div>
                  
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} delay={stat.delay} />
                  
                  <motion.div
                    className="text-sm font-semibold text-[#9ca3af] uppercase tracking-wider"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: stat.delay + 0.6 }}
                  >
                    {stat.label}
                  </motion.div>
                  
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    style={{ originX: 0 }}
                  />
                </CardContent>
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
