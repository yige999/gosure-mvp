'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Shield, Clock, Sparkles, FileCheck } from 'lucide-react'
import Link from 'next/link'
import { Footer } from '@/components/Footer'

export default function AnalyzePage() {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Form states
  const [formData, setFormData] = useState({
    teamSize: '',
    engineeringAllocation: '',
    fundingStage: '',
    customerDemand: '',
    pipelineValue: '',
    closeProbability: '',
    avgDealSize: '',
    expectedCustomers: ''
  })

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // 未登录，跳转到登录页
        router.push('/login')
      } else {
        setUser(user)
        setLoading(false)
      }
    }

    checkUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    // 验证所有字段
    const requiredFields = ['teamSize', 'engineeringAllocation', 'fundingStage', 'customerDemand',
                          'pipelineValue', 'closeProbability', 'avgDealSize', 'expectedCustomers']

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData] || formData[field as keyof typeof formData] === '') {
        setError('Please fill in all fields')
        setSubmitting(false)
        return
      }
    }

    // 验证数值字段
    const numericFields = ['teamSize', 'pipelineValue', 'closeProbability', 'avgDealSize', 'expectedCustomers']
    for (const field of numericFields) {
      const value = parseFloat(formData[field as keyof typeof formData])
      if (isNaN(value) || value < 0) {
        setError(`Please enter a valid number for ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`)
        setSubmitting(false)
        return
      }
    }

    // 验证概率在0-100之间
    const closeProb = parseFloat(formData.closeProbability)
    if (closeProb < 0 || closeProb > 100) {
      setError('Close probability must be between 0 and 100')
      setSubmitting(false)
      return
    }

    try {
      // 数据转换和验证
      const teamSize = parseInt(formData.teamSize) || 0
      const engineeringAllocation = parseInt(formData.engineeringAllocation) || 0
      const customerDemand = parseInt(formData.customerDemand) || 0
      const pipelineValue = parseFloat(formData.pipelineValue) || 0
      const closeProbability = parseFloat(formData.closeProbability) || 0
      const avgDealSize = parseFloat(formData.avgDealSize) || 0
      const expectedCustomers = parseInt(formData.expectedCustomers) || 0

      // 添加调试日志
      console.log('Form data:', formData)
      console.log('Submitting:', {
        team_size: teamSize,
        engineering_allocation: engineeringAllocation,
        funding_stage: formData.fundingStage,
        customer_demand: customerDemand,
        pipeline_value: pipelineValue,
        close_probability: closeProbability,
        avg_deal_size: avgDealSize,
        expected_customers: expectedCustomers,
      })

      // 插入数据到analyses表
      const { data, error } = await supabase
        .from('analyses')
        .insert({
          user_id: user.id,
          team_size: teamSize,
          engineering_allocation: engineeringAllocation,
          funding_stage: formData.fundingStage,
          customer_demand: customerDemand,
          pipeline_value: pipelineValue,
          close_probability: closeProbability,
          avg_deal_size: avgDealSize,
          expected_customers: expectedCustomers,
        })
        .select()
        .single()

      if (error) {
        setError(error.message)
        setSubmitting(false)
      } else {
        // 成功，跳转到报告页
        router.push(`/report/${data.id}`)
      }
    } catch (err) {
      setError('An unexpected error occurred')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mx-auto"></div>
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // 正在跳转
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/30 bg-background/60 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <Link href="/" className="flex items-center gap-2.5">
                <Shield className="h-5 w-5 text-foreground" />
                <span className="font-semibold text-[15px] tracking-tight">SOC 2 Timing Advisor</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-foreground text-sm max-w-[150px] truncate" title={user.email}>
                {user.email}
              </span>
              <Link href="/dashboard">
                <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 text-[13px] font-medium px-5 h-9 rounded-lg shadow-sm">
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-[13px] font-medium text-muted-foreground hover:text-foreground"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3 sm:mb-4">
            SOC 2 Timing Analysis
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
            Get data-driven recommendations for your compliance journey
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          </div>
        )}

        {/* Analysis Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Team Size */}
              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size</Label>
                <Input
                  id="teamSize"
                  type="number"
                  placeholder="15"
                  value={formData.teamSize}
                  onChange={(e) => handleInputChange('teamSize', e.target.value)}
                  disabled={submitting}
                  required
                  min="1"
                  step="1"
                />
              </div>

              {/* Engineering Allocation */}
              <div className="space-y-2">
                <Label htmlFor="engineeringAllocation">Engineering Allocation (%)</Label>
                <select
                  id="engineeringAllocation"
                  value={formData.engineeringAllocation}
                  onChange={(e) => handleInputChange('engineeringAllocation', e.target.value)}
                  className="w-full h-11 px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background"
                  disabled={submitting}
                  required
                >
                  <option value="">Select allocation</option>
                  <option value="25">25% - Minimal focus</option>
                  <option value="50">50% - Part-time focus</option>
                  <option value="75">75% - Significant focus</option>
                  <option value="100">100% - Full-time focus</option>
                </select>
              </div>

              {/* Funding Stage */}
              <div className="space-y-2">
                <Label htmlFor="fundingStage">Funding Stage</Label>
                <select
                  id="fundingStage"
                  value={formData.fundingStage}
                  onChange={(e) => handleInputChange('fundingStage', e.target.value)}
                  className="w-full h-11 px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background"
                  disabled={submitting}
                  required
                >
                  <option value="">Select stage</option>
                  <option value="pre-seed">Pre-Seed</option>
                  <option value="seed">Seed</option>
                  <option value="series-a">Series A</option>
                  <option value="series-b">Series B</option>
                  <option value="growth">Growth</option>
                </select>
              </div>

              {/* Customer Demand */}
              <div className="space-y-2">
                <Label htmlFor="customerDemand">Customer Demand for SOC 2</Label>
                <select
                  id="customerDemand"
                  value={formData.customerDemand}
                  onChange={(e) => handleInputChange('customerDemand', e.target.value)}
                  className="w-full h-11 px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background"
                  disabled={submitting}
                  required
                >
                  <option value="">Select demand level</option>
                  <option value="0">None - No requests</option>
                  <option value="2">Low - Occasional inquiries</option>
                  <option value="5">Medium - Regular inquiries</option>
                  <option value="8">High - Frequent requests</option>
                  <option value="10">Critical - Blocking deals</option>
                </select>
              </div>

              {/* Pipeline Value */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="pipelineValue">Pipeline Value ($K)</Label>
                  <Input
                    id="pipelineValue"
                    type="number"
                    placeholder="500"
                    value={formData.pipelineValue}
                    onChange={(e) => handleInputChange('pipelineValue', e.target.value)}
                    disabled={submitting}
                    required
                    min="0"
                    step="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="closeProbability">Close Probability (%)</Label>
                  <Input
                    id="closeProbability"
                    type="number"
                    placeholder="60"
                    min="0"
                    max="100"
                    value={formData.closeProbability}
                    onChange={(e) => handleInputChange('closeProbability', e.target.value)}
                    disabled={submitting}
                    required
                  />
                </div>
              </div>

              {/* Deal Size and Customers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="avgDealSize">Average Deal Size ($K)</Label>
                  <Input
                    id="avgDealSize"
                    type="number"
                    placeholder="100"
                    value={formData.avgDealSize}
                    onChange={(e) => handleInputChange('avgDealSize', e.target.value)}
                    disabled={submitting}
                    required
                    min="0"
                    step="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedCustomers">Expected SOC 2 Customers</Label>
                  <Input
                    id="expectedCustomers"
                    type="number"
                    placeholder="5"
                    value={formData.expectedCustomers}
                    onChange={(e) => handleInputChange('expectedCustomers', e.target.value)}
                    disabled={submitting}
                    required
                    min="0"
                    step="1"
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full bg-foreground text-background hover:bg-foreground/90 text-[14px] sm:text-[15px] font-semibold h-[48px] sm:h-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    Get Analysis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* How it works */}
          <div className="mt-12 sm:mt-16 grid sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="flex justify-center">
                <div className="rounded-xl sm:rounded-2xl bg-accent/50 p-3 sm:p-4 border border-border/50">
                  <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-foreground" />
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold">Enter Your Data</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Provide key metrics about your business
              </p>
            </div>

            <div className="text-center space-y-3 sm:space-y-4">
              <div className="flex justify-center">
                <div className="rounded-xl sm:rounded-2xl bg-accent/50 p-3 sm:p-4 border border-border/50">
                  <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-foreground" />
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold">AI Analysis</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Our algorithm analyzes your timing readiness
              </p>
            </div>

            <div className="text-center space-y-3 sm:space-y-4">
              <div className="flex justify-center">
                <div className="rounded-xl sm:rounded-2xl bg-accent/50 p-3 sm:p-4 border border-border/50">
                  <FileCheck className="h-6 w-6 sm:h-8 sm:w-8 text-foreground" />
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold">Get Report</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Receive personalized recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}