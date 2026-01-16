"use client";

import { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { authAPI, applicationsAPI } from "@/lib/api";

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
    salary: "₹10L - ₹15L",
  },
  {
    id: 2,
    jobTitle: "UX/UI Designer",
    company: "Design Studio",
    status: "Under Review",
    match: 95,
    date: "5 days ago",
    location: "Remote",
    salary: "₹7.5L - ₹11L",
  },
  {
    id: 3,
    jobTitle: "Product Manager",
    company: "StartupXYZ",
    status: "Application Sent",
    match: 92,
    date: "1 week ago",
    location: "New York, NY",
    salary: "₹9L - ₹13L",
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
    salary: "₹11L - ₹16L",
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


const quickActions = [
  { title: "Upload Resume", icon: Upload, href: "/resume-scanner", gradient: "from-[#6366f1] to-[#8b5cf6]" },
  { title: "Edit Profile", icon: Settings, href: "/profile/edit", gradient: "from-[#8b5cf6] to-[#ec4899]" },
  { title: "View Analytics", icon: BarChart3, href: "/analytics", gradient: "from-[#ec4899] to-[#f59e0b]" },
  { title: "Practice Interview", icon: MessageSquare, href: "/mock-interview", gradient: "from-[#10b981] to-[#6366f1]" },
];

const featuredJobs = [
  {
    id: 1,
    jobTitle: "Senior Full Stack Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "₹10L - ₹15L",
    posted: "2 days ago",
    match: 98,
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    featured: true,
  },
  {
    id: 2,
    jobTitle: "UX/UI Designer",
    company: "Design Studio",
    location: "Remote",
    type: "Full-time",
    salary: "₹7.5L - ₹11L",
    posted: "1 day ago",
    match: 95,
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    featured: true,
  },
  {
    id: 3,
    jobTitle: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    salary: "₹9L - ₹13L",
    posted: "3 days ago",
    match: 92,
    skills: ["Product Strategy", "Agile", "Analytics", "Roadmapping"],
  },
  {
    id: 4,
    jobTitle: "Data Scientist",
    company: "DataLabs",
    location: "Remote",
    type: "Full-time",
    salary: "₹11L - ₹16L",
    posted: "5 days ago",
    match: 89,
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
  },
];

export function DashboardContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"applications" | "saved" | "recommendations" | "find-jobs">("applications");
  const [savedJobIds, setSavedJobIds] = useState<number[]>([]);
  const [user, setUser] = useState<any>(null);
  const [userApplications, setUserApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
    if (typeof window !== "undefined") {
      const savedJobs = localStorage.getItem("savedJobs");
      if (savedJobs) {
        setSavedJobIds(JSON.parse(savedJobs));
      }
    }
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const profileResponse = await authAPI.getProfile();
      if (profileResponse.user) {
        const userData = profileResponse.user;
        setUser({
          name: userData.name || "User",
          email: userData.email || "",
          phone: userData.phone || "",
          location: userData.location || "",
          title: userData.title || "",
          avatar: userData.name ? userData.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : "U",
          experience: userData.experience || "",
          education: userData.education || "",
          skills: userData.skills ? (typeof userData.skills === 'string' ? userData.skills.split(',') : userData.skills) : [],
          bio: userData.bio || "",
          resumeUploaded: !!userData.resume_url,
          profileComplete: calculateProfileComplete(userData),
          joinedDate: userData.created_at ? new Date(userData.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "",
        });
      }

      const applicationsResponse = await applicationsAPI.getMyApplications();
      if (applicationsResponse.applications) {
        setUserApplications(applicationsResponse.applications);
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
      if (typeof window !== "undefined") {
        const name = localStorage.getItem("adminName") || localStorage.getItem("userName") || "User";
        const email = localStorage.getItem("adminEmail") || localStorage.getItem("userEmail") || "";
        setUser({
          name,
          email,
          avatar: name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase(),
          profileComplete: 0,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const calculateProfileComplete = (userData: any) => {
    let complete = 0;
    if (userData.name) complete += 15;
    if (userData.email) complete += 10;
    if (userData.phone) complete += 10;
    if (userData.location) complete += 10;
    if (userData.title) complete += 15;
    if (userData.skills) complete += 15;
    if (userData.bio) complete += 10;
    if (userData.resume_url) complete += 10;
    return Math.min(complete, 100);
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
          location: job.location || "",
          salary: job.salary || "",
          type: job.type || "Full-time",
          postedDate: job.posted || "",
          savedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };
        const updatedSavedJobs = [...savedJobs, newSavedJob];
        setSavedJobIds([...savedJobIds, jobId]);
        localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
      }
    }
  };

  const stats = [
    { label: "Applications", value: userApplications.length, icon: Briefcase, gradient: "from-[#6366f1] to-[#8b5cf6]" },
    { label: "Interviews", value: userApplications.filter((app: any) => app.status === "Interview Scheduled").length, icon: MessageSquare, gradient: "from-[#8b5cf6] to-[#ec4899]" },
    { label: "Avg Match", value: userApplications.length > 0 ? `${Math.round(userApplications.reduce((sum: number, app: any) => sum + (app.match_score || 0), 0) / userApplications.length)}%` : "0%", icon: TrendingUp, gradient: "from-[#ec4899] to-[#f59e0b]" },
    { label: "Profile Views", value: 0, icon: Eye, gradient: "from-[#10b981] to-[#6366f1]" },
  ];

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
                  {isLoading ? (
                    <div className="flex-1">
                      <div className="h-8 bg-[#1e1e2e] rounded animate-pulse mb-2"></div>
                      <div className="h-6 bg-[#1e1e2e] rounded animate-pulse w-2/3"></div>
                    </div>
                  ) : user ? (
                    <>
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-[#6366f1]/30">
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl sm:text-3xl font-bold text-[#e8e8f0]">{user.name}</h2>
                          <Badge className="bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        </div>
                        {user.title && <p className="text-lg text-[#a5b4fc] mb-3">{user.title}</p>}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[#9ca3af]">
                          {user.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{user.location}</span>
                            </div>
                          )}
                          {user.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              <span>{user.email}</span>
                            </div>
                          )}
                          {user.experience && (
                            <div className="flex items-center gap-2">
                              <BriefcaseIcon className="h-4 w-4" />
                              <span>{user.experience}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1">
                      <p className="text-[#9ca3af]">Unable to load user data</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                  >
                      <Link href="/jobs">
                        <Search className="h-4 w-4 mr-2" />
                        Find Jobs
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-lg shadow-[#6366f1]/30"
                    >
                      <Link href="/resume-scanner">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Resume
                      </Link>
                    </Button>
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
                  Welcome Back, {user ? user.name.split(' ')[0] : 'User'}!
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
                <button
                  onClick={() => setActiveTab("find-jobs")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === "find-jobs"
                      ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white"
                      : "text-[#9ca3af] hover:text-[#e8e8f0]"
                  }`}
                >
                  Find Jobs
                </button>
              </div>
              <Button variant="outline" asChild className="border-2 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50">
                <Link href="/jobs">View All Jobs</Link>
              </Button>
            </div>

            {activeTab === "applications" && (
              <>
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
                                  <span className="text-[#6366f1] font-semibold">₹</span>
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
                              </div>
                            </div>
                            <Button
                              onClick={() => {
                                router.push(`/dashboard/applications?appId=${application.id}`);
                              }}
                              variant="outline"
                              className="border-2 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                            >
                              View Details
                            </Button>
                          </div>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
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
                          <Link href="/dashboard/suggestions">View Matches</Link>
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
              </>
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
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleSave(job.id, job)}
                              variant="outline"
                              size="sm"
                              className={`border-2 ${
                                savedJobIds.includes(job.id)
                                  ? "border-[#6366f1] bg-[#6366f1]/10 text-[#6366f1]"
                                  : "border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                              }`}
                            >
                              <Bookmark className={`h-4 w-4 ${savedJobIds.includes(job.id) ? "fill-[#6366f1]" : ""}`} />
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
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleSave(job.id, job)}
                              variant="outline"
                              size="sm"
                              className={`border-2 ${
                                savedJobIds.includes(job.id)
                                  ? "border-[#6366f1] bg-[#6366f1]/10 text-[#6366f1]"
                                  : "border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                              }`}
                            >
                              <Bookmark className={`h-4 w-4 ${savedJobIds.includes(job.id) ? "fill-[#6366f1]" : ""}`} />
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

            {activeTab === "find-jobs" && (
              <div className="space-y-4">
                {featuredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="group relative overflow-hidden border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:bg-[#151520] hover:border-[#6366f1]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#6366f1]/10">
                      <motion.div
                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                        whileHover={{ scaleX: 1 }}
                      />
                      {job.featured && (
                        <Badge className="absolute top-4 right-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0 z-10 shadow-lg shadow-[#6366f1]/30">
                          Featured
                        </Badge>
                      )}
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-xl sm:text-2xl mb-2 text-[#e8e8f0] group-hover:text-[#a5b4fc] transition-colors">
                              {job.jobTitle}
                            </CardTitle>
                            <div className={`flex flex-wrap items-center gap-3 text-sm text-[#9ca3af] mb-4 ${job.featured ? 'pr-24' : ''}`}>
                              <div className="flex items-center gap-1.5">
                                <Briefcase className="h-4 w-4" />
                                <span className="font-medium">{job.company}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MapPin className="h-4 w-4" />
                                <span>{job.location}</span>
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
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                              {job.skills.slice(0, 4).map((skill, skillIndex) => (
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
                          </div>
                        </div>
                      </CardHeader>
              </Card>
                  </motion.div>
                ))}
                <div className="pt-4">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-2 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                  >
                    <Link href="/jobs">View All Jobs</Link>
                  </Button>
                </div>
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
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-[#e8e8f0] flex items-center gap-2">
                  <User className="h-4 w-4 text-[#6366f1]" />
                  Profile Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-3 border-b border-[#2a2a3a]">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-[#6366f1]/30">
                      {user ? user.avatar : "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#e8e8f0] truncate">{user ? user.name : "User"}</h3>
                      {user?.title && <p className="text-xs text-[#9ca3af] truncate">{user.title}</p>}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    {user?.email && (
                      <div className="flex items-center gap-2 text-[#9ca3af]">
                        <Mail className="h-3 w-3 text-[#6366f1]" />
                        <span className="truncate">{user.email}</span>
                      </div>
                    )}
                    {user?.location && (
                      <div className="flex items-center gap-2 text-[#9ca3af]">
                        <MapPin className="h-3 w-3 text-[#6366f1]" />
                        <span className="truncate">{user.location}</span>
                      </div>
                    )}
                    {user?.experience && (
                      <div className="flex items-center gap-2 text-[#9ca3af]">
                        <BriefcaseIcon className="h-3 w-3 text-[#6366f1]" />
                        <span className="truncate">{user.experience}</span>
                      </div>
                    )}
                  </div>

                  {user?.skills && user.skills.length > 0 && (
                    <div className="pt-2 border-t border-[#2a2a3a]">
                      <p className="text-xs font-semibold text-[#e8e8f0] mb-1.5">Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {user.skills.slice(0, 4).map((skill: string, index: number) => (
                          <Badge
                            key={index}
                            className="bg-[#1e1e2e] text-[#9ca3af] border border-[#2a2a3a] text-xs px-1.5 py-0.5"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {user.skills.length > 4 && (
                          <Badge className="bg-[#1e1e2e] text-[#9ca3af] border border-[#2a2a3a] text-xs px-1.5 py-0.5">
                            +{user.skills.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-[#e8e8f0]">
                  Profile Completion
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-[#9ca3af]">Overall</span>
                      <span className="text-xs font-semibold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">{user ? user.profileComplete : 0}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#2a2a3a] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
                        initial={{ width: 0 }}
                        animate={{ width: `${user ? user.profileComplete : 0}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#9ca3af]">Resume</span>
                      <CheckCircle2 className="h-3 w-3 text-[#10b981]" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#9ca3af]">Skills</span>
                      <CheckCircle2 className="h-3 w-3 text-[#10b981]" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#9ca3af]">Experience</span>
                      <span className="text-[#9ca3af] text-xs">Incomplete</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#9ca3af]">Education</span>
                      <CheckCircle2 className="h-3 w-3 text-[#10b981]" />
                    </div>
                  </div>

                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-lg shadow-[#6366f1]/30 text-xs"
                  >
                    <Link href="/dashboard/profile">Complete Profile</Link>
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
