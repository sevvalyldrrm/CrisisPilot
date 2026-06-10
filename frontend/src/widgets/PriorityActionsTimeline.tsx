import { Card, Badge, Icon } from '@/shared/ui'
import type { Event } from '@/entities/types'

interface PriorityActionsTimelineProps {
  event: Event
}

export const PriorityActionsTimeline = ({ event }: PriorityActionsTimelineProps) => {
  const actions = event.analysis?.top_actions ?? []

  const getPriorityColor = (priority?: string | number) => {
    const p = String(priority).toLowerCase()

    if (priority === 1) return 'critical'
    if (priority === 2) return 'warning'

    if (p.includes('immediate') || p.includes('critical')) return 'critical'
    if (p.includes('short') || p.includes('medium')) return 'warning'

    return 'stable'
  }

  const getPriorityBorder = (priority?: string | number) => {
    const p = String(priority).toLowerCase()

    if (priority === 1) return 'border-l-[#F85149]'
    if (priority === 2) return 'border-l-[#D29922]'

    if (p.includes('immediate') || p.includes('critical'))
      return 'border-l-[#F85149]'

    if (p.includes('short') || p.includes('medium'))
      return 'border-l-[#D29922]'

    return 'border-l-[#238636]'
  }

  const normalizeAction = (action: string | { priority?: string; action?: string; owner?: string }) => {
    if (typeof action === 'string') {
      return { priority: 'Medium', action }
    }
    return {
      priority: action.priority ?? 3,
      action: action.action || 'No description',
      owner: action.owner,
    }
  }

  return (
    <Card className="flex flex-col h-[400px]">
      <div className="p-2 border-b border-outline-variant bg-surface-container-highest/50 flex justify-between items-center">
        <span className="text-label-caps text-on-surface uppercase tracking-wider font-bold text-xs">
          Priority Actions
        </span>
        <Icon name="list_alt" className="text-on-surface-variant text-[14px]" />
      </div>

      <div className="p-2 flex-1 overflow-y-auto space-y-1.5">
        {actions.length === 0 ? (
          <div className="text-center text-on-surface-variant text-xs py-4">
            No priority actions available
          </div>
        ) : (
          actions.map((action, index) => {
            const normalized = normalizeAction(action)
            const priorityColor = getPriorityColor(normalized.priority)
            const borderClass = getPriorityBorder(normalized.priority)

            return (
              <div
                key={index}
                className={`border border-outline-variant rounded bg-surface-dim p-2 border-l-2 ${borderClass}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <Badge variant={priorityColor} className="text-[9px] px-1">
                    P{normalized.priority}
                  </Badge>
                  <span className="text-label-caps text-on-surface-variant text-[9px]">
                    #{index + 1}
                  </span>
                </div>
                <h4 className="text-body-sm text-on-surface font-semibold text-xs mb-1 leading-tight">
                  {normalized.action}
                </h4>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-label-caps text-on-surface-variant text-[9px]">
                    {normalized.owner}
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>
    </Card>
  )
}
