export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          Have questions? We're here to help.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Email
            </h3>
            <a
              href="mailto:support@gosure.online"
              className="text-blue-600 hover:underline text-lg"
            >
              support@gosure.online
            </a>
            <p className="text-gray-600 text-sm mt-1">
              We typically respond within 24 hours
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Business Inquiries
            </h3>
            <p className="text-gray-700">
              For partnership or business inquiries, please email us with "Business" in the subject line.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Support
            </h3>
            <p className="text-gray-700">
              For technical support or questions about your report, email us with your analysis ID.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Refunds
            </h3>
            <p className="text-gray-700">
              For refund requests (30-day guarantee), email us with your order details.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}