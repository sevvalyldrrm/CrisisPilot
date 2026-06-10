import { Card, Icon } from '@/shared/ui'
import type { Event } from '@/entities/types'

interface SecondaryRisksProps {
  event: Event
}

export const SecondaryRisks = ({ event }: SecondaryRisksProps) => {
  const risks = event.analysis?.secondary_risks ?? []

  const normalizeRisk = (risk: string | { priority?: string; action?: string; owner?: string }) => {
    if (typeof risk === 'string') {
      return { action: risk, owner: '' }
    }
    return {
      action: risk.action || 'No description',
      owner: risk.owner || ' ',
    }
  }

  return (
    <Card className="p-2">
      <div className="flex items-center gap-2 mb-2 border-b border-outline-variant pb-1.5">
        <Icon name="warning" className="text-primary text-[14px]" />
        <span className="text-label-caps text-on-surface uppercase tracking-wider font-bold text-xs">
          Secondary Risks
        </span>
      </div>

      {risks.length === 0 ? (
        <div className="text-center text-on-surface-variant text-xs py-3">
          No secondary risks identified
        </div>
      ) : (
        <div className="space-y-1">
          {risks.map((risk, index) => {
            const normalized = normalizeRisk(risk)
            return (
              <div
                key={index}
                className="bg-surface-dim border border-outline-variant rounded p-2 flex items-start gap-2"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-body-sm text-on-surface text-xs leading-tight truncate">{normalized.action}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}
