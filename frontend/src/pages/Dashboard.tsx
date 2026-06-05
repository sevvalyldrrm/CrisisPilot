import { TelemetryCard, MissionCard, AgentMissionCenter, EscalationTimeline, RiskHeatmap, HighRiskRegionsTable } from '@/widgets'
import { mockDashboardData } from '@/services/mockData'

export const Dashboard = () => {
  const { telemetry, missions, agentSteps, escalations, highRiskRegions } = mockDashboardData

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
