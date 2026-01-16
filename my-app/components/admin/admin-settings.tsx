"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  User,
  Bell,
  Shield,
  Mail,
  Lock,
  Building2,
  Eye,
  EyeOff,
  Save,
  Download,
  Key,
  AlertTriangle,
  Phone,
  Globe
} from "lucide-react";
import { motion } from "framer-motion";
import { adminAPI, authAPI } from "@/lib/api";

const mockAdmin = {
  name: "Sarah Johnson",
  email: "sarah.johnson@techcorp.com",
  phone: "+1 (555) 123-4567",
  company: "TechCorp",
  role: "Recruiter",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export function AdminSettingsContent() {
  const [activeTab, setActiveTab] = useState("account");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    applicationAlerts: true,
    weeklyReports: true,
    systemUpdates: true,
    smsNotifications: false,
  });
  const [adminData, setAdminData] = useState(mockAdmin);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveType, setSaveType] = useState<"account" | "notifications" | null>(null);

  useEffect(() => {
    loadProfile();
    loadSettings();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      if (response.user) {
        setAdminData(prev => ({
          ...prev,
          name: response.user.name,
          email: response.user.email,
          company: response.user.company_name || localStorage.getItem("adminCompany") || "TechCorp",
        }));
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
      if (typeof window !== "undefined") {
        const company = localStorage.getItem("adminCompany") || "TechCorp";
        const name = localStorage.getItem("adminName") || "Recruiter";
        const email = localStorage.getItem("adminEmail") || "recruiter@techcorp.com";
        setAdminData(prev => ({
          ...prev,
          company,
          name,
          email,
        }));
      }
    }
  };

  const loadSettings = async () => {
    try {
      const response = await adminAPI.getSettings();
      if (response.settings) {
        setSettings(prev => ({
          ...prev,
          emailNotifications: response.settings.email_notifications ?? true,
          applicationAlerts: response.settings.application_alerts ?? true,
          weeklyReports: response.settings.weekly_reports ?? true,
          systemUpdates: response.settings.system_updates ?? true,
          smsNotifications: response.settings.sms_notifications ?? false,
        }));
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  };

  const handleSave = async (type: "account" | "notifications") => {
    try {
      if (type === "notifications") {
        await adminAPI.updateSettings({
          email_notifications: settings.emailNotifications,
          application_alerts: settings.applicationAlerts,
          weekly_reports: settings.weeklyReports,
          system_updates: settings.systemUpdates,
          sms_notifications: settings.smsNotifications,
        });
      } else if (type === "account") {
        await authAPI.getProfile();
      }
      setSaveType(type);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setSaveType(null);
      }, 3000);
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
  ];

  return (
    <div className="min-h-screen pt-16 lg:pt-8">
      <section className="relative py-8 sm:py-12 md:py-16 bg-[#0a0a0f] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
              <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                Admin Settings
              </span>
            </h1>
            <p className="text-lg text-[#9ca3af]">
              Manage your admin account settings and preferences
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
                <CardContent className="p-4">
                  <nav className="space-y-1">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            activeTab === tab.id
                              ? "bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20 text-[#a5b4fc] border border-[#6366f1]/30"
                              : "text-[#9ca3af] hover:text-[#e8e8f0] hover:bg-[#1e1e2e]"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{tab.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3 space-y-6">
              {activeTab === "account" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                        <User className="h-5 w-5 text-[#6366f1]" />
                        Account Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Full Name</label>
                        <Input
                          value={adminData.name}
                          onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
                          className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Email</label>
                        <Input
                          type="email"
                          value={adminData.email}
                          onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                          className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Phone Number</label>
                        <Input
                          type="tel"
                          value={adminData.phone}
                          onChange={(e) => setAdminData({ ...adminData, phone: e.target.value })}
                          className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Company</label>
                        <Input
                          value={adminData.company}
                          disabled
                          className="bg-[#1e1e2e] border-[#2a2a3a] text-[#9ca3af] opacity-50"
                        />
                        <p className="text-xs text-[#9ca3af] mt-1">Company cannot be changed</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Role</label>
                        <Input
                          value={adminData.role}
                          disabled
                          className="bg-[#1e1e2e] border-[#2a2a3a] text-[#9ca3af] opacity-50"
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={() => handleSave("account")}
                          className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        {saveSuccess && saveType === "account" && (
                          <Badge className="bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30">
                            Saved successfully!
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeTab === "notifications" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                        <Bell className="h-5 w-5 text-[#6366f1]" />
                        Notification Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-[#6366f1]" />
                            <div>
                              <p className="font-medium text-[#e8e8f0]">Email Notifications</p>
                              <p className="text-sm text-[#9ca3af]">Receive notifications via email</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.emailNotifications}
                              onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#2a2a3a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366f1]"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                          <div className="flex items-center gap-3">
                            <Bell className="h-5 w-5 text-[#6366f1]" />
                            <div>
                              <p className="font-medium text-[#e8e8f0]">Application Alerts</p>
                              <p className="text-sm text-[#9ca3af]">Get notified about new applications</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.applicationAlerts}
                              onChange={(e) => setSettings({ ...settings, applicationAlerts: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#2a2a3a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366f1]"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-[#6366f1]" />
                            <div>
                              <p className="font-medium text-[#e8e8f0]">Weekly Reports</p>
                              <p className="text-sm text-[#9ca3af]">Receive weekly platform analytics reports</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.weeklyReports}
                              onChange={(e) => setSettings({ ...settings, weeklyReports: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#2a2a3a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366f1]"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                          <div className="flex items-center gap-3">
                            <Bell className="h-5 w-5 text-[#6366f1]" />
                            <div>
                              <p className="font-medium text-[#e8e8f0]">System Updates</p>
                              <p className="text-sm text-[#9ca3af]">Notifications about platform updates and maintenance</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.systemUpdates}
                              onChange={(e) => setSettings({ ...settings, systemUpdates: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#2a2a3a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366f1]"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                          <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-[#6366f1]" />
                            <div>
                              <p className="font-medium text-[#e8e8f0]">SMS Notifications</p>
                              <p className="text-sm text-[#9ca3af]">Receive important updates via SMS</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.smsNotifications}
                              onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[#2a2a3a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366f1]"></div>
                          </label>
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={() => handleSave("notifications")}
                          className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Preferences
                        </Button>
                        {saveSuccess && saveType === "notifications" && (
                          <Badge className="bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30">
                            Preferences saved!
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-[#e8e8f0] flex items-center gap-2">
                        <Lock className="h-5 w-5 text-[#6366f1]" />
                        Security Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Current Password</label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={adminData.currentPassword}
                            onChange={(e) => setAdminData({ ...adminData, currentPassword: e.target.value })}
                            className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] pr-10"
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9ca3af] hover:text-[#e8e8f0]"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-[#9ca3af] mb-2 block">New Password</label>
                        <div className="relative">
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            value={adminData.newPassword}
                            onChange={(e) => setAdminData({ ...adminData, newPassword: e.target.value })}
                            className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0] pr-10"
                            placeholder="Enter new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9ca3af] hover:text-[#e8e8f0]"
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <p className="text-xs text-[#9ca3af] mt-1">Must be at least 8 characters long</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-[#9ca3af] mb-2 block">Confirm New Password</label>
                        <Input
                          type="password"
                          value={adminData.confirmPassword}
                          onChange={(e) => setAdminData({ ...adminData, confirmPassword: e.target.value })}
                          className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                          placeholder="Confirm new password"
                        />
                        {adminData.newPassword && adminData.confirmPassword && adminData.newPassword !== adminData.confirmPassword && (
                          <p className="text-xs text-[#ef4444] mt-1">Passwords do not match</p>
                        )}
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          disabled={adminData.newPassword && adminData.newPassword !== adminData.confirmPassword}
                          className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0 disabled:opacity-50"
                        >
                          <Key className="h-4 w-4 mr-2" />
                          Update Password
                        </Button>
                      </div>

                      <div className="pt-6 border-t border-[#2a2a3a]">
                        <div className="flex items-start gap-3 p-4 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/30">
                          <AlertTriangle className="h-5 w-5 text-[#ef4444] mt-0.5" />
                          <div>
                            <p className="font-medium text-[#e8e8f0] mb-1">Two-Factor Authentication</p>
                            <p className="text-sm text-[#9ca3af] mb-3">Add an extra layer of security to your admin account</p>
                            <Button
                              variant="outline"
                              className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e]"
                            >
                              Enable 2FA
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
