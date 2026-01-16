"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "TechCorp",
    content: "GROEI transformed my job search. The AI matching was incredibly accurate and I found my dream role within weeks. The platform is intuitive and the support team is amazing.",
    rating: 5,
    avatar: "SC",
    gradient: "from-[#6366f1] to-[#8b5cf6]",
  },
  {
    name: "Michael Rodriguez",
    role: "UX Designer",
    company: "Design Studio",
    content: "As a freelancer, finding quality projects was always a challenge. GROEI connected me with top-tier clients that match my skills perfectly. Highly recommend!",
    rating: 5,
    avatar: "MR",
    gradient: "from-[#8b5cf6] to-[#ec4899]",
  },
  {
    name: "Emily Johnson",
    role: "Product Manager",
    company: "StartupXYZ",
    content: "The resume parsing feature saved me hours of work. The AI understood my experience perfectly and matched me with opportunities I wouldn't have found otherwise.",
    rating: 5,
    avatar: "EJ",
    gradient: "from-[#ec4899] to-[#f59e0b]",
  },
  {
    name: "David Kim",
    role: "Data Scientist",
    company: "DataLabs",
    content: "The mock interview feature helped me prepare for my current role. The AI feedback was detailed and actionable. This platform is a game-changer for job seekers.",
    rating: 5,
    avatar: "DK",
    gradient: "from-[#f59e0b] to-[#10b981]",
  },
  {
    name: "Lisa Wang",
    role: "Marketing Director",
    company: "BrandCo",
    content: "I've tried many job platforms, but GROEI stands out. The matching algorithm is sophisticated and the interface is clean and professional. Found my perfect match!",
    rating: 5,
    avatar: "LW",
    gradient: "from-[#10b981] to-[#6366f1]",
  },
  {
    name: "James Thompson",
    role: "Full Stack Developer",
    company: "DevSolutions",
    content: "The heatmap analytics gave me insights into my application performance. Combined with the smart matching, I landed multiple interviews and chose the best offer.",
    rating: 5,
    avatar: "JT",
    gradient: "from-[#6366f1] to-[#ec4899]",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section ref={ref} className="relative bg-[#0a0a0f] overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              width: `${220 + i * 35}px`,
              height: `${220 + i * 35}px`,
              background: `radial-gradient(circle, rgba(99, 102, 241, ${0.09 - i * 0.008}) 0%, transparent 70%)`,
              left: `${i * 11}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              scale: [1, 1.25, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 18 + i * 2,
              repeat: Infinity,
              ease: "linear",
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
        className="text-center mb-16 space-y-4 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151520]/50 backdrop-blur-sm border border-[#6366f1]/20 mb-4">
          <Quote className="h-4 w-4 text-[#6366f1]" />
          <span className="text-xs font-medium text-[#a5b4fc] uppercase tracking-wide">
            Testimonials
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight px-4">
          <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
            What Our Users
          </span>
          <br />
          <span className="text-[#9ca3af]">Say About Us</span>
        </h2>
        <p className="text-lg md:text-xl text-[#9ca3af] max-w-3xl mx-auto px-4">
          Join thousands of professionals who found their perfect match with GROEI
        </p>
          </motion.div>

          <div 
            className="overflow-hidden relative py-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="flex testimonials-scroll"
          style={{
            willChange: "transform",
            gap: "3rem",
            animationPlayState: isHovered ? "paused" : "running",
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.name}-${index}`}
              className="flex-shrink-0 w-[85vw] sm:w-[400px] md:w-[450px] lg:w-[420px]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: (index % testimonials.length) * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <Card className="group relative overflow-hidden border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-md hover:bg-[#151520] hover:border-[#6366f1]/30 hover:shadow-2xl hover:shadow-[#6366f1]/15 transition-all duration-700 h-full">
                <motion.div
                  className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-10 rounded-full -mr-24 -mt-24 blur-3xl transition-opacity duration-700`}
                  animate={{
                    scale: [1, 1.4, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (index % testimonials.length) * 0.4,
                  }}
                />
                
                <CardContent className="p-10 relative">
                  <motion.div 
                    className="flex items-center gap-1.5 mb-6"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
                    transition={{ delay: (index % testimonials.length) * 0.1 + 0.2 }}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0 }}
                        transition={{ delay: (index % testimonials.length) * 0.1 + 0.3 + i * 0.05, type: "spring", stiffness: 200 }}
                      >
                        <Star className="h-5 w-5 fill-[#6366f1] text-[#6366f1]" />
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                    transition={{ delay: (index % testimonials.length) * 0.1 + 0.4 }}
                  >
                    <Quote className="h-12 w-12 text-[#6366f1]/30 mb-6" />
                  </motion.div>

                  <motion.p 
                    className="text-[#9ca3af] mb-8 leading-relaxed text-base"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                    transition={{ delay: (index % testimonials.length) * 0.1 + 0.5 }}
                  >
                    "{testimonial.content}"
                  </motion.p>

                  <motion.div 
                    className="flex items-center gap-5 pt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                    transition={{ delay: (index % testimonials.length) * 0.1 + 0.6 }}
                  >
                    <motion.div 
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-semibold text-lg shadow-xl shadow-[#6366f1]/30`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {testimonial.avatar}
                    </motion.div>
                    <div>
                      <div className="font-semibold text-[#e8e8f0] text-base">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-[#9ca3af] mt-0.5">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </motion.div>
                </CardContent>

                <motion.div 
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  style={{ originX: 0 }}
                />
              </Card>
            </motion.div>
          ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
