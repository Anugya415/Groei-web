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
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-xl border-b border-[#041f2b]/10 shadow-lg shadow-[#041f2b]/5" 
          : "bg-white/80 backdrop-blur-lg"
      }`}
    >
      <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="relative group flex items-center">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                className="relative w-11 h-11 rounded-xl bg-[#041f2b] flex items-center justify-center shadow-lg shadow-[#041f2b]/20"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-5 w-5 text-white" />
                <motion.div
                  className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 blur-md transition-opacity"
                />
              </motion.div>
              <span className="text-2xl font-bold text-[#041f2b] tracking-tight">
                GROEI
              </span>
            </motion.div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  className="relative px-4 py-2.5 text-sm font-medium text-[#041f2b]/70 hover:text-[#041f2b] transition-colors duration-200 rounded-lg group"
                >
                  <span className="relative z-10">{link.name}</span>
                  <motion.span
                    className="absolute inset-0 bg-[#041f2b]/05 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                  <motion.span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#041f2b] group-hover:w-3/4 transition-all duration-300 rounded-full"
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="ghost" 
                size="sm" 
                asChild 
                className="text-[#041f2b]/70 hover:text-[#041f2b] hover:bg-[#041f2b]/05 px-4 border-0"
              >
                <Link href="/login">Login</Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="sm" 
                asChild 
                className="bg-[#041f2b] text-white hover:bg-[#041f2b]/90 border-0 shadow-lg shadow-[#041f2b]/20 transition-all duration-300 px-5"
              >
                <Link href="/signup" className="flex items-center gap-1.5">
                  Sign Up
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.button
            className="lg:hidden p-2 rounded-lg text-[#041f2b] hover:bg-[#041f2b]/08 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white/98 backdrop-blur-xl overflow-hidden border-t border-[#041f2b]/10"
          >
            <div className="w-[80%] mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Link
                    href={link.href}
                    className="block text-sm font-medium text-[#041f2b]/70 hover:text-[#041f2b] py-2.5 px-3 rounded-lg hover:bg-[#041f2b]/08 transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="flex flex-col gap-2 pt-3 border-t border-[#041f2b]/10 mt-2">
                <motion.div
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="ghost" size="sm" asChild className="w-full justify-start text-[#041f2b]/70 hover:text-[#041f2b] hover:bg-[#041f2b]/08">
                    <Link href="/login">Login</Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileTap={{ scale: 0.98 }}
                >
                  <Button size="sm" asChild className="w-full bg-[#041f2b] text-white hover:bg-[#041f2b]/90 border-0 shadow-lg shadow-[#041f2b]/15">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
