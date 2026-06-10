export interface Event {
  id: string
  regionId: string
  zoneName: string
  riskScore: number
  primaryThreatVector: string
  status: 'critical' | 'elevated' | 'stable' | 'monitoring'
  timestamp: string
  description?: string
  region?: string
  analysis?: {
    crisis_level?: string
    executive_summary?: string
    recommended_strategy?: {
      name?: string
      reason?: string
    }
    expected_outcome?: {
      delay_reduction_percent?: number
      cost_saving_percent?: number
      risk_reduction_percent?: number
    }
    top_actions?: Array<string | { priority?: string; action?: string; owner?: string }>
    secondary_risks?: Array<string | { priority?: string; action?: string; owner?: string }>
    confidence_score?: number
    supply_chain_impact?: {
      delay_days?: number
      cost_increase_percent?: number
    }
    recommended_hubs?: string[]
  }
}

export interface EventFilters {
  status?: Event['status']
  region?: string
  minRiskScore?: number
  maxRiskScore?: number
}

export interface EventListResponse {
  events: Event[]
  total: number
  page: number
  pageSize: number
}
