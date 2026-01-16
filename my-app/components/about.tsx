"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Users, 
  Lightbulb, 
  TrendingUp,
  Sparkles,
  Globe,
  Heart,
  Rocket,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const milestones = [
  {
    year: "2020",
    title: "Founded",
    description: "GROEI was born from a vision to revolutionize job searching"
  },
  {
    year: "2021",
    title: "AI Launch",
    description: "Launched our first AI-powered matching algorithm"
  },
  {
    year: "2022",
    title: "Global Expansion",
    description: "Expanded to serve professionals worldwide"
  },
  {
    year: "2024",
    title: "Today",
    description: "Serving 50K+ users and 5K+ companies globally"
  }
];

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "Every feature we build serves our mission to connect talent with opportunity",
    gradient: "from-[#6366f1] to-[#8b5cf6]",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We leverage cutting-edge AI to solve real-world career challenges",
    gradient: "from-[#8b5cf6] to-[#ec4899]",
  },
  {
    icon: Users,
    title: "Community Focus",
    description: "Building a supportive ecosystem for professional growth",
    gradient: "from-[#ec4899] to-[#f59e0b]",
  },
  {
    icon: TrendingUp,
    title: "Continuous Growth",
    description: "We evolve with the job market to serve you better",
    gradient: "from-[#10b981] to-[#6366f1]",
  }
];

const stats = [
  { value: "50K+", label: "Active Users", icon: Users, gradient: "from-[#6366f1] to-[#8b5cf6]" },
  { value: "5K+", label: "Companies", icon: Globe, gradient: "from-[#8b5cf6] to-[#ec4899]" },
  { value: "100K+", label: "Matches", icon: Heart, gradient: "from-[#ec4899] to-[#f59e0b]" },
  { value: "98%", label: "Satisfaction", icon: TrendingUp, gradient: "from-[#10b981] to-[#6366f1]" }
];

export function AboutContent() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 lg:pt-28">
      <section className="relative py-8 sm:py-12 md:py-16 bg-[#0a0a0f] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl"
              style={{
                width: `${250 + i * 60}px`,
                height: `${250 + i * 60}px`,
                background: `radial-gradient(circle, rgba(99, 102, 241, ${0.12 - i * 0.015}) 0%, transparent 70%)`,
                left: `${10 + i * 15}%`,
                top: `${10 + i * 12}%`,
              }}
              animate={{
                scale: [1, 1.4, 1],
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
        </div>

        <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151520]/50 backdrop-blur-sm border border-[#6366f1]/20 mb-4">
              <Sparkles className="h-4 w-4 text-[#6366f1]" />
              <span className="text-xs font-medium text-[#a5b4fc] uppercase tracking-wide">
                About GROEI
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                Who We Are
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-[#9ca3af] max-w-2xl mx-auto">
              Building the future of work, one connection at a time
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                Our Story
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] mx-auto rounded-full"></div>
            
            <div className="space-y-5 text-[#9ca3af] leading-relaxed text-center">
              <p className="text-base sm:text-lg">
                GROEI was founded with a simple yet powerful vision: to make job searching smarter, faster, and more effective. 
                We recognized that traditional job boards were outdated and inefficient, leaving both job seekers and employers frustrated.
              </p>
              <p className="text-base sm:text-lg">
                Using advanced AI and machine learning, we've created a platform that understands your skills, preferences, and career goals. 
                Our intelligent matching system connects you with opportunities that truly align with your aspirations.
              </p>
              <p className="text-base sm:text-lg">
                Today, GROEI serves thousands of professionals and companies worldwide, helping them find meaningful connections 
                that drive career growth and business success.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
              Our Journey
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-[#9ca3af] max-w-2xl mx-auto">
            Key milestones in our growth story
          </p>
        </motion.div>

        <div className="mx-auto">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#6366f1] to-[#8b5cf6] hidden md:block"></div>
            <div className="space-y-8 md:space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center gap-6 md:gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1">
                    <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:bg-[#151520] hover:border-[#6366f1]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#6366f1]/10">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-[#6366f1]/30">
                            <Rocket className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
                              {milestone.year}
                            </div>
                            <div className="text-lg font-semibold text-[#e8e8f0]">
                              {milestone.title}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm sm:text-base text-[#9ca3af]">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="md:w-1/3"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
              Our Values
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-[#9ca3af] max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:bg-[#151520] hover:border-[#6366f1]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#6366f1]/10 h-full text-center">
                <motion.div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${value.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#6366f1]/30`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#e8e8f0] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[#9ca3af] leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#6366f1]/30`}>
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-[#9ca3af]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto text-center"
        >
          <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
            <CardContent className="p-8 sm:p-12">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#6366f1]/30">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                  Join Us on Our Journey
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-[#9ca3af] leading-relaxed mb-8">
                Whether you're looking for your next opportunity or seeking top talent, 
                we're here to help you succeed. Join thousands of professionals and companies 
                who trust GROEI for their career and hiring needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-lg shadow-[#6366f1]/30"
                >
                  <Link href="/jobs">Find Jobs</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                >
                  <Link href="/companies">Explore Companies</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
