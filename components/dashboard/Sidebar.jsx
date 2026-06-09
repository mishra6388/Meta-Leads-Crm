"use client";

import Link from "next/link";
import { LayoutDashboard, Users, LogOut } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {
  return (
    <div className="w-72 h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-white p-6 shadow-lg flex flex-col">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight">MetaCRM</h2>
        <p className="text-blue-200 text-sm mt-1">Lead Management Suite</p>
      </div>

      <nav className="flex-1 space-y-2">
        <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-3">Navigation</p>
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-4 py-3 hover:bg-blue-800 rounded-lg transition-all duration-200 group"
        >
          <LayoutDashboard size={20} className="group-hover:translate-x-1 transition-transform" />
          <span className="font-medium">Dashboard</span>
        </Link>

        <Link
          href="/dashboard/leads"
          className="flex items-center gap-3 px-4 py-3 hover:bg-blue-800 rounded-lg transition-all duration-200 group"
        >
          <Users size={20} className="group-hover:translate-x-1 transition-transform" />
          <span className="font-medium">Leads</span>
        </Link>
      </nav>

      <div className="border-t border-blue-800 pt-4">
        <LogoutButton />
      </div>
    </div>
  );
}