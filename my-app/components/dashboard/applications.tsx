"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Briefcase,
  Calendar,
  MapPin,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  FileText,
  Building2,
  X,
  User,
  Mail,
  Phone,
  MessageSquare,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { applicationsAPI } from "@/lib/api";

const applicationDetails: { [key: number]: any } = {
  1: {
    applicationId: "APP-2024-001",
    resumeVersion: "Resume_v2.pdf",
    coverLetter: "I am excited to apply for the Senior Full Stack Developer position at TechCorp. With 5+ years of experience in React, Node.js, and cloud technologies, I believe I would be a great fit for your team.",
    notes: "Followed up with recruiter on Dec 10, 2024. Interview scheduled for Dec 15, 2024 at 10:00 AM via Zoom.",
    recruiter: {
      name: "Sarah Johnson",
      email: "sarah.johnson@techcorp.com",
      phone: "+1 (555) 123-4567"
    },
    timeline: [
      { date: "Dec 8, 2024", event: "Application Submitted", status: "completed" },
      { date: "Dec 9, 2024", event: "Application Reviewed", status: "completed" },
      { date: "Dec 10, 2024", event: "Initial Screening Passed", status: "completed" },
      { date: "Dec 15, 2024", event: "Technical Interview Scheduled", status: "upcoming" }
    ],
    feedback: "Strong technical background. Excellent match with our requirements.",
    nextSteps: "Prepare for technical interview. Review company's tech stack and recent projects."
  },
  2: {
    applicationId: "APP-2024-002",
    resumeVersion: "Resume_v2.pdf",
    coverLetter: "I am writing to express my interest in the UX/UI Designer position at Design Studio. My experience with Figma and user research aligns perfectly with your requirements.",
    notes: "Application is currently under review. Expected response within 5-7 business days.",
    recruiter: {
      name: "Emily Davis",
      email: "emily.davis@designstudio.com",
      phone: "+1 (555) 234-5678"
    },
    timeline: [
      { date: "Dec 5, 2024", event: "Application Submitted", status: "completed" },
      { date: "Dec 6, 2024", event: "Application Reviewed", status: "completed" },
      { date: "Dec 7, 2024", event: "Portfolio Review", status: "in-progress" }
    ],
    feedback: "Portfolio shows strong design skills. Awaiting team feedback.",
    nextSteps: "Wait for portfolio review results. May be contacted for design challenge."
  },
  3: {
    applicationId: "APP-2024-003",
    resumeVersion: "Resume_v1.pdf",
    coverLetter: "I am interested in the Product Manager role at StartupXYZ. My experience with Agile methodologies and product strategy would contribute to your team's success.",
    notes: "Application sent. No response yet.",
    recruiter: {
      name: "Michael Chen",
      email: "michael.chen@startupxyz.com",
      phone: "+1 (555) 345-6789"
    },
    timeline: [
      { date: "Nov 30, 2024", event: "Application Submitted", status: "completed" }
    ],
    feedback: "Application received and queued for review.",
    nextSteps: "Wait for initial response. Typically takes 3-5 business days."
  },
  4: {
    applicationId: "APP-2024-004",
    resumeVersion: "Resume_v2.pdf",
    coverLetter: "I am applying for the Data Scientist position at DataLabs. My expertise in Python, machine learning, and data analysis makes me a strong candidate.",
    notes: "Interview scheduled for Dec 18, 2024 at 2:00 PM. Technical round focusing on ML algorithms and Python coding.",
    recruiter: {
      name: "Alex Thompson",
      email: "alex.thompson@datalabs.com",
      phone: "+1 (555) 456-7890"
    },
    timeline: [
      { date: "Dec 7, 2024", event: "Application Submitted", status: "completed" },
      { date: "Dec 8, 2024", event: "Application Reviewed", status: "completed" },
      { date: "Dec 9, 2024", event: "Initial Screening Passed", status: "completed" },
      { date: "Dec 18, 2024", event: "Technical Interview Scheduled", status: "upcoming" }
    ],
    feedback: "Strong background in data science. Proceeded to technical interview.",
    nextSteps: "Prepare for technical interview. Review ML concepts and practice Python coding."
  },
  5: {
    applicationId: "APP-2024-005",
    resumeVersion: "Resume_v1.pdf",
    coverLetter: "I applied for the Backend Engineer position at CloudTech. Unfortunately, the position was filled by another candidate.",
    notes: "Application was rejected. Position filled by another candidate with more relevant experience.",
    recruiter: {
      name: "Jessica Martinez",
      email: "jessica.martinez@cloudtech.com",
      phone: "+1 (555) 567-8901"
    },
    timeline: [
      { date: "Nov 20, 2024", event: "Application Submitted", status: "completed" },
      { date: "Nov 22, 2024", event: "Application Reviewed", status: "completed" },
      { date: "Nov 25, 2024", event: "Application Rejected", status: "completed" }
    ],
    feedback: "While your skills are impressive, we found another candidate with more relevant experience for this specific role.",
    nextSteps: "Consider applying for other positions at CloudTech that match your skills better."
  },
  6: {
    applicationId: "APP-2024-006",
    resumeVersion: "Resume_v2.pdf",
    coverLetter: "I am interested in the Frontend Developer position at WebSolutions. My React and Next.js experience aligns with your requirements.",
    notes: "Application is currently under review by the hiring team.",
    recruiter: {
      name: "David Lee",
      email: "david.lee@websolutions.com",
      phone: "+1 (555) 678-9012"
    },
    timeline: [
      { date: "Dec 3, 2024", event: "Application Submitted", status: "completed" },
      { date: "Dec 4, 2024", event: "Application Reviewed", status: "completed" },
      { date: "Dec 5, 2024", event: "Under Team Review", status: "in-progress" }
    ],
    feedback: "Application looks promising. Team is reviewing technical skills.",
    nextSteps: "Wait for team review. May be contacted for technical assessment."
  }
};

const mockApplications = [
  {
    id: 1,
    jobTitle: "Senior Full Stack Developer",
    company: "TechCorp",
    status: "Interview Scheduled",
    match: 98,
    date: "2024-12-10",
    interviewDate: "Dec 15, 2024",
    location: "San Francisco, CA",
    salary: "₹10L - ₹15L",
    type: "Full-time",
    appliedDate: "Dec 8, 2024",
  },
  {
    id: 2,
    jobTitle: "UX/UI Designer",
    company: "Design Studio",
    status: "Under Review",
    match: 95,
    date: "2024-12-07",
    location: "Remote",
    salary: "₹7.5L - ₹11L",
    type: "Full-time",
    appliedDate: "Dec 5, 2024",
  },
  {
    id: 3,
    jobTitle: "Product Manager",
    company: "StartupXYZ",
    status: "Application Sent",
    match: 92,
    date: "2024-12-01",
    location: "New York, NY",
    salary: "₹9L - ₹13L",
    type: "Full-time",
    appliedDate: "Nov 30, 2024",
  },
  {
    id: 4,
    jobTitle: "Data Scientist",
    company: "DataLabs",
    status: "Interview Scheduled",
    match: 89,
    date: "2024-12-09",
    interviewDate: "Dec 18, 2024",
    location: "Remote",
    salary: "₹11L - ₹16L",
    type: "Full-time",
    appliedDate: "Dec 7, 2024",
  },
  {
    id: 5,
    jobTitle: "Backend Engineer",
    company: "CloudTech",
    status: "Rejected",
    match: 87,
    date: "2024-11-25",
    location: "Seattle, WA",
    salary: "₹8L - ₹12L",
    type: "Full-time",
    appliedDate: "Nov 20, 2024",
  },
  {
    id: 6,
    jobTitle: "Frontend Developer",
    company: "WebSolutions",
    status: "Under Review",
    match: 91,
    date: "2024-12-05",
    location: "Remote",
    salary: "₹7L - ₹10L",
    type: "Full-time",
    appliedDate: "Dec 3, 2024",
  },
];

const statusColors = {
  "Interview Scheduled": "bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30",
  "Under Review": "bg-[#6366f1]/20 text-[#6366f1] border-[#6366f1]/30",
  "Application Sent": "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30",
  "Rejected": "bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/30",
  "Offer Received": "bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30",
};

export function ApplicationsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [userApplications, setUserApplications] = useState<any[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"view" | "details" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadApplications();
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const appId = urlParams.get("appId");
      if (appId) {
        const id = parseInt(appId);
        if (!isNaN(id)) {
          setSelectedApplication(id);
          setViewMode("details");
        }
      }
    }
  }, [statusFilter]);

  const loadApplications = async () => {
    try {
      setIsLoading(true);
      const response = await applicationsAPI.getMyApplications();
      if (response.applications) {
        const formattedApplications = response.applications.map((app: any) => ({
          id: app.id,
          jobTitle: app.job_title || "",
          company: app.company_name || "",
          status: app.status || "Application Sent",
          match: app.match_score || 0,
          date: app.applied_at || new Date().toISOString(),
          interviewDate: app.interview_date ? new Date(app.interview_date).toLocaleDateString() : null,
          location: app.job_location || "",
          salary: "",
          type: app.job_type || "Full-time",
          appliedDate: app.applied_at ? new Date(app.applied_at).toLocaleDateString() : "",
          coverLetter: app.cover_letter || "",
          resumeUrl: app.resume_url || "",
          notes: app.notes || "",
        }));
        setUserApplications(formattedApplications);
      }
    } catch (error) {
      console.error("Failed to load applications:", error);
      setUserApplications([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredApplications = userApplications.filter((app) => {
    const matchesSearch = 
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    All: userApplications.length,
    "Interview Scheduled": userApplications.filter(a => a.status === "Interview Scheduled").length,
    "Under Review": userApplications.filter(a => a.status === "Under Review").length,
    "Application Sent": userApplications.filter(a => a.status === "Application Sent").length,
    "Rejected": userApplications.filter(a => a.status === "Rejected").length,
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
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
              <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                My Applications
              </span>
            </h1>
            <p className="text-lg text-[#9ca3af]">
              Track and manage all your job applications in one place
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
              <Input
                type="text"
                placeholder="Search applications..."
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
                  {status} ({count})
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {filteredApplications.map((application, index) => (
              <motion.div
                key={application.id}
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
                              <h3 className="text-xl font-bold text-[#e8e8f0]">{application.jobTitle}</h3>
                            </div>
                            <p className="text-lg text-[#a5b4fc] mb-2">{application.company}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-[#9ca3af]">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{application.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[#6366f1] font-semibold">₹</span>
                                <span>{application.salary}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                <span>{application.type}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={statusColors[application.status as keyof typeof statusColors]}>
                              {application.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-[#9ca3af] pt-4 border-t border-[#2a2a3a]">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Applied: {application.appliedDate}</span>
                          </div>
                          {application.interviewDate && (
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-[#6366f1]" />
                              <span className="text-[#6366f1]">Interview: {application.interviewDate}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:min-w-[140px]">
                        <Button
                          onClick={() => {
                            setSelectedApplication(application.id);
                            setViewMode("details");
                          }}
                          variant="outline"
                          className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredApplications.length === 0 && (
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Briefcase className="h-16 w-16 text-[#6366f1] mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-[#e8e8f0] mb-2">No applications found</h3>
                <p className="text-[#9ca3af]">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedApplication && viewMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0f]/80 backdrop-blur-sm"
            onClick={() => {
              setSelectedApplication(null);
              setViewMode(null);
              if (typeof window !== "undefined") {
                const url = new URL(window.location.href);
                url.searchParams.delete("appId");
                window.history.replaceState({}, "", url.pathname);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#151520] border border-[#2a2a3a] rounded-2xl shadow-2xl"
            >
              <Card className="border-0 bg-transparent">
                <CardHeader className="sticky top-0 bg-[#151520] border-b border-[#2a2a3a] z-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-[#e8e8f0]">
                      {viewMode === "view" ? "Application Overview" : "Application Details"}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedApplication(null);
                        setViewMode(null);
                        if (typeof window !== "undefined") {
                          const url = new URL(window.location.href);
                          url.searchParams.delete("appId");
                          window.history.replaceState({}, "", url.pathname);
                        }
                      }}
                      className="text-[#9ca3af] hover:text-[#e8e8f0] hover:bg-[#1e1e2e]"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {(() => {
                    const app = userApplications.find(a => a.id === selectedApplication);
                    if (!app) return null;

                    if (viewMode === "view") {
                      return (
                        <div className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3 mb-4">
                                  <Building2 className="h-5 w-5 text-[#6366f1]" />
                                  <div>
                                    <h3 className="font-semibold text-[#e8e8f0]">{app.jobTitle}</h3>
                                    <p className="text-sm text-[#9ca3af]">{app.company}</p>
                                  </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                  <div className="flex items-center gap-2 text-[#9ca3af]">
                                    <MapPin className="h-4 w-4" />
                                    <span>{app.location}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[#9ca3af]">
                                    <span className="text-[#6366f1] font-semibold">₹</span>
                                    <span>{app.salary}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[#9ca3af]">
                                    <Briefcase className="h-4 w-4" />
                                    <span>{app.type}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-[#e8e8f0] mb-4">Application Status</h4>
                                <div className="space-y-3">
                                  <div>
                                    <Badge className={statusColors[app.status as keyof typeof statusColors]}>
                                      {app.status}
                                    </Badge>
                                  </div>
                                  <div className="text-sm text-[#9ca3af]">
                                    <div>Application ID: APP-{app.id.toString().padStart(6, '0')}</div>
                                    <div>Applied: {app.appliedDate}</div>
                                    {app.interviewDate && (
                                      <div>Interview: {app.interviewDate}</div>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-[#e8e8f0] mb-4 flex items-center gap-2">
                                <User className="h-5 w-5 text-[#6366f1]" />
                                Application Details
                              </h4>
                              <div className="space-y-2 text-sm text-[#9ca3af]">
                                <p>Contact information will be available once the recruiter reviews your application.</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-[#e8e8f0] mb-4">{app.jobTitle} - {app.company}</h3>
                          <div className="flex items-center gap-4 text-sm text-[#9ca3af] mb-6">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{app.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[#6366f1] font-semibold">₹</span>
                              <span>{app.salary}</span>
                            </div>
                            <Badge className={statusColors[app.status as keyof typeof statusColors]}>
                              {app.status}
                            </Badge>
                          </div>
                        </div>

                        <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                          <CardHeader>
                            <CardTitle className="text-lg font-bold text-[#e8e8f0]">Application Information</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <p className="text-sm font-medium text-[#9ca3af] mb-1">Application ID</p>
                              <p className="text-[#e8e8f0]">APP-{app.id.toString().padStart(6, '0')}</p>
                            </div>
                            {app.resumeUrl && (
                              <div>
                                <p className="text-sm font-medium text-[#9ca3af] mb-1">Resume</p>
                                <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-[#6366f1] hover:underline">
                                  View Resume
                                </a>
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium text-[#9ca3af] mb-2">Cover Letter</p>
                              <p className="text-[#9ca3af] leading-relaxed">{app.coverLetter || "No cover letter provided"}</p>
                            </div>
                            {app.availability && (
                              <div>
                                <p className="text-sm font-medium text-[#9ca3af] mb-1">Availability</p>
                                <p className="text-[#e8e8f0]">{app.availability}</p>
                              </div>
                            )}
                            {app.expectedSalary && (
                              <div>
                                <p className="text-sm font-medium text-[#9ca3af] mb-1">Expected Salary</p>
                                <p className="text-[#e8e8f0]">{app.expectedSalary}</p>
                              </div>
                            )}
                            {app.noticePeriod && (
                              <div>
                                <p className="text-sm font-medium text-[#9ca3af] mb-1">Notice Period</p>
                                <p className="text-[#e8e8f0]">{app.noticePeriod}</p>
                              </div>
                            )}
                            {app.linkedinProfile && (
                              <div>
                                <p className="text-sm font-medium text-[#9ca3af] mb-1">LinkedIn Profile</p>
                                <a href={app.linkedinProfile} target="_blank" rel="noopener noreferrer" className="text-[#6366f1] hover:underline break-all">
                                  {app.linkedinProfile}
                                </a>
                              </div>
                            )}
                            {app.additionalInfo && (
                              <div>
                                <p className="text-sm font-medium text-[#9ca3af] mb-2">Additional Information</p>
                                <p className="text-[#9ca3af] leading-relaxed">{app.additionalInfo}</p>
                              </div>
                            )}
                            {app.notes && (
                              <div>
                                <p className="text-sm font-medium text-[#9ca3af] mb-2">Notes</p>
                                <p className="text-[#9ca3af] leading-relaxed">{app.notes}</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>

                        <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                          <CardHeader>
                            <CardTitle className="text-lg font-bold text-[#e8e8f0]">Application Timeline</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {[
                                { date: app.appliedDate, event: "Application Submitted", status: "completed" },
                                ...(app.interviewDate ? [{ date: app.interviewDate, event: "Interview Scheduled", status: "upcoming" }] : [])
                              ].map((item: any, index: number, array: any[]) => (
                                <div key={index} className="flex gap-4">
                                  <div className="flex flex-col items-center">
                                    <div className={`w-3 h-3 rounded-full ${
                                      item.status === "completed" ? "bg-[#10b981]" :
                                      item.status === "in-progress" ? "bg-[#6366f1]" :
                                      "bg-[#9ca3af]"
                                    }`} />
                                    {index < array.length - 1 && (
                                      <div className={`w-0.5 h-12 ${
                                        item.status === "completed" ? "bg-[#10b981]" : "bg-[#2a2a3a]"
                                      }`} />
                                    )}
                                  </div>
                                  <div className="flex-1 pb-4">
                                    <p className="text-sm font-medium text-[#e8e8f0]">{item.event}</p>
                                    <p className="text-xs text-[#9ca3af]">{item.date}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                          <CardHeader>
                            <CardTitle className="text-lg font-bold text-[#e8e8f0] flex items-center gap-2">
                              <User className="h-5 w-5 text-[#6366f1]" />
                              Recruiter Contact
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="text-sm text-[#9ca3af]">
                              Contact information will be available once your application is reviewed.
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                          <CardHeader>
                            <CardTitle className="text-lg font-bold text-[#e8e8f0] flex items-center gap-2">
                              <MessageSquare className="h-5 w-5 text-[#6366f1]" />
                              Feedback & Next Steps
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <p className="text-sm font-medium text-[#9ca3af] mb-2">Feedback</p>
                              <p className="text-[#9ca3af] leading-relaxed">Feedback will be available once your application is reviewed.</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#9ca3af] mb-2">Next Steps</p>
                              <p className="text-[#9ca3af] leading-relaxed">Wait for the recruiter to review your application. You will be notified of any updates.</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

