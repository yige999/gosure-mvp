export default function TermsOfService() {
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
              Terms of Service
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
                Welcome to gosure. By accessing or using our SOC 2 timing recommendation service, you agree to be bound by these Terms of Service. Please read them carefully.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By creating an account or using gosure's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you may not use our service.
              </p>
            </section>

            {/* Service Description */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                2. Service Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                gosure provides data-driven SOC 2 timing recommendations for startups. Our service:
              </p>
              <ul className="space-y-2 text-gray-700 list-disc pl-6">
                <li className="leading-relaxed">
                  Analyzes your business metrics to generate personalized SOC 2 timing recommendations
                </li>
                <li className="leading-relaxed">
                  Provides guidance based on industry data and best practices
                </li>
                <li className="leading-relaxed">
                  Offers insights into cost, timeline, and resource requirements
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                <strong>Important:</strong> Our recommendations are guidance only and should not be considered definitive legal or compliance advice. We recommend consulting with qualified compliance professionals before making business decisions.
              </p>
            </section>

            {/* User Accounts */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                3. User Accounts
              </h2>
              <p className="text-gray-700 leading-relaxed">
                When you create an account with gosure:
              </p>
              <ul className="space-y-2 text-gray-700 list-disc pl-6">
                <li className="leading-relaxed">
                  You are responsible for maintaining the security of your account and password
                </li>
                <li className="leading-relaxed">
                  You must provide accurate, current, and complete information during registration
                </li>
                <li className="leading-relaxed">
                  You are responsible for all activities that occur under your account
                </li>
                <li className="leading-relaxed">
                  You must notify us immediately of any unauthorized access or security breach
                </li>
                <li className="leading-relaxed">
                  You must be at least 18 years old to use our service
                </li>
              </ul>
            </section>

            {/* Payment Terms */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                4. Payment Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                gosure operates on a freemium model:
              </p>
              <ul className="space-y-2 text-gray-700 list-disc pl-6">
                <li className="leading-relaxed">
                  Basic recommendations are provided at no cost
                </li>
                <li className="leading-relaxed">
                  Premium detailed reports are available for a one-time fee of $49
                </li>
                <li className="leading-relaxed">
                  All payments are processed securely through Creem payment processor
                </li>
                <li className="leading-relaxed">
                  Prices are subject to change with notice to existing users
                </li>
                <li className="leading-relaxed">
                  Payment information is not stored on our servers
                </li>
              </ul>
            </section>

            {/* Refund Policy */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                5. Refund Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We stand behind the quality of our premium reports:
              </p>
              <ul className="space-y-2 text-gray-700 list-disc pl-6">
                <li className="leading-relaxed">
                  We offer a 30-day money-back guarantee on all premium report purchases
                </li>
                <li className="leading-relaxed">
                  If you are not satisfied with your report, contact us within 30 days for a full refund
                </li>
                <li className="leading-relaxed">
                  Refunds are processed within 5-10 business days
                </li>
                <li className="leading-relaxed">
                  To request a refund, email us at{' '}
                  <a
                    href="mailto:hello@gosure.online"
                    className="text-blue-600 hover:text-blue-700 font-medium underline"
                  >
                    hello@gosure.online
                  </a>
                </li>
              </ul>
            </section>

            {/* Limitations of Liability */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                6. Limitations of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Please understand that:
              </p>
              <ul className="space-y-2 text-gray-700 list-disc pl-6">
                <li className="leading-relaxed">
                  Our recommendations are based on data analysis and industry trends, not specific legal or compliance advice
                </li>
                <li className="leading-relaxed">
                  gosure is not liable for business decisions made based on our recommendations
                </li>
                <li className="leading-relaxed">
                  We strongly recommend consulting with qualified compliance professionals and legal counsel before making SOC 2 compliance decisions
                </li>
                <li className="leading-relaxed">
                  The service is provided "as is" without warranties of any kind, either express or implied
                </li>
                <li className="leading-relaxed">
                  gosure's total liability shall not exceed the amount paid by you for the service
                </li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                7. Intellectual Property
              </h2>
              <p className="text-gray-700 leading-relaxed">
                All content, features, and functionality of the gosure service, including but not limited to:
              </p>
              <ul className="space-y-2 text-gray-700 list-disc pl-6">
                <li className="leading-relaxed">
                  Text, graphics, logos, and software
                </li>
                <li className="leading-relaxed">
                  Recommendation algorithms and methodologies
                </li>
                <li className="leading-relaxed">
                  Report templates and formats
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                are owned by gosure and are protected by international copyright, trademark, and other intellectual property laws. You may not copy, modify, or distribute our content without express permission.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                8. Changes to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. We will:
              </p>
              <ul className="space-y-2 text-gray-700 list-disc pl-6">
                <li className="leading-relaxed">
                  Notify you of material changes via email or through the service
                </li>
                <li className="leading-relaxed">
                  Update the "Last updated" date at the top of this page
                </li>
                <li className="leading-relaxed">
                  Provide reasonable notice before changes take effect
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Your continued use of the service after changes are posted constitutes acceptance of the updated terms.
              </p>
            </section>

            {/* Termination */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                9. Termination
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Either party may terminate this agreement at any time:
              </p>
              <ul className="space-y-2 text-gray-700 list-disc pl-6">
                <li className="leading-relaxed">
                  You may delete your account at any time through your account settings
                </li>
                <li className="leading-relaxed">
                  We may suspend or terminate your account for violation of these terms
                </li>
                <li className="leading-relaxed">
                  Upon termination, your right to use the service ceases immediately
                </li>
                <li className="leading-relaxed">
                  Provisions that should survive termination (including liability limitations and intellectual property rights) will remain in effect
                </li>
              </ul>
            </section>

            {/* Governing Law */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                10. Governing Law
              </h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service are governed by and construed in accordance with applicable laws. Any disputes arising from these terms or your use of the service shall be resolved through binding arbitration or in the appropriate courts.
              </p>
            </section>

            {/* Contact */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                11. Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-gray-700 leading-relaxed">
                <a
                  href="mailto:hello@gosure.online"
                  className="text-blue-600 hover:text-blue-700 font-medium underline"
                >
                  hello@gosure.online
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}