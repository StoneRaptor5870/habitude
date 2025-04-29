import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#f69fa9] text-gray-800 py-12 px-4 md:px-8 lg:px-16 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Habitude</h3>
            <p className="text-gray-800">Building better habits, one day at a time.</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-800 hover:text-white transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-800 hover:text-white transition-colors duration-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-800 hover:text-white transition-colors duration-300">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-800 hover:text-white transition-colors duration-300">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-gray-800 hover:text-white transition-colors duration-300">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-gray-800 hover:text-white transition-colors duration-300">
                  API
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-800 hover:text-white transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-800 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-800 hover:text-white transition-colors duration-300">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-800">
          <p>&copy; {new Date().getFullYear()} HabitTrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
