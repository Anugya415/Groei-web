"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ApplicationForm } from "@/components/dashboard/application-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Building2,
  Filter,
  Star,
  TrendingUp,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { jobsAPI } from "@/lib/api";

const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Freelance", "Internship"];
const locations = ["All Locations", "Remote", "New York", "San Francisco", "London", "Toronto", "Berlin"];
const experienceLevels = ["All Levels", "Entry", "Mid", "Senior", "Executive"];

export function FindJobsContent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<{ id: number; title: string; company: string } | null>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadJobs();
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);

      const savedAppliedJobs = localStorage.getItem("appliedJobs");
      if (savedAppliedJobs) {
        setAppliedJobs(JSON.parse(savedAppliedJobs));
      }
    }
  }, [selectedType, selectedLocation]);

  const loadJobs = async () => {
    try {
      setIsLoading(true);
      const params: any = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedType !== "All") params.type = selectedType;
      if (selectedLocation !== "All Locations") params.location = selectedLocation;

      const response = await jobsAPI.getAll(params);
      if (response.jobs) {
        const formattedJobs = response.jobs.map((job: any) => ({
          id: job.id,
          title: job.title,
          company: job.company_name || "",
          location: job.location || "",
          type: job.type || "Full-time",
          salary: job.salary_min && job.salary_max
            ? `₹${(job.salary_min / 100000).toFixed(1)}L - ₹${(job.salary_max / 100000).toFixed(1)}L`
            : job.salary_min
              ? `₹${(job.salary_min / 100000).toFixed(1)}L+`
              : "Not specified",
          posted: job.created_at ? getTimeAgo(new Date(job.created_at)) : "",
          match: 0,
          skills: job.skills_required ? (typeof job.skills_required === 'string' ? job.skills_required.split(',') : job.skills_required) : [],
          description: job.description || "",
          featured: false,
        }));
        setJobs(formattedJobs);
      }
    } catch (error) {
      console.error("Failed to load jobs:", error);
      setJobs([]);
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery !== undefined) {
        loadJobs();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleApply = (jobId: number) => {
    if (!isLoggedIn) {
      router.push("/login?redirect=/jobs");
      return;
    }

    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setSelectedJob({ id: jobId, title: job.title, company: job.company });
      setShowApplicationForm(true);
    }
  };

  const handleApplicationSuccess = (applicationData: any) => {
    setAppliedJobs([...appliedJobs, applicationData.jobId]);
    setShowApplicationForm(false);
    setSelectedJob(null);
  };

  const handleViewDetails = (jobId: number) => {
    if (!isLoggedIn) {
      router.push("/login?redirect=/jobs");
      return;
    }
    router.push(`/jobs/${jobId}`);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === "All" || job.type === selectedType;
    const matchesLocation = selectedLocation === "All Locations" ||
      job.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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
                left: `${10 + i * 20}%`,
                top: `${10 + i * 15}%`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
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
                AI-Powered Job Matching
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[#041f2b] to-[#4338ca] bg-clip-text text-transparent">
                Find Your Dream Job
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-[#041f2b]/60 max-w-3xl mx-auto">
              Discover opportunities matched to your skills and preferences
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border border-[#041f2b]/10 bg-white/50 backdrop-blur-md shadow-xl shadow-[#6366f1]/10">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#041f2b]/40" />
                    <Input
                      type="text"
                      placeholder="Search jobs, companies, or skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 text-base border-2 border-[#041f2b]/10 bg-[#041f2b]/05 text-[#041f2b] focus:border-[#6366f1] placeholder:text-[#041f2b]/40"
                    />
                  </div>
                  <Button
                    onClick={() => setShowFilters(!showFilters)}
                    variant="outline"
                    className="h-12 px-6 border-2 border-[#041f2b]/10 text-[#041f2b] hover:bg-[#041f2b]/05 hover:border-[#6366f1]/50"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button
                    size="lg"
                    className="h-12 px-8 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-lg shadow-[#6366f1]/30"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>

                {/* Filters */}
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-[#041f2b]/10 space-y-4"
                  >
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-[#041f2b]/60 mb-2 block">
                          Job Type
                        </label>
                        <select
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-full h-10 px-3 rounded-lg border-2 border-[#041f2b]/10 bg-[#041f2b]/05 text-[#041f2b] focus:border-[#6366f1]"
                        >
                          {jobTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                          Location
                        </label>
                        <select
                          value={selectedLocation}
                          onChange={(e) => setSelectedLocation(e.target.value)}
                          className="w-full h-10 px-3 rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-[#041F2B]"
                        >
                          {locations.map((location) => (
                            <option key={location} value={location}>
                              {location}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                          Experience Level
                        </label>
                        <select
                          value={selectedLevel}
                          onChange={(e) => setSelectedLevel(e.target.value)}
                          className="w-full h-10 px-3 rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-[#041F2B]"
                        >
                          {experienceLevels.map((level) => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-8 text-sm text-[#041f2b]/60"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#6366f1]" />
              <span className="font-semibold text-[#041f2b]">{jobs.length}+</span>
              <span>Jobs Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-[#6366f1]" />
              <span className="font-semibold text-[#041f2b]">98%</span>
              <span>Match Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#6366f1]" />
              <span className="font-semibold text-[#041f2b]">24/7</span>
              <span>Updated Listings</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Filters */}
      <section className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h3 className="text-lg font-semibold text-[#041f2b]">Quick Filters</h3>
            <div className="flex flex-wrap items-center gap-3">
              {["Remote", "Full-time", "High Salary", "Featured", "New This Week"].map((filter, index) => (
                <motion.div
                  key={filter}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-2 border-[#041f2b]/10 text-[#041f2b]/60 hover:border-[#6366f1] hover:bg-[#6366f1]/10 hover:text-[#6366f1] transition-all"
                  >
                    {filter}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Job Listings */}
      <section className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#041f2b] mb-2">
              {filteredJobs.length} Jobs Found
            </h2>
            <p className="text-sm text-[#041f2b]/60">
              Showing best matches based on your profile
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#041f2b]/60">
            <span>Sort by:</span>
            <select className="px-3 py-1.5 rounded-lg border-2 border-[#041f2b]/10 bg-[#041f2b]/05 text-[#041f2b] focus:border-[#6366f1]">
              <option>Best Match</option>
              <option>Newest</option>
              <option>Salary: High to Low</option>
              <option>Salary: Low to High</option>
            </select>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:gap-8">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="group relative overflow-hidden border border-[#041f2b]/10 bg-white/50 backdrop-blur-sm hover:bg-white hover:border-[#6366f1]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#6366f1]/10">
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                />

                {job.featured && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0 z-10 shadow-lg shadow-[#6366f1]/30">
                    Featured
                  </Badge>
                )}

                <CardHeader className="pb-4">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#6366f1]/30">
                          <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl sm:text-2xl mb-2 text-[#041f2b] group-hover:text-[#6366f1] transition-colors">
                            {job.title}
                          </CardTitle>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-[#041f2b]/60">
                            <div className="flex items-center gap-1.5">
                              <Building2 className="h-4 w-4 flex-shrink-0" />
                              <span className="font-medium">{job.company}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4 flex-shrink-0" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Briefcase className="h-4 w-4 flex-shrink-0" />
                              <span>{job.type}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[#6366f1] font-semibold">₹</span>
                              <span>{job.salary}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <CardDescription className="text-base leading-relaxed text-[#041f2b]/60">
                        {job.description}
                      </CardDescription>

                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        {job.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="bg-[#041f2b]/05 text-[#041f2b]/60 border border-[#041f2b]/10"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className={`flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-end gap-3 ${job.featured ? 'mt-8 lg:mt-0' : ''}`}>
                      <div className="flex items-center gap-2 text-xs text-[#041f2b]/60">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Posted {job.posted}</span>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto lg:w-full">
                        <Button
                          onClick={() => handleViewDetails(job.id)}
                          variant="outline"
                          className="flex-1 border-2 border-[#041f2b]/20 text-[#041f2b] hover:bg-[#041f2b]/05 hover:border-[#6366f1]/50"
                        >
                          View Details
                        </Button>
                        {appliedJobs && appliedJobs.includes(job.id) ? (
                          <Button
                            disabled
                            className="flex-1 bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 cursor-not-allowed"
                          >
                            Applied
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleApply(job.id)}
                            className="flex-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-lg shadow-[#6366f1]/30"
                          >
                            Apply Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-[#041f2b]/60 mb-4">
              No jobs found matching your criteria
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedType("All");
                setSelectedLocation("All Locations");
                setSelectedLevel("All Levels");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </section>

      {showApplicationForm && selectedJob && (
        <ApplicationForm
          jobId={selectedJob.id}
          jobTitle={selectedJob.title}
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

