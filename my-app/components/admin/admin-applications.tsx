"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Briefcase,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  X,
  Download,
  User,
  Mail,
  Phone,
  MessageSquare,
  FileText,
  Building2,
  TrendingUp,
  Filter,
  ArrowUpDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { applicationsAPI } from "@/lib/api";

const mockApplications = [
  {
    id: 1,
    applicantName: "Alex Johnson",
    applicantEmail: "alex.johnson@example.com",
    applicantPhone: "+1 (555) 123-4567",
    jobTitle: "Senior Full Stack Developer",
    company: "TechCorp",
    status: "Interview Scheduled",
    match: 98,
    appliedDate: "2024-12-08",
    interviewDate: "Dec 15, 2024",
    location: "San Francisco, CA",
    salary: "₹10L - ₹15L",
    type: "Full-time",
    resumeVersion: "Resume_v2.pdf",
    coverLetter: "I am excited to apply for the Senior Full Stack Developer position at TechCorp.",
    notes: "Strong technical background. Excellent match with our requirements.",
  },
  {
    id: 2,
    applicantName: "Sarah Chen",
    applicantEmail: "sarah.chen@example.com",
    applicantPhone: "+1 (555) 234-5678",
    jobTitle: "UX/UI Designer",
    company: "Design Studio",
    status: "Under Review",
    match: 95,
    appliedDate: "2024-12-05",
    location: "Remote",
    salary: "₹7.5L - ₹11L",
    type: "Full-time",
    resumeVersion: "Resume_v1.pdf",
    coverLetter: "I am writing to express my interest in the UX/UI Designer position.",
    notes: "Portfolio shows strong design skills. Awaiting team feedback.",
  },
  {
    id: 3,
    applicantName: "Michael Brown",
    applicantEmail: "michael.brown@example.com",
    applicantPhone: "+1 (555) 345-6789",
    jobTitle: "Product Manager",
    company: "StartupXYZ",
    status: "Application Sent",
    match: 92,
    appliedDate: "2024-11-30",
    location: "New York, NY",
    salary: "₹9L - ₹13L",
    type: "Full-time",
    resumeVersion: "Resume_v1.pdf",
    coverLetter: "I am interested in the Product Manager role at StartupXYZ.",
    notes: "Application received and queued for review.",
  },
  {
    id: 4,
    applicantName: "Emily Davis",
    applicantEmail: "emily.davis@example.com",
    applicantPhone: "+1 (555) 456-7890",
    jobTitle: "Data Scientist",
    company: "DataLabs",
    status: "Interview Scheduled",
    match: 89,
    appliedDate: "2024-12-07",
    interviewDate: "Dec 18, 2024",
    location: "Remote",
    salary: "₹11L - ₹16L",
    type: "Full-time",
    resumeVersion: "Resume_v2.pdf",
    coverLetter: "I am applying for the Data Scientist position at DataLabs.",
    notes: "Strong background in data science. Proceeded to technical interview.",
  },
  {
    id: 5,
    applicantName: "David Lee",
    applicantEmail: "david.lee@example.com",
    applicantPhone: "+1 (555) 567-8901",
    jobTitle: "Backend Engineer",
    company: "CloudTech",
    status: "Rejected",
    match: 87,
    appliedDate: "2024-11-20",
    location: "Seattle, WA",
    salary: "₹8L - ₹12L",
    type: "Full-time",
    resumeVersion: "Resume_v1.pdf",
    coverLetter: "I applied for the Backend Engineer position at CloudTech.",
    notes: "While your skills are impressive, we found another candidate with more relevant experience.",
  },
];

const statusColors = {
  "Interview Scheduled": "bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30",
  "Under Review": "bg-[#6366f1]/20 text-[#6366f1] border-[#6366f1]/30",
  "Application Sent": "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30",
  "Rejected": "bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/30",
  "Accepted": "bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30",
};

const statusOptions = ["Interview Scheduled", "Under Review", "Application Sent", "Rejected", "Accepted"];

export function AdminApplicationsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "match" | "name">("date");
  const [company, setCompany] = useState("TechCorp");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const recruiterCompany = localStorage.getItem("adminCompany") || "TechCorp";
      setCompany(recruiterCompany);
      
      const urlParams = new URLSearchParams(window.location.search);
      const appId = urlParams.get("appId");
      if (appId) {
        const id = parseInt(appId);
        if (!isNaN(id)) {
          setSelectedApplication(id);
        }
      }
    }
  }, []);

  useEffect(() => {
    loadApplications();
  }, [statusFilter]);

  const loadApplications = async () => {
    try {
      setIsLoading(true);
      const params: any = {};
      if (statusFilter !== "All") {
        params.status = statusFilter;
      }
      if (searchQuery) {
        params.search = searchQuery;
      }
      const response = await applicationsAPI.getCompanyApplications(params);
      if (response && response.applications) {
        setApplications(response.applications);
      } else {
        setApplications([]);
      }
    } catch (error: any) {
      console.error("Failed to load applications:", error);
      setApplications([]);
      const errorMsg = error.message || error.error || "Failed to load applications";
      if (errorMsg.includes("Company not assigned") || errorMsg.includes("Company association required")) {
        alert("Your account is not assigned to a company. Please contact support or update your profile.");
      } else if (errorMsg.includes("Admin access required")) {
        alert("You don't have admin access. Please contact support.");
      } else {
        console.error("Application loading error details:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery !== undefined) {
        loadApplications();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const companyApplications = applications;

  const filteredApplications = companyApplications
    .filter((app: any) => {
      const matchesSearch =
        (app.applicant_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (app.job_title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (app.company_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (app.applicant_email || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a: any, b: any) => {
      if (sortBy === "date") {
        return new Date(b.applied_at || 0).getTime() - new Date(a.applied_at || 0).getTime();
      } else if (sortBy === "match") {
        return (b.match_score || 0) - (a.match_score || 0);
      } else {
        return (a.applicant_name || '').localeCompare(b.applicant_name || '');
      }
    });

  const statusCounts = {
    All: companyApplications.length,
    "Interview Scheduled": companyApplications.filter((a: any) => a.status === "Interview Scheduled").length,
    "Under Review": companyApplications.filter((a: any) => a.status === "Under Review").length,
    "Application Sent": companyApplications.filter((a: any) => a.status === "Application Sent").length,
    "Rejected": companyApplications.filter((a: any) => a.status === "Rejected").length,
    "Accepted": companyApplications.filter((a: any) => a.status === "Accepted").length,
  };

  const selectedAppData = selectedApplication
    ? companyApplications.find(a => a.id === selectedApplication)
    : null;

  const updateApplicationStatus = async (appId: number, newStatus: string) => {
    try {
      await applicationsAPI.updateStatus(appId, { status: newStatus });
      await loadApplications();
      if (selectedApplication === appId) {
        setSelectedApplication(null);
      }
    } catch (error) {
      console.error("Failed to update application status:", error);
    }
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
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                  <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                    Application Management
                  </span>
                </h1>
                <div>
                  <p className="text-lg text-[#9ca3af]">
                    Review and manage applications for your company
                  </p>
                  {company && (
                    <p className="text-sm text-[#6b7280] mt-1">Company: {company}</p>
                  )}
                </div>
              </div>
              <Button className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
                <Input
                  type="text"
                  placeholder="Search applications by name, job title, company, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#151520] border-[#2a2a3a] text-[#e8e8f0] placeholder:text-[#6b7280] focus:border-[#6366f1]"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSortBy(sortBy === "date" ? "match" : sortBy === "match" ? "name" : "date")}
                  className="border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e]"
                >
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Sort: {sortBy === "date" ? "Date" : sortBy === "match" ? "Match" : "Name"}
                </Button>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
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
          </motion.div>

          <div className="grid gap-4">
            {filteredApplications.map((application, index) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:border-[#6366f1]/30 transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <User className="h-5 w-5 text-[#6366f1]" />
                              <h3 className="text-xl font-bold text-[#e8e8f0]">{application.applicant_name || 'Applicant'}</h3>
                            </div>
                            <p className="text-lg text-[#a5b4fc] mb-2">{application.job_title || 'Job'}</p>
                            <div className="flex items-center gap-2 mb-2">
                              <Building2 className="h-4 w-4 text-[#9ca3af]" />
                              <span className="text-sm text-[#9ca3af]">{application.company_name || ''}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-[#9ca3af]">
                              {application.job_location && (
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{application.job_location}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>Applied: {new Date(application.applied_at || Date.now()).toLocaleDateString()}</span>
                              </div>
                              {application.interview_date && (
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-[#6366f1]" />
                                  <span className="text-[#6366f1]">Interview: {new Date(application.interview_date).toLocaleDateString()}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={statusColors[application.status as keyof typeof statusColors]}>
                              {application.status}
                            </Badge>
                            {application.match_score && (
                              <Badge className="bg-[#6366f1]/20 text-[#6366f1] border-[#6366f1]/30">
                                {application.match_score}% match
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:min-w-[200px]">
                        <Button
                          onClick={() => setSelectedApplication(application.id)}
                          variant="outline"
                          className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        {application.status !== "Accepted" && application.status !== "Rejected" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => updateApplicationStatus(application.id, "Accepted")}
                              className="flex-1 bg-[#10b981] text-white hover:bg-[#059669] border-0"
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateApplicationStatus(application.id, "Rejected")}
                              className="flex-1 border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444]/10"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                        <Button
                          variant="outline"
                          className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          View Resume
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {isLoading ? (
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <p className="text-[#9ca3af]">Loading applications...</p>
              </CardContent>
            </Card>
          ) : filteredApplications.length === 0 && (
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Briefcase className="h-16 w-16 text-[#6366f1] mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-[#e8e8f0] mb-2">
                  {companyApplications.length === 0 
                    ? `No applications found for ${company || 'your company'}`
                    : "No applications match your search criteria"}
                </h3>
                <p className="text-[#9ca3af]">
                  {companyApplications.length === 0
                    ? "Applications will appear here when candidates apply to your company's jobs"
                    : "Try adjusting your search or filter criteria"}
                </p>
                {company && (
                  <p className="text-sm text-[#6b7280] mt-2">Company: {company}</p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedApplication && selectedAppData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0f]/80 backdrop-blur-sm"
            onClick={() => {
              setSelectedApplication(null);
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
                    <CardTitle className="text-2xl font-bold text-[#e8e8f0]">Application Details</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedApplication(null);
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
                  <div>
                    <h3 className="text-xl font-bold text-[#e8e8f0] mb-4">
                      {selectedAppData.job_title || 'Job'} - {selectedAppData.company_name || ''}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-[#9ca3af] mb-6">
                      {selectedAppData.job_location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{selectedAppData.job_location}</span>
                        </div>
                      )}
                      <Badge className={statusColors[selectedAppData.status as keyof typeof statusColors]}>
                        {selectedAppData.status}
                      </Badge>
                      {selectedAppData.match_score && (
                        <Badge className="bg-[#6366f1]/20 text-[#6366f1] border-[#6366f1]/30">
                          {selectedAppData.match_score}% match
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-[#e8e8f0] flex items-center gap-2">
                        <User className="h-5 w-5 text-[#6366f1]" />
                        Applicant Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-[#9ca3af] mb-1">Name</p>
                        <p className="text-[#e8e8f0]">{selectedAppData.applicant_name || 'N/A'}</p>
                      </div>
                      {selectedAppData.applicant_email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-[#6366f1]" />
                          <a href={`mailto:${selectedAppData.applicant_email}`} className="text-[#6366f1] hover:underline">
                            {selectedAppData.applicant_email}
                          </a>
                        </div>
                      )}
                      {selectedAppData.applicant_phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-[#6366f1]" />
                          <a href={`tel:${selectedAppData.applicant_phone}`} className="text-[#6366f1] hover:underline">
                            {selectedAppData.applicant_phone}
                          </a>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-[#9ca3af] mb-1">Applied Date</p>
                        <p className="text-[#e8e8f0]">{new Date(selectedAppData.applied_at || Date.now()).toLocaleDateString()}</p>
                      </div>
                      {selectedAppData.interview_date && (
                        <div>
                          <p className="text-sm font-medium text-[#9ca3af] mb-1">Interview Date</p>
                          <p className="text-[#e8e8f0]">{new Date(selectedAppData.interview_date).toLocaleDateString()}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-[#e8e8f0]">Application Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedAppData.resume_url && (
                        <div>
                          <p className="text-sm font-medium text-[#9ca3af] mb-1">Resume</p>
                          <a href={selectedAppData.resume_url} target="_blank" rel="noopener noreferrer" className="text-[#6366f1] hover:underline">
                            View Resume
                          </a>
                        </div>
                      )}
                      {selectedAppData.cover_letter && (
                        <div>
                          <p className="text-sm font-medium text-[#9ca3af] mb-2">Cover Letter</p>
                          <p className="text-[#9ca3af] leading-relaxed">{selectedAppData.cover_letter}</p>
                        </div>
                      )}
                      {selectedAppData.notes && (
                        <div>
                          <p className="text-sm font-medium text-[#9ca3af] mb-2">Notes</p>
                          <p className="text-[#9ca3af] leading-relaxed">{selectedAppData.notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-[#e8e8f0]">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-3 mb-4">
                        <Button
                          onClick={() => updateApplicationStatus(selectedAppData.id, "Accepted")}
                          className="flex-1 bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:from-[#059669] hover:to-[#047857] border-0"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Accept
                        </Button>
                        <Button
                          onClick={() => updateApplicationStatus(selectedAppData.id, "Rejected")}
                          variant="outline"
                          className="flex-1 border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444]/10 hover:border-[#ef4444]"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {statusOptions.map((status) => (
                          <Button
                            key={status}
                            variant={selectedAppData.status === status ? "default" : "outline"}
                            onClick={() => updateApplicationStatus(selectedAppData.id, status)}
                            size="sm"
                            className={`text-xs ${
                              selectedAppData.status === status
                                ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0"
                                : "border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e]"
                            }`}
                          >
                            {status}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Applicant
                    </Button>
                    {selectedAppData.resume_url && (
                      <Button 
                        variant="outline" 
                        className="flex-1 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                        onClick={() => window.open(selectedAppData.resume_url, '_blank')}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Resume
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
