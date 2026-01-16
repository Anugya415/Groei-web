"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  TrendingUp,
  Target,
  Zap,
  Shield,
  BarChart3
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Target,
    title: "ATS Optimization",
    description: "Ensure your resume passes through Applicant Tracking Systems with optimized formatting and keywords.",
    gradient: "from-[#6366f1] to-[#8b5cf6]"
  },
  {
    icon: TrendingUp,
    title: "Match Score",
    description: "Get instant feedback on how well your resume matches specific job descriptions.",
    gradient: "from-[#8b5cf6] to-[#ec4899]"
  },
  {
    icon: Zap,
    title: "Quick Analysis",
    description: "Receive comprehensive resume analysis in seconds, not hours.",
    gradient: "from-[#ec4899] to-[#f59e0b]"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your resume is analyzed securely and never stored without your permission.",
    gradient: "from-[#10b981] to-[#6366f1]"
  }
];

const improvements = [
  { category: "Keywords", score: 85, suggestion: "Add more industry-specific keywords" },
  { category: "Formatting", score: 92, suggestion: "Excellent formatting structure" },
  { category: "Length", score: 78, suggestion: "Consider condensing to 2 pages" },
  { category: "Skills", score: 88, suggestion: "Well-balanced skill representation" }
];

export function ResumeScannerContent() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleFileUpload = () => {
    setFileUploaded(true);
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisComplete(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-[#0a0a0f] overflow-hidden">
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
                AI-Powered Resume Analysis
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                Optimize Your Resume
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-[#9ca3af] max-w-3xl mx-auto">
              Get instant feedback and improve your resume's chances of getting noticed
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-md shadow-xl shadow-[#6366f1]/10">
              <CardContent className="p-6 sm:p-8">
                {!fileUploaded ? (
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-[#2a2a3a] rounded-xl p-12 text-center hover:border-[#6366f1]/50 transition-colors cursor-pointer">
                      <Upload className="h-12 w-12 text-[#6366f1] mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-[#e8e8f0] mb-2">
                        Upload Your Resume
                      </h3>
                      <p className="text-sm text-[#9ca3af] mb-4">
                        PDF, DOC, or DOCX (Max 5MB)
                      </p>
                      <Button
                        onClick={handleFileUpload}
                        className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-lg shadow-[#6366f1]/30"
                      >
                        Choose File
                      </Button>
                    </div>
                  </div>
                ) : analyzing ? (
                  <div className="text-center py-12">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-4 border-[#6366f1] border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-[#e8e8f0] mb-2">
                      Analyzing Your Resume...
                    </h3>
                    <p className="text-sm text-[#9ca3af]">
                      Our AI is scanning your resume for optimization opportunities
                    </p>
                  </div>
                ) : analysisComplete ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#6366f1]/30">
                        <CheckCircle2 className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#e8e8f0] mb-2">
                        Analysis Complete
                      </h3>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-4xl font-bold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">86%</span>
                        <span className="text-lg text-[#9ca3af]">Overall Score</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {improvements.map((item, index) => (
                        <motion.div
                          key={item.category}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]"
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-[#e8e8f0]">
                                {item.category}
                              </span>
                              <span className="text-sm font-bold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
                                {item.score}%
                              </span>
                            </div>
                            <div className="w-full bg-[#2a2a3a] rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.score}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className="h-2 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full"
                              />
                            </div>
                            <p className="text-sm text-[#9ca3af] mt-2">
                              {item.suggestion}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        onClick={() => {
                          setFileUploaded(false);
                          setAnalysisComplete(false);
                        }}
                        variant="outline"
                        className="flex-1 border-2 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                      >
                        Scan Another Resume
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-lg shadow-[#6366f1]/30"
                      >
                        Download Report
                      </Button>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
              Why Use Our Resume Scanner?
            </span>
          </h2>
          <p className="text-lg text-[#9ca3af] max-w-2xl mx-auto">
            Get the insights you need to stand out from the competition
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:bg-[#151520] hover:border-[#6366f1]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#6366f1]/10 h-full">
                <motion.div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#6366f1]/30`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl text-[#e8e8f0] mb-2">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-[#9ca3af]">
                    {feature.description}
                  </CardDescription>
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
          className="mx-auto"
        >
          <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="h-8 w-8 text-[#6366f1]" />
                <CardTitle className="text-2xl sm:text-3xl text-[#e8e8f0]">
                  How It Works
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white font-bold shadow-lg shadow-[#6366f1]/30">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#e8e8f0] mb-1">
                      Upload Your Resume
                    </h4>
                    <p className="text-sm text-[#9ca3af]">
                      Simply upload your resume in PDF, DOC, or DOCX format. Our system supports all common file types.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center text-white font-bold shadow-lg shadow-[#6366f1]/30">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#e8e8f0] mb-1">
                      AI Analysis
                    </h4>
                    <p className="text-sm text-[#9ca3af]">
                      Our advanced AI scans your resume for formatting, keywords, structure, and ATS compatibility.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#ec4899] to-[#f59e0b] flex items-center justify-center text-white font-bold shadow-lg shadow-[#6366f1]/30">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#e8e8f0] mb-1">
                      Get Insights
                    </h4>
                    <p className="text-sm text-[#9ca3af]">
                      Receive detailed feedback with actionable recommendations to improve your resume's effectiveness.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
