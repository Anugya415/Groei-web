"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  FileText, 
  TrendingUp, 
  CheckCircle2,
  Clock,
  Star,
  MessageSquare,
  Settings,
  Upload,
  Sparkles,
  BarChart3,
  Target,
  Award,
  Calendar
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const applications = [
  {
    id: 1,
    jobTitle: "Senior Full Stack Developer",
    company: "TechCorp",
    status: "Interview Scheduled",
    match: 98,
    date: "2 days ago",
    interviewDate: "Dec 15, 2024",
  },
  {
    id: 2,
    jobTitle: "UX/UI Designer",
    company: "Design Studio",
    status: "Under Review",
    match: 95,
    date: "5 days ago",
  },
  {
    id: 3,
    jobTitle: "Product Manager",
    company: "StartupXYZ",
    status: "Application Sent",
    match: 92,
    date: "1 week ago",
  },
];

const stats = [
  { label: "Applications", value: 12, icon: Briefcase, color: "from-[#041F2B] to-[#0d4a63]" },
  { label: "Interviews", value: 5, icon: MessageSquare, color: "from-[#041F2B] to-[#063a4f]" },
  { label: "Avg Match", value: "94%", icon: TrendingUp, color: "from-[#041F2B] to-[#052a3a]" },
  { label: "Profile Views", value: 48, icon: BarChart3, color: "from-[#041F2B] to-[#0a3d52]" },
];

const quickActions = [
  { title: "Upload Resume", icon: Upload, href: "/upload-resume", color: "from-[#041F2B] to-[#0d4a63]" },
  { title: "Edit Profile", icon: Settings, href: "/profile/edit", color: "from-[#041F2B] to-[#063a4f]" },
  { title: "View Analytics", icon: BarChart3, href: "/analytics", color: "from-[#041F2B] to-[#052a3a]" },
  { title: "Practice Interview", icon: MessageSquare, href: "/mock-interview", color: "from-[#041F2B] to-[#0a3d52]" },
];

export function DashboardContent() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl"
              style={{
                width: `${200 + i * 50}px`,
                height: `${200 + i * 50}px`,
                background: `radial-gradient(circle, rgba(4, 31, 43, ${0.08 + i * 0.02}) 0%, transparent 70%)`,
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
            className="mb-12"
          >
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-slate-950/60 backdrop-blur-sm border-0 mb-4">
                  <Sparkles className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                    Your Dashboard
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-2">
                  Welcome Back!
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400">
                  Track your applications and manage your job search
                </p>
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#041F2B] to-[#0d4a63] text-white hover:from-[#052a3a] hover:to-[#0a3d52] border-0 shadow-lg"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Resume
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-950 transition-all duration-500 hover:shadow-xl">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Applications */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                Recent Applications
              </h2>
              <Button variant="outline" asChild>
                <Link href="/jobs">View All Jobs</Link>
              </Button>
            </div>

            <div className="space-y-4">
              {applications.map((application, index) => (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group relative overflow-hidden border-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-950 transition-all duration-500 hover:shadow-xl">
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#041F2B] to-[#0d4a63] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                      whileHover={{ scaleX: 1 }}
                    />
                    
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl sm:text-2xl mb-2 text-slate-900 dark:text-slate-100 group-hover:text-[#041F2B] dark:group-hover:text-[#0d4a63] transition-colors">
                            {application.jobTitle}
                          </CardTitle>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400 mb-4">
                            <div className="flex items-center gap-1.5">
                              <Briefcase className="h-4 w-4" />
                              <span className="font-medium">{application.company}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4" />
                              <span>Applied {application.date}</span>
                            </div>
                            {application.interviewDate && (
                              <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                <span>Interview: {application.interviewDate}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3">
                            <Badge className="bg-gradient-to-r from-[#041F2B] to-[#0d4a63] text-white border-0">
                              {application.status}
                            </Badge>
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#041F2B]/10 dark:bg-[#041F2B]/20">
                              <Star className="h-4 w-4 text-[#041F2B] fill-[#041F2B]" />
                              <span className="text-sm font-semibold text-[#041F2B]">{application.match}% Match</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          asChild
                          variant="outline"
                          className="border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <Link href={`/applications/${application.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>

            {applications.length === 0 && (
              <Card className="border-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm text-center py-12">
                <CardContent>
                  <Briefcase className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                    No applications yet
                  </p>
                  <Button asChild className="bg-gradient-to-r from-[#041F2B] to-[#0d4a63] text-white">
                    <Link href="/jobs">Browse Jobs</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Button
                        asChild
                        variant="ghost"
                        className="w-full justify-start h-auto p-4 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Link href={action.href} className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <span className="font-medium text-slate-900 dark:text-slate-100">{action.title}</span>
                        </Link>
                      </Button>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Profile Completion */}
            <Card className="border-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Profile Completion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Overall</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">85%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#041F2B] to-[#0d4a63]"
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Resume</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Skills</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Experience</span>
                      <span className="text-slate-400">Incomplete</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Education</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-[#041F2B] to-[#0d4a63] text-white hover:from-[#052a3a] hover:to-[#0a3d52] border-0"
                  >
                    <Link href="/profile/edit">Complete Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="border-0 bg-gradient-to-br from-[#041F2B] to-[#0d4a63] text-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">
                  <Target className="h-5 w-5 inline mr-2" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-white/80 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-white mb-1">5 New Matches</p>
                      <p className="text-sm text-white/80">Jobs matching your profile</p>
                    </div>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Link href="/jobs">View Matches</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}


