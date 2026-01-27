"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Mail, Lock, ArrowRight, Github } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { authAPI } from "@/lib/api";
import { setAuthCookies } from "@/lib/cookies";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { isAuthenticated, clearAuth } from "@/lib/auth";

export function LoginContent() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      let redirect = urlParams.get("redirect");

      // Prevent redirecting back to login or signup
      if (redirect && (redirect.startsWith("/login") || redirect.startsWith("/signup"))) {
        redirect = null;
      }

      // Check if user appears to be logged in
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      if (isLoggedIn) {
        // validate real authentication status
        if (isAuthenticated()) {
          // Only redirect if valid and not already on the destination
          const target = redirect || "/dashboard";
          if (window.location.pathname !== target) {
            router.push(target);
          }
        } else {
          // If local storage says logged in but auth is invalid, clear it to prevent loops
          clearAuth();
        }
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authAPI.login(email, password);

      if (!response || !response.user || !response.token) {
        throw new Error("Invalid response from server");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", response.user.role);
        if (response.token) {
          localStorage.setItem("authToken", response.token);
        }

        if (response.token) {
          setAuthCookies(response.token, response.user.role, true);
        }

        if (response.user.role === "admin") {
          localStorage.setItem("isAdminLoggedIn", "true");
          if (response.user.company_id) {
            localStorage.setItem("adminCompany", response.user.company_name || "");
          }
          if (response.user.name) {
            localStorage.setItem("adminName", response.user.name);
          }
          if (response.user.email) {
            localStorage.setItem("adminEmail", response.user.email);
          }

          const urlParams = new URLSearchParams(window.location.search);
          const redirect = urlParams.get("redirect");
          setIsLoading(false);
          router.push(redirect || "/admin");
        } else {
          if (response.user.name) {
            localStorage.setItem("userName", response.user.name);
          }
          if (response.user.email) {
            localStorage.setItem("userEmail", response.user.email);
          }

          const urlParams = new URLSearchParams(window.location.search);
          const redirect = urlParams.get("redirect");
          setIsLoading(false);
          router.push(redirect || "/dashboard");
        }
      }
    } catch (err: any) {
      let errorMessage = "Login failed. Please check your credentials.";

      if (err && err.message) {
        const msg = err.message.toLowerCase();
        if (msg.includes("connect to server") || msg.includes("failed to fetch") || msg.includes("network")) {
          errorMessage = "Unable to connect to server. Please make sure the backend is running on http://localhost:8080";
        } else if (msg.includes("database not initialized")) {
          errorMessage = "Database not initialized. Please run 'npm run init-db' in the backend folder.";
        } else if (msg.includes("invalid credentials") || msg.includes("invalid email") || msg.includes("invalid password")) {
          errorMessage = "Invalid email or password. Please check your credentials and try again.";
        } else {
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="fade-grid" />
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${250 + i * 60}px`,
              height: `${250 + i * 60}px`,
              background: `radial-gradient(circle, rgba(4, 31, 43, ${0.12 - i * 0.015}) 0%, transparent 70%)`,
              left: `${10 + i * 15}%`,
              top: `${10 + i * 12}%`,
            }}
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 18 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <div className="min-h-screen pt-20 sm:pt-24 lg:pt-28">
          <section className="relative pt-8 pb-12 sm:pt-10 sm:pb-16 md:pt-12 md:pb-20 overflow-hidden">

            <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-md mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-8 space-y-4"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#041f2b]/05 backdrop-blur-sm border border-[#041f2b]/10 mb-4">
                    <Sparkles className="h-4 w-4 text-[#041f2b]" />
                    <span className="text-xs font-medium text-[#041f2b] uppercase tracking-wide">
                      Welcome Back
                    </span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                    <span className="text-[#041f2b]">
                      Sign In
                    </span>
                  </h1>
                  <p className="text-lg text-[#041f2b]/70">
                    Access your account and continue your career journey
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="border border-[#041f2b]/15 bg-white backdrop-blur-md shadow-xl shadow-[#041f2b]/10">
                    <CardHeader className="space-y-1 pb-6">
                      <CardTitle className="text-2xl font-bold text-[#041f2b]">Login to your account</CardTitle>
                      <CardDescription className="text-[#041f2b]/70">
                        Enter your credentials to access your account
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {error && (
                        <div className="p-3 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] text-sm">
                          {error}
                        </div>
                      )}
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-[#041f2b]">
                            Email
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#041f2b]/60" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="you@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="pl-10 h-12 border-2 border-[#041f2b]/20 bg-white text-[#041f2b] focus:border-[#041f2b] placeholder:text-[#041f2b]/50"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="password" className="text-sm font-medium text-[#041f2b]">
                            Password
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#041f2b]/60" />
                            <Input
                              id="password"
                              type="password"
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              className="pl-10 h-12 border-2 border-[#041f2b]/20 bg-white text-[#041f2b] focus:border-[#041f2b] placeholder:text-[#041f2b]/50"
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="remember"
                              className="w-4 h-4 rounded border-[#041f2b]/20 bg-white text-[#041f2b] focus:ring-[#041f2b] focus:ring-offset-0"
                            />
                            <label htmlFor="remember" className="text-sm text-[#041f2b]/70">
                              Remember me
                            </label>
                          </div>
                          <Link
                            href="/forgot-password"
                            className="text-sm text-[#041f2b] hover:text-[#041f2b]/80 transition-colors"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <Button
                          type="submit"
                          disabled={isLoading || !email || !password}
                          className="w-full h-12 bg-[#041f2b] text-white hover:bg-[#041f2b]/90 border-0 shadow-lg shadow-[#041f2b]/20 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? "Signing in..." : "Sign In"}
                          {!isLoading && <ArrowRight className="h-5 w-5 ml-2" />}
                        </Button>
                      </form>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-[#041f2b]/15"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white text-[#041f2b]/70">Or continue with</span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full h-12 border-2 border-[#041f2b]/20 text-[#041f2b] hover:bg-[#041f2b]/05 hover:border-[#041f2b]/30"
                      >
                        <Github className="h-5 w-5 mr-2" />
                        Sign in with GitHub
                      </Button>

                      <div className="text-center text-sm text-[#041f2b]/70">
                        Don't have an account?{" "}
                        <Link
                          href="/signup"
                          className="text-[#041f2b] hover:text-[#041f2b]/80 font-semibold transition-colors"
                        >
                          Sign up
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
}



