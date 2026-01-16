"use client";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { PostJobContent } from "@/components/admin/post-job";

export default function AdminJobsPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64">
        <PostJobContent />
      </main>
    </div>
  );
}
