"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  X,
  ChevronRight,
  ChevronLeft,
  FileText,
  Calendar,
  Linkedin,
  Info,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ApplicationFormProps {
  jobId: number;
  jobTitle: string;
  company: string;
  onClose: () => void;
  onSuccess: (applicationData: any) => void;
}

export function ApplicationForm({ jobId, jobTitle, company, onClose, onSuccess }: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    coverLetter: "",
    availability: "",
    expectedSalary: "",
    noticePeriod: "",
    linkedinProfile: "",
    additionalInfo: "",
  });

  const steps = [
    { number: 1, title: "Cover Letter", icon: FileText },
    { number: 2, title: "Availability & Salary", icon: Calendar },
    { number: 3, title: "Profile & Additional Info", icon: Linkedin },
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const applicationData = {
      id: Date.now(),
      jobId: jobId,
      jobTitle: jobTitle,
      company: company,
      status: "Application Sent",
      coverLetter: formData.coverLetter,
      availability: formData.availability,
      expectedSalary: formData.expectedSalary,
      noticePeriod: formData.noticePeriod,
      linkedinProfile: formData.linkedinProfile,
      additionalInfo: formData.additionalInfo,
      appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      date: new Date().toISOString().split('T')[0],
    };

    if (typeof window !== "undefined") {
      const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
      if (!appliedJobs.includes(jobId)) {
        appliedJobs.push(jobId);
        localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
      }

      const existingApplications = JSON.parse(localStorage.getItem("userApplications") || "[]");
      existingApplications.push(applicationData);
      localStorage.setItem("userApplications", JSON.stringify(existingApplications));
    }

    onSuccess(applicationData);
    onClose();
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.coverLetter.trim().length > 0;
      case 2:
        return formData.availability.trim().length > 0 && 
               formData.expectedSalary.trim().length > 0 && 
               formData.noticePeriod.trim().length > 0;
      case 3:
        return formData.linkedinProfile.trim().length > 0;
      default:
        return false;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0f]/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#151520] border border-[#2a2a3a] rounded-2xl shadow-2xl"
      >
        <Card className="border-0 bg-transparent">
          <CardHeader className="sticky top-0 bg-[#151520] border-b border-[#2a2a3a] z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle className="text-2xl font-bold text-[#e8e8f0]">{jobTitle}</CardTitle>
                <p className="text-sm text-[#9ca3af] mt-1">{company}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-[#9ca3af] hover:text-[#e8e8f0] hover:bg-[#1e1e2e]"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
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
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
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
                        currentStep > step.number ? "bg-[#10b981]" : "bg-[#2a2a3a]"
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <AnimatePresence mode="wait">
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
                      Cover Letter *
                    </label>
                    <Textarea
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      placeholder="Write your cover letter here..."
                      className="min-h-[200px] bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
                    />
                    <p className="text-xs text-[#9ca3af] mt-1">
                      Explain why you're a great fit for this position
                    </p>
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
                      Availability *
                    </label>
                    <Input
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      placeholder="e.g., Immediately, 2 weeks, 1 month"
                      className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#9ca3af] mb-2 block">
                      Expected Salary (₹) *
                    </label>
                    <Input
                      type="text"
                      value={formData.expectedSalary}
                      onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                      placeholder="e.g., ₹12L - ₹15L"
                      className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#9ca3af] mb-2 block">
                      Notice Period *
                    </label>
                    <Input
                      value={formData.noticePeriod}
                      onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                      placeholder="e.g., 30 days, 2 weeks, Immediate"
                      className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
                    />
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
                      LinkedIn Profile URL *
                    </label>
                    <Input
                      type="url"
                      value={formData.linkedinProfile}
                      onChange={(e) => setFormData({ ...formData, linkedinProfile: e.target.value })}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#9ca3af] mb-2 block">
                      Additional Information
                    </label>
                    <Textarea
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                      placeholder="Any additional information you'd like to share..."
                      className="min-h-[150px] bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
                    />
                    <p className="text-xs text-[#9ca3af] mt-1">
                      Optional: Portfolio links, certifications, or other relevant details
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#2a2a3a]">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                  className="bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:from-[#059669] hover:to-[#047857] border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Application
                  <CheckCircle2 className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

