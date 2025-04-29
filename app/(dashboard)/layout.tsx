"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, LayoutDashboard, User, CheckCircle  } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div
        className={`bg-white shadow-lg transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-20"
        } relative`}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-10 bg-white rounded-full p-1 shadow-md z-10"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? (
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-600" />
          )}
        </button>

        <div className="p-4">
          <Link href="/" className={`font-bold text-xl text-[#f69fa9] ${sidebarOpen ? "" : "text-center"} block`}>
            {sidebarOpen ? "Habitude" : <CheckCircle className="h-5 w-5" />}
          </Link>
        </div>

        <nav className="mt-8">
          <ul className="space-y-2 px-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-3 text-[#f69fa9] hover:bg-[#f69fa9] hover:text-white rounded-lg transition-colors"
              >
                <LayoutDashboard className="h-5 w-5" />
                {sidebarOpen && <span className="ml-3">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="flex items-center p-3 text-[#f69fa9] hover:bg-[#f69fa9] hover:text-white rounded-lg transition-colors"
              >
                <User className="h-5 w-5" />
                {sidebarOpen && <span className="ml-3">Profile</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 overflow-x-hidden">
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
