"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = {
  platform: [
    { name: "Find Jobs", href: "/jobs" },
    { name: "Freelancers", href: "/freelancers" },
    { name: "Companies", href: "/companies" },
    { name: "Mock Interview", href: "/mock-interview" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Help Center", href: "/help" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
  ],
};

const socialLinks = [
  { icon: Github, href: "/github", label: "GitHub" },
  { icon: Twitter, href: "/twitter", label: "Twitter" },
  { icon: Linkedin, href: "/linkedin", label: "LinkedIn" },
  { icon: Mail, href: "/email", label: "Email" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0a0f] border-t border-[#2a2a3a]">
      <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-8 sm:gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-2 md:col-span-2 space-y-6"
          >
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#ec4899] flex items-center justify-center shadow-lg shadow-[#6366f1]/30">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent tracking-tight">
                  GROEI
                </span>
              </div>
            </Link>
            <p className="text-sm text-[#9ca3af] max-w-md leading-relaxed">
              AI-powered freelance marketplace & job portal connecting talented professionals with top companies worldwide.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.div
                    key={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={social.href}
                      className="w-11 h-11 rounded-xl bg-[#151520] hover:bg-[#1e1e2e] border border-[#2a2a3a] hover:border-[#6366f1]/50 flex items-center justify-center transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5 text-[#9ca3af] group-hover:text-[#6366f1] transition-colors" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="font-semibold text-[#e8e8f0] capitalize">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-[#9ca3af] hover:text-[#6366f1] transition-colors inline-block hover:translate-x-1 transform duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>


        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center text-sm text-[#9ca3af] gap-4 pt-8 border-t border-[#2a2a3a]"
        >
          <p>© {currentYear} GROEI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#6366f1] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#6366f1] transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-[#6366f1] transition-colors">
              Cookies
            </Link>
          </div>
        </motion.div>
        </div>
      </div>
    </footer>
  );
}
