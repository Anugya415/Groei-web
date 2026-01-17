"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  MapPin,
  Clock,
  GraduationCap,
  FileText,
  CheckCircle2,
  XCircle,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { jobsAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

export function PostJobContent() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary_min: "",
    salary_max: "",
    type: "Full-time",
    experience_level: "",
    skills_required: "",
  });

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote", "Project"];
  const experienceLevels = ["Entry", "Mid", "Senior", "Executive"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsSubmitting(true);

    try {
      if (!formData.title.trim() || !formData.description.trim() || !formData.location.trim()) {
        setError("Please fill in all required fields (Title, Description, Location)");
        setIsSubmitting(false);
        return;
      }

      const salaryMin = formData.salary_min.trim() ? parseFloat(formData.salary_min) : null;
      const salaryMax = formData.salary_max.trim() ? parseFloat(formData.salary_max) : null;

      if (salaryMin !== null && (isNaN(salaryMin) || salaryMin < 0)) {
        setError("Please enter a valid minimum salary");
        setIsSubmitting(false);
        return;
      }

      if (salaryMax !== null && (isNaN(salaryMax) || salaryMax < 0)) {
        setError("Please enter a valid maximum salary");
        setIsSubmitting(false);
        return;
      }

      if (salaryMin !== null && salaryMax !== null && salaryMin > salaryMax) {
        setError("Minimum salary cannot be greater than maximum salary");
        setIsSubmitting(false);
        return;
      }

      const jobData: any = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        type: formData.type,
      };

      if (salaryMin !== null) {
        jobData.salary_min = salaryMin * 100000;
      }

      if (salaryMax !== null) {
        jobData.salary_max = salaryMax * 100000;
      }

      if (formData.experience_level.trim()) {
        jobData.experience_level = formData.experience_level;
      }

      if (formData.skills_required.trim()) {
        jobData.skills_required = formData.skills_required.trim();
      }

      const response = await jobsAPI.create(jobData);

      if (response.job) {
        setSuccess(true);
        setFormData({
          title: "",
          description: "",
          location: "",
          salary_min: "",
          salary_max: "",
          type: "Full-time",
          experience_level: "",
          skills_required: "",
        });

        setTimeout(() => {
          router.push("/admin");
        }, 2000);
      }
    } catch (error: any) {
      let errorMessage = "Failed to post job. Please try again.";

      if (error.isApiError) {
        if (error.data && error.data.errors && Array.isArray(error.data.errors)) {
          errorMessage = error.data.errors.map((e: any) => e.msg || e.message || e.param).join(", ");
        } else if (error.data && error.data.error) {
          errorMessage = error.data.error;
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 lg:pt-8">
      <section className="relative py-8 sm:py-12 md:py-16 bg-[#0a0a0f] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />
        </div>

        <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-[#6366f1]/30">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                  <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                    Post a Job
                  </span>
                </h1>
                <p className="text-lg text-[#9ca3af]">
                  Create a new job posting for your company
                </p>
              </div>
            </div>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-[#ef4444]/20 border border-[#ef4444]/30 flex items-center gap-3"
            >
              <XCircle className="h-5 w-5 text-[#ef4444]" />
              <p className="text-sm text-[#ef4444]">{error}</p>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-[#10b981]/20 border border-[#10b981]/30 flex items-center gap-3"
            >
              <CheckCircle2 className="h-5 w-5 text-[#10b981]" />
              <p className="text-sm text-[#10b981]">Job posted successfully! Redirecting to dashboard...</p>
            </motion.div>
          )}

          <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#e8e8f0]">Job Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#9ca3af] mb-2">
                      Job Title <span className="text-[#ef4444]">*</span>
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6366f1]" />
                      <Input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Senior Full Stack Developer"
                        className="pl-10 bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#9ca3af] mb-2">
                      Location <span className="text-[#ef4444]">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6366f1]" />
                      <Input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g., San Francisco, CA or Remote"
                        className="pl-10 bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#9ca3af] mb-2">
                      Job Type <span className="text-[#ef4444]">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6366f1]" />
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 bg-[#1e1e2e] border border-[#2a2a3a] rounded-md text-[#e8e8f0] focus:outline-none focus:border-[#6366f1]"
                        required
                      >
                        {jobTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#9ca3af] mb-2">
                      Experience Level
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6366f1]" />
                      <select
                        name="experience_level"
                        value={formData.experience_level}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 bg-[#1e1e2e] border border-[#2a2a3a] rounded-md text-[#e8e8f0] focus:outline-none focus:border-[#6366f1]"
                      >
                        <option value="">Select experience level</option>
                        {experienceLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#9ca3af] mb-2">
                      Minimum Salary (Lakhs)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6366f1] font-semibold">₹</span>
                      <Input
                        type="number"
                        name="salary_min"
                        value={formData.salary_min}
                        onChange={handleChange}
                        placeholder="e.g., 10"
                        step="0.1"
                        min="0"
                        className="pl-8 pr-3 bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#9ca3af] mb-2">
                      Maximum Salary (Lakhs)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6366f1] font-semibold">₹</span>
                      <Input
                        type="number"
                        name="salary_max"
                        value={formData.salary_max}
                        onChange={handleChange}
                        placeholder="e.g., 15"
                        step="0.1"
                        min="0"
                        className="pl-8 pr-3 bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#9ca3af] mb-2">
                      Required Skills (comma-separated)
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-5 w-5 text-[#6366f1]" />
                      <Input
                        type="text"
                        name="skills_required"
                        value={formData.skills_required}
                        onChange={handleChange}
                        placeholder="e.g., React, Node.js, TypeScript, AWS"
                        className="pl-10 bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#9ca3af] mb-2">
                      Job Description <span className="text-[#ef4444]">*</span>
                    </label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe the role, responsibilities, requirements, and benefits..."
                      rows={8}
                      className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1] resize-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-6 border-t border-[#2a2a3a]">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e]"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || success}
                    className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-lg shadow-[#6366f1]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                        Posting...
                      </>
                    ) : success ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Posted!
                      </>
                    ) : (
                      <>
                        <Briefcase className="h-4 w-4 mr-2" />
                        Post Job
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
