import { Card, Badge } from '@/shared/ui'
import type { Event } from '@/entities/types'

interface HighRiskRegionsTableProps {
  regions: Event[]
}

export const HighRiskRegionsTable = ({ regions }: HighRiskRegionsTableProps) => {
  const getStatusBadge = (status: Event['status']) => {
    switch (status) {
      case 'critical':
        return 'critical'
      case 'elevated':
        return 'elevated'
      default:
        return 'normal'
    }
  }

  const getRiskScoreColor = (score: number) => {
    if (score >= 90) return 'text-[#F85149]'
    if (score >= 70) return 'text-primary'
    return 'text-on-surface'
  }

  return (
    <Card className="flex flex-col shrink-0">
      <div className="px-density-med py-density-high border-b border-outline-variant bg-surface-container-highest/50 flex justify-between items-center">
        <span className="text-label-caps font-label-caps text-on-surface uppercase tracking-widest">
          High Risk Regions
        </span>
        <button className="text-[10px] font-label-caps text-primary hover:underline">
          VIEW ALL
        </button>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant text-[10px] font-label-caps text-on-surface-variant uppercase bg-surface-container">
              <th className="py-2 px-density-med font-normal">Region ID</th>
              <th className="py-2 px-density-med font-normal">Zone Name</th>
              <th className="py-2 px-density-med font-normal text-right">Risk Score</th>
              <th className="py-2 px-density-med font-normal">Primary Threat Vector</th>
              <th className="py-2 px-density-med font-normal text-right">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm font-data-metric">
            {regions.map((region) => (
              <tr
                key={region.id}
                className="border-b border-outline-variant hover:bg-surface-variant/30 transition-colors"
              >
                <td className="py-2 px-density-med text-on-surface-variant">{region.regionId}</td>
                <td className="py-2 px-density-med text-on-surface">{region.zoneName}</td>
                <td className={`py-2 px-density-med text-right ${getRiskScoreColor(region.riskScore)}`}>
                  {region.riskScore.toFixed(1)}
                </td>
                <td className="py-2 px-density-med text-on-surface-variant">{region.primaryThreatVector}</td>
                <td className="py-2 px-density-med text-right">
                  <Badge variant={getStatusBadge(region.status)}>{region.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
