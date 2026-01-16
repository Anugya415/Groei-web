"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Briefcase,
  MapPin,
  Clock,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  Filter,
  Calendar,
  Users,
  TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";
import { jobsAPI } from "@/lib/api";
import Link from "next/link";

export function MyPostsContent() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedJob, setSelectedJob] = useState<any>(null);

  useEffect(() => {
    loadJobs();
  }, [statusFilter]);

  const loadJobs = async () => {
    try {
      setIsLoading(true);
      const response = await jobsAPI.getCompanyJobs();
      if (response.jobs) {
        setJobs(response.jobs);
      }
    } catch (error) {
      console.error("Failed to load jobs:", error);
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || job.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    All: jobs.length,
    active: jobs.filter(j => j.status === "active").length,
    closed: jobs.filter(j => j.status === "closed").length,
    draft: jobs.filter(j => j.status === "draft").length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30";
      case "closed":
        return "bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/30";
      case "draft":
        return "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30";
      default:
        return "bg-[#6366f1]/20 text-[#6366f1] border-[#6366f1]/30";
    }
  };

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return "Not specified";
    if (min && max) {
      return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L`;
    }
    if (min) {
      return `₹${(min / 100000).toFixed(1)}L+`;
    }
    return "Not specified";
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
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-[#6366f1]/30">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                    <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                      My Job Posts
                    </span>
                  </h1>
                  <p className="text-lg text-[#9ca3af]">
                    Manage all your posted jobs
                  </p>
                </div>
              </div>
              <Button
                asChild
                className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-lg shadow-[#6366f1]/30"
              >
                <Link href="/admin/jobs">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Post New Job
                </Link>
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#9ca3af] mb-1">Total Jobs</p>
                    <p className="text-2xl font-bold text-[#e8e8f0]">{jobs.length}</p>
                  </div>
                  <Briefcase className="h-8 w-8 text-[#6366f1]" />
                </div>
              </CardContent>
            </Card>
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#9ca3af] mb-1">Active</p>
                    <p className="text-2xl font-bold text-[#10b981]">{statusCounts.active}</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-[#10b981]" />
                </div>
              </CardContent>
            </Card>
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#9ca3af] mb-1">Closed</p>
                    <p className="text-2xl font-bold text-[#ef4444]">{statusCounts.closed}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-[#ef4444]" />
                </div>
              </CardContent>
            </Card>
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#9ca3af] mb-1">Drafts</p>
                    <p className="text-2xl font-bold text-[#f59e0b]">{statusCounts.draft}</p>
                  </div>
                  <Clock className="h-8 w-8 text-[#f59e0b]" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
              <Input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#151520] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {Object.entries(statusCounts).map(([status, count]) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  onClick={() => setStatusFilter(status)}
                  className={`whitespace-nowrap ${
                    statusFilter === status
                      ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0"
                      : "border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e]"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
                </Button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-[#9ca3af]">Loading jobs...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Briefcase className="h-12 w-12 text-[#6366f1] mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold text-[#e8e8f0] mb-2">No jobs found</p>
                <p className="text-sm text-[#9ca3af] mb-4">
                  {searchQuery || statusFilter !== "All" 
                    ? "Try adjusting your search or filters"
                    : "Get started by posting your first job"}
                </p>
                {!searchQuery && statusFilter === "All" && (
                  <Button asChild className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white">
                    <Link href="/admin/jobs">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Post Your First Job
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
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
                                <Briefcase className="h-5 w-5 text-[#6366f1]" />
                                <h3 className="text-xl font-bold text-[#e8e8f0]">{job.title}</h3>
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-[#9ca3af] mb-3">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{job.location || "Not specified"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  <span>{job.type || "Full-time"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[#6366f1] font-semibold">₹</span>
                                  <span>{formatSalary(job.salary_min, job.salary_max)}</span>
                                </div>
                                {job.experience_level && (
                                  <div className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" />
                                    <span>{job.experience_level}</span>
                                  </div>
                                )}
                              </div>
                              {job.description && (
                                <p className="text-sm text-[#9ca3af] line-clamp-2 mb-3">
                                  {job.description}
                                </p>
                              )}
                              {job.skills_required && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {(typeof job.skills_required === 'string' 
                                    ? job.skills_required.split(',').map(s => s.trim())
                                    : job.skills_required
                                  ).slice(0, 5).map((skill: string, idx: number) => (
                                    <Badge
                                      key={idx}
                                      className="bg-[#1e1e2e] text-[#9ca3af] border border-[#2a2a3a]"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                            <Badge className={getStatusBadge(job.status || "active")}>
                              {job.status || "active"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-[#6b7280] pt-3 border-t border-[#2a2a3a]">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              <span>Posted {job.created_at ? getTimeAgo(new Date(job.created_at)) : "recently"}</span>
                            </div>
                            {job.updated_at && job.updated_at !== job.created_at && (
                              <div className="flex items-center gap-2">
                                <Clock className="h-3 w-3" />
                                <span>Updated {getTimeAgo(new Date(job.updated_at))}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-row lg:flex-col gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e]"
                          >
                            <Link href={`/jobs/${job.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
