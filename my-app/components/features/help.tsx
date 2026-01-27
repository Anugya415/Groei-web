"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Sparkles, HelpCircle, FileText, UserCircle, Shield, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const FAQS = [
    {
        category: "General",
        questions: [
            {
                q: "What is Groei?",
                a: "Groei is an AI-powered recruitment platform that connects job seekers with top companies and varied opportunities. We use advanced algorithms to match skills and preferences with the perfect roles."
            },
            {
                q: "Is Groei free to use?",
                a: "Yes, candidates can create a profile, search for jobs, and apply for free. We also offer premium features for enhanced visibility and career tools."
            },
        ]
    },
    {
        category: "Account & Profile",
        questions: [
            {
                q: "How do I verify my profile?",
                a: "You can verify your profile by completing the identity verification process in your account settings. This adds a trusted badge to your profile."
            },
            {
                q: "Can I hide my profile from current employer?",
                a: "Yes, you can manage privacy settings to control who can see your profile and job seeking status."
            },
        ]
    },
    {
        category: "Jobs & Applications",
        questions: [
            {
                q: "How does the AI matching work?",
                a: "Our AI analyzes your skills, experience, and preferences against job requirements to suggest the most relevant opportunities, saving you time in searching."
            },
            {
                q: "Can I track my application status?",
                a: "Absolutely. You can view the real-time status of all your applications in your dashboard."
            },
        ]
    }
];

export function HelpContent() {
    return (
        <div className="min-h-screen pt-20 sm:pt-24 lg:pt-28">
            {/* Hero Section */}
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
                        className="text-center max-w-3xl mx-auto space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#041f2b]/05 backdrop-blur-sm border border-[#041f2b]/10 mb-2">
                            <HelpCircle className="h-4 w-4 text-[#6366f1]" />
                            <span className="text-xs font-medium text-[#041f2b] uppercase tracking-wide">
                                Help Center
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#041f2b]">
                            How can we help you?
                        </h1>
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#041f2b]/40" />
                            <Input
                                placeholder="Search for answers..."
                                className="pl-12 h-14 rounded-xl border-2 border-[#041f2b]/10 bg-white/80 backdrop-blur-sm text-lg focus:border-[#6366f1]"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Support Categories */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {[
                        { icon: UserCircle, label: "Account & Profile" },
                        { icon: FileText, label: "Applications" },
                        { icon: Shield, label: "Privacy & Security" },
                        { icon: MessageCircle, label: "Contact Support" },
                    ].map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-[#041f2b]/10 hover:border-[#6366f1]/30 hover:shadow-lg transition-all cursor-pointer group"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#041f2b]/5 flex items-center justify-center mb-3 group-hover:bg-[#6366f1]/10 transition-colors">
                                <item.icon className="h-6 w-6 text-[#041f2b] group-hover:text-[#6366f1] transition-colors" />
                            </div>
                            <span className="font-semibold text-[#041f2b]">{item.label}</span>
                        </motion.div>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto space-y-12">
                    {FAQS.map((category, index) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <h2 className="text-2xl font-bold text-[#041f2b] mb-6">{category.category}</h2>
                            <Accordion type="single" collapsible className="w-full space-y-4">
                                {category.questions.map((faq, i) => (
                                    <AccordionItem key={i} value={`${category.category}-${i}`} className="border border-[#041f2b]/10 rounded-xl px-4 bg-white/50">
                                        <AccordionTrigger className="text-[#041f2b] font-medium hover:no-underline hover:text-[#6366f1]">{faq.q}</AccordionTrigger>
                                        <AccordionContent className="text-[#041f2b]/70">
                                            {faq.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Contact CTA */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="bg-[#041f2b] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6366f1]/20 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6366f1]/20 blur-3xl rounded-full transform -translate-x-1/2 translate-y-1/2" />
                    </div>
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl font-bold">Still need help?</h2>
                        <p className="text-white/70">Our support team is available 24/7 to assist you with any questions or issues you might have.</p>
                        <Button className="bg-[#6366f1] text-white hover:bg-[#4f46e5] border-0 h-12 px-8 text-base">
                            Contact Support
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
