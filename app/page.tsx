'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Clock, TrendingUp, Target, CheckCircle2, AlertTriangle, DollarSign, Shield, Sparkles, FileCheck, Users, TrendingDown, AlertCircle, Zap } from 'lucide-react'
import Navbar from '@/components/navbar'
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

      <section className="relative pt-52 pb-40 sm:pt-64 sm:pb-52 lg:pt-80 lg:pb-64 overflow-hidden">
        {/* Softer, nearly invisible gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-background to-background" />
        {/* Ultra-subtle grid */}
        <div className="absolute inset-0 bg-grid-pattern-light opacity-30" />
        
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            {/* Left: Content with much more breathing room */}
            <div className="space-y-12 max-w-2xl">
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-border/50 bg-accent/30 backdrop-blur-sm">
                <div className="flex -space-x-1.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 border border-background" />
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 border border-background" />
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-500 border border-background" />
                </div>
                <span className="text-[13px] font-medium text-muted-foreground">Trusted by 50+ startups</span>
              </div>

              <h1 className="text-balance text-[56px] leading-[1.08] sm:text-[72px] lg:text-[84px] font-bold tracking-[-0.04em] text-foreground">
                Know Exactly When to Start SOC 2
              </h1>
              
              <p className="text-pretty text-[21px] sm:text-[23px] leading-[1.6] text-muted-foreground max-w-xl font-normal">
                Data-driven timing recommendations for early-stage startups. Save engineering resources. Never miss a deal.
              </p>
              
              <div className="flex items-center gap-5 pt-4">
                {!loading && (
                  <Link href={user ? "/analyze" : "/signup"}>
                    <Button
                      size="lg"
                      className="bg-foreground text-background hover:bg-foreground/95 text-[15px] font-semibold px-9 h-[52px] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      {user ? "Create New Analysis" : "Get Your Free Analysis"}
                      <ArrowRight className="ml-2 h-[18px] w-[18px]" />
                    </Button>
                  </Link>
                )}
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
                          <div className="text-white/40 text-sm font-medium tracking-wide uppercase">Your Recommendation</div>
                          <div className="text-white text-4xl font-bold tracking-tight">Start in 4-6 months</div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-5">
                          <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/5">
                            <div className="text-emerald-400 text-xs font-medium mb-3 uppercase tracking-wider">Revenue Stage</div>
                            <div className="text-white text-xl font-semibold">$500K ARR</div>
                          </div>
                          <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/5">
                            <div className="text-blue-400 text-xs font-medium mb-3 uppercase tracking-wider">Risk Level</div>
                            <div className="text-white text-xl font-semibold">Low</div>
                          </div>
                        </div>
                        
                        <div className="space-y-4 pt-3">
                          <div className="flex items-center gap-4 text-white/70">
                            <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                            <span className="text-[15px]">Engineering capacity aligned</span>
                          </div>
                          <div className="flex items-center gap-4 text-white/70">
                            <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                            <span className="text-[15px]">Enterprise deals in pipeline</span>
                          </div>
                          <div className="flex items-center gap-4 text-white/70">
                            <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                            <span className="text-[15px]">Optimal timing window</span>
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

      <section className="px-6 py-40 lg:px-12 lg:py-52 bg-background relative overflow-hidden">
        <div className="relative mx-auto max-w-[1400px]">
          <div className="text-center mb-32 space-y-6 max-w-3xl mx-auto">
            <h2 className="text-[44px] sm:text-[52px] font-bold tracking-[-0.03em] text-foreground leading-[1.1]">
              How It Works
            </h2>
            <p className="text-[19px] text-muted-foreground leading-relaxed">
              Get your personalized SOC 2 timing recommendation in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16 lg:gap-20">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center space-y-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background text-sm font-bold">
                1
              </div>
              
              <div className="flex justify-center">
                <div className="rounded-2xl bg-accent/50 p-7 border border-border/50">
                  <Clock className="h-10 w-10 text-foreground" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-[22px] font-semibold text-foreground">Answer 8 Questions</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed max-w-xs">
                  Tell us about your revenue, sales pipeline, and engineering capacity
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center space-y-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background text-sm font-bold">
                2
              </div>
              
              <div className="flex justify-center">
                <div className="rounded-2xl bg-accent/50 p-7 border border-border/50">
                  <Sparkles className="h-10 w-10 text-foreground" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-[22px] font-semibold text-foreground">AI Analyzes</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed max-w-xs">
                  Our algorithm weighs your business stage against compliance costs
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center space-y-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background text-sm font-bold">
                3
              </div>
              
              <div className="flex justify-center">
                <div className="rounded-2xl bg-accent/50 p-7 border border-border/50">
                  <FileCheck className="h-10 w-10 text-foreground" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-[22px] font-semibold text-foreground">Get Recommendation</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed max-w-xs">
                  Receive your optimal timeline with clear next steps and risk analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-40 lg:px-12 lg:py-52">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center mb-28 space-y-6 max-w-3xl mx-auto">
            <h2 className="text-[44px] sm:text-[52px] font-bold tracking-[-0.03em] text-foreground leading-[1.1]">
              The Cost of Bad Timing
            </h2>
            <p className="text-[19px] text-muted-foreground leading-relaxed">
              Real data from 50+ startups shows the financial impact of SOC 2 timing mistakes
            </p>
          </div>
          
          {/* 2x2 Grid of stat cards */}
          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto mb-20">
            {/* Card 1: Engineering Cost */}
            <Card className="group relative border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden">
              <CardContent className="pt-12 pb-12 px-10 space-y-6">
                <div className="flex justify-center">
                  <div className="rounded-2xl bg-red-50/50 dark:bg-red-950/20 p-4 border border-red-100/50 dark:border-red-900/30">
                    <TrendingDown className="h-8 w-8 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="text-[56px] font-bold bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent leading-none">
                    $87,000
                  </div>
                  <h3 className="text-[18px] font-semibold text-foreground">
                    Average engineering cost of starting too early
                  </h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">
                    3 engineers × 4 months × $7.3K/month
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Lost Deal Value */}
            <Card className="group relative border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden">
              <CardContent className="pt-12 pb-12 px-10 space-y-6">
                <div className="flex justify-center">
                  <div className="rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 p-4 border border-amber-100/50 dark:border-amber-900/30">
                    <DollarSign className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="text-[56px] font-bold bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent leading-none">
                    $124,000
                  </div>
                  <h3 className="text-[18px] font-semibold text-foreground">
                    Average deal value lost by starting too late
                  </h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">
                    Based on 50+ startup surveys
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Product Delay */}
            <Card className="group relative border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden">
              <CardContent className="pt-12 pb-12 px-10 space-y-6">
                <div className="flex justify-center">
                  <div className="rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 p-4 border border-orange-100/50 dark:border-orange-900/30">
                    <AlertCircle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="text-[56px] font-bold bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent leading-none">
                    4.2 months
                  </div>
                  <h3 className="text-[18px] font-semibold text-foreground">
                    Product delay from premature SOC 2 start
                  </h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">
                    Critical feature development paused
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card 4: Enterprise Requirements */}
            <Card className="group relative border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden">
              <CardContent className="pt-12 pb-12 px-10 space-y-6">
                <div className="flex justify-center">
                  <div className="rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 p-4 border border-emerald-100/50 dark:border-emerald-900/30">
                    <Zap className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="text-[56px] font-bold bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent leading-none">
                    68%
                  </div>
                  <h3 className="text-[18px] font-semibold text-foreground">
                    Enterprise deals require SOC 2 at contract stage
                  </h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">
                    Source: 2024 SaaS Security Survey
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA below cards */}
          <div className="text-center space-y-8">
            <p className="text-[21px] text-foreground font-medium max-w-2xl mx-auto">
              Don't guess. Get data-driven timing recommendations in 2 minutes.
            </p>
            {!loading && (
              <Link href={user ? "/analyze" : "/signup"}>
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/95 text-[15px] font-semibold px-9 h-[52px] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  {user ? "Create New Analysis" : "Calculate My Timing"}
                  <ArrowRight className="ml-2 h-[18px] w-[18px]" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 py-48 lg:px-12 lg:py-56">
        <div className="mx-auto max-w-3xl text-center space-y-12">
          <h2 className="text-[44px] sm:text-[52px] font-bold tracking-[-0.03em] text-foreground leading-[1.1]">
            Ready to Find Your Perfect Timing?
          </h2>
          <p className="text-[19px] text-muted-foreground leading-relaxed">
            Join hundreds of startups that have optimized their SOC 2 compliance journey
          </p>
          {!loading && (
            <Link href={user ? "/analyze" : "/signup"}>
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/95 text-[15px] font-semibold px-9 h-[52px] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                {user ? "Create New Analysis" : "Start Free Analysis"}
                <ArrowRight className="ml-2 h-[18px] w-[18px]" />
              </Button>
            </Link>
          )}
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
    </div>
  )
}
