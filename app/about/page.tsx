export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About gosure</h1>

        <div className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 mb-6">
            gosure helps early-stage startups make data-driven decisions about SOC 2 compliance timing. We prevent companies from starting too early (wasting engineering resources) or too late (losing enterprise deals).
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            The Problem We Solve
          </h2>
          <p className="text-gray-700 mb-6">
            Every B2B SaaS startup faces the same question: "When should we start SOC 2?" Start too early, and you waste months of engineering time. Start too late, and you risk losing valuable enterprise deals.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            How It Works
          </h2>
          <p className="text-gray-700 mb-6">
            Our algorithm analyzes your team size, customer demand, funding stage, and pipeline value to recommend the optimal timing for starting SOC 2 certification. The recommendation is based on industry best practices and compliance requirements.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Who We Serve
          </h2>
          <p className="text-gray-700 mb-6">
            We work with early-stage B2B SaaS startups (5-50 employees, seed to Series A) who are preparing for enterprise sales and need to make compliance decisions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Contact
          </h2>
          <p className="text-gray-700">
            Email: <a href="mailto:support@gosure.online" className="text-blue-600 hover:underline">support@gosure.online</a>
          </p>
        </div>
      </div>
    </div>
  )
}