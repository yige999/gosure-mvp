"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle, FileText, Zap, Clock, Target, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [analysisId, setAnalysisId] = useState<string | null>(null)
  const [updating, setUpdating] = useState(true)

  useEffect(() => {
    // 优先从URL参数获取，如果没有再从sessionStorage获取
    const urlAnalysisId = searchParams.get('analysis_id')
    const storageAnalysisId = sessionStorage.getItem('pending_analysis_id')

    const finalAnalysisId = urlAnalysisId || storageAnalysisId

    if (!finalAnalysisId) {
      console.error('No analysis_id found in URL or sessionStorage')
      setUpdating(false)
      return
    }

    setAnalysisId(finalAnalysisId)

    // 如果从sessionStorage获取到，清除它
    if (storageAnalysisId) {
      sessionStorage.removeItem('pending_analysis_id')
    }

    updateAnalysis(finalAnalysisId)
  }, [searchParams])

  async function updateAnalysis(id: string) {
    const supabase = createClient()

    try {
      // 从URL参数读取Creem支付信息
      const orderId = searchParams.get('order_id')
      const checkoutId = searchParams.get('checkout_id')

      // 优先使用真实的支付ID，否则生成临时ID
      const paymentId = orderId || checkoutId || 'creem_' + Date.now()

      console.log('Payment info:', { orderId, checkoutId, paymentId })

      // 更新分析为已付费
      const { error } = await supabase
        .from('analyses')
        .update({
          is_paid: true,
          paid_at: new Date().toISOString(),
          payment_id: paymentId
        })
        .eq('id', id)

      if (error) {
        console.error('Update error:', error)
      } else {
        console.log('Successfully updated analysis payment status with payment_id:', paymentId)
      }
    } catch (error) {
      console.error('Unexpected error during update:', error)
    } finally {
      setUpdating(false)
    }
  }

  if (updating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Processing payment...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-2xl px-6 py-16">

        {/* Success Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center space-y-6">

          {/* Checkmark Icon */}
          <div className="flex justify-center">
            <div className="rounded-full bg-emerald-50 p-4">
              <CheckCircle className="h-16 w-16 text-emerald-600" strokeWidth={1.5} />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-600">
              Your detailed report has been unlocked
            </p>
          </div>

          {/* What's Included List */}
          <div className="pt-4 pb-2">
            <div className="bg-gray-50 rounded-lg p-6 text-left space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                What's Included
              </h3>
              <div className="space-y-3">
                {[
                  { icon: FileText, text: "Detailed SOC 2 timeline with weekly milestones" },
                  { icon: Zap, text: "Priority action items ranked by impact" },
                  { icon: Target, text: "Vendor recommendations & cost estimates" },
                  { icon: Users, text: "Team resource allocation planning" },
                  { icon: Clock, text: "30-day money-back guarantee" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <item.icon className="h-5 w-5 text-gray-600" strokeWidth={1.5} />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Primary CTA Button */}
          <div className="pt-4 space-y-4">
            {analysisId ? (
              <Link href={`/report/${analysisId}`}>
                <button className="w-full bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group">
                  View Your Report
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            ) : (
              <Link href="/dashboard">
                <button className="w-full bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group">
                  Go to Dashboard
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            )}

            {/* Secondary Link */}
            <Link
              href="/dashboard"
              className="inline-block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>

        </div>

        {/* Support Message */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <a
              href="mailto:support@soc2timing.com"
              className="font-medium text-gray-900 hover:text-gray-700 transition-colors underline underline-offset-2"
            >
              Contact our support team
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}