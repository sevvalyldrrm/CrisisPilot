import type { Event, Analysis, Simulation, DashboardData } from '@/entities/types'

export const mockEvents: Event[] = [
  {
    id: 'R-092',
    regionId: 'R-092',
    zoneName: 'Red Sea Corridor',
    riskScore: 94.2,
    primaryThreatVector: 'Geopolitical / Logistics',
    status: 'critical',
    timestamp: '2024-01-15T14:02:00Z',
    description: 'Vessel re-routing initiated. Impact level severe.',
    region: 'EMEA',
  },
  {
    id: 'E-014',
    regionId: 'E-014',
    zoneName: 'Northern Europe Grid',
    riskScore: 88.7,
    primaryThreatVector: 'Infrastructure / Energy',
    status: 'critical',
    timestamp: '2024-01-15T11:45:00Z',
    description: 'Frequency drops detected. Backup systems engaged.',
    region: 'EU',
  },
  {
    id: 'A-044',
    regionId: 'A-044',
    zoneName: 'APAC Transit Hubs',
    riskScore: 72.1,
    primaryThreatVector: 'Supply Chain / Congestion',
    status: 'elevated',
    timestamp: '2024-01-15T09:12:00Z',
    description: 'Wait times exceeding 48h parameters.',
    region: 'APAC',
  },
]

export const mockDashboardData: DashboardData = {
  telemetry: [
    {
      label: 'Global Risk Score',
      value: 64,
      maxValue: 100,
      unit: '/100',
      trend: 3,
      status: 'warning',
      icon: 'monitoring',
    },
    {
      label: 'Active Disruptions',
      value: 42,
      trend: 3,
      status: 'normal',
      icon: 'sensors',
    },
    {
      label: 'Critical Alerts',
      value: 8,
      status: 'critical',
      icon: 'warning',
    },
    {
      label: 'Stability Index',
      value: 92,
      unit: '%',
      status: 'stable',
      icon: 'check_circle',
    },
  ],
  missions: [
    {
      id: 'M-001',
      name: 'Singapore Port Congestion',
      region: 'APAC',
      riskScore: 82,
      progress: 67,
      projectedReduction: 48,
      status: 'active',
    },
    {
      id: 'M-002',
      name: 'Red Sea Maritime Incident',
      region: 'EMEA',
      riskScore: 94,
      progress: 32,
      projectedReduction: 74,
      status: 'active',
    },
    {
      id: 'M-003',
      name: 'Northern Europe Grid',
      region: 'EU',
      riskScore: 88,
      progress: 85,
      projectedReduction: 62,
      status: 'active',
    },
  ],
  agentSteps: [
    {
      step: 'Event Detection',
      status: 'complete',
      confidence: 99.8,
      timestamp: '14:02Z',
    },
    {
      step: 'Impact Assessment',
      status: 'complete',
      confidence: 94.2,
      timestamp: '14:05Z',
    },
    {
      step: 'Historical Correlation Search',
      status: 'complete',
      confidence: 88.0,
      timestamp: '14:08Z',
    },
    {
      step: 'Risk Forecast Generation',
      status: 'processing',
      confidence: 92.4,
      timestamp: '14:12Z',
    },
    {
      step: 'Mitigation Planning',
      status: 'pending',
      timestamp: '--:--Z',
    },
  ],
  escalations: [
    {
      id: 'ESC-001',
      title: 'Red Sea Maritime Incident',
      description: 'Vessel re-routing initiated. Impact level severe.',
      timestamp: '14:02Z',
      severity: 'critical',
    },
    {
      id: 'ESC-002',
      title: 'Grid Instability (Scandinavia)',
      description: 'Frequency drops detected. Backup systems engaged.',
      timestamp: '11:45Z',
      severity: 'elevated',
    },
    {
      id: 'ESC-003',
      title: 'APAC Port Congestion',
      description: 'Wait times exceeding 48h parameters.',
      timestamp: '09:12Z',
      severity: 'normal',
    },
  ],
  highRiskRegions: mockEvents,
}

export const mockAnalysis: Analysis = {
  id: 'ANL-001',
  eventId: 'R-092',
  type: 'impact',
  confidence: 94.2,
  status: 'complete',
  createdAt: '2024-01-15T14:05:00Z',
  completedAt: '2024-01-15T14:08:00Z',
  results: {
    summary: 'Critical impact detected in Red Sea corridor with high confidence',
    riskLevel: 94,
    affectedRegions: ['EMEA', 'APAC'],
    recommendations: [
      'Implement vessel re-routing protocols',
      'Activate backup supply chain routes',
      'Increase monitoring frequency',
    ],
    projectedImpact: [
      {
        metric: 'Transit Time',
        currentValue: 14,
        projectedValue: 21,
        changePercentage: 50,
      },
      {
        metric: 'Cost Impact',
        currentValue: 100,
        projectedValue: 145,
        changePercentage: 45,
      },
    ],
  },
}

export const mockSimulation: Simulation = {
  id: 'SIM-001',
  eventId: 'R-092',
  name: 'Red Sea Maritime Mitigation',
  status: 'running',
  progress: 32,
  createdAt: '2024-01-15T14:10:00Z',
  results: {
    summary: 'Simulation in progress for Red Sea incident mitigation',
    riskReduction: 74,
    timeline: [
      {
        step: 'Event Detection',
        status: 'complete',
        confidence: 99.8,
        timestamp: '14:02Z',
      },
      {
        step: 'Impact Assessment',
        status: 'complete',
        confidence: 94.2,
        timestamp: '14:05Z',
      },
      {
        step: 'Historical Correlation Search',
        status: 'complete',
        confidence: 88.0,
        timestamp: '14:08Z',
      },
      {
        step: 'Risk Forecast Generation',
        status: 'processing',
        confidence: 92.4,
        timestamp: '14:12Z',
      },
      {
        step: 'Mitigation Planning',
        status: 'pending',
        timestamp: '--:--Z',
      },
    ],
    metrics: [
      {
        name: 'Risk Score',
        currentValue: 94,
        projectedValue: 24,
        unit: '/100',
      },
      {
        name: 'Transit Time',
        currentValue: 21,
        projectedValue: 16,
        unit: 'days',
      },
    ],
  },
}
