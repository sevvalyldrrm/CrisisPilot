import { Card } from '@/shared/ui'

export const RiskHeatmap = () => {
  return (
    <Card className="col-span-8 row-span-2 flex flex-col relative overflow-hidden">
      <div className="px-density-med py-density-high border-b border-outline-variant flex justify-between items-center bg-surface-container/50 backdrop-blur-sm z-10 absolute top-0 w-full">
        <span className="text-label-caps font-label-caps text-on-surface uppercase tracking-widest">
          Global Risk Heatmap
        </span>
        <div className="flex gap-2">
          <button className="text-label-caps font-label-caps text-primary border border-outline-variant px-2 py-0.5 rounded hover:bg-surface-variant/50">
            LIVE
          </button>
          <button className="text-label-caps font-label-caps text-on-surface-variant border border-outline-variant px-2 py-0.5 rounded hover:bg-surface-variant/50">
            24H
          </button>
        </div>
      </div>
      <div className="flex-1 bg-[#0A0C10] relative w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at center, #161B22 0%, #0A0C10 100%)' }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMzMDM2M0QiLz48L3N2Zz4=')", backgroundSize: '8px 8px' }} />
        <div className="absolute top-[30%] left-[60%] w-3 h-3 bg-[#F85149] rounded-full pulse-point" />
        <div className="absolute top-[45%] left-[70%] w-2 h-2 bg-[#F85149] rounded-full pulse-point" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[20%] left-[20%] w-2 h-2 bg-primary rounded-full pulse-point" style={{ boxShadow: '0 0 0 0 rgba(170, 199, 255, 0.7)', animationName: 'pulse-ring-blue' }} />
      </div>
      <div className="absolute bottom-gutter left-gutter flex gap-density-high">
        <div className="bg-surface-container-highest/80 backdrop-blur-md border border-outline-variant rounded p-2 flex items-center gap-2 text-[10px] font-data-metric">
          <span className="w-2 h-2 bg-[#F85149] rounded-full" />
          Critical
        </div>
        <div className="bg-surface-container-highest/80 backdrop-blur-md border border-outline-variant rounded p-2 flex items-center gap-2 text-[10px] font-data-metric">
          <span className="w-2 h-2 bg-primary rounded-full" />
          Monitored
        </div>
      </div>
    </Card>
  )
}
