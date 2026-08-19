"use client";
import React, { useState } from "react";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import DashboardHeader from "../components/Admin/DashboardHeader";
import AdminProtected from "../hooks/adminProtected";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <AdminProtected>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <AdminSidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
        <div
          className={`flex-1 w-full transition-all duration-300 ${
            isSidebarCollapsed ? "ml-[80px]" : "ml-[280px]"
          }`}
        >
          <div 
            className="fixed top-0 right-0 z-[999] hero-glass dark:bg-[#111C43]/90 bg-white/90 border-b border-slate-200 dark:border-white/10 backdrop-blur-xl transition-all duration-300"
            style={{ width: isSidebarCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 280px)' }}
          >
            <DashboardHeader />
          </div>
          <main className="p-8 mt-[80px] min-h-[calc(100vh-80px)] overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </AdminProtected>
  );
}
