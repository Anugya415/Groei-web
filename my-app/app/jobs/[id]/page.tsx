"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MapPin,
  Briefcase,
  Clock,
  Star,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Users,
  Globe,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { jobsAPI } from "@/lib/api";
import { Combobox } from "@/components/ui/combobox";

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = Number(params.id);
  const [job, setJob] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userRole = localStorage.getItem("userRole");
      const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
      
      if (userRole === "admin" || isAdminLoggedIn) {
        router.push("/admin/applications");
        return;
      }
      
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
      
      const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
      setIsApplied(appliedJobs.includes(jobId));
    }
    loadJob();
  }, [jobId, router]);

  const loadJob = async () => {
    try {
      setIsLoading(true);
      const response = await jobsAPI.getById(jobId);
      if (response.job) {
        const formattedJob = {
          id: response.job.id,
          title: response.job.title,
          company: response.job.company_name || "",
          location: response.job.location || "",
          type: response.job.type || "Full-time",
          salary: response.job.salary_min && response.job.salary_max 
            ? `₹${(response.job.salary_min / 100000).toFixed(1)}L - ₹${(response.job.salary_max / 100000).toFixed(1)}L`
            : response.job.salary_min 
            ? `₹${(response.job.salary_min / 100000).toFixed(1)}L+`
            : "Not specified",
          posted: response.job.created_at ? getTimeAgo(new Date(response.job.created_at)) : "",
          match: 0,
          skills: response.job.skills_required ? (typeof response.job.skills_required === 'string' ? response.job.skills_required.split(',') : response.job.skills_required) : [],
          description: response.job.description || "",
          fullDescription: response.job.description || "",
          requirements: [],
          benefits: [],
          companyInfo: "",
        };
        setJob(formattedJob);
      }
    } catch (error) {
      console.error("Failed to load job:", error);
      setJob(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  };

  const handleApply = () => {
    if (!isLoggedIn) {
      router.push("/login?redirect=/jobs/" + jobId);
      return;
    }

    if (!isApplied) {
      const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
      appliedJobs.push(jobId);
      localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
      setIsApplied(true);

      const appliedJob = {
        id: Date.now(),
        jobTitle: job.title,
        company: job.company,
        status: "Application Sent",
        match: job.match,
        date: new Date().toISOString().split('T')[0],
        location: job.location,
        salary: job.salary,
        type: job.type,
        appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
      
      const existingApplications = JSON.parse(localStorage.getItem("userApplications") || "[]");
      existingApplications.push(appliedJob);
      localStorage.setItem("userApplications", JSON.stringify(existingApplications));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#e8e8f0] mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#e8e8f0] mb-4">Job Not Found</h1>
          <Button asChild>
            <Link href="/jobs">Back to Jobs</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 lg:pt-8 bg-[#0a0a0f]">
      <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-[#9ca3af] hover:text-[#e8e8f0] mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-3xl font-bold text-[#e8e8f0] mb-4">
                      {job.title}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#9ca3af] mb-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#6366f1] font-semibold">₹</span>
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Posted {job.posted}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-[#6366f1] fill-[#6366f1]" />
                      <span className="text-lg font-semibold text-[#6366f1]">{job.match}% Match</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#e8e8f0] mb-3">Job Description</h3>
                  <p className="text-[#9ca3af] leading-relaxed">{job.fullDescription}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#e8e8f0] mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {job.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-[#9ca3af]">
                        <CheckCircle2 className="h-5 w-5 text-[#6366f1] mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#e8e8f0] mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-[#9ca3af]">
                        <CheckCircle2 className="h-5 w-5 text-[#10b981] mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#e8e8f0] mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill: string, index: number) => (
                      <Badge
                        key={index}
                        className="bg-[#1e1e2e] text-[#9ca3af] border border-[#2a2a3a]"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm sticky top-24">
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#9ca3af] mb-2 block">
                    Quick Actions
                  </label>
                  <Combobox
                    options={[
                      { value: "apply", label: "Apply Now" },
                      { value: "save", label: "Save Job" },
                      { value: "share", label: "Share Job" },
                      { value: "report", label: "Report Job" },
                    ]}
                    placeholder="Select an action..."
                    className="w-full"
                    onValueChange={(value) => {
                      if (value === "apply") {
                        handleApply();
                      } else if (value === "save") {
                        const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
                        if (!savedJobs.includes(jobId)) {
                          savedJobs.push(jobId);
                          localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
                        }
                      }
                    }}
                  />
                </div>
                {isApplied ? (
                  <Button
                    disabled
                    className="w-full bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 cursor-not-allowed"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Applied
                  </Button>
                ) : (
                  <Button
                    onClick={handleApply}
                    className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0"
                  >
                    Apply Now
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full border-2 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e]"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Save Job
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#e8e8f0]">About Company</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#9ca3af] text-sm leading-relaxed">{job.companyInfo}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

