"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  BarChart3,
  Settings,
  Shield,
  LogOut,
  Menu,
  X,
  UserCog,
  Activity,
  Database,
  Key,
  FileText,
  Bell,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/super-admin" },
  { icon: Users, label: "All Users", href: "/super-admin/users" },
  { icon: Building2, label: "Companies", href: "/super-admin/companies" },
  { icon: Briefcase, label: "Applications", href: "/super-admin/applications" },
  { icon: UserCog, label: "Roles & Permissions", href: "/super-admin/roles" },
  { icon: BarChart3, label: "Analytics", href: "/super-admin/analytics" },
  { icon: Activity, label: "Activity Logs", href: "/super-admin/activity" },
  { icon: Settings, label: "System Settings", href: "/super-admin/settings" },
];

export function SuperAdminSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState({
    name: "Super Admin",
    email: "",
    role: "Super Admin",
    avatar: "SA",
  });
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("superAdminEmail") || localStorage.getItem("adminEmail") || "";
      const name = localStorage.getItem("superAdminName") || localStorage.getItem("adminName") || "Super Admin";

      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "SA";

      setAdminInfo({
        name,
        email,
        role: "Super Admin",
        avatar: initials,
      });
    }
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 lg:hidden bg-[#0a0a0f] border-b border-[#2a2a3a] h-16 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ec4899] via-[#8b5cf6] to-[#6366f1] flex items-center justify-center shadow-lg shadow-[#ec4899]/30">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
            Super Admin
          </span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="text-[#e8e8f0] hover:bg-[#1e1e2e]"
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-[#151520] border-r border-[#2a2a3a] lg:hidden overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ec4899] to-[#8b5cf6] flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-[#ec4899]/30">
                    {adminInfo.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#e8e8f0]">{adminInfo.name}</p>
                    <p className="text-xs text-[#ec4899]">{adminInfo.role}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileOpen(false)}
                  className="text-[#9ca3af] hover:text-[#e8e8f0] hover:bg-[#1e1e2e]"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                        ? "bg-gradient-to-r from-[#ec4899]/20 to-[#8b5cf6]/20 text-[#a5b4fc] border border-[#ec4899]/30"
                        : "text-[#9ca3af] hover:text-[#e8e8f0] hover:bg-[#1e1e2e]"
                        }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-6 pt-6 border-t border-[#2a2a3a]">
                <Button
                  variant="ghost"
                  onClick={() => {
                    authAPI.logout();
                    setTimeout(() => {
                      window.location.href = "/login";
                    }, 100);
                  }}
                  className="w-full justify-start text-[#9ca3af] hover:text-[#ef4444] hover:bg-[#ef4444]/10"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0a0a0f]/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-[#151520] border-r border-[#2a2a3a] flex-col z-30">
        <div className="p-6 border-b border-[#2a2a3a]">
          <Link href="/" className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ec4899] via-[#8b5cf6] to-[#6366f1] flex items-center justify-center shadow-lg shadow-[#ec4899]/30">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
              Super Admin
            </span>
          </Link>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-[#ec4899]/10 to-[#8b5cf6]/10 border border-[#ec4899]/30">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ec4899] to-[#8b5cf6] flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-[#ec4899]/30">
              {adminInfo.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#e8e8f0] truncate">{adminInfo.name}</p>
              <p className="text-xs text-[#ec4899] truncate">{adminInfo.role}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${isActive
                  ? "bg-gradient-to-r from-[#ec4899]/20 to-[#8b5cf6]/20 text-[#a5b4fc] border border-[#ec4899]/30"
                  : "text-[#9ca3af] hover:text-[#e8e8f0] hover:bg-[#1e1e2e]"
                  }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-[#ec4899]" : ""}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    className="ml-auto w-2 h-2 rounded-full bg-[#ec4899]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#2a2a3a]">
          <Button
            variant="ghost"
            onClick={() => {
              authAPI.logout();
              setTimeout(() => {
                window.location.href = "/login";
              }, 100);
            }}
            className="w-full justify-start text-[#9ca3af] hover:text-[#ef4444] hover:bg-[#ef4444]/10"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}

