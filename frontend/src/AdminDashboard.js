// src/components/AdminDashboard.jsx
import React from "react";
import AdminHeader from "./components/Admin/AdminHeader"; // keep your header
import Footer from "./components/Footer";
import AdminSidebar from "./components/Admin/AdminSidebar"; // the tailwind sidebar you already have
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  // Sidebar & header sizes (keep consistent with AdminHeader)
  // header height: 80px (h-20), sidebar width: 256px (w-64)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - fixed at top */}
      <header className="fixed inset-x-0 top-0 z-40">
        <AdminHeader />
      </header>

      {/* Sidebar (fixed for md+ screens) */}
      <aside
        className="
          hidden md:block
          fixed left-0
          top-20                 /* start below header: 80px (h-20) */
          h-[calc(100vh-5rem)]   /* full height minus header (5rem = 80px) */
          w-64                  /* 16rem = 256px sidebar width */
          overflow-auto
          bg-slate-900/95 text-white
          p-4
          shadow-xl
        "
      >
        <AdminSidebar />
      </aside>

      {/* Main content area:
          On md+ screens give left margin equal to sidebar width (w-64 => ml-64)
          Also pad top to avoid header overlap (pt-20)
      */}
      <main className="pt-20 md:pl-0 md:ml-0">
        <div className="min-h-[calc(100vh-5rem)]">
          <div className="w-full md:ml-0">
            {/* Container: on md+ we apply left margin to create space for the fixed sidebar */}
            <div className="w-full md:ml-64">
              {/* Page content area with responsive padding */}
              <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-12">
                {/* Outlet will render admin pages */}
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
