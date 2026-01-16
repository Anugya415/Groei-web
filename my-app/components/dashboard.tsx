"use client";

import { useState } from "react";
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
  Calendar,
  Bookmark,
  Bell,
  User,
  MapPin,
  DollarSign,
  Eye,
  Zap,
  Heart,
  Search,
  Filter,
  Mail,
  Phone,
  GraduationCap,
  BriefcaseIcon
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const mockUser = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  title: "Senior Full Stack Developer",
  avatar: "AJ",
  experience: "5+ years",
  education: "BS Computer Science, Stanford University",
  skills: ["React", "Node.js", "TypeScript", "Python", "AWS", "Docker", "Kubernetes"],
  bio: "Passionate full-stack developer with expertise in modern web technologies. Love building scalable applications and solving complex problems.",
  resumeUploaded: true,
  profileComplete: 85,
  joinedDate: "January 2024",
};

const applications = [
  {
    id: 1,
    jobTitle: "Senior Full Stack Developer",
    company: "TechCorp",
    status: "Interview Scheduled",
    match: 98,
    date: "2 days ago",
    interviewDate: "Dec 15, 2024",
    location: "San Francisco, CA",
    salary: "$120k - $180k",
  },
  {
    id: 2,
    jobTitle: "UX/UI Designer",
    company: "Design Studio",
    status: "Under Review",
    match: 95,
    date: "5 days ago",
    location: "Remote",
    salary: "$90k - $130k",
  },
  {
    id: 3,
    jobTitle: "Product Manager",
    company: "StartupXYZ",
    status: "Application Sent",
    match: 92,
    date: "1 week ago",
    location: "New York, NY",
    salary: "$110k - $160k",
  },
  {
    id: 4,
    jobTitle: "Data Scientist",
    company: "DataLabs",
    status: "Interview Scheduled",
    match: 89,
    date: "3 days ago",
    interviewDate: "Dec 18, 2024",
    location: "Remote",
    salary: "$130k - $190k",
  },
];

const savedJobs = [
  {
    id: 1,
    jobTitle: "Frontend Developer",
    company: "WebSolutions",
    match: 94,
    savedDate: "1 day ago",
  },
  {
    id: 2,
    jobTitle: "Backend Developer",
    company: "API Systems",
    match: 91,
    savedDate: "3 days ago",
  },
];

const recommendations = [
  {
    id: 1,
    jobTitle: "DevOps Engineer",
    company: "CloudTech",
    match: 96,
    reason: "Matches your skills",
  },
  {
    id: 2,
    jobTitle: "Full Stack Developer",
    company: "TechStart",
    match: 93,
    reason: "Similar to your experience",
  },
];

const stats = [
  { label: "Applications", value: 12, icon: Briefcase, gradient: "from-[#6366f1] to-[#8b5cf6]" },
  { label: "Interviews", value: 5, icon: MessageSquare, gradient: "from-[#8b5cf6] to-[#ec4899]" },
  { label: "Avg Match", value: "94%", icon: TrendingUp, gradient: "from-[#ec4899] to-[#f59e0b]" },
  { label: "Profile Views", value: 48, icon: Eye, gradient: "from-[#10b981] to-[#6366f1]" },
];

const quickActions = [
  { title: "Upload Resume", icon: Upload, href: "/resume-scanner", gradient: "from-[#6366f1] to-[#8b5cf6]" },
  { title: "Edit Profile", icon: Settings, href: "/profile/edit", gradient: "from-[#8b5cf6] to-[#ec4899]" },
  { title: "View Analytics", icon: BarChart3, href: "/analytics", gradient: "from-[#ec4899] to-[#f59e0b]" },
  { title: "Practice Interview", icon: MessageSquare, href: "/mock-interview", gradient: "from-[#10b981] to-[#6366f1]" },
];

export function DashboardContent() {
  const [activeTab, setActiveTab] = useState<"applications" | "saved" | "recommendations">("applications");

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
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-[#6366f1]/30">
                    {mockUser.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#e8e8f0]">{mockUser.name}</h2>
                      <Badge className="bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <p className="text-lg text-[#a5b4fc] mb-3">{mockUser.title}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#9ca3af]">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{mockUser.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{mockUser.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BriefcaseIcon className="h-4 w-4" />
                        <span>{mockUser.experience}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Find Jobs
                    </Button>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-lg shadow-[#6366f1]/30"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Resume
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151520]/50 backdrop-blur-sm border border-[#6366f1]/20 mb-4">
                <Sparkles className="h-4 w-4 text-[#6366f1]" />
                <span className="text-xs font-medium text-[#a5b4fc] uppercase tracking-wide">
                  Your Dashboard
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2">
                <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                  Welcome Back, {mockUser.name.split(' ')[0]}!
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-[#9ca3af]">
                Track your applications and manage your job search
              </p>
            </div>
          </motion.div>

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
                  <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:bg-[#151520] hover:border-[#6366f1]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#6366f1]/10">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg shadow-[#6366f1]/30`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className={`text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                        {stat.value}
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
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex gap-2 border border-[#2a2a3a] rounded-lg p-1 bg-[#151520]/50">
                <button
                  onClick={() => setActiveTab("applications")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === "applications"
                      ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white"
                      : "text-[#9ca3af] hover:text-[#e8e8f0]"
                  }`}
                >
                  Applications
                </button>
                <button
                  onClick={() => setActiveTab("saved")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === "saved"
                      ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white"
                      : "text-[#9ca3af] hover:text-[#e8e8f0]"
                  }`}
                >
                  Saved Jobs
                </button>
                <button
                  onClick={() => setActiveTab("recommendations")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === "recommendations"
                      ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white"
                      : "text-[#9ca3af] hover:text-[#e8e8f0]"
                  }`}
                >
                  Recommendations
                </button>
              </div>
              <Button variant="outline" asChild className="border-2 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50">
                <Link href="/jobs">View All Jobs</Link>
              </Button>
            </div>

            {activeTab === "applications" && (
              <div className="space-y-4">
                {applications.map((application, index) => (
                  <motion.div
                    key={application.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="group relative overflow-hidden border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:bg-[#151520] hover:border-[#6366f1]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#6366f1]/10">
                      <motion.div
                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                        whileHover={{ scaleX: 1 }}
                      />
                      
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-xl sm:text-2xl mb-2 text-[#e8e8f0] group-hover:text-[#a5b4fc] transition-colors">
                              {application.jobTitle}
                            </CardTitle>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-[#9ca3af] mb-4">
                              <div className="flex items-center gap-1.5">
                                <Briefcase className="h-4 w-4" />
                                <span className="font-medium">{application.company}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MapPin className="h-4 w-4" />
                                <span>{application.location}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <DollarSign className="h-4 w-4" />
                                <span>{application.salary}</span>
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
                              <Badge className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0 shadow-lg shadow-[#6366f1]/30">
                                {application.status}
                              </Badge>
                              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6366f1]/10">
                                <Star className="h-4 w-4 text-[#6366f1] fill-[#6366f1]" />
                                <span className="text-sm font-semibold text-[#6366f1]">{application.match}% Match</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            asChild
                            variant="outline"
                            className="border-2 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                          >
                            <Link href={`/applications/${application.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "saved" && (
              <div className="space-y-4">
                {savedJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="group relative overflow-hidden border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:bg-[#151520] hover:border-[#6366f1]/30 transition-all duration-500">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2 text-[#e8e8f0] group-hover:text-[#a5b4fc] transition-colors">
                              {job.jobTitle}
                            </CardTitle>
                            <div className="flex items-center gap-3 text-sm text-[#9ca3af] mb-3">
                              <span>{job.company}</span>
                              <span>•</span>
                              <span>Saved {job.savedDate}</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6366f1]/10 w-fit">
                              <Star className="h-4 w-4 text-[#6366f1] fill-[#6366f1]" />
                              <span className="text-sm font-semibold text-[#6366f1]">{job.match}% Match</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-2 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                            >
                              <Bookmark className="h-4 w-4" />
                            </Button>
                            <Button
                              asChild
                              size="sm"
                              className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0"
                            >
                              <Link href={`/jobs/${job.id}`}>Apply</Link>
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "recommendations" && (
              <div className="space-y-4">
                {recommendations.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="group relative overflow-hidden border border-[#6366f1]/30 bg-gradient-to-br from-[#6366f1]/5 to-[#8b5cf6]/5 backdrop-blur-sm hover:border-[#6366f1]/50 transition-all duration-500">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Zap className="h-4 w-4 text-[#6366f1]" />
                              <Badge className="bg-[#6366f1]/20 text-[#6366f1] border-[#6366f1]/30">Recommended</Badge>
                            </div>
                            <CardTitle className="text-xl mb-2 text-[#e8e8f0] group-hover:text-[#a5b4fc] transition-colors">
                              {job.jobTitle}
                            </CardTitle>
                            <div className="flex items-center gap-3 text-sm text-[#9ca3af] mb-3">
                              <span>{job.company}</span>
                              <span>•</span>
                              <span>{job.reason}</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6366f1]/10 w-fit">
                              <Star className="h-4 w-4 text-[#6366f1] fill-[#6366f1]" />
                              <span className="text-sm font-semibold text-[#6366f1]">{job.match}% Match</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-2 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                            >
                              <Bookmark className="h-4 w-4" />
                            </Button>
                            <Button
                              asChild
                              size="sm"
                              className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0"
                            >
                              <Link href={`/jobs/${job.id}`}>Apply Now</Link>
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#e8e8f0]">
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
                        className="w-full justify-start h-auto p-4 hover:bg-[#1e1e2e] border border-transparent hover:border-[#2a2a3a]"
                      >
                        <Link href={action.href} className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg shadow-[#6366f1]/30`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <span className="font-medium text-[#e8e8f0]">{action.title}</span>
                        </Link>
                      </Button>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                  <User className="h-5 w-5 text-[#6366f1]" />
                  Profile Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-[#2a2a3a]">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-[#6366f1]/30">
                      {mockUser.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#e8e8f0]">{mockUser.name}</h3>
                      <p className="text-sm text-[#9ca3af]">{mockUser.title}</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-[#9ca3af]">
                      <Mail className="h-4 w-4 text-[#6366f1]" />
                      <span>{mockUser.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#9ca3af]">
                      <MapPin className="h-4 w-4 text-[#6366f1]" />
                      <span>{mockUser.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#9ca3af]">
                      <BriefcaseIcon className="h-4 w-4 text-[#6366f1]" />
                      <span>{mockUser.experience}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#9ca3af]">
                      <GraduationCap className="h-4 w-4 text-[#6366f1]" />
                      <span>{mockUser.education}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#2a2a3a]">
                    <p className="text-sm font-semibold text-[#e8e8f0] mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {mockUser.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          className="bg-[#1e1e2e] text-[#9ca3af] border border-[#2a2a3a]"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#e8e8f0]">
                  Profile Completion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#9ca3af]">Overall</span>
                      <span className="text-sm font-semibold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">{mockUser.profileComplete}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#2a2a3a] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
                        initial={{ width: 0 }}
                        animate={{ width: `${mockUser.profileComplete}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[#9ca3af]">Resume</span>
                      <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#9ca3af]">Skills</span>
                      <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#9ca3af]">Experience</span>
                      <span className="text-[#9ca3af]">Incomplete</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#9ca3af]">Education</span>
                      <CheckCircle2 className="h-4 w-4 text-[#10b981]" />
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-lg shadow-[#6366f1]/30"
                  >
                    <Link href="/profile/edit">Complete Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#6366f1]/30 bg-gradient-to-br from-[#6366f1]/10 to-[#8b5cf6]/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#e8e8f0]">
                  <Target className="h-5 w-5 inline mr-2 text-[#6366f1]" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-[#6366f1] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#e8e8f0] mb-1">5 New Matches</p>
                      <p className="text-sm text-[#9ca3af]">Jobs matching your profile</p>
                    </div>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-2 border-[#6366f1]/50 text-[#e8e8f0] hover:bg-[#6366f1]/20 hover:border-[#6366f1]"
                  >
                    <Link href="/jobs">View Matches</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                  <Bell className="h-5 w-5 text-[#6366f1]" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#6366f1] mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-[#e8e8f0]">New job match found</p>
                      <p className="text-xs text-[#9ca3af]">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#8b5cf6] mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-[#e8e8f0]">Application status updated</p>
                      <p className="text-xs text-[#9ca3af]">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#ec4899] mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-[#e8e8f0]">Profile viewed by recruiter</p>
                      <p className="text-xs text-[#9ca3af]">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
