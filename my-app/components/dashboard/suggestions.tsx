"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  Clock,
  Star,
  TrendingUp,
  Lightbulb,
  Sparkles,
  Bookmark,
  Eye,
  Building2,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { jobsAPI } from "@/lib/api";


const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Remote"];
const locations = ["All Locations", "Remote", "San Francisco", "New York", "Seattle"];

export function SuggestionsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobIds, setSavedJobIds] = useState<number[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSuggestions();
    if (typeof window !== "undefined") {
      const savedJobs = localStorage.getItem("savedJobs");
      if (savedJobs) {
        const parsed = JSON.parse(savedJobs);
        setSavedJobIds(parsed.map((job: any) => job.id));
      }
    }
  }, [selectedType, selectedLocation]);

  const loadSuggestions = async () => {
    try {
      setIsLoading(true);
      const response = await jobsAPI.getAll();
      if (response.jobs) {
        const formattedJobs = response.jobs.slice(0, 10).map((job: any) => ({
          id: job.id,
          jobTitle: job.title,
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
          featured: false,
          reason: "Recommended based on your profile",
        }));
        setJobs(formattedJobs);
      }
    } catch (error) {
      console.error("Failed to load suggestions:", error);
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

  const handleSave = (jobId: number, job: any) => {
    if (typeof window !== "undefined") {
      const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
      
      if (savedJobIds.includes(jobId)) {
        const updatedSavedJobs = savedJobIds.filter(id => id !== jobId);
        setSavedJobIds(updatedSavedJobs);
        const updatedSavedJobsList = savedJobs.filter((savedJob: any) => savedJob.id !== jobId);
        localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobsList));
      } else {
        const newSavedJob = {
          id: jobId,
          jobTitle: job.jobTitle,
          company: job.company,
          match: job.match,
          location: job.location,
          salary: job.salary,
          type: job.type,
          postedDate: job.posted,
          savedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };
        const updatedSavedJobs = [...savedJobs, newSavedJob];
        setSavedJobIds([...savedJobIds, jobId]);
        localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
      }
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || job.type === selectedType;
    const matchesLocation = selectedLocation === "All Locations" || job.location === selectedLocation;
    return matchesSearch && matchesType && matchesLocation;
  });

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
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-[#6366f1]/30">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                  <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                    Job Suggestions
                  </span>
                </h1>
                <p className="text-lg text-[#9ca3af]">
                  Personalized job recommendations based on your profile
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
              <Input
                type="text"
                placeholder="Search suggestions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#151520] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e]"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 rounded-lg bg-[#151520] border border-[#2a2a3a]"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Job Type</label>
                  <div className="flex flex-wrap gap-2">
                    {jobTypes.map((type) => (
                      <Button
                        key={type}
                        variant={selectedType === type ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedType(type)}
                        className={
                          selectedType === type
                            ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0"
                            : "border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e]"
                        }
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Location</label>
                  <div className="flex flex-wrap gap-2">
                    {locations.map((location) => (
                      <Button
                        key={location}
                        variant={selectedLocation === location ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedLocation(location)}
                        className={
                          selectedLocation === location
                            ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0"
                            : "border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e]"
                        }
                      >
                        {location}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid gap-4">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:bg-[#151520] hover:border-[#6366f1]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#6366f1]/10">
                  {job.featured && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/20 rounded-bl-full" />
                  )}
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {job.featured && (
                            <Badge className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0">
                              Featured
                            </Badge>
                          )}
                          <Badge className="bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Recommended
                          </Badge>
                        </div>
                        <CardTitle className="text-xl sm:text-2xl mb-2 text-[#e8e8f0] group-hover:text-[#a5b4fc] transition-colors">
                          {job.jobTitle}
                        </CardTitle>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-[#9ca3af] mb-3">
                          <div className="flex items-center gap-1.5">
                            <Building2 className="h-4 w-4" />
                            <span className="font-medium">{job.company}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="h-4 w-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#6366f1] font-semibold">₹</span>
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            <span>Posted {job.posted}</span>
                          </div>
                        </div>
                        <div className="mb-3 p-3 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-4 w-4 text-[#6366f1] mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-[#9ca3af]">
                              <span className="font-medium text-[#e8e8f0]">Why this matches:</span> {job.reason}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {job.skills.map((skill, skillIndex) => (
                            <Badge
                              key={skillIndex}
                              className="bg-[#1e1e2e] text-[#9ca3af] border border-[#2a2a3a]"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 sm:min-w-[140px]">
                        <Button
                          asChild
                          className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0"
                        >
                          <Link href={`/jobs/${job.id}`}>Apply Now</Link>
                        </Button>
                        <Button
                          onClick={() => handleSave(job.id, job)}
                          variant="outline"
                          className={`border-2 ${
                            savedJobIds.includes(job.id)
                              ? "border-[#6366f1] bg-[#6366f1]/10 text-[#6366f1]"
                              : "border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                          }`}
                        >
                          <Bookmark className={`h-4 w-4 mr-2 ${savedJobIds.includes(job.id) ? "fill-[#6366f1]" : ""}`} />
                          {savedJobIds.includes(job.id) ? "Saved" : "Save"}
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="border-2 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                        >
                          <Link href={`/jobs/${job.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Lightbulb className="h-16 w-16 text-[#6366f1] mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-[#e8e8f0] mb-2">No suggestions found</h3>
                <p className="text-[#9ca3af]">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}

