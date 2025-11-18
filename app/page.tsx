'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Clock, TrendingUp, Target, CheckCircle2, AlertTriangle, DollarSign, Shield, Sparkles, FileCheck, Users, TrendingDown, AlertCircle, Zap } from 'lucide-react'
import Navbar from '@/components/navbar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // 检查当前用户
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-80 lg:pb-64 overflow-hidden">
        {/* Softer, nearly invisible gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-background to-background" />
        {/* Ultra-subtle grid */}
        <div className="absolute inset-0 bg-grid-pattern-light opacity-30" />

        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Content with much more breathing room */}
            <div className="space-y-8 sm:space-y-12 max-w-2xl">
              <h1 className="text-balance text-3xl sm:text-5xl lg:text-[84px] leading-[1.1] sm:leading-[1.08] font-bold tracking-[-0.04em] text-foreground">
                Know Exactly When to Start SOC 2
              </h1>

              <p className="text-pretty text-base sm:text-lg lg:text-[21px] leading-relaxed sm:leading-[1.6] text-muted-foreground max-w-xl font-normal">
                Data-driven timing recommendations for early-stage startups. Save engineering resources. Never miss a deal.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 sm:gap-5">
                {!loading && (
                  <Link href={user ? "/analyze" : "/signup"} className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="bg-foreground text-background hover:bg-foreground/95 text-[14px] sm:text-[15px] font-semibold px-6 sm:px-9 h-[48px] sm:h-[52px] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto"
                    >
                      {user ? "Create New Analysis" : "Get Your Free Analysis"}
                      <ArrowRight className="ml-2 h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]" />
                    </Button>
                  </Link>
                )}
              </div>

              <p className="mt-4 text-sm text-white/80">
                Questions?{' '}
                <a
                  href="mailto:support@gosure.online"
                  className="text-white underline hover:text-white/90"
                >
                  support@gosure.online
                </a>
              </p>

              <div className="mt-6 flex justify-center gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30">
                  <div className="text-sm text-white/70">Free Analysis</div>
                  <div className="text-2xl font-bold text-white">$0</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30">
                  <div className="text-sm text-white/70">Premium Report</div>
                  <div className="text-2xl font-bold text-white">$49</div>
                </div>
              </div>
            </div>

            <div className="relative lg:block hidden perspective-1000">
              <div className="relative transform-gpu hover:rotate-y-2 hover:rotate-x-1 transition-transform duration-700 ease-out" style={{ transformStyle: 'preserve-3d' }}>
                {/* Softer, more subtle glow */}
                <div className="absolute -inset-8 bg-gradient-to-r from-primary/10 via-primary/15 to-primary/10 blur-[80px] animate-pulse-slow" />

                {/* Product mockup with minimal styling */}
                <Card className="relative border shadow-2xl overflow-hidden backdrop-blur-sm bg-card/95">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-12 space-y-10">
                      {/* Minimal browser chrome */}
                      <div className="flex items-center gap-2 pb-6 border-b border-white/5">
                        <div className="flex gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                        </div>
                      </div>

                      {/* Clean content */}
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <div className="text-white/40 text-sm font-medium tracking-wide uppercase">Get Your Analysis</div>
                          <div className="text-white text-4xl font-bold tracking-tight">Personalized Recommendations</div>
                        </div>

                        <div className="space-y-4 pt-3">
                          <div className="flex items-center gap-4 text-white/70">
                            <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                            <span className="text-[15px]">Data-driven timing analysis</span>
                          </div>
                          <div className="flex items-center gap-4 text-white/70">
                            <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                            <span className="text-[15px]">Risk assessment included</span>
                          </div>
                          <div className="flex items-center gap-4 text-white/70">
                            <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                            <span className="text-[15px]">Actionable insights</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-20 lg:px-12 lg:py-52 bg-background relative overflow-hidden">
        <div className="relative mx-auto max-w-[1400px]">
          <div className="text-center mb-16 sm:mb-24 lg:mb-32 space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.03em] text-foreground leading-[1.1]">
              How It Works
            </h2>
            <p className="text-base sm:text-lg lg:text-[19px] text-muted-foreground leading-relaxed">
              Get your personalized SOC 2 timing recommendation in 3 simple steps
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center space-y-6 sm:space-y-8">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-foreground text-background text-sm font-bold">
                1
              </div>

              <div className="flex justify-center">
                <div className="rounded-xl sm:rounded-2xl bg-accent/50 p-5 sm:p-7 border border-border/50">
                  <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-foreground" />
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold text-foreground">Answer 8 Questions</h3>
                <p className="text-sm sm:text-[15px] leading-relaxed max-w-xs">
                  Tell us about your revenue, sales pipeline, and engineering capacity
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center space-y-6 sm:space-y-8">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-foreground text-background text-sm font-bold">
                2
              </div>

              <div className="flex justify-center">
                <div className="rounded-xl sm:rounded-2xl bg-accent/50 p-5 sm:p-7 border border-border/50">
                  <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-foreground" />
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold text-foreground">AI Analyzes</h3>
                <p className="text-sm sm:text-[15px] leading-relaxed max-w-xs">
                  Our algorithm weighs your business stage against compliance costs
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center space-y-6 sm:space-y-8">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-foreground text-background text-sm font-bold">
                3
              </div>

              <div className="flex justify-center">
                <div className="rounded-xl sm:rounded-2xl bg-accent/50 p-5 sm:p-7 border border-border/50">
                  <FileCheck className="h-8 w-8 sm:h-10 sm:w-10 text-foreground" />
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold text-foreground">Get Recommendation</h3>
                <p className="text-sm sm:text-[15px] leading-relaxed max-w-xs">
                  Receive your optimal timeline with clear next steps and risk analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 sm:px-6 py-20 lg:px-12 lg:py-52 bg-gray-50 dark:bg-gray-900/30">
        <div className="relative mx-auto max-w-[1400px]">
          <div className="text-center mb-16 sm:mb-20 lg:mb-32 space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.03em] text-foreground leading-[1.1]">
              Choose Your Analysis Plan
            </h2>
            <p className="text-base sm:text-lg lg:text-[19px] text-muted-foreground leading-relaxed">
              Start with a free analysis, then upgrade for detailed insights
            </p>
          </div>

          <div className="grid gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="relative bg-background rounded-2xl border border-border/50 shadow-lg overflow-hidden">
              <div className="p-8 lg:p-12">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Free Analysis</h3>
                    <p className="text-muted-foreground">Perfect for getting started</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-foreground">$0</div>
                    <p className="text-sm text-muted-foreground">Free forever</p>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-foreground">Recommended start date</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-foreground">Risk analysis</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-foreground">Resource impact calculation</span>
                  </li>
                </ul>

                {!loading && (
                  <Link href={user ? "/analyze" : "/signup"} className="block">
                    <Button size="lg" className="w-full bg-foreground text-background hover:bg-foreground/95">
                      {user ? "Start Free Analysis" : "Sign Up for Free"}
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Premium Plan */}
            <div className="relative bg-background rounded-2xl border border-border/50 shadow-lg overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full">
                  <Zap className="h-3.5 w-3.5 text-foreground" />
                  <span className="text-xs font-medium text-foreground">Most Popular</span>
                </div>
              </div>

              <div className="p-8 lg:p-12">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Detailed Report</h3>
                    <p className="text-muted-foreground">Complete timing roadmap</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-foreground">$49</div>
                    <p className="text-sm text-muted-foreground">One-time payment</p>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-foreground">Everything in Free</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-foreground">Detailed month-by-month roadmap</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-foreground">Vendor recommendations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-foreground">Cost breakdown analysis</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-foreground">Policy templates</span>
                  </li>
                </ul>

                {!loading && (
                  <Link href={user ? "/analyze" : "/signup"} className="block">
                    <Button size="lg" className="w-full bg-black text-white hover:bg-black/90">
                      Get Detailed Report
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-20 lg:px-12 lg:py-56">
        <div className="mx-auto max-w-3xl text-center space-y-8 sm:space-y-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.03em] text-foreground leading-[1.1]">
            Ready to Find Your Perfect Timing?
          </h2>
          <p className="text-base sm:text-lg lg:text-[19px] text-muted-foreground leading-relaxed">
            Get data-driven timing recommendations for your SOC 2 compliance journey
          </p>
          {!loading && (
            <Link href={user ? "/analyze" : "/signup"} className="w-full sm:w-auto inline-block">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/95 text-[14px] sm:text-[15px] font-semibold px-6 sm:px-9 h-[48px] sm:h-[52px] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto"
              >
                {user ? "Create New Analysis" : "Start Free Analysis"}
                <ArrowRight className="ml-2 h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6 sm:space-y-8">
            {/* FAQ 1 */}
            <div className="border-b border-gray-200 pb-6 sm:pb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                How accurate are the recommendations?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Our algorithm analyzes your specific situation (team size, customer demand, pipeline value) to provide data-driven recommendations tailored to early-stage startups.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="border-b border-gray-200 pb-6 sm:pb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                Is my data secure?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Yes. All data is encrypted in transit and at rest. We use Supabase (SOC 2 compliant) for storage and never share your information with third parties.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="border-b border-gray-200 pb-6 sm:pb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                What's included in the free analysis?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                You get a recommended start date, risk analysis, resource impact calculation, and strategic next steps. The $49 premium report adds detailed roadmaps, vendor comparisons, and cost breakdowns.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="border-b border-gray-200 pb-6 sm:pb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                Do you help with actual SOC 2 implementation?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                We focus on timing recommendations. For actual implementation, we recommend platforms like Vanta, Drata, or Secureframe based on your needs.
              </p>
            </div>

            {/* FAQ 5 */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                What if I'm not satisfied with the premium report?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                We offer a 30-day money-back guarantee. If you're not satisfied, email us at support@gosure.online for a full refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/30 px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span className="text-[13px] font-medium">Gosure</span>
            </div>
            <p className="text-[13px] text-muted-foreground">
              © 2025 All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <Footer />
    </div>
  )
}