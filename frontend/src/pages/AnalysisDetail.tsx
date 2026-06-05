import { useParams } from 'react-router-dom'
import { useAnalysis } from '@/hooks/useAnalysis'
import { Card, Badge, LoadingState, ErrorState } from '@/shared/ui'

export const AnalysisDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useAnalysis(id || '')

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState message="Failed to load analysis" />

  return (
    <main className="flex-1 p-gutter overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-headline-md font-headline-md font-bold text-on-surface">Impact Analysis</h1>
        <p className="text-on-surface-variant text-sm mt-1">Analysis ID: {id}</p>
      </div>

      {data?.results && (
        <>
          <Card className="p-density-med mb-6">
            <div className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest mb-2">
              Summary
            </div>
            <p className="text-on-surface text-sm">{data.results.summary}</p>
          </Card>

          <div className="grid grid-cols-2 gap-gutter mb-6">
            <Card className="p-density-med">
              <div className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest mb-2">
                Risk Level
              </div>
              <div className={`text-3xl font-bold ${data.results.riskLevel >= 90 ? 'text-[#F85149]' : data.results.riskLevel >= 70 ? 'text-primary' : 'text-on-surface'}`}>
                {data.results.riskLevel}
              </div>
            </Card>

            <Card className="p-density-med">
              <div className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest mb-2">
                Affected Regions
              </div>
              <div className="flex flex-wrap gap-2">
                {data.results.affectedRegions.map((region: string, index: number) => (
                  <Badge key={index} variant="elevated">
                    {region}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-density-med mb-6">
            <div className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest mb-2">
              Recommendations
            </div>
            <ul className="list-disc list-inside text-on-surface text-sm space-y-1">
              {data.results.recommendations.map((rec: string, index: number) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </Card>

          <Card className="p-density-med">
            <div className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest mb-4">
              Projected Impact
            </div>
            <div className="space-y-4">
              {data.results.projectedImpact.map((metric: any, index: number) => (
                <div key={index} className="border-b border-outline-variant pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-on-surface text-sm font-bold">{metric.metric}</span>
                    <span className={`text-sm font-data-metric ${metric.changePercentage > 0 ? 'text-[#F85149]' : 'text-[#238636]'}`}>
                      {metric.changePercentage > 0 ? '+' : ''}{metric.changePercentage}%
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="text-on-surface-variant text-xs mb-1">Current: {metric.currentValue}</div>
                      <div className="w-full bg-surface-variant rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '50%' }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-on-surface-variant text-xs mb-1">Projected: {metric.projectedValue}</div>
                      <div className="w-full bg-surface-variant rounded-full h-2">
                        <div className={`h-2 rounded-full ${metric.changePercentage > 0 ? 'bg-[#F85149]' : 'bg-[#238636]'}`} style={{ width: '75%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </main>
  )
}
