"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, FileText, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { authAPI } from "@/lib/api";

export default function CompleteProfilePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    phone: "",
    location: "",
    title: "",
    experience: "",
    education: "",
    bio: "",
    skills: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!isLoggedIn) {
        router.push("/login");
      }
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      const updateData: any = {
        phone: formData.phone || null,
        location: formData.location || null,
        title: formData.title || null,
      };

      if (formData.experience) {
        updateData.experience = formData.experience;
      }
      if (formData.education) {
        updateData.education = formData.education;
      }
      if (formData.bio) {
        updateData.bio = formData.bio;
      }
      if (formData.skills) {
        updateData.skills = formData.skills;
      }

      await authAPI.updateProfile(updateData);

      const userRole = localStorage.getItem("userRole");
      if (userRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Failed to update profile. Please try again.");
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Basic Info", icon: User },
    { number: 2, title: "Professional", icon: Briefcase },
    { number: 3, title: "Additional", icon: FileText },
  ];

  return (
    <div className="min-h-screen pt-16 lg:pt-8 bg-[#0a0a0f]">
      <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
              <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                Complete Your Profile
              </span>
            </h1>
            <p className="text-lg text-[#9ca3af]">
              Help us personalize your experience
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex items-center flex-1">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      isCompleted
                        ? "bg-[#10b981] border-[#10b981] text-white"
                        : isActive
                        ? "bg-[#6366f1] border-[#6366f1] text-white"
                        : "bg-[#1e1e2e] border-[#2a2a3a] text-[#9ca3af]"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <p className={`text-sm font-medium ${
                        isActive ? "text-[#e8e8f0]" : "text-[#9ca3af]"
                      }`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      isCompleted ? "bg-[#10b981]" : "bg-[#2a2a3a]"
                    }`} />
                  )}
                </div>
              );
            })}
          </div>

          <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8">
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-[#ef4444]/20 border border-[#ef4444]/30 text-[#ef4444] text-sm">
                  {error}
                </div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-sm font-medium text-[#9ca3af] mb-2 block">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6366f1]" />
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g., +91 9876543210"
                        className="pl-10 bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#9ca3af] mb-2 block">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6366f1]" />
                      <Input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g., Mumbai, India"
                        className="pl-10 bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-sm font-medium text-[#9ca3af] mb-2 block">
                      Job Title / Position
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6366f1]" />
                      <Input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Senior Software Engineer"
                        className="pl-10 bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#9ca3af] mb-2 block">
                      Experience
                    </label>
                    <Input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="e.g., 5+ years"
                      className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#9ca3af] mb-2 block">
                      Education
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-[#6366f1]" />
                      <Input
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        placeholder="e.g., B.Tech Computer Science, IIT"
                        className="pl-10 bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-sm font-medium text-[#9ca3af] mb-2 block">
                      Bio
                    </label>
                    <Textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#9ca3af] mb-2 block">
                      Skills (comma-separated)
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-5 w-5 text-[#6366f1]" />
                      <Input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="e.g., React, Node.js, TypeScript"
                        className="pl-10 bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between gap-4 mt-6">
                <Button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  variant="outline"
                  className="border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e] disabled:opacity-50"
                >
                  Back
                </Button>
                {currentStep < 3 ? (
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0"
                  >
                    {isLoading ? "Saving..." : "Complete Profile"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
