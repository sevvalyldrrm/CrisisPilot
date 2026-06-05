import type { Event } from '@/entities/types'

interface EventFeedProps {
  events: Event[]
  selectedEvent: Event | null
  onEventSelect: (event: Event) => void
}

const getStatusColor = (status: Event['status']) => {
  switch (status) {
    case 'critical': return 'text-error border-error bg-error/10'
    case 'elevated': return 'text-[#d29922] border-[#d29922] bg-[#d29922]/10'
    case 'monitoring': return 'text-[#238636] border-[#238636] bg-[#238636]/10'
    default: return 'text-on-surface border-outline-variant bg-surface-variant'
  }
}

const getStatusLabel = (status: Event['status']) => {
  switch (status) {
    case 'critical': return 'CRITICAL'
    case 'elevated': return 'ELEVATED'
    case 'monitoring': return 'MONITOR'
    default: return 'STABLE'
  }
}

export const EventFeed = ({ events, selectedEvent, onEventSelect }: EventFeedProps) => {
  return (
    <div className="w-80 border-r border-outline-variant bg-surface flex flex-col flex-shrink-0 z-10">
      <div className="p-density-med border-b border-outline-variant bg-surface-container">
        <h2 className="text-label-caps font-label-caps text-on-surface">Live Event Feed</h2>
      </div>

      {/* Feed Items */}
      <div className="flex-1 overflow-y-auto p-density-high space-y-2">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => onEventSelect(event)}
            className={`p-density-med rounded cursor-pointer transition-colors ${
              selectedEvent?.id === event.id
                ? 'bg-surface-container-high border border-primary'
                : 'bg-surface-container border border-outline-variant hover:border-outline'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`text-[10px] font-label-caps px-1.5 py-0.5 border rounded ${getStatusColor(event.status)}`}>
                {getStatusLabel(event.status)}
              </span>
              <span className="font-reasoning-log text-on-surface-variant text-[11px]">Just now</span>
            </div>
            <h3 className="text-body-sm font-body-sm font-bold text-on-surface mb-1 truncate">{event.zoneName}</h3>
            <p className="font-reasoning-log text-on-surface-variant text-[12px] truncate">{event.primaryThreatVector}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
