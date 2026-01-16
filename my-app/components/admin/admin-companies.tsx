"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Building2,
  MapPin,
  Users,
  Briefcase,
  Globe,
  Star,
  CheckCircle2,
  Edit,
  X,
  Download,
  Filter,
  Calendar,
  Mail,
  Phone,
  ExternalLink,
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { companiesAPI } from "@/lib/api";

const mockCompanies = [
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
    email: "contact@techcorp.com",
    phone: "+1 (555) 100-0000",
    recruiterCount: 5,
    activeJobs: 24,
    totalApplications: 342,
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
    email: "contact@designstudio.com",
    phone: "+1 (555) 200-0000",
    recruiterCount: 3,
    activeJobs: 12,
    totalApplications: 189,
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
    email: "contact@cloudtech.com",
    phone: "+1 (555) 300-0000",
    recruiterCount: 2,
    activeJobs: 10,
    totalApplications: 156,
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
    email: "contact@datalabs.com",
    phone: "+1 (555) 400-0000",
    recruiterCount: 4,
    activeJobs: 15,
    totalApplications: 278,
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
    email: "contact@brandco.com",
    phone: "+44 20 1234 5678",
    recruiterCount: 3,
    activeJobs: 18,
    totalApplications: 234,
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
    email: "contact@innovatehub.com",
    phone: "+1 (555) 600-0000",
    recruiterCount: 8,
    activeJobs: 32,
    totalApplications: 456,
  },
];

const industries = ["All Industries", "Technology", "Finance", "Healthcare", "Education", "E-commerce", "Consulting"];
const sizes = ["All Sizes", "Startup (1-50)", "Small (51-200)", "Medium (201-1000)", "Large (1000+)"];

export function AdminCompaniesContent() {
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [company, setCompany] = useState<any>(null);
  const [recruiterCompany, setRecruiterCompany] = useState("TechCorp");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const companyName = localStorage.getItem("adminCompany") || "TechCorp";
      setRecruiterCompany(companyName);
    }
    loadCompany();
  }, []);

  const loadCompany = async () => {
    try {
      setIsLoading(true);
      const response = await companiesAPI.getMyCompany();
      setCompany(response.company);
    } catch (error) {
      console.error("Failed to load company:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCompanies = company ? [company] : [];

  const selectedCompanyData = company;

  const toggleFeatured = async (companyId: number) => {
    if (!company) return;
    try {
      await companiesAPI.updateMyCompany({
        ...company,
        featured: !company.featured,
      });
      await loadCompany();
    } catch (error) {
      console.error("Failed to update company:", error);
    }
  };

  const toggleVerified = async (companyId: number) => {
    if (!company) return;
    try {
      await companiesAPI.updateMyCompany({
        ...company,
        verified: !company.verified,
      });
      await loadCompany();
    } catch (error) {
      console.error("Failed to update company:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 lg:pt-8 flex items-center justify-center">
        <p className="text-[#9ca3af]">Loading company information...</p>
      </div>
    );
  }


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
                    Company Profile
                  </span>
                </h1>
                <p className="text-lg text-[#9ca3af]">
                  Manage your company information and settings
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {filteredCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:border-[#6366f1]/30 transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-[#6366f1]/30">
                          {company.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-xl font-bold text-[#e8e8f0]">{company.name}</h3>
                                {company.verified && (
                                  <Badge className="bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                                {company.featured && (
                                  <Badge className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0">
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary" className="bg-[#1e1e2e] text-[#9ca3af] border border-[#2a2a3a]">
                                  {company.industry}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-[#6366f1] text-[#6366f1]" />
                                  <span className="text-sm font-semibold text-[#e8e8f0]">{company.rating}</span>
                                </div>
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-[#9ca3af]">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{company.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4" />
                                  <span>{company.size} • {company.employees} employees</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Briefcase className="h-4 w-4" />
                                  <span>{company.jobs} open positions</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Globe className="h-4 w-4" />
                                  <span>{company.website}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-[#9ca3af] mt-2">{company.description}</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:min-w-[250px]">
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div className="p-2 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                            <p className="text-xs text-[#9ca3af] mb-1">Recruiters</p>
                            <p className="text-lg font-bold text-[#e8e8f0]">{company.recruiterCount}</p>
                          </div>
                          <div className="p-2 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                            <p className="text-xs text-[#9ca3af] mb-1">Applications</p>
                            <p className="text-lg font-bold text-[#e8e8f0]">{company.totalApplications}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setSelectedCompany(company.id)}
                            variant="outline"
                            size="sm"
                            className="flex-1 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleFeatured(company.id)}
                            className={`${
                              company.featured
                                ? "border-[#6366f1] bg-[#6366f1]/10 text-[#6366f1]"
                                : "border-[#2a2a3a] text-[#9ca3af]"
                            }`}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleVerified(company.id)}
                            className={`${
                              company.verified
                                ? "border-[#10b981] bg-[#10b981]/10 text-[#10b981]"
                                : "border-[#2a2a3a] text-[#9ca3af]"
                            }`}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Building2 className="h-16 w-16 text-[#6366f1] mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-[#e8e8f0] mb-2">
                  {recruiterCompany 
                    ? `Company profile not found for ${recruiterCompany}`
                    : "No company information available"}
                </h3>
                <p className="text-[#9ca3af]">
                  {recruiterCompany
                    ? "Please contact support to set up your company profile"
                    : "Please ensure your company is set in your account settings"}
                </p>
                {recruiterCompany && (
                  <p className="text-sm text-[#6b7280] mt-2">Company: {recruiterCompany}</p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedCompany && selectedCompanyData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0f]/80 backdrop-blur-sm"
            onClick={() => {
              setSelectedCompany(null);
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
                    <CardTitle className="text-2xl font-bold text-[#e8e8f0]">Company Details</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedCompany(null)}
                      className="text-[#9ca3af] hover:text-[#e8e8f0] hover:bg-[#1e1e2e]"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-[#6366f1]/30">
                      {selectedCompanyData.logo}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-[#e8e8f0]">{selectedCompanyData.name}</h3>
                        {selectedCompanyData.verified && (
                          <Badge className="bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {selectedCompanyData.featured && (
                          <Badge className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary" className="bg-[#1e1e2e] text-[#9ca3af] border border-[#2a2a3a]">
                          {selectedCompanyData.industry}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-[#6366f1] text-[#6366f1]" />
                          <span className="text-sm font-semibold text-[#e8e8f0]">{selectedCompanyData.rating}</span>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-[#9ca3af]">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#6366f1]" />
                          <span>{selectedCompanyData.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-[#6366f1]" />
                          <span>{selectedCompanyData.size} • {selectedCompanyData.employees} employees</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-[#6366f1]" />
                          <a href={`mailto:${selectedCompanyData.email}`} className="text-[#6366f1] hover:underline">
                            {selectedCompanyData.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-[#6366f1]" />
                          <a href={`tel:${selectedCompanyData.phone}`} className="text-[#6366f1] hover:underline">
                            {selectedCompanyData.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-[#6366f1]" />
                          <a href={`https://${selectedCompanyData.website}`} target="_blank" rel="noopener noreferrer" className="text-[#6366f1] hover:underline flex items-center gap-1">
                            {selectedCompanyData.website}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#6366f1]" />
                          <span>Founded {selectedCompanyData.founded}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-[#e8e8f0]">Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#9ca3af] leading-relaxed">{selectedCompanyData.description}</p>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                      <CardHeader>
                        <CardTitle className="text-sm font-semibold text-[#9ca3af]">Active Jobs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold text-[#e8e8f0]">{selectedCompanyData.activeJobs}</p>
                      </CardContent>
                    </Card>
                    <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                      <CardHeader>
                        <CardTitle className="text-sm font-semibold text-[#9ca3af]">Total Applications</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold text-[#e8e8f0]">{selectedCompanyData.totalApplications}</p>
                      </CardContent>
                    </Card>
                    <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                      <CardHeader>
                        <CardTitle className="text-sm font-semibold text-[#9ca3af]">Recruiters</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold text-[#e8e8f0]">{selectedCompanyData.recruiterCount}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        toggleFeatured(selectedCompanyData.id);
                        setSelectedCompany(null);
                      }}
                      variant="outline"
                      className="flex-1 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                    >
                      {selectedCompanyData.featured ? "Remove from Featured" : "Mark as Featured"}
                    </Button>
                    <Button
                      onClick={() => {
                        toggleVerified(selectedCompanyData.id);
                        setSelectedCompany(null);
                      }}
                      variant="outline"
                      className="flex-1 border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                    >
                      {selectedCompanyData.verified ? "Unverify" : "Verify Company"}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
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
