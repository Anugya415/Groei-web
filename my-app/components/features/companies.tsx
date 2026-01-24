"use client";

import { useState, useEffect } from "react";
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
import { companiesAPI } from "@/lib/api";



const MOCK_COMPANIES = [
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

  const [companies, setCompanies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      setIsLoading(true);
      const response = await companiesAPI.getAll();
      if (response.companies) {
        const formattedCompanies = response.companies.map((company: any) => ({
          id: company.id,
          name: company.name || "",
          industry: company.industry || "",
          location: company.location || "",
          size: company.size || "",
          employees: company.employee_count ? `${company.employee_count}+` : "",
          jobs: company.job_count || 0,
          description: company.description || "",
          website: company.website || "",
          founded: company.founded_year || null,
          rating: 4.5,
          verified: company.verified || false,
          featured: company.featured || false,
          logo: company.name ? company.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : "CO",
        }));
        setCompanies(formattedCompanies);
      }
    } catch (error) {
      console.error("Failed to load companies:", error);
      setCompanies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const topCompanies = companies.filter(company => company.featured);



  return (
    <div className="min-h-screen pt-20 sm:pt-24 lg:pt-28">
      {/* Hero Section */}
      <section className="relative py-6 sm:py-8 md:py-10 bg-transparent overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="fade-grid" />
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

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#041f2b]/05 backdrop-blur-sm border border-[#041f2b]/10 mb-3">
              <Sparkles className="h-4 w-4 text-[#6366f1]" />
              <span className="text-xs font-medium text-[#041f2b] uppercase tracking-wide">
                Top Companies
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[#041f2b] to-[#4338ca] bg-clip-text text-transparent">
                Top Companies
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#041f2b]/60 max-w-3xl mx-auto">
              Discover leading companies actively hiring and find your perfect workplace
            </p>
          </motion.div>



          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-8 text-sm sm:text-base text-[#041f2b]/60"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#6366f1]" />
              <span className="font-semibold text-[#041f2b]">{topCompanies.length}</span>
              <span>Top Companies</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-[#6366f1]" />
              <span className="font-semibold text-[#041f2b]">
                {topCompanies.reduce((sum, c) => sum + c.jobs, 0)}+
              </span>
              <span>Open Positions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#6366f1]" />
              <span className="font-semibold text-[#041f2b]">100%</span>
              <span>Verified</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Listings */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#041f2b] mb-2">
              {topCompanies.length} Top Companies
            </h2>
            <p className="text-sm sm:text-base text-[#041f2b]/60">
              Leading companies actively hiring on GROEI
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#041f2b]/60">
            <span>Sort by:</span>
            <select className="px-3 py-1.5 rounded-lg border-2 border-[#041f2b]/10 bg-[#041f2b]/05 text-[#041f2b] focus:border-[#6366f1] text-sm">
              <option>Highest Rated</option>
              <option>Most Jobs</option>
              <option>Largest</option>
              <option>Newest</option>
            </select>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {topCompanies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="group relative overflow-hidden border border-[#041f2b]/10 bg-white/50 backdrop-blur-sm hover:bg-white hover:border-[#6366f1]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#6366f1]/10 h-full flex flex-col">
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
                        <CardTitle className="text-xl sm:text-2xl md:text-3xl text-[#041f2b] group-hover:text-[#6366f1] transition-colors">
                          {company.name}
                        </CardTitle>
                        {company.verified && (
                          <CheckCircle2 className="h-5 w-5 text-[#6366f1] flex-shrink-0" />
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="bg-[#041f2b]/05 text-[#041f2b]/60 border border-[#041f2b]/10">
                          {company.industry}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-[#6366f1] text-[#6366f1]" />
                          <span className="text-sm font-semibold text-[#041f2b]">{company.rating}</span>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-[#041f2b]/60 mb-4">
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
                          <span className="font-semibold text-slate-900">{company.jobs} open positions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 flex-shrink-0" />
                          <span>{company.website}</span>
                        </div>
                      </div>

                      <CardDescription className="text-sm leading-relaxed text-[#041f2b]/60 mb-3">
                        {company.description}
                      </CardDescription>

                      <div className="flex items-center gap-2 text-xs text-[#041f2b]/60">
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
                      className="flex-1 border-2 border-[#041f2b]/20 text-[#041f2b] hover:bg-[#041f2b]/05 hover:border-[#6366f1]/50"
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

        {topCompanies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-[#041f2b]/60 mb-4">
              No top companies found at the moment
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
}


