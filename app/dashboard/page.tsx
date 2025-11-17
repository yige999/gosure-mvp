'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft, Plus, FileText, Users, TrendingUp, Clock, DollarSign, Calendar } from 'lucide-react'
import { Footer } from '@/components/Footer'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [analyses, setAnalyses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const supabase = createClient()

    // 检查登录
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    setUser(user)

    // 读取用户的所有分析
    const { data } = await supabase
      .from('analyses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    setAnalyses(data || [])
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300 mx-auto"></div>
          <div className="text-lg text-gray-600">Loading your analyses...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600 truncate max-w-[200px] sm:max-w-none" title={user?.email}>{user?.email}</p>
              </div>
            </div>
            <Link href="/analyze">
              <button className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-semibold transition-colors w-full sm:w-auto justify-center">
                <Plus className="h-4 w-4" />
                New Analysis
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        {/* 统计概览 */}
        {analyses.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2 sm:p-3">
                  <FileText className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total Analyses</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{analyses.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-50 p-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Team Size</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(analyses.reduce((sum, a) => sum + a.team_size, 0) / analyses.length)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-50 p-3">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pipeline</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${Math.round(analyses.reduce((sum, a) => sum + a.pipeline_value, 0) / 1000)}K
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-orange-50 p-3">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Deal Size</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${Math.round(analyses.reduce((sum, a) => sum + a.avg_deal_size, 0) / analyses.length)}K
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 分析列表 */}
        {analyses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No analyses yet
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Create your first SOC 2 timing analysis to get personalized recommendations for your compliance journey.
            </p>
            <Link href="/analyze">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-semibold transition-colors">
                <Plus className="h-4 w-4" />
                Get Started
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Analyses</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {analyses.map((analysis) => {
                const recommendation = analysis.recommendation
                const createdDate = new Date(analysis.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })

                return (
                  <Link
                    key={analysis.id}
                    href={`/report/${analysis.id}`}
                    className="block group"
                  >
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {createdDate}
                        </div>
                        <div className="inline-block px-2 py-1 bg-gray-100 rounded-lg">
                          <span className="text-xs font-medium text-gray-700 capitalize">
                            {analysis.funding_stage.replace('-', ' ')}
                          </span>
                        </div>
                      </div>

                      {/* 关键指标 */}
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Team Size</span>
                          <span className="font-semibold text-gray-900">
                            {analysis.team_size} people
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Pipeline</span>
                          <span className="font-semibold text-gray-900">
                            ${(analysis.pipeline_value / 1000).toFixed(0)}K
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Demand</span>
                          <span className="font-semibold text-gray-900">
                            {analysis.customer_demand}/10
                          </span>
                        </div>
                      </div>

                      {/* 推荐结果 */}
                      {recommendation && (
                        <div className="border-t pt-4">
                          <div className="text-sm text-gray-600 mb-2">
                            Recommended Start:
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-gray-900">
                              {recommendation.recommendedDays} days
                            </div>
                            <div className="text-sm text-blue-600 font-medium group-hover:text-blue-700">
                              View →
                            </div>
                          </div>
                          {recommendation.route && (
                            <div className="text-xs text-gray-500 mt-1">
                              {recommendation.route} Route
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}