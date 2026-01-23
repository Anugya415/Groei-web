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
  },
  {
    label: "Freelancers",
    value: 25,
    suffix: "K+",
    icon: Users,
    delay: 0.1,
  },
  {
    label: "Companies",
    value: 5,
    suffix: "K+",
    icon: Building2,
    delay: 0.2,
  },
  {
    label: "Successful Matches",
    value: 100,
    suffix: "K+",
    icon: CheckCircle2,
    delay: 0.3,
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
      className="text-5xl sm:text-6xl font-black mb-2 text-[#041f2b]"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8 }}
      transition={{ duration: 0.6, delay: delay + 0.3, type: "spring", bounce: 0.4 }}
    >
      {count}{suffix}
    </motion.div>
  );
}

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 lg:py-40 bg-transparent overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="fade-grid" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: stat.delay }}
                className="relative"
              >
                <div className="group relative p-10 rounded-[2.5rem] bg-white border border-[#041f2b]/05 shadow-[0_20px_40px_-15px_rgba(4,31,43,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(4,31,43,0.1)] hover:border-[#041f2b]/10 transition-all duration-500 text-center flex flex-col items-center">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-[#041f2b] flex items-center justify-center text-white mb-8 shadow-xl shadow-[#041f2b]/20"
                    whileHover={{ scale: 1.1, rotate: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="h-7 w-7" />
                  </motion.div>

                  <AnimatedNumber value={stat.value} suffix={stat.suffix} delay={stat.delay} />

                  <motion.div
                    className="text-xs font-bold text-[#041f2b]/40 uppercase tracking-[0.2em]"
                  >
                    {stat.label}
                  </motion.div>

                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#041f2b]/02 rounded-full blur-2xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
