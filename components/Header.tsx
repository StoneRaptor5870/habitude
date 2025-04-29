"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()

  const isDashboardOrProfile = pathname === "/dashboard" || pathname === "/profile"

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/landing")
  }

  return (
    <header className="bg-white shadow-sm py-4 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/" className="text-2xl font-bold text-[#f69fa9]">
              Habitude
            </Link>
          </div>
          {isDashboardOrProfile ? (
            <button
              onClick={handleLogout}
              className="bg-[#f69fa9] hover:bg-[#fc7e8d] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Logout
            </button>
          ) : (
            <div className="flex space-x-4">
              <Link
                href="/signin"
                className="text-[#f69fa9] hover:text-[#fc7e8d] font-medium py-2 px-4 transition-colors duration-300"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-[#f69fa9] hover:bg-[#fc7e8d] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
