import type { Event } from '@/entities/types'

interface TopActionsListProps {
  event: Event
}

export const TopActionsList = ({ event }: TopActionsListProps) => {
  if (!event.analysis?.top_actions || event.analysis.top_actions.length === 0) return null

  return (
    <div>
      <div className="text-[10px] font-label-caps text-on-surface-variant mb-2">TOP ACTIONS</div>
      <div className="space-y-2">
        {event.analysis.top_actions.map((item, index) => {
          const action = typeof item === 'string' ? item : item.action || JSON.stringify(item)
          const owner = typeof item === 'string' ? undefined : item.owner
          const priority = typeof item === 'string' ? undefined : item.priority
          return (
            <div key={index} className="bg-surface-container border border-outline-variant p-2 rounded">
              <div className="flex items-start gap-2">
                <div className="bg-primary text-on-primary text-[10px] font-bold rounded w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {priority || (index + 1)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-on-surface leading-tight">{action}</p>
                  {owner && (
                    <p className="text-[10px] text-on-surface-variant mt-1">Owner: {owner}</p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
