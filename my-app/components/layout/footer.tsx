"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Linkedin, Mail, Sparkles } from "lucide-react";
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
    <footer className="relative bg-transparent border-t border-[#041f2b]/10 pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-12 sm:gap-16 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-2 md:col-span-2 space-y-8"
            >
              <Link href="/" className="inline-block group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#041f2b] flex items-center justify-center shadow-xl shadow-[#041f2b]/20 text-white">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <span className="text-3xl font-black text-[#041f2b] tracking-tight">
                    GROEI
                  </span>
                </div>
              </Link>
              <p className="text-lg text-[#041f2b]/50 max-w-sm leading-relaxed font-medium">
                The AI-powered platform connecting elite talent with exceptional opportunities worldwide.
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.div
                      key={social.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      whileHover={{ y: -5 }}
                    >
                      <Link
                        href={social.href}
                        className="w-12 h-12 rounded-2xl bg-white border border-[#041f2b]/10 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:border-[#041f2b]/20 text-[#041f2b]/40 hover:text-[#041f2b]"
                        aria-label={social.label}
                      >
                        <Icon className="h-6 w-6" />
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
                className="space-y-6"
              >
                <h3 className="text-xs font-black text-[#041f2b] uppercase tracking-[0.2em]">{category}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-base text-[#041f2b]/50 hover:text-[#041f2b] transition-all inline-block hover:translate-x-1 font-medium"
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
            className="flex flex-col md:flex-row justify-between items-center text-sm font-bold text-[#041f2b]/30 gap-6 pt-10 border-t border-[#041f2b]/05"
          >
            <p>© {currentYear} GROEI. Built with Precision.</p>
            <div className="flex gap-8">
              <Link href="/privacy" className="hover:text-[#041f2b] transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-[#041f2b] transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="hover:text-[#041f2b] transition-colors">
                Cookies
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
