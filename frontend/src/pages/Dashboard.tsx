import { TelemetryCard, MissionCard, AgentMissionCenter, EscalationTimeline, RiskHeatmap, HighRiskRegionsTable } from '@/widgets'
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics'
import { ErrorState } from '@/shared/ui/ErrorState'
import type { TelemetryMetric, Mission, Escalation, Event } from '@/entities/types'

export const Dashboard = () => {
  const { data: metrics, isLoading, error, refetch } = useDashboardMetrics()

  if (isLoading) {
    return (
      <main className="flex-1 p-gutter overflow-y-auto overflow-x-hidden flex flex-col gap-gutter">
        {/* Top Telemetry Row Skeleton */}
        <div className="grid grid-cols-4 gap-gutter shrink-0">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-surface-container-low border border-outline-variant rounded h-24 animate-pulse" />
          ))}
        </div>

        {/* Main Workspace Skeleton */}
        <div className="grid grid-cols-12 grid-rows-2 gap-gutter flex-1 min-h-[500px]">
          <div className="col-span-8 row-span-2 bg-surface-container-low border border-outline-variant rounded animate-pulse" />
          <div className="col-span-4 row-span-1 bg-surface-container-low border border-outline-variant rounded animate-pulse" />
          <div className="col-span-4 row-span-1 bg-surface-container-low border border-outline-variant rounded animate-pulse" />
        </div>

        {/* Missions Skeleton */}
        <div className="bg-surface-container-low border border-outline-variant rounded h-32 animate-pulse" />

        {/* Table Skeleton */}
        <div className="bg-surface-container-low border border-outline-variant rounded h-64 animate-pulse" />
      </main>
    )
  }

  if (error || !metrics) {
    return (
      <main className="flex-1 p-gutter overflow-y-auto overflow-x-hidden">
        <ErrorState message="Failed to load dashboard metrics" onRetry={() => refetch()} />
      </main>
    )
  }

  // Transform backend data to match widget interfaces
  const telemetry: TelemetryMetric[] = [
    {
      label: 'Global Risk Score',
      value: metrics.globalRiskScore,
      maxValue: 100,
      unit: '/100',
      status: metrics.globalRiskScore >= 80 ? 'critical' : metrics.globalRiskScore >= 60 ? 'warning' : 'stable',
      icon: 'monitoring',
    },
    {
      label: 'Active Disruptions',
      value: metrics.activeDisruptions,
      status: metrics.activeDisruptions >= 50 ? 'critical' : metrics.activeDisruptions >= 30 ? 'warning' : 'normal',
      icon: 'sensors',
    },
    {
      label: 'Critical Alerts',
      value: metrics.criticalAlerts,
      status: metrics.criticalAlerts >= 10 ? 'critical' : metrics.criticalAlerts >= 5 ? 'warning' : 'normal',
      icon: 'warning',
    },
    {
      label: 'Stability Index',
      value: metrics.stabilityIndex,
      unit: '%',
      status: metrics.stabilityIndex >= 90 ? 'stable' : metrics.stabilityIndex >= 70 ? 'warning' : 'critical',
      icon: 'check_circle',
    },
  ]

  const missions: Mission[] = metrics.activeMissions.map((mission, index) => ({
    id: `M-${String(index + 1).padStart(3, '0')}`,
    name: mission.name,
    region: 'Global',
    riskScore: mission.risk,
    progress: mission.progress,
    projectedReduction: Math.round(mission.progress * 0.7),
    status: 'active' as const,
  }))

  const escalations: Escalation[] = metrics.recentEscalations.map((escalation, index) => ({
    id: `ESC-${String(index + 1).padStart(3, '0')}`,
    title: escalation.title,
    description: 'Recent escalation detected',
    timestamp: 'Recent',
    severity: escalation.level === 'critical' ? 'critical' : escalation.level === 'elevated' ? 'elevated' : 'normal',
  }))

  // Keep mock data for components not provided by backend
  const agentSteps = [
    { step: 'Event Detection', status: 'complete' as const, confidence: 99.8, timestamp: '14:02Z' },
    { step: 'Impact Assessment', status: 'complete' as const, confidence: 94.2, timestamp: '14:05Z' },
    { step: 'Historical Correlation', status: 'processing' as const, confidence: 88.0, timestamp: '14:08Z' },
    { step: 'Risk Forecast', status: 'pending' as const, timestamp: '--:--Z' },
  ]

  const highRiskRegions: Event[] = []

  return (
    <main className="flex-1 p-gutter overflow-y-auto overflow-x-hidden flex flex-col gap-gutter">
      {/* Top Telemetry Row */}
      <div className="grid grid-cols-4 gap-gutter shrink-0">
        {telemetry.map((metric, index) => (
          <TelemetryCard key={index} metric={metric} />
        ))}
      </div>

      {/* Main Workspace: Bento Layout */}
      <div className="grid grid-cols-12 grid-rows-2 gap-gutter flex-1 min-h-[500px]">
        {/* Center Map Area (Spans 8 cols, 2 rows) */}
        <RiskHeatmap />

        {/* Right Column: Timeline & Agent Mission Center */}
        <AgentMissionCenter steps={agentSteps} />

        {/* Escalations */}
        <div className="col-span-4 row-span-1">
          <EscalationTimeline escalations={escalations} />
        </div>
      </div>

      {/* Global Active Missions */}
      <div className="bg-surface-container-low border border-outline-variant rounded flex flex-col shrink-0">
        <div className="px-density-med py-density-high border-b border-outline-variant bg-surface-container-highest/50 flex justify-between items-center">
          <span className="text-label-caps font-label-caps text-on-surface uppercase tracking-widest">
            Global Active Missions
          </span>
        </div>
        <div className="p-density-med grid grid-cols-3 gap-gutter">
          {missions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      </div>

      {/* Bottom Data Table */}
      <HighRiskRegionsTable regions={highRiskRegions} />
    </main>
  )
}
