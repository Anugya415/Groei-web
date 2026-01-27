"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone, Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function ContactContent() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSent(true);
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 1500);
    };

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
                            <Mail className="h-4 w-4 text-[#6366f1]" />
                            <span className="text-xs font-medium text-[#041f2b] uppercase tracking-wide">
                                Get in Touch
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#041f2b]">
                            We'd Love to Hear From You
                        </h1>
                        <p className="text-lg text-[#041f2b]/70">
                            Have a question about our services or need support? Send us a message and we'll get back to you as soon as possible.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-[#041f2b]/10">
                            <h3 className="text-xl font-bold text-[#041f2b] mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#6366f1]/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="h-5 w-5 text-[#6366f1]" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#041f2b]">Headquarters</p>
                                        <p className="text-[#041f2b]/60">123 Innovation Drive, Tech Valley, CA 94025, USA</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#6366f1]/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="h-5 w-5 text-[#6366f1]" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#041f2b]">Email Us</p>
                                        <p className="text-[#041f2b]/60">support@groei.com</p>
                                        <p className="text-[#041f2b]/60">partnerships@groei.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#6366f1]/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="h-5 w-5 text-[#6366f1]" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#041f2b]">Call Us</p>
                                        <p className="text-[#041f2b]/60">+1 (555) 123-4567</p>
                                        <p className="text-[#041f2b]/60">Mon-Fri, 9am - 6pm PST</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="h-64 rounded-2xl overflow-hidden border border-[#041f2b]/10 bg-slate-100 flex items-center justify-center relative">
                            {/* Placeholder for map */}
                            <MapPin className="h-12 w-12 text-[#041f2b]/20" />
                            <span className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-md text-xs font-medium shadow-sm">View on Map</span>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="border border-[#041f2b]/10 bg-white shadow-xl shadow-[#041f2b]/5">
                            <CardContent className="p-8">
                                {isSent ? (
                                    <div className="text-center py-12 space-y-4">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                                            <Sparkles className="h-8 w-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#041f2b]">Message Sent!</h3>
                                        <p className="text-[#041f2b]/70">Thank you for contacting us. We will get back to you shortly.</p>
                                        <Button onClick={() => setIsSent(false)} variant="outline">Send another message</Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-[#041f2b]">Name</label>
                                                <Input
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="John Doe"
                                                    className="bg-white"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-[#041f2b]">Email</label>
                                                <Input
                                                    required
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="john@example.com"
                                                    className="bg-white"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#041f2b]">Subject</label>
                                            <Input
                                                required
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                placeholder="How can we help?"
                                                className="bg-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#041f2b]">Message</label>
                                            <Textarea
                                                required
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder="Tell us more about your inquiry..."
                                                className="min-h-[150px] bg-white"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-[#041f2b] text-white hover:bg-[#041f2b]/90 h-12 text-base"
                                        >
                                            {isSubmitting ? "Sending..." : "Send Message"}
                                            {!isSubmitting && <Send className="h-4 w-4 ml-2" />}
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
