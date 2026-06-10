import { useQuery } from '@tanstack/react-query'
import { eventService } from '@/services/eventService'
import type { Event } from '@/entities/types'

export const useLatestCriticalEvent = () => {
  return useQuery({
    queryKey: ['latest-critical-event'],
    queryFn: async () => {
      const response = await eventService.getEvents()
      // Filter for critical events and get the most recent one
      const criticalEvents = response.events.filter(
        (event) => event.status === 'critical'
      )
            
      if (criticalEvents.length === 0) {
        // If no critical events, return the most recent event
        return response.events[0] || null
      }
      
      // Sort by timestamp and return the most recent
      criticalEvents.sort(
        (a: Event, b: Event) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      
      return criticalEvents[0]
    },
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
