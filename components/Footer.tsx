import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Gosure</h3>
            <p className="text-sm leading-relaxed">
              Data-driven SOC 2 timing recommendations
            </p>
          </div>

          {/* Product Column */}
          <div className="space-y-4">
            <h4 className="text-white font-medium text-sm">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/analyze"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Get Started
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h4 className="text-white font-medium text-sm">Company</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@gosure.online"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h4 className="text-white font-medium text-sm">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 py-8">
          <p className="text-sm text-center">
            © 2025 Gosure. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}