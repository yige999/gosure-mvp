export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <a href="/" className="text-gray-900 font-semibold text-base sm:text-lg hover:text-gray-700 transition-colors">
            ← Back to Gosure
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
        <div className="space-y-8 sm:space-y-12">
          {/* Title section */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Last updated: November 17, 2024
            </p>
          </div>

          {/* Content sections */}
          <div className="prose prose-lg prose-gray max-w-none space-y-12">
            {/* Introduction */}
            <section className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                At gosure, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our SOC 2 timing recommendation service.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Information We Collect
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="space-y-2 text-gray-700 list-disc pl-6">
                <li className="leading-relaxed">
                  <strong>Account Information:</strong> Your email address when you create an account or contact us
                </li>
                <li className="leading-relaxed">
                  <strong>Business Metrics:</strong> Information you provide about your company including revenue, sales pipeline, engineering capacity, and other business data used to generate timing recommendations
                </li>
                <li className="leading-relaxed">
                  <strong>Usage Data:</strong> Information about how you interact with our service, including pages visited and features used
                </li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="space-y-2 text-gray-700 list-disc pl-6">
                <li className="leading-relaxed">
                  Generate personalized SOC 2 timing recommendations based on your business metrics
                </li>
                <li className="leading-relaxed">
                  Improve our recommendation algorithms and service quality
                </li>
                <li className="leading-relaxed">
                  Communicate with you about your account, recommendations, and service updates
                </li>
                <li className="leading-relaxed">
                  Analyze aggregate trends to better understand startup compliance patterns
                </li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Data Security
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="space-y-2 text-gray-700 list-disc pl-6">
                <li className="leading-relaxed">
                  All data is encrypted in transit using TLS/SSL protocols
                </li>
                <li className="leading-relaxed">
                  Data at rest is encrypted using industry-standard encryption methods
                </li>
                <li className="leading-relaxed">
                  Access to personal data is restricted to authorized personnel only
                </li>
                <li className="leading-relaxed">
                  We regularly review and update our security practices
                </li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Data Sharing and Third Parties
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We do not sell, rent, or share your personal information with third parties for their marketing purposes. We may share your information only in the following limited circumstances:
              </p>
              <ul className="space-y-2 text-gray-700 list-disc pl-6">
                <li className="leading-relaxed">
                  With service providers who help us operate our platform (subject to strict confidentiality agreements)
                </li>
                <li className="leading-relaxed">
                  When required by law or to protect our legal rights
                </li>
                <li className="leading-relaxed">
                  With your explicit consent
                </li>
              </ul>
            </section>

            {/* Your Rights */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Rights
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You have the right to:
              </p>
              <ul className="space-y-2 text-gray-700 list-disc pl-6">
                <li className="leading-relaxed">
                  Access the personal information we hold about you
                </li>
                <li className="leading-relaxed">
                  Request correction of inaccurate information
                </li>
                <li className="leading-relaxed">
                  Request deletion of your personal information
                </li>
                <li className="leading-relaxed">
                  Opt out of marketing communications
                </li>
              </ul>
            </section>

            {/* Contact */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy or how we handle your information, please contact us at:
              </p>
              <p className="text-gray-700 leading-relaxed">
                <a
                  href="mailto:support@gosure.online"
                  className="text-blue-600 hover:text-blue-700 font-medium underline"
                >
                  support@gosure.online
                </a>
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Changes to This Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}