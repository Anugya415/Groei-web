"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  FileText,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  UserPlus,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { adminAPI } from "@/lib/api";

const mockStats = {
  totalUsers: 1248,
  activeApplications: 342,
  interviewsScheduled: 28,
  newUsersToday: 12,
  pendingApplications: 89,
  rejectedApplications: 45,
  acceptedApplications: 15,
  usersGrowth: 8.5,
  applicationsGrowth: 12.3,
};

const recentUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    title: "Senior Full Stack Developer",
    location: "San Francisco, CA",
    joinedDate: "2 hours ago",
    status: "Active",
    applications: 3,
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    title: "UX/UI Designer",
    location: "Remote",
    joinedDate: "5 hours ago",
    status: "Active",
    applications: 1,
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    title: "Product Manager",
    location: "New York, NY",
    joinedDate: "1 day ago",
    status: "Active",
    applications: 2,
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    title: "Data Scientist",
    location: "Remote",
    joinedDate: "2 days ago",
    status: "Active",
    applications: 4,
  },
];

const recentApplications = [
  {
    id: 1,
    applicantName: "Alex Johnson",
    jobTitle: "Senior Full Stack Developer",
    company: "TechCorp",
    status: "Interview Scheduled",
    appliedDate: "2 days ago",
    match: 98,
  },
  {
    id: 2,
    applicantName: "Sarah Chen",
    jobTitle: "UX/UI Designer",
    company: "Design Studio",
    status: "Under Review",
    appliedDate: "3 days ago",
    match: 95,
  },
  {
    id: 3,
    applicantName: "Michael Brown",
    jobTitle: "Product Manager",
    company: "StartupXYZ",
    status: "Application Sent",
    appliedDate: "5 days ago",
    match: 92,
  },
];

const getStats = (companyStats: {
  totalUsers: number;
  usersGrowth: number;
  activeApplications: number;
  applicationsGrowth: number;
  interviewsScheduled: number;
  newUsersToday: number;
  pendingApplications: number;
  rejectedApplications: number;
  acceptedApplications: number;
  underReviewApplications: number;
}) => [
  {
    label: "Total Applications",
    value: companyStats.activeApplications,
    icon: Briefcase,
    gradient: "from-[#6366f1] to-[#8b5cf6]",
    change: companyStats.applicationsGrowth > 0 ? companyStats.applicationsGrowth : 0,
    changeType: companyStats.applicationsGrowth > 0 ? "increase" : "decrease",
  },
  {
    label: "Interviews Scheduled",
    value: companyStats.interviewsScheduled,
    icon: Calendar,
    gradient: "from-[#8b5cf6] to-[#ec4899]",
    change: companyStats.interviewsScheduled > 0 ? 12.5 : 0,
    changeType: "increase",
  },
  {
    label: "Under Review",
    value: companyStats.underReviewApplications,
    icon: Clock,
    gradient: "from-[#ec4899] to-[#f59e0b]",
    change: companyStats.underReviewApplications > 0 ? 8.3 : 0,
    changeType: "increase",
  },
  {
    label: "Accepted",
    value: companyStats.acceptedApplications,
    icon: CheckCircle2,
    gradient: "from-[#10b981] to-[#6366f1]",
    change: companyStats.acceptedApplications > 0 ? 15.8 : 0,
    changeType: "increase",
  },
];

export function AdminDashboardContent() {
  const [company, setCompany] = useState("TechCorp");
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const recruiterCompany = localStorage.getItem("adminCompany") || "TechCorp";
      setCompany(recruiterCompany);
    }
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setIsLoading(true);
      const response = await adminAPI.getDashboard();
      setDashboardData(response);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !dashboardData) {
    return (
      <div className="min-h-screen pt-16 lg:pt-8 flex items-center justify-center">
        <p className="text-[#9ca3af]">Loading dashboard...</p>
      </div>
    );
  }

  const stats = dashboardData.stats || {};
  const recentApplications = dashboardData.recent_applications || [];
  
  const totalApplications = stats.total_applications || 0;
  const interviewsScheduled = stats.interviews_scheduled || 0;
  const pendingApplications = stats.pending || 0;
  const rejectedApplications = stats.rejected || 0;
  const acceptedApplications = stats.accepted || 0;
  const underReviewApplications = stats.under_review || 0;
  
  const previousMonthApplications = Math.max(0, totalApplications - 15);
  const applicationsGrowth = totalApplications > 0 ? ((totalApplications - previousMonthApplications) / previousMonthApplications * 100) : 0;
  
  const companyStats = {
    totalUsers: 0,
    usersGrowth: 8.5,
    activeApplications: totalApplications,
    applicationsGrowth: applicationsGrowth > 0 ? applicationsGrowth : 0,
    interviewsScheduled: interviewsScheduled,
    newUsersToday: 0,
    pendingApplications: pendingApplications,
    rejectedApplications: rejectedApplications,
    acceptedApplications: acceptedApplications,
    underReviewApplications: underReviewApplications,
  };

  return (
    <div className="min-h-screen pt-16 lg:pt-8">
      <section className="relative py-8 sm:py-12 md:py-16 bg-[#0a0a0f] overflow-hidden">
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
                left: `${10 + i * 15}%`,
                top: `${10 + i * 12}%`,
              }}
              animate={{
                scale: [1, 1.4, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 18 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.6,
              }}
            />
          ))}
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="h-8 w-8 text-[#6366f1]" />
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                    {company} Dashboard
                  </span>
                </h1>
              </div>
              <p className="text-lg sm:text-xl text-[#9ca3af]">
                Manage applications and recruitment activities for your company
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {getStats(companyStats).map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:bg-[#151520] hover:border-[#6366f1]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#6366f1]/10">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg shadow-[#6366f1]/30`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-semibold ${
                          stat.changeType === "increase" ? "text-[#10b981]" : "text-[#ef4444]"
                        }`}>
                          {stat.changeType === "increase" ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3" />
                          )}
                          {stat.change}%
                        </div>
                      </div>
                      <div className={`text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                        {stat.value.toLocaleString()}
                      </div>
                      <div className="text-sm text-[#9ca3af]">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#e8e8f0]">Recent Applicants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.length > 0 ? recentApplications.slice(0, 5).map((app: any, index: number) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#1e1e2e] transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-[#6366f1]/30">
                          {app.applicant_name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-semibold text-[#e8e8f0] truncate">{app.applicant_name || 'Applicant'}</p>
                            <Badge className="bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30 text-xs">
                              Applied
                            </Badge>
                          </div>
                          <p className="text-xs text-[#9ca3af] truncate">{app.job_title || 'Job Application'}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Button variant="ghost" size="sm" className="h-7 text-xs" disabled>
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="text-center py-8">
                      <p className="text-sm text-[#9ca3af] mb-2">No recent applicants</p>
                      <p className="text-xs text-[#6b7280]">Applicants will appear here when they apply to {company}'s jobs</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold text-[#e8e8f0]">Recent Applications</CardTitle>
                <Button variant="ghost" size="sm" asChild className="text-[#6366f1] hover:text-[#a5b4fc]">
                  <Link href="/admin/applications">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.length > 0 ? recentApplications.map((app, index) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-[#1e1e2e] transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-[#8b5cf6]/30">
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-semibold text-[#e8e8f0]">{app.applicant_name || 'Applicant'}</p>
                            <Badge className={`text-xs ${
                              app.status === "Interview Scheduled" ? "bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30" :
                              app.status === "Under Review" ? "bg-[#6366f1]/20 text-[#6366f1] border-[#6366f1]/30" :
                              "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/30"
                            }`}>
                              {app.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-[#a5b4fc] mb-1">{app.job_title || 'Job'}</p>
                          <p className="text-xs text-[#9ca3af]">{app.job_location || ''}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-[#6b7280]">
                            <span>{new Date(app.applied_at).toLocaleDateString()}</span>
                            {app.match_score && (
                              <>
                                <span>•</span>
                                <span className="text-[#6366f1]">{app.match_score}% match</span>
                              </>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild className="h-7 text-xs">
                          <Link href={`/admin/applications?appId=${app.id}`}>
                            <Eye className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="text-center py-8">
                      <p className="text-sm text-[#9ca3af] mb-2">No recent applications</p>
                      <p className="text-xs text-[#6b7280]">Applications will appear here when candidates apply to {company}'s jobs</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#e8e8f0] flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#10b981]" />
                  Accepted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#10b981] to-[#6366f1] bg-clip-text text-transparent mb-2">
                  {companyStats.acceptedApplications}
                </div>
                <p className="text-sm text-[#9ca3af]">Applications accepted</p>
                <p className="text-xs text-[#6b7280] mt-1">
                  {totalApplications > 0 ? Math.round((companyStats.acceptedApplications / totalApplications) * 100) : 0}% acceptance rate
                </p>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#e8e8f0] flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#f59e0b]" />
                  Pending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ec4899] bg-clip-text text-transparent mb-2">
                  {companyStats.pendingApplications}
                </div>
                <p className="text-sm text-[#9ca3af]">Applications pending review</p>
                <p className="text-xs text-[#6b7280] mt-1">
                  {totalApplications > 0 ? Math.round((companyStats.pendingApplications / totalApplications) * 100) : 0}% of total
                </p>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#e8e8f0] flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-[#ef4444]" />
                  Rejected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#ef4444] to-[#f59e0b] bg-clip-text text-transparent mb-2">
                  {companyStats.rejectedApplications}
                </div>
                <p className="text-sm text-[#9ca3af]">Applications rejected</p>
                <p className="text-xs text-[#6b7280] mt-1">
                  {totalApplications > 0 ? Math.round((companyStats.rejectedApplications / totalApplications) * 100) : 0}% rejection rate
                </p>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#e8e8f0] flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#6366f1]" />
                  Under Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent mb-2">
                  {companyStats.underReviewApplications}
                </div>
                <p className="text-sm text-[#9ca3af]">Currently reviewing</p>
                <p className="text-xs text-[#6b7280] mt-1">
                  {totalApplications > 0 ? Math.round((companyStats.underReviewApplications / totalApplications) * 100) : 0}% of total
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
