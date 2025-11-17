interface AnalysisInput {
  teamSize: number
  engineeringAllocation: number
  fundingStage: string
  customerDemand: number
  pipelineValue: number
  closeProbability: number
  avgDealSize: number
  expectedCustomers: number
}

interface ReportOutput {
  recommendedDays: number
  riskScore: number
  engineeringWeeks: number
  estimatedCost: number
  potentialLoss: number
  route: string
  reasoning: string[]
  nextSteps: string[]
}

export function generateReport(input: AnalysisInput): ReportOutput {
  // 1. 计算推荐启动时间（天数）
  let recommendedDays = 60 // 默认

  if (input.customerDemand > 7 && input.pipelineValue > 500000) {
    recommendedDays = 30
  } else if (input.customerDemand > 5 && input.pipelineValue > 200000) {
    recommendedDays = 45
  } else if (input.teamSize < 10 && input.customerDemand < 5) {
    recommendedDays = 90
  } else if (input.teamSize < 5) {
    recommendedDays = 120
  }

  // 2. 风险评分（0-100）
  const demandFactor = input.customerDemand * 10
  const pipelineFactor = Math.min((input.pipelineValue / 10000), 50)
  const riskScore = Math.min(demandFactor + pipelineFactor, 100)

  // 3. 工程资源消耗
  const baseWeeks = 12
  const teamFactor = input.teamSize / 10
  const engineeringWeeks = baseWeeks * teamFactor

  // 4. 成本估算（每工程周$2000）
  const estimatedCost = engineeringWeeks * 2000

  // 5. 潜在损失
  const potentialLoss =
    input.pipelineValue *
    (input.closeProbability / 100) *
    (riskScore / 100)

  // 6. 推荐路线
  let route = 'Lite'
  if (input.fundingStage === 'series-a') route = 'Standard'
  if (input.fundingStage === 'series-b' || input.fundingStage === 'growth') route = 'Enterprise'

  // 7. 生成reasoning
  const reasoning: string[] = []

  if (input.teamSize < 10) {
    reasoning.push(
      `With a team of ${input.teamSize}, starting SOC 2 now would consume ${Math.round((12 / input.teamSize) * 100)}% of your engineering capacity for 3-4 months, significantly impacting product development.`
    )
  }

  if (input.customerDemand > 7) {
    reasoning.push(
      `Your customer demand score of ${input.customerDemand}/10 indicates strong pressure from enterprise buyers. Delaying beyond ${recommendedDays} days risks losing deals worth $${(input.pipelineValue / 1000).toLocaleString()}K.`
    )
  } else if (input.customerDemand < 5) {
    reasoning.push(
      `Current customer demand is moderate (${input.customerDemand}/10). You have time to focus on product-market fit before investing heavily in compliance.`
    )
  }

  if (input.pipelineValue > 500000) {
    reasoning.push(
      `Your pipeline value of $${(input.pipelineValue / 1000).toLocaleString()}K justifies prioritizing SOC 2. The potential revenue far outweighs the compliance cost.`
    )
  }

  const stageAdvice: Record<string, string> = {
    'pre-seed': 'At pre-seed stage, focus on finding product-market fit first.',
    'seed': 'Seed stage is often when first enterprise customers appear - perfect timing for SOC 2.',
    'series-a': 'Series A companies typically need SOC 2 to scale enterprise sales.',
    'series-b': 'At this stage, SOC 2 should already be in place or immediate priority.',
    'growth': 'At growth stage, SOC 2 is essential for enterprise expansion.'
  }
  reasoning.push(stageAdvice[input.fundingStage] || stageAdvice['seed'])

  // 8. Next steps
  const nextSteps: string[] = []

  if (recommendedDays <= 30) {
    nextSteps.push('Start security documentation immediately (no engineering needed)')
    nextSteps.push('Choose a compliance platform within 2 weeks')
    nextSteps.push('Begin technical implementation in 2-3 weeks')
    nextSteps.push('Target audit completion in 3-4 months')
  } else if (recommendedDays <= 60) {
    nextSteps.push('Document current security practices over next 3-4 weeks')
    nextSteps.push('Evaluate compliance tools in 4-6 weeks')
    nextSteps.push('Start technical work in 6-8 weeks')
    nextSteps.push('Plan audit for 4-5 months out')
  } else {
    nextSteps.push('Focus on product development for now')
    nextSteps.push('Start basic security documentation (30 mins/week)')
    nextSteps.push('Revisit SOC 2 timing in 2-3 months')
    nextSteps.push('Monitor customer demand closely')
  }

  nextSteps.push(`Recommended compliance route: ${route} SOC 2`)

  return {
    recommendedDays: Math.round(recommendedDays),
    riskScore: Math.round(riskScore),
    engineeringWeeks: Math.round(engineeringWeeks * 10) / 10,
    estimatedCost: Math.round(estimatedCost),
    potentialLoss: Math.round(potentialLoss),
    route,
    reasoning,
    nextSteps
  }
}