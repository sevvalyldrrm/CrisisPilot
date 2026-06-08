export interface TelemetryMetric {
  label: string
  value: number
  maxValue?: number
  unit?: string
  trend?: number
  status?: 'warning' | 'stable' | 'critical' | 'normal'
  icon?: string
}

export interface Mission {
  id: string
  name: string
  region: string
  riskScore: number
  progress: number
  projectedReduction: number
  status: 'active' | 'completed' | 'failed'
}

export interface AgentStep {
  step: string
  status: 'pending' | 'processing' | 'complete' | 'failed'
  confidence?: number
  timestamp?: string
}

export interface Escalation {
  id: string
  title: string
  description: string
  timestamp: string
  severity: 'critical' | 'elevated' | 'normal'
}

export interface RecentEscalation {
  title: string
  level: string
}

export interface ActiveMission {
  name: string
  risk: number
  progress: number
}

export interface DashboardMetrics {
  globalRiskScore: number
  activeDisruptions: number
  criticalAlerts: number
  stabilityIndex: number
  recentEscalations: RecentEscalation[]
  activeMissions: ActiveMission[]
}
