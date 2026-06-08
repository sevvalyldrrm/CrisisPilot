import type { Event } from '@/entities/types'

interface NetworkNodesProps {
  selectedEvent: Event | null
}

export const NetworkNodes = ({ selectedEvent }: NetworkNodesProps) => {
  return (
    <div className="w-96 p-density-med flex flex-col">
      <h3 className="text-label-caps font-label-caps text-on-surface-variant mb-2">Related Network Nodes</h3>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {selectedEvent?.analysis?.recommended_hubs && selectedEvent.analysis.recommended_hubs.length > 0 ? (
          selectedEvent.analysis.recommended_hubs.map((hub, index) => (
            <div
              key={index}
              className="w-32 flex-shrink-0 border border-outline-variant rounded bg-surface-container p-2 hover:border-primary cursor-pointer transition-colors"
            >
              <div className="text-[10px] font-label-caps text-primary mb-1">HUB</div>
              <div className="text-[11px] font-body-sm text-on-surface truncate">{hub}</div>
            </div>
          ))
        ) : (
          <p className="text-on-surface-variant text-sm">No recommended hubs available</p>
        )}
      </div>
    </div>
  )
}
