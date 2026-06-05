export interface Simulation {
  id: string
  eventId: string
  name: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  progress: number
  createdAt: string
  completedAt?: string
  results?: SimulationResult
}

export interface SimulationResult {
  summary: string
  riskReduction: number
  timeline: SimulationTimelineStep[]
  metrics: SimulationMetric[]
}

export interface SimulationTimelineStep {
  step: string
  status: 'pending' | 'processing' | 'complete' | 'failed'
  confidence?: number
  timestamp?: string
}

export interface SimulationMetric {
  name: string
  currentValue: number
  projectedValue: number
  unit: string
}

export interface SimulationRequest {
  eventId: string
  parameters?: Record<string, unknown>
}
