import { useQuery } from '@tanstack/react-query'
import { eventService } from '@/services/eventService'
import type { EventFilters } from '@/entities/types'

export const useEvents = (filters?: EventFilters) => {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: () => eventService.getEvents(filters),
  })
}

export const useEvent = (id: string) => {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => eventService.getEventById(id),
    enabled: !!id,
  })
}
