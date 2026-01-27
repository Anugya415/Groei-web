"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Mail, Lock, User, ArrowRight, Github, CheckCircle2, Building2, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { authAPI } from "@/lib/api";
import { setAuthCookies } from "@/lib/cookies";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const benefits = [
  "AI-powered job matching",
  "Resume optimization tools",
  "Mock interview practice",
  "Career analytics dashboard",
];

const adminBenefits = [
  "Manage all users and applications",
  "Platform analytics and insights",
  "Company management tools",
  "Recruitment dashboard",
];

export function SignupContent() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Details
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    company: "",
    otp: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response: any = await authAPI.sendOtp(formData.email, formData.name);
      if (response.debug_otp) {
        setFormData(prev => ({ ...prev, otp: response.debug_otp }));
        // Show as error to catch attention, but it's a success state
        setError(`Dev Mode: Email failed. Your OTP is ${response.debug_otp}`);
      }
      setStep(2);
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await authAPI.verifyOtp(formData.email, formData.otp);
      setStep(3);
    } catch (err: any) {
      setError(err.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const signupData: any = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role === "admin" ? "admin" : "user",
      };

      if (formData.role === "admin" && formData.company) {
        signupData.company = formData.company;
      }

      const response = await authAPI.signup(signupData);

      if (!response || !response.user || !response.token) {
        throw new Error("Invalid response from server");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", response.user.role);
        if (response.token) {
          localStorage.setItem("authToken", response.token);
        }

        if (response.token) {
          setAuthCookies(response.token, response.user.role, true);
        }

        if (response.user.role === "admin") {
          localStorage.setItem("isAdminLoggedIn", "true");
          if (response.user.company_id) {
            localStorage.setItem("adminCompany", response.user.company_name || formData.company || "");
          }
          if (response.user.name) {
            localStorage.setItem("adminName", response.user.name);
          }
          if (response.user.email) {
            localStorage.setItem("adminEmail", response.user.email);
          }
        }
        setIsLoading(false);
        router.push("/profile/complete");
      }
    } catch (err: any) {
      setError(err.message || "Signup failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f] relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="fade-grid" />
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
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <div className="min-h-screen pt-20 sm:pt-24 lg:pt-28">
          <section className="relative pt-8 pb-12 sm:pt-10 sm:pb-16 md:pt-12 md:pb-20 overflow-hidden">

            <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-md mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-8 space-y-4"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151520]/50 backdrop-blur-sm border border-[#6366f1]/20 mb-4">
                    <Sparkles className="h-4 w-4 text-[#6366f1]" />
                    <span className="text-xs font-medium text-[#a5b4fc] uppercase tracking-wide">
                      Get Started
                    </span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                      {step === 1 ? "Verify Email" : step === 2 ? "Enter OTP" : "Create Account"}
                    </span>
                  </h1>
                  <p className="text-lg text-[#9ca3af]">
                    {step === 1 ? "We'll send you a One-Time Password." : step === 2 ? "Check your email for the code." : "Almost there! Finish setting up your account."}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-md shadow-xl shadow-[#6366f1]/10">
                    <CardHeader className="space-y-1 pb-6">
                      <CardTitle className="text-2xl font-bold text-[#e8e8f0]">Sign up for free</CardTitle>
                      <CardDescription className="text-[#9ca3af]">
                        Step {step} of 3
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {error && (
                        <div className="p-3 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] text-sm">
                          {error}
                        </div>
                      )}

                      {step === 1 && (
                        <form onSubmit={handleSendOtp} className="space-y-4">
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-[#e8e8f0]">
                              Email
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="pl-10 h-12 border-2 border-[#2a2a3a] bg-[#1e1e2e] text-[#e8e8f0] focus:border-[#6366f1] placeholder:text-[#9ca3af]"
                              />
                            </div>
                          </div>
                          <Button
                            type="submit"
                            disabled={isLoading || !formData.email}
                            className="w-full h-12 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-lg shadow-[#6366f1]/30 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isLoading ? "Sending OTP..." : "Send OTP"}
                            {!isLoading && <ArrowRight className="h-5 w-5 ml-2" />}
                          </Button>
                        </form>
                      )}

                      {step === 2 && (
                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                          <div className="space-y-2">
                            <label htmlFor="otp" className="text-sm font-medium text-[#e8e8f0]">
                              Enter Verification Code
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
                              <Input
                                id="otp"
                                name="otp"
                                type="text"
                                placeholder="123456"
                                value={formData.otp}
                                onChange={handleChange}
                                required
                                maxLength={6}
                                className="pl-10 h-12 border-2 border-[#2a2a3a] bg-[#1e1e2e] text-[#e8e8f0] focus:border-[#6366f1] placeholder:text-[#9ca3af] tracking-widest text-lg"
                              />
                            </div>
                          </div>
                          <Button
                            type="submit"
                            disabled={isLoading || !formData.otp}
                            className="w-full h-12 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-lg shadow-[#6366f1]/30 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isLoading ? "Verifying..." : "Verify OTP"}
                            {!isLoading && <ArrowRight className="h-5 w-5 ml-2" />}
                          </Button>
                          <div className="text-center">
                            <button type="button" onClick={() => setStep(1)} className="text-sm text-[#9ca3af] hover:text-[#6366f1]">
                              Change Email / Resend
                            </button>
                          </div>
                        </form>
                      )}

                      {step === 3 && (
                        <form onSubmit={handleSignup} className="space-y-4">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-[#e8e8f0]">
                              Full Name
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
                              <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="pl-10 h-12 border-2 border-[#2a2a3a] bg-[#1e1e2e] text-[#e8e8f0] focus:border-[#6366f1] placeholder:text-[#9ca3af]"
                              />
                            </div>
                          </div>
                          {/* Email is read-only here as it's verified */}
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-[#e8e8f0]">Email (Verified)</label>
                            <div className="p-3 rounded bg-[#1e1e2e] border border-[#2a2a3a] text-[#9ca3af]">
                              {formData.email}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-[#e8e8f0]">
                              Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
                              <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Create a strong password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="pl-10 h-12 border-2 border-[#2a2a3a] bg-[#1e1e2e] text-[#e8e8f0] focus:border-[#6366f1] placeholder:text-[#9ca3af]"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm font-medium text-[#e8e8f0]">
                              Confirm Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
                              <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="pl-10 h-12 border-2 border-[#2a2a3a] bg-[#1e1e2e] text-[#e8e8f0] focus:border-[#6366f1] placeholder:text-[#9ca3af]"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="role" className="text-sm font-medium text-[#e8e8f0]">
                              I am a
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: "user" })}
                                className={`p-4 rounded-lg border-2 transition-all ${formData.role === "user"
                                  ? "border-[#6366f1] bg-[#6366f1]/10"
                                  : "border-[#2a2a3a] bg-[#1e1e2e] hover:border-[#6366f1]/50"
                                  }`}
                              >
                                <div className="flex flex-col items-center gap-2">
                                  <User className={`h-5 w-5 ${formData.role === "user" ? "text-[#6366f1]" : "text-[#9ca3af]"}`} />
                                  <span className={`text-sm font-medium ${formData.role === "user" ? "text-[#e8e8f0]" : "text-[#9ca3af]"}`}>
                                    Job Seeker
                                  </span>
                                </div>
                              </button>
                              <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: "admin" })}
                                className={`p-4 rounded-lg border-2 transition-all ${formData.role === "admin"
                                  ? "border-[#6366f1] bg-[#6366f1]/10"
                                  : "border-[#2a2a3a] bg-[#1e1e2e] hover:border-[#6366f1]/50"
                                  }`}
                              >
                                <div className="flex flex-col items-center gap-2">
                                  <Briefcase className={`h-5 w-5 ${formData.role === "admin" ? "text-[#6366f1]" : "text-[#9ca3af]"}`} />
                                  <span className={`text-sm font-medium ${formData.role === "admin" ? "text-[#e8e8f0]" : "text-[#9ca3af]"}`}>
                                    Recruiter
                                  </span>
                                </div>
                              </button>
                            </div>
                          </div>
                          {formData.role === "admin" && (
                            <div className="space-y-2">
                              <label htmlFor="company" className="text-sm font-medium text-[#e8e8f0]">
                                Company Name
                              </label>
                              <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
                                <Input
                                  id="company"
                                  name="company"
                                  type="text"
                                  placeholder="Your company name"
                                  value={formData.company}
                                  onChange={handleChange}
                                  required={formData.role === "admin"}
                                  className="pl-10 h-12 border-2 border-[#2a2a3a] bg-[#1e1e2e] text-[#e8e8f0] focus:border-[#6366f1] placeholder:text-[#9ca3af]"
                                />
                              </div>
                            </div>
                          )}
                          <Button
                            type="submit"
                            disabled={isLoading || !formData.name || !formData.password || !formData.confirmPassword || (formData.role === "admin" && !formData.company)}
                            className="w-full h-12 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-lg shadow-[#6366f1]/30 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isLoading ? "Creating Account..." : "Create Account"}
                            {!isLoading && <ArrowRight className="h-5 w-5 ml-2" />}
                          </Button>
                        </form>
                      )}

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-[#2a2a3a]"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-[#151520] text-[#9ca3af]">Or sign up with</span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full h-12 border-2 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                      >
                        <Github className="h-5 w-5 mr-2" />
                        Sign up with GitHub
                      </Button>

                      <div className="space-y-3 pt-4 border-t border-[#2a2a3a]">
                        <p className="text-sm font-semibold text-[#e8e8f0]">What you'll get:</p>
                        <div className="space-y-2">
                          {(formData.role === "admin" ? adminBenefits : benefits).map((benefit, index) => (
                            <motion.div
                              key={benefit}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + index * 0.1 }}
                              className="flex items-center gap-2 text-sm text-[#9ca3af]"
                            >
                              <CheckCircle2 className="h-4 w-4 text-[#6366f1] flex-shrink-0" />
                              <span>{benefit}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="text-center text-sm text-[#9ca3af]">
                        Already have an account?{" "}
                        <Link
                          href="/login"
                          className="text-[#6366f1] hover:text-[#a5b4fc] font-semibold transition-colors"
                        >
                          Sign in
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
}



