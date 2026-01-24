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
  const [file, setFile] = useState<File | null>(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setFile(selectedFile);
      setFileUploaded(true);
      setAnalysisComplete(false);
      setAnalysisData(null);
      setError("");
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisComplete(false);
    setError("");

    const steps = [
      { progress: 15, message: "Extracting text from resume..." },
      { progress: 30, message: "Analyzing formatting and structure..." },
      { progress: 45, message: "Checking ATS compatibility..." },
      { progress: 60, message: "Evaluating keywords and skills..." },
      { progress: 75, message: "Calculating scores..." },
      { progress: 90, message: "Generating recommendations..." },
      { progress: 100, message: "Analysis complete!" },
    ];

    let currentStepIndex = 0;
    const progressInterval = setInterval(() => {
      if (currentStepIndex < steps.length - 1) {
        setAnalysisProgress(steps[currentStepIndex].progress);
        setCurrentStep(steps[currentStepIndex].message);
        currentStepIndex++;
      }
    }, 600);

    try {
      const { resumeAPI } = await import("@/lib/api");
      const response = await resumeAPI.analyzeResume(file);

      clearInterval(progressInterval);
      setAnalysisProgress(100);
      setCurrentStep(steps[steps.length - 1].message);

      setTimeout(() => {
        setAnalysisData(response.analysis);
        setAnalyzing(false);
        setAnalysisComplete(true);
      }, 500);
    } catch (err: any) {
      clearInterval(progressInterval);
      setError(err.message || "Failed to analyze resume");
      setAnalyzing(false);
      setAnalysisComplete(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent overflow-hidden">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#041f2b]/05 backdrop-blur-sm border border-[#041f2b]/10 mb-4">
              <Sparkles className="h-4 w-4 text-[#6366f1]" />
              <span className="text-xs font-medium text-[#041f2b] uppercase tracking-wide">
                AI-Powered Resume Analysis
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[#041f2b] to-[#4338ca] bg-clip-text text-transparent">
                Optimize Your Resume
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-[#041f2b]/60 max-w-3xl mx-auto">
              Get instant feedback and improve your resume's chances of getting noticed
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <Card className="border border-[#041f2b]/10 bg-white/50 backdrop-blur-md shadow-xl shadow-[#6366f1]/10">
              <CardContent className="p-6 sm:p-8">
                {!fileUploaded ? (
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-[#041f2b]/20 rounded-xl p-12 text-center hover:border-[#6366f1]/50 transition-colors">
                      <Upload className="h-12 w-12 text-[#6366f1] mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-[#041f2b] mb-2">
                        Upload Your Resume
                      </h3>
                      <p className="text-sm text-[#041f2b]/60 mb-4">
                        PDF, DOC, or DOCX (Max 5MB)
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="resume-scanner-upload"
                      />
                      <label htmlFor="resume-scanner-upload">
                        <Button
                          asChild
                          className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-lg shadow-[#6366f1]/30 cursor-pointer"
                        >
                          <span>Choose File</span>
                        </Button>
                      </label>
                    </div>
                  </div>
                ) : !analyzing && !analysisComplete ? (
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-[#6366f1]/50 rounded-xl p-8 text-center bg-[#041f2b]/05">
                      <FileText className="h-12 w-12 text-[#6366f1] mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-[#041f2b] mb-2">
                        {file?.name}
                      </h3>
                      <p className="text-sm text-[#041f2b]/60 mb-6">
                        {(file ? file.size / 1024 : 0).toFixed(2)} KB
                      </p>
                      {error && (
                        <div className="mb-4 p-3 bg-[#ef4444]/20 border border-[#ef4444]/30 rounded-lg">
                          <p className="text-sm text-[#ef4444]">{error}</p>
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          onClick={() => {
                            setFile(null);
                            setFileUploaded(false);
                            setError("");
                          }}
                          variant="outline"
                          className="border-[#041f2b]/20 text-[#041f2b] hover:bg-[#041f2b]/05 hover:border-[#6366f1]/50"
                        >
                          Remove File
                        </Button>
                        <Button
                          onClick={handleAnalyze}
                          disabled={analyzing}
                          className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-lg shadow-[#6366f1]/30"
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Analyze Resume
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : analyzing ? (
                  <div className="text-center py-12 space-y-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-20 h-20 border-4 border-[#6366f1] border-t-transparent rounded-full mx-auto mb-6"
                    />
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold text-[#041f2b] mb-2">
                        Analyzing Your Resume...
                      </h3>
                      <p className="text-base text-[#041f2b]/70 mb-4">
                        {currentStep || "Processing your resume..."}
                      </p>
                      <div className="w-full max-w-md mx-auto">
                        <div className="w-full bg-[#041f2b]/10 rounded-full h-3 mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${analysisProgress}%` }}
                            transition={{ duration: 0.3 }}
                            className="h-3 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full"
                          />
                        </div>
                        <p className="text-sm text-[#041f2b]/60">
                          {analysisProgress}% Complete
                        </p>
                      </div>
                    </div>
                  </div>
                ) : analysisComplete && analysisData ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#6366f1]/30">
                        <CheckCircle2 className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#041f2b] mb-2">
                        Analysis Complete
                      </h3>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-4xl font-bold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
                          {analysisData.overallScore}%
                        </span>
                        <span className="text-lg text-[#041f2b]/60">Overall Score</span>
                      </div>
                    </div>

                    {analysisData.strengths && analysisData.strengths.length > 0 && (
                      <div className="p-4 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30">
                        <h4 className="font-semibold text-[#10b981] mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Strengths
                        </h4>
                        <ul className="space-y-1">
                          {analysisData.strengths.map((strength: string, idx: number) => (
                            <li key={idx} className="text-sm text-[#9ca3af] flex items-start gap-2">
                              <span className="text-[#10b981] mt-1">•</span>
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="space-y-4">
                      {analysisData.categories && Object.entries(analysisData.categories).map(([category, data]: [string, any], index) => (
                        <motion.div
                          key={category}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 rounded-lg bg-[#041f2b]/05 border border-[#041f2b]/10"
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-[#041f2b] capitalize">
                                {category}
                              </span>
                              <span className="text-sm font-bold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
                                {data.score}%
                              </span>
                            </div>
                            <div className="w-full bg-[#041f2b]/10 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${data.score}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className="h-2 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full"
                              />
                            </div>
                            {data.suggestions && data.suggestions.length > 0 && (
                              <p className="text-sm text-[#041f2b]/60 mt-2">
                                {data.suggestions[0]}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {analysisData.suggestions && analysisData.suggestions.length > 0 && (
                      <div className="p-4 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/30">
                        <h4 className="font-semibold text-[#f59e0b] mb-2 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Recommendations
                        </h4>
                        <ul className="space-y-2">
                          {analysisData.suggestions.slice(0, 5).map((suggestion: string, idx: number) => (
                            <li key={idx} className="text-sm text-[#041f2b]/60 flex items-start gap-2">
                              <span className="text-[#f59e0b] mt-1">•</span>
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        onClick={() => {
                          setFile(null);
                          setFileUploaded(false);
                          setAnalysisComplete(false);
                          setAnalysisProgress(0);
                          setCurrentStep("");
                          setAnalysisData(null);
                          setError("");
                        }}
                        variant="outline"
                        className="flex-1 border-2 border-[#041f2b]/20 text-[#041f2b] hover:bg-[#041f2b]/05 hover:border-[#6366f1]/50"
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
                ) : analysisComplete && !analysisData ? (
                  <div className="text-center py-12">
                    <AlertCircle className="h-12 w-12 text-[#ef4444] mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-[#041f2b] mb-2">
                      Analysis Failed
                    </h3>
                    <p className="text-sm text-[#041f2b]/60 mb-4">
                      {error || "Unable to analyze resume. Please try again."}
                    </p>
                    <Button
                      onClick={() => {
                        setFile(null);
                        setFileUploaded(false);
                        setAnalysisComplete(false);
                        setAnalysisProgress(0);
                        setCurrentStep("");
                        setAnalysisData(null);
                        setError("");
                      }}
                      variant="outline"
                      className="border-[#041f2b]/20 text-[#041f2b] hover:bg-[#041f2b]/05 hover:border-[#6366f1]/50"
                    >
                      Try Again
                    </Button>
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
            <span className="bg-gradient-to-r from-[#041f2b] to-[#4338ca] bg-clip-text text-transparent">
              Why Use Our Resume Scanner?
            </span>
          </h2>
          <p className="text-lg text-[#041f2b]/60 max-w-2xl mx-auto">
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
              <Card className="group relative overflow-hidden border border-[#041f2b]/10 bg-white/50 backdrop-blur-sm hover:bg-white hover:border-[#6366f1]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#6366f1]/10 h-full">
                <motion.div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#6366f1]/30`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl text-[#041f2b] mb-2">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-[#041f2b]/60">
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
          <Card className="border border-[#041f2b]/10 bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="h-8 w-8 text-[#6366f1]" />
                <CardTitle className="text-2xl sm:text-3xl text-[#041f2b]">
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
                    <h4 className="font-semibold text-[#041f2b] mb-1">
                      Upload Your Resume
                    </h4>
                    <p className="text-sm text-[#041f2b]/60">
                      Simply upload your resume in PDF, DOC, or DOCX format. Our system supports all common file types.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center text-white font-bold shadow-lg shadow-[#6366f1]/30">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#041f2b] mb-1">
                      AI Analysis
                    </h4>
                    <p className="text-sm text-[#041f2b]/60">
                      Our advanced AI scans your resume for formatting, keywords, structure, and ATS compatibility.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#ec4899] to-[#f59e0b] flex items-center justify-center text-white font-bold shadow-lg shadow-[#6366f1]/30">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#041f2b] mb-1">
                      Get Insights
                    </h4>
                    <p className="text-sm text-[#041f2b]/60">
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
