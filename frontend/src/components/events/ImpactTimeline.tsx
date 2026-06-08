import type { Event } from '@/entities/types'

interface ImpactTimelineProps {
  selectedEvent: Event | null
}

export const ImpactTimeline = ({ selectedEvent }: ImpactTimelineProps) => {
  if (!selectedEvent) {
    return (
      <div className="flex-1 p-density-med border-r border-outline-variant flex flex-col">
        <h3 className="text-label-caps font-label-caps text-on-surface-variant mb-4">Cascading Impact Preview</h3>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-on-surface-variant text-sm">Select an event to view cascading impact</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-density-med border-r border-outline-variant flex flex-col">
      <h3 className="text-label-caps font-label-caps text-on-surface-variant mb-4">Cascading Impact Preview</h3>
      <div className="flex-1 flex items-center justify-between px-2 gap-4">
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className={`px-2 py-1 border text-[10px] font-label-caps rounded text-center w-full ${
            selectedEvent.status === 'critical' ? 'bg-error/10 border-error text-error' :
            selectedEvent.status === 'elevated' ? 'bg-[#d29922]/10 border-[#d29922] text-[#d29922]' :
            'bg-surface-variant border-outline-variant text-on-surface'
          }`}>
            Event: {selectedEvent.zoneName.substring(0, 20)}...
          </div>
          <div className="h-px w-full bg-outline-variant relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 border-t border-r border-outline-variant rotate-45" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="px-2 py-1 bg-surface-variant border border-outline-variant text-on-surface text-[10px] font-label-caps rounded text-center w-full">
            Region: {selectedEvent.region}
          </div>
          <div className="h-px w-full bg-outline-variant relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 border-t border-r border-outline-variant rotate-45" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="px-2 py-1 bg-surface-variant border border-outline-variant text-on-surface text-[10px] font-label-caps rounded text-center w-full">
            Delay: {selectedEvent.analysis?.supply_chain_impact?.delay_days || 0} days
          </div>
          <div className="h-px w-full bg-outline-variant relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1.5 h-1.5 border-t border-r border-outline-variant rotate-45" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className={`px-2 py-1 border text-[10px] font-label-caps rounded text-center w-full font-bold ${
            selectedEvent.status === 'critical' ? 'bg-error border-error text-on-error shadow-[0_0_10px_rgba(255,180,171,0.3)]' :
            'bg-surface-variant border-outline-variant text-on-surface'
          }`}>
            Cost: +{selectedEvent.analysis?.supply_chain_impact?.cost_increase_percent || 0}%
          </div>
        </div>
      </div>
    </div>
  )
}
