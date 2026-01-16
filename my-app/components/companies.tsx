"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Building2, 
  Users, 
  Briefcase, 
  Filter,
  Sparkles,
  TrendingUp,
  Globe,
  Star,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const industries = ["All Industries", "Technology", "Finance", "Healthcare", "Education", "E-commerce", "Consulting"];
const sizes = ["All Sizes", "Startup (1-50)", "Small (51-200)", "Medium (201-1000)", "Large (1000+)"];
const locations = ["All Locations", "Remote", "New York", "San Francisco", "London", "Toronto"];

const companies = [
  {
    id: 1,
    name: "TechCorp",
    industry: "Technology",
    location: "San Francisco, CA",
    size: "Large (1000+)",
    employees: "5,000+",
    jobs: 24,
    description: "Leading technology company building innovative solutions for the future.",
    website: "techcorp.com",
    founded: 2010,
    rating: 4.8,
    verified: true,
    featured: true,
    logo: "TC",
  },
  {
    id: 2,
    name: "Design Studio",
    industry: "Technology",
    location: "Remote",
    size: "Medium (201-1000)",
    employees: "450",
    jobs: 12,
    description: "Creative agency specializing in digital design and user experience.",
    website: "designstudio.com",
    founded: 2015,
    rating: 4.9,
    verified: true,
    featured: true,
    logo: "DS",
  },
  {
    id: 3,
    name: "CloudTech",
    industry: "Technology",
    location: "Toronto, ON",
    size: "Small (51-200)",
    employees: "180",
    jobs: 10,
    description: "Cloud infrastructure and DevOps solutions provider.",
    website: "cloudtech.com",
    founded: 2016,
    rating: 4.8,
    verified: true,
    featured: true,
    logo: "CT",
  },
  {
    id: 4,
    name: "DataLabs",
    industry: "Technology",
    location: "Remote",
    size: "Medium (201-1000)",
    employees: "320",
    jobs: 15,
    description: "Data science company providing AI and machine learning solutions.",
    website: "datalabs.com",
    founded: 2018,
    rating: 4.7,
    verified: true,
    featured: true,
    logo: "DL",
  },
  {
    id: 5,
    name: "BrandCo",
    industry: "E-commerce",
    location: "London, UK",
    size: "Medium (201-1000)",
    employees: "520",
    jobs: 18,
    description: "E-commerce platform connecting brands with customers worldwide.",
    website: "brandco.com",
    founded: 2012,
    rating: 4.6,
    verified: true,
    featured: true,
    logo: "BC",
  },
  {
    id: 6,
    name: "InnovateHub",
    industry: "Technology",
    location: "New York, NY",
    size: "Large (1000+)",
    employees: "2,500+",
    jobs: 32,
    description: "Innovation-driven company transforming industries through technology.",
    website: "innovatehub.com",
    founded: 2014,
    rating: 4.9,
    verified: true,
    featured: true,
    logo: "IH",
  },
];

export function CompaniesContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedSize, setSelectedSize] = useState("All Sizes");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [showFilters, setShowFilters] = useState(false);

  const topCompanies = companies.filter(company => company.featured);
  
  const filteredCompanies = topCompanies.filter((company) => {
    const matchesSearch = 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = selectedIndustry === "All Industries" || company.industry === selectedIndustry;
    const matchesSize = selectedSize === "All Sizes" || company.size === selectedSize;
    const matchesLocation = selectedLocation === "All Locations" || 
      company.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesIndustry && matchesSize && matchesLocation;
  });

  return (
    <div className="min-h-screen pt-20 sm:pt-24 lg:pt-28">
      {/* Hero Section */}
      <section className="relative py-6 sm:py-8 md:py-10 bg-[#0a0a0f] overflow-hidden">
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
            className="text-center mb-8 space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151520]/50 backdrop-blur-sm border border-[#6366f1]/20 mb-3">
              <Sparkles className="h-4 w-4 text-[#6366f1]" />
              <span className="text-xs font-medium text-[#a5b4fc] uppercase tracking-wide">
                Top Companies
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                Top Companies
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#9ca3af] max-w-3xl mx-auto">
              Discover leading companies actively hiring and find your perfect workplace
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
                      placeholder="Search companies, industries, or locations..."
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
                          Industry
                        </label>
                        <select
                          value={selectedIndustry}
                          onChange={(e) => setSelectedIndustry(e.target.value)}
                          className="w-full h-10 px-3 rounded-lg border-2 border-[#2a2a3a] bg-[#1e1e2e] text-[#e8e8f0] focus:border-[#6366f1]"
                        >
                          {industries.map((industry) => (
                            <option key={industry} value={industry}>
                              {industry}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#9ca3af] mb-2 block">
                          Company Size
                        </label>
                        <select
                          value={selectedSize}
                          onChange={(e) => setSelectedSize(e.target.value)}
                          className="w-full h-10 px-3 rounded-lg border-2 border-[#2a2a3a] bg-[#1e1e2e] text-[#e8e8f0] focus:border-[#6366f1]"
                        >
                          {sizes.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#9ca3af] mb-2 block">
                          Location
                        </label>
                        <select
                          value={selectedLocation}
                          onChange={(e) => setSelectedLocation(e.target.value)}
                          className="w-full h-10 px-3 rounded-lg border-2 border-[#2a2a3a] bg-[#1e1e2e] text-[#e8e8f0] focus:border-[#6366f1]"
                        >
                          {locations.map((location) => (
                            <option key={location} value={location}>
                              {location}
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
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-8 text-sm sm:text-base text-[#9ca3af]"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#6366f1]" />
              <span className="font-semibold text-[#e8e8f0]">{topCompanies.length}</span>
              <span>Top Companies</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-[#6366f1]" />
              <span className="font-semibold text-[#e8e8f0]">
                {topCompanies.reduce((sum, c) => sum + c.jobs, 0)}+
              </span>
              <span>Open Positions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#6366f1]" />
              <span className="font-semibold text-[#e8e8f0]">100%</span>
              <span>Verified</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Listings */}
      <section className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#e8e8f0] mb-2">
              {filteredCompanies.length} Top Companies
            </h2>
            <p className="text-sm sm:text-base text-[#9ca3af]">
              Leading companies actively hiring on GROEI
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#9ca3af]">
            <span>Sort by:</span>
            <select className="px-3 py-1.5 rounded-lg border-2 border-[#2a2a3a] bg-[#1e1e2e] text-[#e8e8f0] focus:border-[#6366f1] text-sm">
              <option>Highest Rated</option>
              <option>Most Jobs</option>
              <option>Largest</option>
              <option>Newest</option>
            </select>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredCompanies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="group relative overflow-hidden border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:bg-[#151520] hover:border-[#6366f1]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#6366f1]/10 h-full flex flex-col">
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  whileHover={{ scaleX: 1 }}
                />
                
                {company.featured && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0 z-10 shadow-lg shadow-[#6366f1]/30">
                    Featured
                  </Badge>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#6366f1]/30">
                      <span className="text-xl font-bold text-white">{company.logo}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <CardTitle className="text-xl sm:text-2xl md:text-3xl text-[#e8e8f0] group-hover:text-[#a5b4fc] transition-colors">
                          {company.name}
                        </CardTitle>
                        {company.verified && (
                          <CheckCircle2 className="h-5 w-5 text-[#6366f1] flex-shrink-0" title="Verified Company" />
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="bg-[#1e1e2e] text-[#9ca3af] border border-[#2a2a3a]">
                          {company.industry}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-[#6366f1] text-[#6366f1]" />
                          <span className="text-sm font-semibold text-[#e8e8f0]">{company.rating}</span>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-[#9ca3af] mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span>{company.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 flex-shrink-0" />
                          <span>{company.size} • {company.employees} employees</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 flex-shrink-0" />
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{company.jobs} open positions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 flex-shrink-0" />
                          <span>{company.website}</span>
                        </div>
                      </div>

                      <CardDescription className="text-sm leading-relaxed text-[#9ca3af] mb-3">
                        {company.description}
                      </CardDescription>

                      <div className="flex items-center gap-2 text-xs text-[#9ca3af]">
                        <span>Founded {company.founded}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 mt-auto">
                  <div className="flex gap-2">
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 border-2 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                    >
                      <Link href={`/companies/${company.id}`}>View Jobs</Link>
                    </Button>
                    <Button
                      asChild
                      className="flex-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 shadow-lg shadow-[#6366f1]/30"
                    >
                      <Link href={`/companies/${company.id}`}>View Company</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-[#9ca3af] mb-4">
              No companies found matching your criteria
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedIndustry("All Industries");
                setSelectedSize("All Sizes");
                setSelectedLocation("All Locations");
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


