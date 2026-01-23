"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Building2,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Phone,
  Mail,
  X,
  ExternalLink,
  Copy,
  CalendarDays
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { applicationsAPI, interviewsAPI } from "@/lib/api";

export function InterviewsContent() {
  const [filter, setFilter] = useState("All");
  const [interviews, setInterviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInterviews();
  }, [filter]);

  const loadInterviews = async () => {
    try {
      setIsLoading(true);
      const response = await interviewsAPI.getMyInterviews();
      if (response && response.interviews) {
        const formattedInterviews = response.interviews.map((interview: any) => ({
          id: interview.id,
          jobTitle: interview.job_title || "",
          company: interview.company_name || "",
          date: interview.scheduled_at ? new Date(interview.scheduled_at).toLocaleDateString() : "",
          time: interview.scheduled_at ? new Date(interview.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "",
          type: interview.type || "Video Call",
          status: interview.status === 'scheduled' ? 'Scheduled' :
            interview.status === 'completed' ? 'Completed' :
              interview.status === 'cancelled' ? 'Cancelled' : 'Scheduled',
          interviewer: "", // To be added if user table supports it
          location: interview.location || (interview.type === 'Video' ? interview.meeting_link : ""),
          match: 0, // Should be fetched from application if needed
          meetingLink: interview.meeting_link,
          notes: interview.notes
        }));
        setInterviews(formattedInterviews);
      }
    } catch (error) {
      console.error("Failed to load interviews:", error);
      setInterviews([]);
    } finally {
      setIsLoading(false);
    }
  };
  const [selectedInterview, setSelectedInterview] = useState<number | null>(null);
  const [actionType, setActionType] = useState<"join" | "reschedule" | "cancel" | "feedback" | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [showRescheduleSuccess, setShowRescheduleSuccess] = useState(false);

  const filteredInterviews = interviews.filter((interview) => {
    if (filter === "All") return true;
    return interview.status === filter;
  });

  const upcomingInterviews = interviews.filter(
    (interview) => interview.status === "Scheduled"
  );

  const handleJoinInterview = (interviewId: number) => {
    setSelectedInterview(interviewId);
    setActionType("join");
  };

  const handleReschedule = (interviewId: number) => {
    setSelectedInterview(interviewId);
    setActionType("reschedule");
    const interview = interviews.find(i => i.id === interviewId);
    if (interview) {
      setRescheduleDate(interview.date);
      setRescheduleTime(interview.time);
    }
  };

  const handleCancel = (interviewId: number) => {
    setInterviews(interviews.map(interview =>
      interview.id === interviewId
        ? { ...interview, status: "Cancelled" as const }
        : interview
    ));
  };

  const handleRescheduleSubmit = () => {
    if (selectedInterview && rescheduleDate && rescheduleTime) {
      setInterviews(interviews.map(interview =>
        interview.id === selectedInterview
          ? { ...interview, date: rescheduleDate, time: rescheduleTime }
          : interview
      ));
      setShowRescheduleSuccess(true);
      setTimeout(() => {
        setSelectedInterview(null);
        setActionType(null);
        setShowRescheduleSuccess(false);
      }, 2000);
    }
  };

  const handleCopyLink = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleViewFeedback = (interviewId: number) => {
    setSelectedInterview(interviewId);
    setActionType("feedback");
  };

  return (
    <div className="min-h-screen pt-16 lg:pt-8">
      <section className="relative py-8 sm:py-12 md:py-16 overflow-hidden">
        <div className="fade-grid" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                  <span className="bg-gradient-to-r from-[#e8e8f0] to-[#a5b4fc] bg-clip-text text-transparent">
                    Interviews
                  </span>
                </h1>
                <p className="text-lg text-[#9ca3af]">
                  {upcomingInterviews.length} upcoming interview{upcomingInterviews.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {["All", "Scheduled", "Completed", "Cancelled"].map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? "default" : "outline"}
                  onClick={() => setFilter(status)}
                  className={
                    filter === status
                      ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0"
                      : "border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e]"
                  }
                >
                  {status}
                </Button>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-6">
            {filteredInterviews.map((interview, index) => (
              <motion.div
                key={interview.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm hover:border-[#6366f1]/30 transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <Building2 className="h-5 w-5 text-[#6366f1]" />
                              <h3 className="text-xl font-bold text-[#e8e8f0]">{interview.jobTitle}</h3>
                            </div>
                            <p className="text-lg text-[#a5b4fc] mb-4">{interview.company}</p>
                            <div className="grid sm:grid-cols-2 gap-4 mb-4">
                              <div className="flex items-center gap-2 text-sm text-[#9ca3af]">
                                <Calendar className="h-4 w-4 text-[#6366f1]" />
                                <span>{interview.date}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-[#9ca3af]">
                                <Clock className="h-4 w-4 text-[#6366f1]" />
                                <span>{interview.time}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-[#9ca3af]">
                                {interview.type === "Video Call" ? (
                                  <Video className="h-4 w-4 text-[#6366f1]" />
                                ) : interview.type === "Phone Call" ? (
                                  <Phone className="h-4 w-4 text-[#6366f1]" />
                                ) : (
                                  <MapPin className="h-4 w-4 text-[#6366f1]" />
                                )}
                                <span>{interview.type}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-[#9ca3af]">
                                <User className="h-4 w-4 text-[#6366f1]" />
                                <span>{interview.interviewer}</span>
                              </div>
                            </div>
                            <div className="p-3 rounded-lg bg-[#1e1e2e] border border-[#2a2a3a]">
                              <p className="text-sm text-[#9ca3af] mb-1">Details & Notes:</p>
                              <p className="text-sm text-[#e8e8f0] mb-2">{interview.location}</p>
                              {interview.notes && (
                                <p className="text-xs text-[#9ca3af] italic">Note: {interview.notes}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {interview.status === "Scheduled" && (
                              <Badge className="bg-[#6366f1]/20 text-[#6366f1] border-[#6366f1]/30">
                                <Clock className="h-3 w-3 mr-1" />
                                {interview.status}
                              </Badge>
                            )}
                            {interview.status === "Completed" && (
                              <Badge className="bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                {interview.status}
                              </Badge>
                            )}
                            <div className="text-sm">
                              <span className="text-[#9ca3af]">Match: </span>
                              <span className="text-[#10b981] font-semibold">{interview.match}%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:min-w-[140px]">
                        {interview.status === "Scheduled" && (
                          <>
                            <Button
                              onClick={() => handleJoinInterview(interview.id)}
                              className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0"
                            >
                              Join Interview
                            </Button>
                            <Button
                              onClick={() => handleReschedule(interview.id)}
                              variant="outline"
                              className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                            >
                              Reschedule
                            </Button>
                            <Button
                              onClick={() => handleCancel(interview.id)}
                              variant="outline"
                              className="border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e] hover:text-[#ef4444] hover:border-[#ef4444]/30"
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {interview.status === "Completed" && (
                          <Button
                            onClick={() => handleViewFeedback(interview.id)}
                            variant="outline"
                            className="border-[#2a2a3a] text-[#e8e8f0] hover:bg-[#1e1e2e] hover:border-[#6366f1]/50"
                          >
                            View Feedback
                          </Button>
                        )}
                        {interview.status === "Cancelled" && (
                          <Badge className="bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/30">
                            <XCircle className="h-3 w-3 mr-1" />
                            Cancelled
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredInterviews.length === 0 && (
            <Card className="border border-[#2a2a3a] bg-[#151520]/50 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Calendar className="h-16 w-16 text-[#6366f1] mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-[#e8e8f0] mb-2">No interviews found</h3>
                <p className="text-[#9ca3af]">No interviews match the selected filter</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedInterview && actionType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0f]/80 backdrop-blur-sm"
            onClick={() => {
              setSelectedInterview(null);
              setActionType(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#151520] border border-[#2a2a3a] rounded-2xl shadow-2xl"
            >
              <Card className="border-0 bg-transparent">
                <CardHeader className="border-b border-[#2a2a3a]">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-[#e8e8f0]">
                      {actionType === "join" && "Join Interview"}
                      {actionType === "reschedule" && "Reschedule Interview"}
                      {actionType === "feedback" && "Interview Feedback"}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedInterview(null);
                        setActionType(null);
                      }}
                      className="text-[#9ca3af] hover:text-[#e8e8f0] hover:bg-[#1e1e2e]"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {(() => {
                    const interview = interviews.find(i => i.id === selectedInterview);
                    if (!interview) return null;

                    if (actionType === "join") {
                      return (
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-bold text-[#e8e8f0] mb-2">{interview.jobTitle}</h3>
                            <p className="text-lg text-[#a5b4fc] mb-4">{interview.company}</p>
                            <div className="space-y-3 text-sm text-[#9ca3af]">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-[#6366f1]" />
                                <span>{interview.date} at {interview.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-[#6366f1]" />
                                <span>Interviewer: {interview.interviewer}</span>
                              </div>
                            </div>
                          </div>

                          {interview.type === "Video Call" && interview.meetingLink ? (
                            <div className="space-y-4">
                              <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                                <CardContent className="p-4 space-y-3">
                                  <div>
                                    <p className="text-sm font-medium text-[#9ca3af] mb-2">Meeting Link</p>
                                    <div className="flex items-center gap-2">
                                      <Input
                                        value={interview.meetingLink}
                                        readOnly
                                        className="bg-[#0a0a0f] border-[#2a2a3a] text-[#e8e8f0]"
                                      />
                                      <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => handleCopyLink(interview.meetingLink!)}
                                        className="border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e]"
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => window.open(interview.meetingLink!, '_blank')}
                                        className="border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e]"
                                      >
                                        <ExternalLink className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  {interview.meetingId && (
                                    <div>
                                      <p className="text-sm font-medium text-[#9ca3af] mb-2">Meeting ID</p>
                                      <div className="flex items-center gap-2">
                                        <Input
                                          value={interview.meetingId}
                                          readOnly
                                          className="bg-[#0a0a0f] border-[#2a2a3a] text-[#e8e8f0]"
                                        />
                                        <Button
                                          size="icon"
                                          variant="outline"
                                          onClick={() => handleCopyLink(interview.meetingId!)}
                                          className="border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e]"
                                        >
                                          <Copy className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                  {interview.meetingPassword && (
                                    <div>
                                      <p className="text-sm font-medium text-[#9ca3af] mb-2">Password</p>
                                      <div className="flex items-center gap-2">
                                        <Input
                                          value={interview.meetingPassword}
                                          readOnly
                                          className="bg-[#0a0a0f] border-[#2a2a3a] text-[#e8e8f0]"
                                        />
                                        <Button
                                          size="icon"
                                          variant="outline"
                                          onClick={() => handleCopyLink(interview.meetingPassword!)}
                                          className="border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e]"
                                        >
                                          <Copy className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                              <Button
                                onClick={() => window.open(interview.meetingLink!, '_blank')}
                                className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0"
                              >
                                <Video className="h-4 w-4 mr-2" />
                                Join Meeting
                              </Button>
                            </div>
                          ) : interview.type === "On-site" ? (
                            <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                              <CardContent className="p-4">
                                <p className="text-sm font-medium text-[#9ca3af] mb-2">Location</p>
                                <p className="text-[#e8e8f0] mb-4">{interview.location}</p>
                                <div className="space-y-2 text-sm text-[#9ca3af]">
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    <span>{interview.interviewerEmail}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    <span>{interview.interviewerPhone}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ) : (
                            <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                              <CardContent className="p-4">
                                <p className="text-sm font-medium text-[#9ca3af] mb-2">Phone Number</p>
                                <p className="text-[#e8e8f0] mb-4">{interview.location}</p>
                                <div className="space-y-2 text-sm text-[#9ca3af]">
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    <span>{interview.interviewerEmail}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      );
                    }

                    if (actionType === "reschedule") {
                      return (
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-bold text-[#e8e8f0] mb-2">{interview.jobTitle}</h3>
                            <p className="text-lg text-[#a5b4fc] mb-4">{interview.company}</p>
                            <p className="text-sm text-[#9ca3af]">Current: {interview.date} at {interview.time}</p>
                          </div>

                          {showRescheduleSuccess ? (
                            <div className="text-center py-8">
                              <CheckCircle2 className="h-16 w-16 text-[#10b981] mx-auto mb-4" />
                              <h3 className="text-xl font-bold text-[#e8e8f0] mb-2">Rescheduled Successfully!</h3>
                              <p className="text-[#9ca3af]">Your interview has been rescheduled.</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium text-[#9ca3af] mb-2 block">New Date</label>
                                <Input
                                  type="date"
                                  value={rescheduleDate}
                                  onChange={(e) => setRescheduleDate(e.target.value)}
                                  className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-[#9ca3af] mb-2 block">New Time</label>
                                <Input
                                  type="time"
                                  value={rescheduleTime}
                                  onChange={(e) => setRescheduleTime(e.target.value)}
                                  className="bg-[#1e1e2e] border-[#2a2a3a] text-[#e8e8f0]"
                                />
                              </div>
                              <div className="flex gap-3">
                                <Button
                                  onClick={handleRescheduleSubmit}
                                  className="flex-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed] border-0"
                                >
                                  <CalendarDays className="h-4 w-4 mr-2" />
                                  Confirm Reschedule
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedInterview(null);
                                    setActionType(null);
                                  }}
                                  className="border-[#2a2a3a] text-[#9ca3af] hover:bg-[#1e1e2e]"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }

                    if (actionType === "feedback") {
                      return (
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-bold text-[#e8e8f0] mb-2">{interview.jobTitle}</h3>
                            <p className="text-lg text-[#a5b4fc] mb-4">{interview.company}</p>
                            <div className="space-y-2 text-sm text-[#9ca3af]">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-[#6366f1]" />
                                <span>Completed: {interview.date} at {interview.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-[#6366f1]" />
                                <span>Interviewer: {interview.interviewer}</span>
                              </div>
                            </div>
                          </div>

                          <Card className="border border-[#2a2a3a] bg-[#1e1e2e]">
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-[#e8e8f0] mb-3">Feedback</h4>
                              <p className="text-[#9ca3af] leading-relaxed">
                                {interview.feedback || "Feedback will be available soon."}
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      );
                    }

                    return null;
                  })()}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

