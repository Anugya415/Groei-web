"use client";

import { motion } from "framer-motion";
import { Shield, FileText } from "lucide-react";

export function PrivacyContent() {
    return (
        <div className="min-h-screen pt-20 sm:pt-24 lg:pt-28">
            <section className="relative py-12 sm:py-16 bg-transparent overflow-hidden">
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
                        className="max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#041f2b]/05 backdrop-blur-sm border border-[#041f2b]/10 mb-4">
                            <Shield className="h-4 w-4 text-[#6366f1]" />
                            <span className="text-xs font-medium text-[#041f2b] uppercase tracking-wide">
                                Privacy
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#041f2b] mb-8">
                            Privacy Policy
                        </h1>
                        <div className="prose prose-lg prose-slate max-w-none bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-[#041f2b]/10 shadow-sm text-[#041f2b]/70">
                            <p>Last updated: January 27, 2026</p>

                            <h3>1. Introduction</h3>
                            <p>
                                Welcome to Groei. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at privacy@groei.com.
                            </p>

                            <h3>2. Information We Collect</h3>
                            <p>
                                We collect personal information that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website or otherwise when you contact us.
                            </p>
                            <ul>
                                <li>Personal Information Provided by You. Name, phone numbers, email addresses, mailing addresses, job titles, usernames, passwords, contact preferences, contact or authentication data, and other similar information.</li>
                                <li>Payment Data. We may collect data necessary to process your payment if you make purchases, like your payment instrument number, and the security code associated with your payment instrument.</li>
                            </ul>

                            <h3>3. How We Use Your Information</h3>
                            <p>
                                We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                            </p>

                            <h3>4. Sharing Your Information</h3>
                            <p>
                                We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export function TermsContent() {
    return (
        <div className="min-h-screen pt-20 sm:pt-24 lg:pt-28">
            <section className="relative py-12 sm:py-16 bg-transparent overflow-hidden">
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
                        className="max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#041f2b]/05 backdrop-blur-sm border border-[#041f2b]/10 mb-4">
                            <FileText className="h-4 w-4 text-[#6366f1]" />
                            <span className="text-xs font-medium text-[#041f2b] uppercase tracking-wide">
                                Terms
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#041f2b] mb-8">
                            Terms of Service
                        </h1>
                        <div className="prose prose-lg prose-slate max-w-none bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-[#041f2b]/10 shadow-sm text-[#041f2b]/70">
                            <p>Last updated: January 27, 2026</p>

                            <h3>1. Agreement to Terms</h3>
                            <p>
                                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Groei (“we,” “us” or “our”), concerning your access to and use of the Groei website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
                            </p>

                            <h3>2. Intellectual Property Rights</h3>
                            <p>
                                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                            </p>

                            <h3>3. User Representations</h3>
                            <p>
                                By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service.
                            </p>

                            <h3>4. Prohibited Activities</h3>
                            <p>
                                You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
