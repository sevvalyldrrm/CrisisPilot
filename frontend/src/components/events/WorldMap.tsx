import type { Event } from '@/entities/types'
import { getEventCoordinates } from '@/utils/mapCoordinates'
import worldMapDark from '@/assets/world-map-dark.svg'

interface WorldMapProps {
  events: Event[]
  selectedEvent: Event | null
  onEventSelect: (event: Event) => void
}

export const WorldMap = ({ events, selectedEvent, onEventSelect }: WorldMapProps) => {
  return (
    <div className="flex-1 relative bg-[#0A0C10] overflow-hidden">
      {/* Map Placeholder Texture */}
      <div className="absolute inset-0 opacity-20 z-0" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, #30363D 25%, transparent 25%, transparent 75%, #30363D 75%, #30363D), repeating-linear-gradient(45deg, #30363D 25%, #0A0C10 25%, #0A0C10 75%, #30363D 75%, #30363D)',
        backgroundPosition: '0 0, 10px 10px',
        backgroundSize: '20px 20px'
      }} />

      {/* Dark World Map SVG */}
      <img
        alt="World Map"
        className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
        src={worldMapDark}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0A0C10] opacity-50 z-10" style={{
        backgroundImage: 'radial-gradient(circle at center, #161B22 0%, #0A0C10 100%)'
      }} />

      {/* Event Markers */}
      {events.map((event) => {
        const coords = getEventCoordinates(event)
        const isSelected = selectedEvent?.id === event.id
        return (
          <div
            key={event.id}
            onClick={() => onEventSelect(event)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer z-20"
            style={{
              top: `${coords.top}%`,
              left: `${coords.left}%`
            }}
          >
            <div className={`absolute rounded-full border map-pulse ${
              event.status === 'critical' ? 'w-12 h-12 border-error' :
              event.status === 'elevated' ? 'w-8 h-8 border-[#d29922]' :
              'w-6 h-6 border-[#238636]'
            } ${isSelected ? 'opacity-100' : 'opacity-60'}`} style={{
              animationDuration: event.status === 'critical' ? '2s' : '3s'
            }} />
            <div className={`w-4 h-4 rounded-full border-2 border-[#0A0C10] hover:scale-125 transition-transform ${
              event.status === 'critical' ? 'bg-error shadow-[0_0_15px_rgba(255,180,171,0.8)]' :
              event.status === 'elevated' ? 'bg-[#d29922] shadow-[0_0_10px_rgba(210,153,34,0.6)]' :
              'bg-[#238636]'
            } ${isSelected ? 'scale-150' : ''}`} />
          </div>
        )
      })}
    </div>
  )
}
