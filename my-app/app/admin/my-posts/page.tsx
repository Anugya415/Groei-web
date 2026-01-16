"use client";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { MyPostsContent } from "@/components/admin/my-posts";

export default function AdminMyPostsPage() {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64">
        <MyPostsContent />
      </main>
    </div>
  );
}
