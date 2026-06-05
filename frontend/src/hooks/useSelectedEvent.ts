import { useState } from 'react'
import type { Event } from '@/entities/types'

export const useSelectedEvent = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  return {
    selectedEvent,
    setSelectedEvent,
  }
}
