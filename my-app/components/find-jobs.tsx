"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Building2, 
  Filter,
  Star,
  TrendingUp,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Freelance", "Internship"];
const locations = ["All Locations", "Remote", "New York", "San Francisco", "London", "Toronto", "Berlin"];
const experienceLevels = ["All Levels", "Entry", "Mid", "Senior", "Executive"];

const jobs = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $180k",
    posted: "2 days ago",
    match: 98,
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    description: "Join our innovative team to build cutting-edge web applications using modern technologies.",
    featured: true,
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "Design Studio",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $130k",
    posted: "1 day ago",
    match: 95,
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    description: "Create beautiful and intuitive user experiences for our digital products.",
    featured: true,
  },
  {
    id: 3,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    salary: "$110k - $160k",
    posted: "3 days ago",
    match: 92,
    skills: ["Product Strategy", "Agile", "Analytics", "Roadmapping"],
    description: "Lead product development and work closely with engineering and design teams.",
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "DataLabs",
    location: "Remote",
    type: "Full-time",
    salary: "$130k - $190k",
    posted: "5 days ago",
    match: 89,
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
    description: "Build and deploy machine learning models to solve complex business problems.",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Toronto, ON",
    type: "Full-time",
    salary: "$100k - $150k",
    posted: "1 week ago",
    match: 87,
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
    description: "Manage infrastructure and deployment pipelines for scalable applications.",
  },
  {
    id: 6,
    title: "Marketing Director",
    company: "BrandCo",
    location: "London, UK",
    type: "Full-time",
    salary: "$95k - $140k",
    posted: "4 days ago",
    match: 85,
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
    description: "Lead marketing initiatives and drive brand growth across multiple channels.",
  },
  {
    id: 7,
    title: "Frontend Developer",
    company: "WebSolutions",
    location: "Remote",
    type: "Contract",
    salary: "$80k - $120k",
    posted: "2 days ago",
    match: 94,
    skills: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    description: "Build responsive and performant web applications with modern frameworks.",
  },
  {
    id: 8,
    title: "Backend Developer",
    company: "API Systems",
    location: "Berlin, Germany",
    type: "Full-time",
    salary: "$85k - $125k",
    posted: "6 days ago",
    match: 91,
    skills: ["Python", "Django", "PostgreSQL", "REST APIs"],
    description: "Design and implement scalable backend systems and APIs.",
  },
];

export function FindJobsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === "All" || job.type === selectedType;
    const matchesLocation = selectedLocation === "All Locations" || 
      job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-[#0a0a0f] overflow-hidden">
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
            className="text-center mb-12 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151520]/50 backdrop-blur-sm border border-[#6366f1]/20 mb-4">
              <Sparkles className="h-4 w-4 text-[#6366f1]" />
              <span className="text-xs font-medium text-[#a5b4fc] uppercase tracking-wide">
                AI-Powered Job Matching
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                Find Your Dream Job
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-[#9ca3af] max-w-3xl mx-auto">
              Discover opportunities matched to your skills and preferences
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-md shadow-xl shadow-[#6366f1]/10">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9ca3af]" />
                    <Input
                      type="text"
                      placeholder="Search jobs, companies, or skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 text-base border-2 border-[#2a2a3a] bg-[#1e1e2e] text-[#e8e8f0] focus:border-[#6366f1] placeholder:text-[#9ca3af]"
                    />
                  </div>
                  <Button
                    onClick={() => setShowFilters(!showFilters)}
                    variant="outline"
                    className="h-12 px-6 border-2 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button
                    size="lg"
                    className="h-12 px-8 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-lg shadow-[#6366f1]/30"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>

                {/* Filters */}
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-[#2a2a3a] space-y-4"
                  >
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-[#9ca3af] mb-2 block">
                          Job Type
                        </label>
                        <select
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-full h-10 px-3 rounded-lg border-2 border-[#2a2a3a] bg-[#1e1e2e] text-[#e8e8f0] focus:border-[#6366f1]"
                        >
                          {jobTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                          Location
                        </label>
                        <select
                          value={selectedLocation}
                          onChange={(e) => setSelectedLocation(e.target.value)}
                          className="w-full h-10 px-3 rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-[#041F2B]"
                        >
                          {locations.map((location) => (
                            <option key={location} value={location}>
                              {location}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                          Experience Level
                        </label>
                        <select
                          value={selectedLevel}
                          onChange={(e) => setSelectedLevel(e.target.value)}
                          className="w-full h-10 px-3 rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-[#041F2B]"
                        >
                          {experienceLevels.map((level) => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-8 text-sm text-[#9ca3af]"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#6366f1]" />
              <span className="font-semibold text-[#e8e8f0]">{jobs.length}+</span>
              <span>Jobs Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-[#6366f1]" />
              <span className="font-semibold text-[#e8e8f0]">98%</span>
              <span>Match Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#6366f1]" />
              <span className="font-semibold text-[#e8e8f0]">24/7</span>
              <span>Updated Listings</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Filters */}
      <section className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h3 className="text-lg font-semibold text-[#e8e8f0]">Quick Filters</h3>
            <div className="flex flex-wrap items-center gap-3">
              {["Remote", "Full-time", "High Salary", "Featured", "New This Week"].map((filter, index) => (
                <motion.div
                  key={filter}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-2 border-[#2a2a3a] text-[#9ca3af] hover:border-[#6366f1] hover:bg-[#6366f1]/10 hover:text-[#6366f1] transition-all"
                  >
                    {filter}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Job Listings */}
      <section className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#e8e8f0] mb-2">
              {filteredJobs.length} Jobs Found
            </h2>
            <p className="text-sm text-[#9ca3af]">
              Showing best matches based on your profile
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#9ca3af]">
            <span>Sort by:</span>
            <select className="px-3 py-1.5 rounded-lg border-2 border-[#2a2a3a] bg-[#1e1e2e] text-[#e8e8f0] focus:border-[#6366f1]">
              <option>Best Match</option>
              <option>Newest</option>
              <option>Salary: High to Low</option>
              <option>Salary: Low to High</option>
            </select>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:gap-8">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="group relative overflow-hidden border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:bg-[#151520] hover:border-[#6366f1]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#6366f1]/10">
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                />
                
                {job.featured && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0 z-10 shadow-lg shadow-[#6366f1]/30">
                    Featured
                  </Badge>
                )}

                <CardHeader className="pb-4">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#6366f1]/30">
                          <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl sm:text-2xl mb-2 text-[#e8e8f0] group-hover:text-[#a5b4fc] transition-colors">
                            {job.title}
                          </CardTitle>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-[#9ca3af]">
                            <div className="flex items-center gap-1.5">
                              <Building2 className="h-4 w-4 flex-shrink-0" />
                              <span className="font-medium">{job.company}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4 flex-shrink-0" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Briefcase className="h-4 w-4 flex-shrink-0" />
                              <span>{job.type}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <DollarSign className="h-4 w-4 flex-shrink-0" />
                              <span>{job.salary}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <CardDescription className="text-base leading-relaxed text-[#9ca3af]">
                        {job.description}
                      </CardDescription>

                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        {job.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="bg-[#1e1e2e] text-[#9ca3af] border border-[#2a2a3a]"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col sm:items-center lg:items-end gap-3">
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#6366f1]/10"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Star className="h-4 w-4 text-[#6366f1] fill-[#6366f1]" />
                          <span className="text-sm font-semibold text-[#6366f1]">{job.match}% Match</span>
                        </motion.div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#9ca3af]">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Posted {job.posted}</span>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto lg:w-full">
                        <Button
                          asChild
                          variant="outline"
                          className="flex-1 border-2 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                        >
                          <Link href={`/jobs/${job.id}`}>View Details</Link>
                        </Button>
                        <Button
                          asChild
                          className="flex-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-lg shadow-[#6366f1]/30"
                        >
                          <Link href={`/jobs/${job.id}`}>Apply Now</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-[#9ca3af] mb-4">
              No jobs found matching your criteria
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedType("All");
                setSelectedLocation("All Locations");
                setSelectedLevel("All Levels");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </section>
    </div>
  );
}

