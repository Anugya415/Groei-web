"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  XCircle,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Target,
  MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";

const mockStats = {
  totalUsers: 1248,
  usersGrowth: 8.5,
  activeApplications: 342,
  applicationsGrowth: 12.3,
  interviewsScheduled: 28,
  interviewsGrowth: 15.2,
  acceptanceRate: 12.5,
  acceptanceRateChange: 2.3,
  averageResponseTime: "2.8 days",
  responseTimeChange: -0.4,
  totalCompanies: 45,
  companiesGrowth: 5.1,
  activeRecruiters: 23,
  recruitersGrowth: 8.7,
};

const statusDistribution = [
  { status: "Interview Scheduled", count: 28, percentage: 8.2, color: "#10b981" },
  { status: "Under Review", count: 156, percentage: 45.6, color: "#6366f1" },
  { status: "Application Sent", count: 89, percentage: 26.0, color: "#f59e0b" },
  { status: "Rejected", count: 45, percentage: 13.2, color: "#ef4444" },
  { status: "Accepted", count: 24, percentage: 7.0, color: "#10b981" },
];

const monthlyApplications = [
  { month: "Aug", count: 245 },
  { month: "Sep", count: 312 },
  { month: "Oct", count: 289 },
  { month: "Nov", count: 356 },
  { month: "Dec", count: 342 },
];

const topCompanies = [
  { name: "TechCorp", applications: 89, interviews: 12, accepted: 5 },
  { name: "Design Studio", applications: 67, interviews: 8, accepted: 3 },
  { name: "DataLabs", applications: 54, interviews: 6, accepted: 2 },
  { name: "CloudTech", applications: 43, interviews: 5, accepted: 2 },
  { name: "InnovateHub", applications: 38, interviews: 4, accepted: 1 },
];

const industryDistribution = [
  { industry: "Technology", count: 234, percentage: 68.4, color: "#6366f1" },
  { industry: "E-commerce", count: 45, percentage: 13.2, color: "#8b5cf6" },
  { industry: "Finance", count: 32, percentage: 9.4, color: "#ec4899" },
  { industry: "Healthcare", count: 21, percentage: 6.1, color: "#f59e0b" },
  { industry: "Other", count: 10, percentage: 2.9, color: "#9ca3af" },
];

export function AdminAnalyticsContent() {
  const [company, setCompany] = useState("TechCorp");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const recruiterCompany = localStorage.getItem("adminCompany") || "TechCorp";
      setCompany(recruiterCompany);
    }
  }, []);

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
                    Platform Analytics
                  </span>
                </h1>
                <p className="text-lg text-[#9ca3af]">
                  Comprehensive insights into platform performance and recruitment metrics
                </p>
              </div>
              <Button
                variant="outline"
                className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Last 30 Days
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-[#6366f1]/20">
                    <Users className="h-6 w-6 text-[#6366f1]" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold ${
                    mockStats.usersGrowth > 0 ? "text-[#10b981]" : "text-[#ef4444]"
                  }`}>
                    {mockStats.usersGrowth > 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {mockStats.usersGrowth}%
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-[#e8e8f0] mb-1">{mockStats.totalUsers.toLocaleString()}</h3>
                <p className="text-sm text-[#9ca3af]">Total Users</p>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-[#8b5cf6]/20">
                    <Briefcase className="h-6 w-6 text-[#8b5cf6]" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold ${
                    mockStats.applicationsGrowth > 0 ? "text-[#10b981]" : "text-[#ef4444]"
                  }`}>
                    {mockStats.applicationsGrowth > 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {mockStats.applicationsGrowth}%
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-[#e8e8f0] mb-1">{mockStats.activeApplications}</h3>
                <p className="text-sm text-[#9ca3af]">Active Applications</p>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-[#10b981]/20">
                    <CheckCircle2 className="h-6 w-6 text-[#10b981]" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold ${
                    mockStats.acceptanceRateChange > 0 ? "text-[#10b981]" : "text-[#ef4444]"
                  }`}>
                    {mockStats.acceptanceRateChange > 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {mockStats.acceptanceRateChange}%
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-[#e8e8f0] mb-1">{mockStats.acceptanceRate}%</h3>
                <p className="text-sm text-[#9ca3af]">Acceptance Rate</p>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-[#f59e0b]/20">
                    <Clock className="h-6 w-6 text-[#f59e0b]" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold ${
                    mockStats.responseTimeChange > 0 ? "text-[#ef4444]" : "text-[#10b981]"
                  }`}>
                    {mockStats.responseTimeChange > 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {mockStats.responseTimeChange}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-[#e8e8f0] mb-1">{mockStats.averageResponseTime}</h3>
                <p className="text-sm text-[#9ca3af]">Avg Response Time</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-[#6366f1]" />
                  Applications Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {monthlyApplications.map((item, index) => {
                    const maxCount = Math.max(...monthlyApplications.map(m => m.count));
                    const height = (item.count / maxCount) * 100;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <motion.div
                          className="w-full bg-gradient-to-t from-[#6366f1] to-[#8b5cf6] rounded-t-lg mb-2"
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        />
                        <span className="text-xs text-[#9ca3af]">{item.month}</span>
                        <span className="text-xs font-semibold text-[#e8e8f0]">{item.count}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-[#6366f1]" />
                  Application Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statusDistribution.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm font-medium text-[#e8e8f0]">{item.status}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-[#9ca3af]">{item.count}</span>
                          <span className="text-sm font-semibold text-[#a5b4fc]">{item.percentage}%</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-[#2a2a3a] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-[#6366f1]" />
                  Top Performing Companies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCompanies.map((company, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-sm font-bold">
                          {company.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-[#e8e8f0]">{company.name}</p>
                          <p className="text-xs text-[#9ca3af]">{company.applications} applications</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-center">
                          <p className="font-semibold text-[#e8e8f0]">{company.interviews}</p>
                          <p className="text-xs text-[#9ca3af]">Interviews</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-[#10b981]">{company.accepted}</p>
                          <p className="text-xs text-[#9ca3af]">Accepted</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                  <Target className="h-5 w-5 text-[#6366f1]" />
                  Industry Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {industryDistribution.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm font-medium text-[#e8e8f0]">{item.industry}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-[#9ca3af]">{item.count}</span>
                          <span className="text-sm font-semibold text-[#a5b4fc]">{item.percentage}%</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-[#2a2a3a] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#e8e8f0] flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-[#6366f1]" />
                  Companies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent mb-2">
                  {mockStats.totalCompanies}
                </div>
                <div className="flex items-center gap-1 text-xs text-[#10b981]">
                  <ArrowUpRight className="h-3 w-3" />
                  {mockStats.companiesGrowth}% growth
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#e8e8f0] flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#6366f1]" />
                  Active Recruiters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent mb-2">
                  {mockStats.activeRecruiters}
                </div>
                <div className="flex items-center gap-1 text-xs text-[#10b981]">
                  <ArrowUpRight className="h-3 w-3" />
                  {mockStats.recruitersGrowth}% growth
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#e8e8f0] flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-[#6366f1]" />
                  Interviews Scheduled
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#ec4899] to-[#f59e0b] bg-clip-text text-transparent mb-2">
                  {mockStats.interviewsScheduled}
                </div>
                <div className="flex items-center gap-1 text-xs text-[#10b981]">
                  <ArrowUpRight className="h-3 w-3" />
                  {mockStats.interviewsGrowth}% growth
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
