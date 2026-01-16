"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Briefcase,
  CheckCircle2,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";
import { applicationsAPI } from "@/lib/api";

export function AnalyticsContent() {
  const [stats, setStats] = useState({
    totalApplications: 0,
    applicationsChange: 0,
    interviewRate: 0,
    interviewRateChange: 0,
    averageMatch: 0,
    averageMatchChange: 0,
    responseTime: "0 days",
    responseTimeChange: 0,
  });
  const [statusDistribution, setStatusDistribution] = useState<any[]>([]);
  const [monthlyApplications, setMonthlyApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setIsLoading(true);
      const response = await applicationsAPI.getMyApplications();
      if (response.applications) {
        const apps = response.applications;
        const total = apps.length;
        const interviews = apps.filter((app: any) => app.status === "Interview Scheduled").length;
        const interviewRate = total > 0 ? Math.round((interviews / total) * 100) : 0;
        const avgMatch = total > 0 
          ? Math.round(apps.reduce((sum: number, app: any) => sum + (app.match_score || 0), 0) / total)
          : 0;

        const statusCounts: { [key: string]: number } = {};
        apps.forEach((app: any) => {
          const status = app.status || "Application Sent";
          statusCounts[status] = (statusCounts[status] || 0) + 1;
        });

        const distribution = Object.entries(statusCounts).map(([status, count]) => ({
          status,
          count,
          percentage: total > 0 ? Math.round((count / total) * 100) : 0,
          color: status === "Interview Scheduled" ? "#10b981" : 
                 status === "Under Review" ? "#6366f1" :
                 status === "Application Sent" ? "#f59e0b" : "#ef4444",
        }));

        const monthlyData: { [key: string]: number } = {};
        apps.forEach((app: any) => {
          if (app.applied_at) {
            const date = new Date(app.applied_at);
            const month = date.toLocaleDateString('en-US', { month: 'short' });
            monthlyData[month] = (monthlyData[month] || 0) + 1;
          }
        });

        const monthly = Object.entries(monthlyData).map(([month, count]) => ({ month, count }));

        setStats({
          totalApplications: total,
          applicationsChange: 0,
          interviewRate,
          interviewRateChange: 0,
          averageMatch: avgMatch,
          averageMatchChange: 0,
          responseTime: "0 days",
          responseTimeChange: 0,
        });
        setStatusDistribution(distribution);
        setMonthlyApplications(monthly);
      }
    } catch (error) {
      console.error("Failed to load analytics:", error);
    } finally {
      setIsLoading(false);
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
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
              <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                Analytics
              </span>
            </h1>
            <p className="text-lg text-[#9ca3af]">
              Track your job search performance and insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-[#6366f1]/20">
                    <Briefcase className="h-6 w-6 text-[#6366f1]" />
                  </div>
                  {stats.applicationsChange > 0 ? (
                    <div className="flex items-center gap-1 text-[#10b981]">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-semibold">+{stats.applicationsChange}%</span>
                    </div>
                  ) : stats.applicationsChange < 0 ? (
                    <div className="flex items-center gap-1 text-[#ef4444]">
                      <TrendingDown className="h-4 w-4" />
                      <span className="text-sm font-semibold">{stats.applicationsChange}%</span>
                    </div>
                  ) : null}
                </div>
                <h3 className="text-3xl font-bold text-[#e8e8f0] mb-1">{stats.totalApplications}</h3>
                <p className="text-sm text-[#9ca3af]">Total Applications</p>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-[#10b981]/20">
                    <CheckCircle2 className="h-6 w-6 text-[#10b981]" />
                  </div>
                  {stats.interviewRateChange > 0 ? (
                    <div className="flex items-center gap-1 text-[#10b981]">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-semibold">+{stats.interviewRateChange}%</span>
                    </div>
                  ) : stats.interviewRateChange < 0 ? (
                    <div className="flex items-center gap-1 text-[#ef4444]">
                      <TrendingDown className="h-4 w-4" />
                      <span className="text-sm font-semibold">{stats.interviewRateChange}%</span>
                    </div>
                  ) : null}
                </div>
                <h3 className="text-3xl font-bold text-[#e8e8f0] mb-1">{stats.interviewRate}%</h3>
                <p className="text-sm text-[#9ca3af]">Interview Rate</p>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-[#8b5cf6]/20">
                    <Target className="h-6 w-6 text-[#8b5cf6]" />
                  </div>
                  {stats.averageMatchChange > 0 ? (
                    <div className="flex items-center gap-1 text-[#10b981]">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-semibold">+{stats.averageMatchChange}%</span>
                    </div>
                  ) : stats.averageMatchChange < 0 ? (
                    <div className="flex items-center gap-1 text-[#ef4444]">
                      <TrendingDown className="h-4 w-4" />
                      <span className="text-sm font-semibold">{stats.averageMatchChange}%</span>
                    </div>
                  ) : null}
                </div>
                <h3 className="text-3xl font-bold text-[#e8e8f0] mb-1">{stats.averageMatch}%</h3>
                <p className="text-sm text-[#9ca3af]">Average Match</p>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-[#f59e0b]/20">
                    <Clock className="h-6 w-6 text-[#f59e0b]" />
                  </div>
                  {stats.responseTimeChange > 0 ? (
                    <div className="flex items-center gap-1 text-[#10b981]">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-semibold">+{stats.responseTimeChange}</span>
                    </div>
                  ) : stats.responseTimeChange < 0 ? (
                    <div className="flex items-center gap-1 text-[#ef4444]">
                      <TrendingDown className="h-4 w-4" />
                      <span className="text-sm font-semibold">{stats.responseTimeChange}</span>
                    </div>
                  ) : null}
                </div>
                <h3 className="text-3xl font-bold text-[#e8e8f0] mb-1">{stats.responseTime}</h3>
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
                  Status Distribution
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

          <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#6366f1]" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Application submitted", company: "TechCorp", time: "2 hours ago" },
                  { action: "Interview scheduled", company: "DataLabs", time: "1 day ago" },
                  { action: "Application viewed", company: "Design Studio", time: "2 days ago" },
                  { action: "Application submitted", company: "StartupXYZ", time: "3 days ago" },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#e8e8f0]">{activity.action}</p>
                      <p className="text-xs text-[#9ca3af]">{activity.company}</p>
                    </div>
                    <span className="text-xs text-[#9ca3af]">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

