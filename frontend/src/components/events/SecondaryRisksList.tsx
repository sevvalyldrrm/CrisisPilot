import { Badge } from '@/shared/ui'
import type { Event } from '@/entities/types'

interface SecondaryRisksListProps {
  event: Event
}

export const SecondaryRisksList = ({ event }: SecondaryRisksListProps) => {
  if (!event.analysis?.secondary_risks || event.analysis.secondary_risks.length === 0) return null

  return (
    <div>
      <div className="text-[10px] font-label-caps text-on-surface-variant mb-2">SECONDARY RISKS</div>
      <div className="space-y-2">
        {event.analysis.secondary_risks.map((item, index) => {
          const risk = typeof item === 'string' ? item : item.action || JSON.stringify(item)
          const riskText = risk.toLowerCase()
          let riskLevel = 'LOW'
          if (riskText.includes('piracy') || riskText.includes('congestion') || riskText.includes('shortage')) {
            riskLevel = 'HIGH'
          } else if (riskText.includes('fuel') || riskText.includes('emissions')) {
            riskLevel = 'MEDIUM'
          }
          return (
            <div key={index} className="bg-surface-container border border-outline-variant p-2 rounded">
              <div className="flex items-start gap-2">
                <Badge variant={riskLevel === 'HIGH' ? 'critical' : riskLevel === 'MEDIUM' ? 'warning' : 'stable'}>
                  {riskLevel}
                </Badge>
                <p className="text-sm text-on-surface leading-tight">{risk}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
