export interface Analysis {
  id: string
  eventId: string
  type: 'impact' | 'risk' | 'mitigation'
  confidence: number
  status: 'pending' | 'processing' | 'complete' | 'failed'
  results?: AnalysisResult
  createdAt: string
  completedAt?: string
}

export interface AnalysisResult {
  summary: string
  riskLevel: number
  affectedRegions: string[]
  recommendations: string[]
  projectedImpact: {
    metric: string
    currentValue: number
    projectedValue: number
    changePercentage: number
  }[]
}

export interface AnalysisRequest {
  eventId: string
  type: Analysis['type']
  parameters?: Record<string, unknown>
}
