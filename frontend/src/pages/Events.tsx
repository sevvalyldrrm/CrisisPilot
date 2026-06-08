import { useState, useEffect } from 'react'
import { useEvents } from '@/hooks/useEvents'
import { useSelectedEvent } from '@/hooks/useSelectedEvent'
import { LoadingState, ErrorState } from '@/shared/ui'
import { Toast } from '@/shared/ui/Toast'
import { EventFeed } from '@/components/events/EventFeed'
import { WorldMap } from '@/components/events/WorldMap'
import { IntelligencePanel } from '@/components/events/IntelligencePanel'
import { GenerateResponseModal } from '@/components/events/GenerateResponseModal'
import { ImpactTimeline } from '@/components/events/ImpactTimeline'
import { NetworkNodes } from '@/components/events/NetworkNodes'
import { generateBriefing } from '@/utils/generateBriefing'
import { useSearch } from '@/context/SearchContext'
import { eventService } from '@/services/eventService'

export const Events = () => {
  const { data, isLoading, error } = useEvents()
  const { selectedEvent, setSelectedEvent } = useSelectedEvent()
  const { search } = useSearch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [filteredEvents, setFilteredEvents] = useState<any[]>([])
  
  useEffect(() => {
    const searchEvents = async () => {
      if (!search.trim()) {
        setFilteredEvents([])
        return
      }

      try {
        const results = await eventService.searchEvents(search)

        console.log('Elastic results:', results)

        setFilteredEvents(results)
      } catch (err) {
        console.error(err)
      }
    }

    const timeout = setTimeout(searchEvents, 500)

    return () => clearTimeout(timeout)
  }, [search])

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState message="Failed to load events" />

  const events = data?.events || []

  const handleShare = () => {
    if (!selectedEvent) return
    const briefing = generateBriefing(selectedEvent)
    navigator.clipboard.writeText(briefing)
    setToastMessage('Brief copied to clipboard')
    setShowToast(true)
  }

  
  return (
    <main className="flex-1 flex flex-col relative overflow-hidden bg-surface-container-lowest">
      <div className="flex-1 flex overflow-hidden">
        <EventFeed
          events={events}
          selectedEvent={selectedEvent}
          onEventSelect={setSelectedEvent}
        />
        <WorldMap
          events={events}
          selectedEvent={selectedEvent}
          onEventSelect={setSelectedEvent}
        />
        <IntelligencePanel
          selectedEvent={selectedEvent}
          onEventClose={() => setSelectedEvent(null)}
          onGenerateResponse={() => setIsModalOpen(true)}
          onShare={handleShare}
        />
        <GenerateResponseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedEvent={selectedEvent}
        />
        <Toast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />
      </div>

      <div className="h-48 border-t border-outline-variant bg-surface-container-lowest flex flex-shrink-0 z-20">
        <ImpactTimeline selectedEvent={selectedEvent} />
        <NetworkNodes selectedEvent={selectedEvent} />
      </div>
    </main>
  )
}
