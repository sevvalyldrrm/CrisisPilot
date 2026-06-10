import { Card, Icon } from '@/shared/ui'
import type { Event } from '@/entities/types'

interface RecommendedHubsProps {
  event: Event
}

export const AlternativeRouteAnalysis  = ({ event }: RecommendedHubsProps) => {
  const hubs = event.analysis?.recommended_hubs ?? []

  return (
    <Card className="p-2">
      <div className="flex items-center gap-2 mb-2 border-b border-outline-variant pb-1.5">
        <Icon name="alt_route" className="text-primary text-[14px]" />
        <span className="text-label-caps text-on-surface uppercase tracking-wider font-bold text-xs">
          Alternative Route Analysis
        </span>
      </div>

      {hubs.length === 0 ? (
        <div className="text-center text-on-surface-variant text-xs py-3">
          No Alternative Route Analysisavailable
        </div>
      ) : (
        <div className="overflow-hidden rounded border border-outline-variant">
          <div className="grid grid-cols-2 bg-surface-container-high px-3 py-2 text-[10px] uppercase tracking-wider text-on-surface-variant">
            <div>Hub</div>
            <div>Status</div>
          </div>

          {hubs.map((hub, index) => (
            <div
              key={index}
              className="grid grid-cols-2 border-t border-outline-variant px-3 py-2 text-xs"
            >
              <div className="text-on-surface font-medium">
                {hub}
              </div>

              <div>
                <span className="text-[#388BFD]">
                  Candidate
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
