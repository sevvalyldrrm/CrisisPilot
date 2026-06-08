import { Card } from '@/shared/ui'
import { Icon } from '@/shared/ui'
import type { TelemetryMetric } from '@/entities/types'

interface TelemetryCardProps {
  metric: TelemetryMetric
}

export const TelemetryCard = ({ metric }: TelemetryCardProps) => {
  const getStatusColor = (status?: TelemetryMetric['status']) => {
    switch (status) {
      case 'critical':
        return 'text-[#F85149]'
      case 'warning':
        return 'text-[#F85149]'
      case 'stable':
        return 'text-[#238636]'
      default:
        return 'text-on-surface'
    }
  }

  const getStatusBadge = (status?: TelemetryMetric['status']) => {
    switch (status) {
      case 'critical':
        return 'bg-[#F85149]/10 text-[#F85149] border border-[#F85149]/30'
      case 'warning':
        return 'bg-[#F85149]/10 text-[#F85149] border border-[#F85149]/30'
      case 'stable':
        return 'bg-[#238636]/10 text-[#238636] border border-[#238636]/30'
      default:
        return ''
    }
  }

  return (
    <Card className="p-density-med flex flex-col justify-between relative overflow-hidden">
      {metric.icon && (
        <div className="absolute top-0 right-0 p-2">
          <Icon name={metric.icon} className="text-outline text-[16px]" />
        </div>
      )}
      <div className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest border-b border-outline-variant pb-1 mb-2">
        {metric.label}
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`font-data-metric text-data-metric text-2xl font-bold ${getStatusColor(metric.status)}`}>
          {metric.value}
        </span>
        {metric.maxValue && (
          <span className="font-data-metric text-data-metric text-on-surface-variant text-sm">
            /{metric.maxValue}
          </span>
        )}
        {metric.unit && (
          <span className="font-data-metric text-data-metric text-on-surface-variant text-sm">
            {metric.unit}
          </span>
        )}
      </div>
      {metric.status && (
        <div className="mt-1">
          {metric.trend !== undefined ? (
            <div className="text-[10px] text-primary font-label-caps flex items-center gap-1">
              <Icon name="trending_up" className="text-[10px]" />
              +{metric.trend} 24H
            </div>
          ) : (
            <div className={`text-[10px] font-label-caps ${getStatusBadge(metric.status)} rounded px-1 w-fit`}>
              {metric.status.toUpperCase()}
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
