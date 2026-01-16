"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  FileText,
  Save,
  Edit,
  Plus,
  X,
  Upload
} from "lucide-react";
import { motion } from "framer-motion";
import { authAPI } from "@/lib/api";

export function ProfileContent() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    bio: "",
    experience: "",
    education: "",
    skills: [] as string[],
    linkedin: "",
    github: "",
    portfolio: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const response = await authAPI.getProfile();
      if (response.user) {
        const userData = response.user;
        setProfile({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          location: userData.location || "",
          title: userData.title || "",
          bio: userData.bio || "",
          experience: userData.experience || "",
          education: userData.education || "",
          skills: userData.skills ? (typeof userData.skills === 'string' ? userData.skills.split(',').map(s => s.trim()) : userData.skills) : [],
          linkedin: userData.linkedin || "",
          github: userData.github || "",
          portfolio: userData.portfolio || "",
        });
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const updateData: any = {
        phone: profile.phone || null,
        location: profile.location || null,
        title: profile.title || null,
        bio: profile.bio || null,
        experience: profile.experience || null,
        education: profile.education || null,
        skills: profile.skills.join(',') || null,
        linkedin: profile.linkedin || null,
        github: profile.github || null,
        portfolio: profile.portfolio || null,
      };

      await authAPI.updateProfile(updateData);
      setIsEditing(false);
      await loadProfile();
    } catch (error) {
      console.error("Failed to save profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setProfile({ ...profile, skills: profile.skills.filter((s) => s !== skill) });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 lg:pt-8 flex items-center justify-center bg-[#0a0a0f]">
        <p className="text-[#9ca3af]">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 lg:pt-8">
      <section className="relative py-8 sm:py-12 md:py-16 bg-[#0a0a0f] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                  <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                    My Profile
                  </span>
                </h1>
                <p className="text-lg text-[#9ca3af]">
                  Manage your personal information and preferences
                </p>
              </div>
              <div className="flex gap-3">
                {isEditing ? (
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 disabled:opacity-50"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </motion.div>

          <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                <User className="h-5 w-5 text-[#6366f1]" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-[#6366f1]/30">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] mb-2"
                    />
                  ) : (
                    <h3 className="text-2xl font-bold text-[#e8e8f0] mb-2">{profile.name}</h3>
                  )}
                  {isEditing ? (
                    <Input
                      value={profile.title}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                      className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                    />
                  ) : (
                    <p className="text-lg text-[#a5b4fc]">{profile.title}</p>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e]"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Email</label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-[#e8e8f0]">
                      <Mail className="h-4 w-4 text-[#6366f1]" />
                      <span>{profile.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Phone</label>
                  {isEditing ? (
                    <Input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-[#e8e8f0]">
                      <Phone className="h-4 w-4 text-[#6366f1]" />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Location</label>
                  {isEditing ? (
                    <Input
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-[#e8e8f0]">
                      <MapPin className="h-4 w-4 text-[#6366f1]" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Experience</label>
                  {isEditing ? (
                    <Input
                      value={profile.experience}
                      onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                      className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-[#e8e8f0]">
                      <Briefcase className="h-4 w-4 text-[#6366f1]" />
                      <span>{profile.experience}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Bio</label>
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                    className="w-full bg-[#1e1e2e] border border-[#2a2a3a] rounded-lg px-3 py-2 text-[#e8e8f0] focus:outline-none focus:border-[#6366f1]"
                  />
                ) : (
                  <p className="text-[#9ca3af]">{profile.bio}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-[#6366f1]" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Input
                  value={profile.education}
                  onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                  className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                />
              ) : (
                <p className="text-[#e8e8f0]">{profile.education}</p>
              )}
            </CardContent>
          </Card>

          <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#6366f1]" />
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-[#1e1e2e] text-[#9ca3af] border border-[#2a2a3a] px-3 py-1"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 hover:text-[#ef4444]"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                    placeholder="Add a skill"
                    className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                  />
                  <Button
                    onClick={handleAddSkill}
                    variant="outline"
                    className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e]"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#6366f1]" />
                Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#9ca3af] mb-2 block">LinkedIn</label>
                {isEditing ? (
                  <Input
                    value={profile.linkedin}
                    onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                    className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                  />
                ) : (
                  <p className="text-[#e8e8f0]">{profile.linkedin}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-[#9ca3af] mb-2 block">GitHub</label>
                {isEditing ? (
                  <Input
                    value={profile.github}
                    onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                    className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                  />
                ) : (
                  <p className="text-[#e8e8f0]">{profile.github}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Portfolio</label>
                {isEditing ? (
                  <Input
                    value={profile.portfolio}
                    onChange={(e) => setProfile({ ...profile, portfolio: e.target.value })}
                    className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                  />
                ) : (
                  <p className="text-[#e8e8f0]">{profile.portfolio}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

