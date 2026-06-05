import { useParams } from 'react-router-dom'
import { useSimulation } from '@/hooks/useSimulation'
import { Card, Badge, LoadingState, ErrorState } from '@/shared/ui'
import { AgentMissionCenter } from '@/widgets'

export const SimulationDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useSimulation(id || '')

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState message="Failed to load simulation" />

  return (
    <main className="flex-1 p-gutter overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-headline-md font-headline-md font-bold text-on-surface">Simulation Detail</h1>
        <p className="text-on-surface-variant text-sm mt-1">Simulation ID: {id}</p>
      </div>

      {data && (
        <>
          <div className="grid grid-cols-3 gap-gutter mb-6">
            <Card className="p-density-med">
              <div className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest mb-2">
                Status
              </div>
              <Badge variant={data.status === 'completed' ? 'stable' : data.status === 'failed' ? 'critical' : 'elevated'}>
                {data.status}
              </Badge>
            </Card>

            <Card className="p-density-med">
              <div className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest mb-2">
                Progress
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-surface-variant rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${data.progress}%` }} />
                </div>
                <span className="text-on-surface text-sm font-data-metric">{data.progress}%</span>
              </div>
            </Card>

            <Card className="p-density-med">
              <div className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest mb-2">
                Risk Reduction
              </div>
              <div className="text-2xl font-bold text-[#238636]">-{data.results?.riskReduction || 0}%</div>
            </Card>
          </div>

          {data.results && (
            <>
              <Card className="p-density-med mb-6">
                <div className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest mb-2">
                  Summary
                </div>
                <p className="text-on-surface text-sm">{data.results.summary}</p>
              </Card>

              <div className="grid grid-cols-12 grid-rows-2 gap-gutter mb-6">
                <div className="col-span-8 row-span-2">
                  <AgentMissionCenter steps={data.results.timeline} />
                </div>

                <Card className="col-span-4 row-span-2 p-density-med">
                  <div className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest mb-4">
                    Projected Metrics
                  </div>
                  <div className="space-y-4">
                    {data.results.metrics.map((metric: any, index: number) => (
                      <div key={index} className="border-b border-outline-variant pb-4 last:border-0">
                        <div className="text-on-surface text-sm font-bold mb-1">{metric.name}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-on-surface-variant text-xs">Current: {metric.currentValue}{metric.unit}</span>
                          <span className="text-primary text-xs">→</span>
                          <span className="text-[#238636] text-xs font-bold">Projected: {metric.projectedValue}{metric.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </>
          )}
        </>
      )}
    </main>
  )
}
