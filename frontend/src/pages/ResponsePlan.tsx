import {
  PriorityActionsTimeline,
  AlternativeRouteAnalysis,
  SecondaryRisks,
} from '@/widgets'
import { useLatestCriticalEvent } from '@/hooks/useLatestCriticalEvent'
import { ErrorState, Badge, Icon, Card } from '@/shared/ui'
interface OutcomeSimulationProps {
  currentRisk: number
  riskReduction: number
}

const OutcomeSimulation = ({ currentRisk, riskReduction }: OutcomeSimulationProps) => {
  const reducedRisk = Math.max(0, currentRisk - (currentRisk * riskReduction / 100))
  
  return (
    <div className="flex items-center gap-6">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-label-caps text-on-surface-variant text-[10px] uppercase">Current Risk</span>
          <span className={`text-data-metric text-data-metric text-lg font-bold ${currentRisk >= 80 ? 'text-[#F85149]' : currentRisk >= 60 ? 'text-[#D29922]' : 'text-[#238636]'}`}>
            {currentRisk}%
          </span>
        </div>
        <div className="h-2 bg-surface-dim rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${currentRisk >= 80 ? 'bg-[#F85149]' : currentRisk >= 60 ? 'bg-[#D29922]' : 'bg-[#238636]'}`}
            style={{ width: `${currentRisk}%` }}
          />
        </div>
      </div>
      
      <Icon name="arrow_forward" className="text-on-surface-variant text-[24px]" />
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-label-caps text-on-surface-variant text-[10px] uppercase">Projected Risk</span>
          <span className="text-data-metric text-data-metric text-lg font-bold text-[#238636]">
            {Math.round(reducedRisk)}%
          </span>
        </div>
        <div className="h-2 bg-surface-dim rounded-full overflow-hidden">
          <div
            className="h-full bg-[#238636] rounded-full transition-all"
            style={{ width: `${reducedRisk}%` }}
          />
        </div>
      </div>
      
      <div className="text-right">
        <div className="text-label-caps text-on-surface-variant text-[10px] uppercase mb-1">Reduction</div>
        <div className="text-data-metric text-data-metric text-xl font-bold text-[#238636]">
          -{riskReduction}%
        </div>
      </div>
    </div>
  )
}

export const ResponsePlan = () => {
  const { data: event, isLoading, error, refetch } = useLatestCriticalEvent()

  if (isLoading) {
    return (
      <main className="flex-1 p-gutter overflow-y-auto overflow-x-hidden flex flex-col gap-gutter">
        {/* Header Skeleton */}
        <div className="flex justify-between items-end mb-6">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-surface-container-low border border-outline-variant rounded animate-pulse" />
            <div className="h-4 w-96 bg-surface-container-low border border-outline-variant rounded animate-pulse" />
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-32 bg-surface-container-low border border-outline-variant rounded animate-pulse" />
            <div className="h-10 w-48 bg-surface-container-low border border-outline-variant rounded animate-pulse" />
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-12 gap-gutter">
          <div className="col-span-12 lg:col-span-4 h-[500px] bg-surface-container-low border border-outline-variant rounded animate-pulse" />
          <div className="col-span-12 lg:col-span-8 h-[500px] bg-surface-container-low border border-outline-variant rounded animate-pulse" />
          <div className="col-span-12 lg:col-span-7 h-[400px] bg-surface-container-low border border-outline-variant rounded animate-pulse" />
          <div className="col-span-12 lg:col-span-5 h-[400px] bg-surface-container-low border border-outline-variant rounded animate-pulse" />
          <div className="col-span-12 lg:col-span-6 h-[300px] bg-surface-container-low border border-outline-variant rounded animate-pulse" />
          <div className="col-span-12 lg:col-span-6 h-[300px] bg-surface-container-low border border-outline-variant rounded animate-pulse" />
        </div>
      </main>
    )
  }

  if (error || !event) {
    return (
      <main className="flex-1 p-gutter overflow-y-auto overflow-x-hidden">
        <ErrorState message="Failed to load response plan data" onRetry={() => refetch()} />
      </main>
    )
  }

  return (
    <main className="flex-1 p-gutter overflow-y-auto overflow-x-hidden flex flex-col gap-2">
      {/* ROW 1: Mission Briefing (Full Width) */}
      <Card className="p-3 border-l-4 border-l-[#388BFD]">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-headline-md font-headline-md text-on-surface font-semibold">
              {event.zoneName}
            </h1>
            <Badge variant={event.status === 'critical' ? 'critical' : event.status === 'elevated' ? 'elevated' : 'stable'}>
              {event.status.toUpperCase()}
            </Badge>
            <span className="text-label-caps text-on-surface-variant text-[10px]">
              CONFIDENCE: {event.analysis?.confidence_score ?? 0}%
            </span>
          </div>
          <div className="flex flex-wrap gap-4 mb-3 text-[10px] uppercase tracking-wider text-on-surface-variant">
                <span>
                    Risk Score: {event.riskScore}
                </span>

                <span>
                    Confidence: {event.analysis?.confidence_score ?? 0}%
                </span>

                <span>
                    Alternatives: {event.analysis?.recommended_hubs?.length ?? 0}
                </span>

                <span>
                    Updated: {new Date(event.timestamp).toLocaleDateString()}
                </span>
        </div>
        <div className="text-[10px] uppercase tracking-wider text-on-surface-variant mb-1">
          Executive Assessment
        </div>
          {event.analysis?.executive_summary && (
            <p className="text-body-sm text-on-surface-variant text-sm leading-relaxed mb-3">
              {event.analysis.executive_summary}
            </p>
          )}
          {event.analysis?.recommended_strategy?.name && (
            <div className="flex items-start gap-2">
              <Icon name="psychology" className="text-primary text-[16px] mt-0.5" />
              <div className="flex-1">
                <div className="text-label-caps text-on-surface-variant text-[10px] uppercase tracking-wider mb-1">
                  Recommended Strategy
                </div>
                <div className="text-body-sm text-on-surface font-medium text-sm">
                  {event.analysis.recommended_strategy.name}
                </div>
                {event.analysis.recommended_strategy.reason && (
                  <p className="text-body-sm text-on-surface-variant text-xs mt-1">
                    {event.analysis.recommended_strategy.reason}
                  </p>
                )}
              </div>
            </div>
          )}
          {event.analysis?.expected_outcome && (
            <div className="flex gap-4 mt-3">
              <div className="flex items-center gap-2">
                <Icon name="trending_down" className="text-[#238636] text-[14px]" />
                <span className="text-data-metric text-data-metric text-sm font-bold text-[#238636]">
                  -{event.analysis.expected_outcome.risk_reduction_percent ?? 0}% Risk
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="schedule" className="text-[#238636] text-[14px]" />
                <span className="text-data-metric text-data-metric text-sm font-bold text-[#238636]">
                  -{event.analysis.expected_outcome.delay_reduction_percent ?? 0}% Delay
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="savings" className="text-[#238636] text-[14px]" />
                <span className="text-data-metric text-data-metric text-sm font-bold text-[#238636]">
                  -{event.analysis.expected_outcome.cost_saving_percent ?? 0}% Cost
                </span>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* ROW 2: Priority Actions (Left) + Operations Overview (Right) */}
      <div className="grid grid-cols-12 gap-2">
        {/* LEFT: Priority Actions Timeline (4 columns) */}
        <div className="col-span-12 lg:col-span-4">
          <PriorityActionsTimeline event={event} />
        </div>

        {/* RIGHT: Operations Overview (8 columns) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-2">
          {/* Supply Chain Impact Strip */}
          <Card className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="local_shipping" className="text-primary text-[16px]" />
              <span className="text-label-caps text-on-surface uppercase tracking-wider font-bold text-xs">
                Supply Chain Impact
              </span>
            </div>
            <div className="flex gap-4">
              {event.analysis?.supply_chain_impact ? (
                <>
                  <div className="flex items-center gap-2">
                    <Icon name="schedule" className="text-[#F85149] text-[14px]" />
                    <span className="text-data-metric text-data-metric text-sm font-bold text-[#F85149]">
                      {event.analysis.supply_chain_impact.delay_days ?? 0}d
                    </span>
                    <span className="text-label-caps text-on-surface-variant text-[10px] uppercase">Delay</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="attach_money" className="text-[#F85149] text-[14px]" />
                    <span className="text-data-metric text-data-metric text-sm font-bold text-[#F85149]">
                      +{event.analysis.supply_chain_impact.cost_increase_percent ?? 0}%
                    </span>
                    <span className="text-label-caps text-on-surface-variant text-[10px] uppercase">Cost</span>
                  </div>
                </>
              ) : null}
              <div className="flex items-center gap-2">
                <Icon name="monitoring" className={event.riskScore >= 80 ? 'text-[#F85149]' : event.riskScore >= 60 ? 'text-[#D29922]' : 'text-[#238636]' + " text-[14px]"} />
                <span className={`text-data-metric text-data-metric text-sm font-bold ${event.riskScore >= 80 ? 'text-[#F85149]' : event.riskScore >= 60 ? 'text-[#D29922]' : 'text-[#238636]'}`}>
                  {event.riskScore}
                </span>
                <span className="text-label-caps text-on-surface-variant text-[10px] uppercase">Risk</span>
              </div>
            </div>
          </Card>

          {/* Analysis Lifecycle */}
          <Card className="p-3 flex-1">
            <div className="flex items-center gap-2 mb-3">
                <Icon
                name="psychology"
                className="text-primary text-[16px]"
                />

                <span className="text-label-caps text-on-surface uppercase tracking-wider font-bold text-xs">
                Decision Engine
                </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
                
                <div>
                <div className="text-[10px] uppercase text-on-surface-variant">
                    Confidence
                </div>

                <div className="text-lg font-bold text-[#388BFD]">
                    {event.analysis?.confidence_score ?? 0}%
                </div>
                </div>

                <div>
                <div className="text-[10px] uppercase text-on-surface-variant">
                    Alternatives
                </div>

                <div className="text-lg font-bold text-on-surface">
                    {event.analysis?.recommended_hubs?.length ?? 0}
                </div>
                </div>

                <div>
                <div className="text-[10px] uppercase text-on-surface-variant">
                    Strategy
                </div>

                <div className="text-sm font-semibold text-[#238636]">
                    GENERATED
                </div>
                </div>

                <div>
                <div className="text-[10px] uppercase text-on-surface-variant">
                    Risk Reduction
                </div>

                <div className="text-lg font-bold text-[#238636]">
                    {event.analysis?.expected_outcome?.risk_reduction_percent ?? 0}%
                </div>
                </div>
            </div>
            </Card>
        </div>
      </div>

      {/* ROW 3: Recommended Hubs (Left) + Secondary Risks (Right) */}
      <div className="grid grid-cols-12 gap-2">
        {/* LEFT: Recommended Hubs (6 columns) */}
        <div className="col-span-12 lg:col-span-6">
          <AlternativeRouteAnalysis event={event} />
        </div>

        {/* RIGHT: Secondary Risks (6 columns) */}
        <div className="col-span-12 lg:col-span-6">
          <SecondaryRisks event={event} />
        </div>
      </div>

      {/* ROW 4: Expected Outcome Simulation */}
      <Card className="p-3">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="show_chart" className="text-primary text-[16px]" />
          <span className="text-label-caps text-on-surface uppercase tracking-wider font-bold text-xs">
            Expected Outcome Simulation
          </span>
        </div>
        <OutcomeSimulation
          currentRisk={event.riskScore}
          riskReduction={event.analysis?.expected_outcome?.risk_reduction_percent ?? 0}
        />
      </Card>

      {/* Footer Info */}
      <div className="flex items-center justify-between py-2 border-t border-outline-variant text-xs">
        <div className="flex items-center gap-2 text-on-surface-variant">
          <Icon name="info" className="text-[14px]" />
          <span>Last updated: {new Date(event.timestamp).toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant">
          <Icon name="psychology" className="text-[14px]" />
          <span>AI Confidence: {event.analysis?.confidence_score ?? 0}%</span>
        </div>
      </div>
    </main>
  )
}
