'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { generateReport } from '@/lib/generateReport'
import { ArrowLeft, AlertTriangle, Clock, DollarSign, Users, CheckCircle2, Zap, Unlock, Calendar, Building2, Receipt } from 'lucide-react'
import Link from 'next/link'

export default function ResultsPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [analysis, setAnalysis] = useState<any>(null)
  const [report, setReport] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    loadReport()
  }, [params.id])

  async function loadReport() {
    const supabase = createClient()

    // 检查登录
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    // 读取分析数据
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error || !data) {
      setError('Analysis not found')
      setLoading(false)
      return
    }

    // 检查是否是用户自己的分析
    if (data.user_id !== user.id) {
      setError('Access denied')
      setLoading(false)
      return
    }

    setAnalysis(data)

    // 生成或读取报告
    if (!data.recommendation) {
      // 生成报告
      const newReport = generateReport({
        teamSize: data.team_size,
        engineeringAllocation: data.engineering_allocation,
        fundingStage: data.funding_stage,
        customerDemand: data.customer_demand,
        pipelineValue: data.pipeline_value,
        closeProbability: data.close_probability,
        avgDealSize: data.avg_deal_size,
        expectedCustomers: data.expected_customers,
      })

      // 保存到数据库
      await supabase
        .from('analyses')
        .update({ recommendation: newReport })
        .eq('id', params.id)

      setReport(newReport)
    } else {
      setReport(data.recommendation)
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300 mx-auto"></div>
          <div className="text-lg text-gray-600">Generating your report...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error}
          </h1>
          <Link href="/dashboard">
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + report.recommendedDays)

  const handleUpgrade = () => {
    // 保存analysis_id到sessionStorage
    sessionStorage.setItem('pending_analysis_id', params.id)

    // 跳转到Creem支付
    window.location.href = 'https://www.creem.io/test/payment/prod_1d01MiYNklFq79h4NWKbfp'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-6 py-12 space-y-8">

        {/* Main Heading */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Your SOC 2 Timing Recommendation
          </h1>
          <p className="text-lg text-gray-600">
            Based on your company profile and current state
          </p>
        </div>

        {/* Large Number Display */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              Start SOC 2 in
            </p>
            <div className="text-7xl font-bold text-gray-900">
              {report.recommendedDays} Days
            </div>
            <p className="text-gray-600 text-lg">
              Target start date: {targetDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Two-Column Risk Analysis Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Risk Score Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-red-50 p-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Current Risk Level</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">{report.riskScore}%</div>
                <p className="text-sm text-gray-600">Moderate risk exposure</p>
              </div>
            </div>
          </div>

          {/* Potential Loss Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-gray-100 p-3">
                <DollarSign className="h-6 w-6 text-gray-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Potential Loss (Delay)</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">${report.potentialLoss.toLocaleString()}</div>
                <p className="text-sm text-gray-600">Revenue at risk if delayed</p>
              </div>
            </div>
          </div>

          {/* Engineering Weeks Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-gray-100 p-3">
                <Clock className="h-6 w-6 text-gray-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Engineering Time</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">{report.engineeringWeeks} weeks</div>
                <p className="text-sm text-gray-600">Estimated preparation time</p>
              </div>
            </div>
          </div>

          {/* Estimated Cost Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-gray-100 p-3">
                <Users className="h-6 w-6 text-gray-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Estimated Cost</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">${report.estimatedCost.toLocaleString()}</div>
                <p className="text-sm text-gray-600">Internal resource cost</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Route Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-gray-900 p-2">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Recommended Route</h2>
          </div>
          <div className="space-y-3">
            <div className="inline-block px-4 py-2 bg-gray-100 rounded-lg">
              <span className="text-lg font-semibold text-gray-900">{report.route} SOC 2 Type II</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Based on your current infrastructure maturity and sales pipeline, we recommend pursuing
              a {report.route.toLowerCase()} SOC 2 Type II audit. This approach balances thoroughness with efficiency for
              your stage.
            </p>
          </div>
        </div>

        {/* Detailed Reasoning */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why This Timing?</h2>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            {report.reasoning.map((reason: string, index: number) => (
              <p key={index}>{reason}</p>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Next Steps</h2>
          <div className="space-y-4">
            {report.nextSteps.map((step: string, index: number) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-gray-600 text-sm leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* Upgrade CTA */}
        {!analysis.is_paid && (
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg p-8 text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm text-white font-medium mb-2">
                <CheckCircle2 className="h-4 w-4" />
                Recommended for your stage
              </div>
              <h2 className="text-3xl font-bold text-white">
                Get Your Personalized Roadmap
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Unlock detailed weekly checklists, vendor recommendations, policy templates,
                and ongoing support from compliance experts for just $49.
              </p>
              <button
                onClick={handleUpgrade}
                className="mt-6 bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Upgrade Now - $49
              </button>
              <p className="text-sm text-gray-400 mt-3">
                One-time payment • Instant access • 30-day money-back guarantee
              </p>
            </div>
          </div>
        )}

        {/* Premium Content for Paid Users */}
        {analysis.is_paid && (
          <>
            {/* Premium Content Badge */}
            <div className="flex items-center gap-2 pt-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full">
                <Unlock className="h-3.5 w-3.5 text-gray-600" />
                <span className="text-xs font-medium text-gray-700">Premium Content</span>
              </div>
            </div>

            {/* Month-by-Month Roadmap */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-lg bg-gray-100 p-2">
                  <Calendar className="h-5 w-5 text-gray-700" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Month-by-Month Roadmap</h2>
              </div>

              <div className="space-y-8">
                {/* Month 1 */}
                <div className="relative pl-8 border-l-2 border-gray-200">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-white"></div>
                  <div className="pb-2">
                    <div className="inline-block px-3 py-1 bg-gray-100 rounded-md mb-3">
                      <span className="text-sm font-semibold text-gray-900">Month 1: Foundation</span>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Select and engage SOC 2 audit firm</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Appoint compliance lead and form security committee</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Complete initial gap analysis with auditor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Document existing security policies and procedures</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Month 2 */}
                <div className="relative pl-8 border-l-2 border-gray-200">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-white"></div>
                  <div className="pb-2">
                    <div className="inline-block px-3 py-1 bg-gray-100 rounded-md mb-3">
                      <span className="text-sm font-semibold text-gray-900">Month 2: Implementation</span>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Implement priority security controls and remediations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Set up logging, monitoring, and alerting infrastructure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Conduct security awareness training for all employees</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Begin evidence collection and documentation process</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Month 3 */}
                <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-white"></div>
                  <div>
                    <div className="inline-block px-3 py-1 bg-gray-100 rounded-md mb-3">
                      <span className="text-sm font-semibold text-gray-900">Month 3-5: Audit Period</span>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Complete readiness assessment with audit firm</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Kick off formal SOC 2 Type II audit (3-month observation period)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Provide continuous evidence and respond to auditor requests</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>Receive and celebrate your SOC 2 Type II report</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Audit Firms */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-lg bg-gray-100 p-2">
                  <Building2 className="h-5 w-5 text-gray-700" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Recommended Audit Firms</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Vendor</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Best For</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Price Range</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Timeline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-gray-900">Vanta</div>
                        <div className="text-sm text-gray-600">Automated compliance platform</div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        Early-stage startups, tech-forward teams
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                        $20,000 - $35,000
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        12-16 weeks
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-gray-900">Drata</div>
                        <div className="text-sm text-gray-600">Continuous compliance monitoring</div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        Growing SaaS companies, multi-framework
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                        $18,000 - $32,000
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        10-14 weeks
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-gray-900">Secureframe</div>
                        <div className="text-sm text-gray-600">End-to-end compliance solution</div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        Mid-market, enterprise requirements
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                        $25,000 - $40,000
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        14-18 weeks
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">Our recommendation:</span> For your stage and requirements,
                  we suggest starting with Vanta or Drata. Both offer excellent automation, have strong reputations with
                  early-stage companies, and provide responsive support during your first audit.
                </p>
              </div>
            </div>

            {/* Detailed Cost Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-lg bg-gray-100 p-2">
                  <Receipt className="h-5 w-5 text-gray-700" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Detailed Cost Breakdown</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <div className="font-medium text-gray-900">Audit Firm Fees</div>
                    <div className="text-sm text-gray-600">Vanta platform + audit services</div>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">$28,000</div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <div className="font-medium text-gray-900">Internal Engineering Time</div>
                    <div className="text-sm text-gray-600">{report.engineeringWeeks} weeks × $2000/week</div>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">${report.estimatedCost.toLocaleString()}</div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <div className="font-medium text-gray-900">Security Tools & Infrastructure</div>
                    <div className="text-sm text-gray-600">Logging, monitoring, access management tools</div>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">$8,000</div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <div className="font-medium text-gray-900">Training & Documentation</div>
                    <div className="text-sm text-gray-600">Security awareness training, policy templates</div>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">$3,500</div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <div className="font-medium text-gray-900">Contingency Buffer</div>
                    <div className="text-sm text-gray-600">Unexpected remediation, additional consulting</div>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">$5,000</div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-2">
                  <div>
                    <div className="text-xl font-bold text-gray-900">Total Investment</div>
                    <div className="text-sm text-gray-600">One-time cost for initial SOC 2 Type II</div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">${(28000 + report.estimatedCost + 8000 + 3500 + 5000).toLocaleString()}</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">ROI perspective:</span> This investment unlocks
                  ${report.potentialLoss.toLocaleString()}+ in enterprise revenue opportunities and positions your company for sustained growth.
                  Annual renewal costs are typically 30-40% lower than initial certification.
                </p>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  )
}