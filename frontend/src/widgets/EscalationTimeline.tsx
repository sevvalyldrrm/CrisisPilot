import { Card, Icon } from '@/shared/ui'
import type { Escalation } from '@/entities/types'

interface EscalationTimelineProps {
  escalations: Escalation[]
}

export const EscalationTimeline = ({ escalations }: EscalationTimelineProps) => {
  const getSeverityColor = (severity: Escalation['severity']) => {
    switch (severity) {
      case 'critical':
        return 'border-[#F85149]'
      case 'elevated':
        return 'border-primary'
      default:
        return 'border-outline-variant'
    }
  }

  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="px-density-med py-density-high border-b border-outline-variant bg-surface-container-highest/50 flex justify-between items-center">
        <span className="text-label-caps font-label-caps text-on-surface uppercase tracking-widest">
          Recent Escalations
        </span>
        <Icon name="more_horiz" className="text-outline-variant text-[14px]" />
      </div>
      <div className="flex-1 overflow-y-auto p-density-high flex flex-col gap-1">
        {escalations.map((escalation) => (
          <div
            key={escalation.id}
            className={`flex gap-2 p-2 hover:bg-surface-variant/50 rounded transition-colors border-l-2 ${getSeverityColor(escalation.severity)}`}
          >
            <div className="font-data-metric text-[10px] text-on-surface-variant pt-0.5">
              {escalation.timestamp}
            </div>
            <div>
              <div className="text-[12px] font-bold text-on-surface">{escalation.title}</div>
              <div className="text-[10px] text-on-surface-variant mt-0.5">{escalation.description}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
