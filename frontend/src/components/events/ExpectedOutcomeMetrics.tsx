import type { Event } from '@/entities/types'

interface ExpectedOutcomeMetricsProps {
  event: Event
}

export const ExpectedOutcomeMetrics = ({ event }: ExpectedOutcomeMetricsProps) => {
  if (!event.analysis?.expected_outcome) return null

  return (
    <div>
      <div className="text-[10px] font-label-caps text-on-surface-variant mb-2">EXPECTED OUTCOME</div>
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-surface-container border border-outline-variant p-2 rounded text-center">
          <div className="text-[10px] font-label-caps text-on-surface-variant mb-1">DELAY REDUCTION</div>
          <div className="text-data-metric font-bold text-primary">{event.analysis.expected_outcome.delay_reduction_percent || 0}%</div>
        </div>
        <div className="bg-surface-container border border-outline-variant p-2 rounded text-center">
          <div className="text-[10px] font-label-caps text-on-surface-variant mb-1">COST SAVINGS</div>
          <div className="text-data-metric font-bold text-[#238636]">{event.analysis.expected_outcome.cost_saving_percent || 0}%</div>
        </div>
        <div className="bg-surface-container border border-outline-variant p-2 rounded text-center">
          <div className="text-[10px] font-label-caps text-on-surface-variant mb-1">RISK REDUCTION</div>
          <div className="text-data-metric font-bold text-[#d29922]">{event.analysis.expected_outcome.risk_reduction_percent || 0}%</div>
        </div>
      </div>
    </div>
  )
}
