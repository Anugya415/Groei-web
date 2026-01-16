"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ApplicationForm } from "@/components/dashboard/application-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Bookmark,
  MapPin,
  Briefcase,
  Clock,
  Heart,
  Building2,
  TrendingUp,
  X,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import { jobsAPI } from "@/lib/api";

export function SavedJobsContent() {
  const router = useRouter();
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<{ id: number; jobTitle: string; company: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedJobs();
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
      
      const savedAppliedJobs = localStorage.getItem("appliedJobs");
      if (savedAppliedJobs) {
        setAppliedJobs(JSON.parse(savedAppliedJobs));
      }
    }
  }, []);

  const loadSavedJobs = async () => {
    try {
      setIsLoading(true);
      if (typeof window !== "undefined") {
        const savedJobsData = localStorage.getItem("savedJobs");
        if (savedJobsData) {
          const parsed = JSON.parse(savedJobsData);
          setSavedJobs(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load saved jobs:", error);
      setSavedJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredJobs = savedJobs.filter(
    (job) =>
      job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApply = (jobId: number) => {
    if (!isLoggedIn) {
      router.push("/login?redirect=/dashboard/saved");
      return;
    }

    const job = savedJobs.find(j => j.id === jobId);
    if (job) {
      setSelectedJob({ id: jobId, jobTitle: job.jobTitle, company: job.company });
      setShowApplicationForm(true);
    }
  };

  const handleApplicationSuccess = (applicationData: any) => {
    setAppliedJobs([...appliedJobs, applicationData.jobId]);
    setShowApplicationForm(false);
    setSelectedJob(null);
  };

  const handleRemove = (id: number) => {
    setSavedJobs(savedJobs.filter((job) => job.id !== id));
  };

  return (
    <div className="min-h-screen pt-16 lg:pt-8">
      <section className="relative py-8 sm:py-12 md:py-16 bg-[#0a0a0f] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                  <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                    Saved Jobs
                  </span>
                </h1>
                <p className="text-lg text-[#9ca3af]">
                  {savedJobs.length} job{savedJobs.length !== 1 ? "s" : ""} saved
                </p>
              </div>
            </div>

            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
              <Input
                type="text"
                placeholder="Search saved jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#151520] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
              />
            </div>
          </motion.div>

          <div className="grid gap-4">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:border-[#6366f1]/30 transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <Building2 className="h-5 w-5 text-[#6366f1]" />
                              <h3 className="text-xl font-bold text-[#e8e8f0]">{job.jobTitle}</h3>
                            </div>
                            <p className="text-lg text-[#a5b4fc] mb-2">{job.company}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-[#9ca3af]">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[#6366f1] font-semibold">₹</span>
                                <span>{job.salary}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                <span>{job.type}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>Posted {job.postedDate}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className="bg-[#6366f1]/20 text-[#6366f1] border-[#6366f1]/30">
                              <Bookmark className="h-3 w-3 mr-1" />
                              Saved {job.savedDate}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:min-w-[140px]">
                        {appliedJobs && appliedJobs.includes(job.id) ? (
                          <Button
                            disabled
                            className="bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 cursor-not-allowed"
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Applied
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleApply(job.id)}
                            className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0"
                          >
                            Apply Now
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          onClick={() => handleRemove(job.id)}
                          className="border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e] hover:text-[#ef4444] hover:border-[#ef4444]/30"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Bookmark className="h-16 w-16 text-[#6366f1] mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-[#e8e8f0] mb-2">No saved jobs</h3>
                <p className="text-[#9ca3af] mb-4">
                  {searchQuery ? "No jobs match your search" : "Start saving jobs to view them here"}
                </p>
                {!searchQuery && (
                  <Button
                    className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed]"
                  >
                    Browse Jobs
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {showApplicationForm && selectedJob && (
        <ApplicationForm
          jobId={selectedJob.id}
          jobTitle={selectedJob.jobTitle}
          company={selectedJob.company}
          onClose={() => {
            setShowApplicationForm(false);
            setSelectedJob(null);
          }}
          onSuccess={handleApplicationSuccess}
        />
      )}
    </div>
  );
}

