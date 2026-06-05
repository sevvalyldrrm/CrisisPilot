import { Card, Badge, Icon } from '@/shared/ui'
import type { Mission } from '@/entities/types'

interface MissionCardProps {
  mission: Mission
}

export const MissionCard = ({ mission }: MissionCardProps) => {
  const getRiskBadgeVariant = (riskScore: number) => {
    if (riskScore >= 90) return 'critical'
    if (riskScore >= 70) return 'elevated'
    return 'normal'
  }

  return (
    <Card className={`p-3 bg-surface-container flex flex-col gap-2 ${mission.riskScore >= 90 ? 'border border-[#F85149]/30 relative overflow-hidden' : ''}`}>
      {mission.riskScore >= 90 && (
        <div className="absolute top-0 left-0 w-1 h-full bg-[#F85149]" />
      )}
      <div className={`flex justify-between items-start ${mission.riskScore >= 90 ? 'pl-2' : ''}`}>
        <div>
          <div className="text-[12px] font-bold text-on-surface">{mission.name}</div>
          <div className="text-[10px] text-on-surface-variant mt-0.5">Region: {mission.region}</div>
        </div>
        <Badge variant={getRiskBadgeVariant(mission.riskScore)}>
          Risk: {mission.riskScore}
        </Badge>
      </div>
      <div className={`mt-2 ${mission.riskScore >= 90 ? 'pl-2' : ''}`}>
        <div className="flex justify-between text-[10px] font-data-metric text-on-surface-variant mb-1">
          <span>Progress</span>
          <span>{mission.progress}%</span>
        </div>
        <div className="w-full bg-surface-variant rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full ${mission.riskScore >= 90 ? 'bg-[#F85149]' : 'bg-primary'}`}
            style={{ width: `${mission.progress}%` }}
          />
        </div>
      </div>
      <div className={`text-[10px] text-[#238636] mt-1 font-label-caps flex items-center gap-1 ${mission.riskScore >= 90 ? 'pl-2' : ''}`}>
        <Icon name="arrow_downward" className="text-[10px]" />
        Projected Reduction: -{mission.projectedReduction}%
      </div>
    </Card>
  )
}
