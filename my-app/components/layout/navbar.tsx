"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Resume Scanner", href: "/resume-scanner" },
    { name: "Find Jobs", href: "/jobs" },
    { name: "Companies", href: "/companies" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled
        ? "bg-white/95 backdrop-blur-xl border-b border-[#041f2b]/10 shadow-lg shadow-[#041f2b]/5"
        : "bg-white/80 backdrop-blur-lg"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          <Link href="/" className="relative group flex items-center">
            <motion.div
              className="flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="relative w-12 h-12 rounded-2xl bg-[#041f2b] flex items-center justify-center shadow-xl shadow-[#041f2b]/20 text-white">
                <Sparkles className="h-6 w-6" />
              </div>
              <span className="text-3xl font-black text-[#041f2b] tracking-tight">
                GROEI
              </span>
            </motion.div>
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  className="relative px-5 py-3 text-sm font-bold text-[#041f2b]/60 hover:text-[#041f2b] transition-all duration-200 rounded-xl group uppercase tracking-widest text-[10px]"
                >
                  <span className="relative z-10">{link.name}</span>
                  <motion.span
                    className="absolute inset-0 bg-[#041f2b]/05 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="ghost"
              size="lg"
              asChild
              className="text-xs font-bold uppercase tracking-widest text-[#041f2b]/60 hover:text-[#041f2b] hover:bg-[#041f2b]/05 px-6 rounded-xl"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="bg-[#041f2b] text-white hover:bg-[#041f2b] hover:scale-105 active:scale-95 shadow-xl shadow-[#041f2b]/20 transition-all duration-300 px-8 py-6 rounded-2xl text-xs font-bold uppercase tracking-widest"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>

          <motion.button
            className="lg:hidden w-12 h-12 flex items-center justify-center rounded-2xl text-[#041f2b] bg-[#041f2b]/05 hover:bg-[#041f2b]/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-[#041f2b]/05 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-xs font-bold uppercase tracking-widest text-[#041f2b]/60 hover:text-[#041f2b] py-4 px-5 rounded-2xl hover:bg-[#041f2b]/05 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 space-y-3">
                <Button variant="outline" size="lg" asChild className="w-full rounded-2xl py-6 text-xs font-bold uppercase tracking-widest border-[#041f2b]/10">
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="lg" asChild className="w-full bg-[#041f2b] text-white rounded-2xl py-6 text-xs font-bold uppercase tracking-widest shadow-xl shadow-[#041f2b]/20">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
