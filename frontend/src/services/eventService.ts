import apiClient from './apiClient'
import type { Event, EventFilters, EventListResponse } from '@/entities/types'

// Backend event type
interface BackendEvent {
  _id: string
  event_text: string
  
  analysis?: any
  response?: any

  created_at: string
}

interface BackendEventListResponse {
  events: BackendEvent[]
}

// Mapper function to convert backend events to frontend Event interface
const mapBackendEventToFrontend = (backendEvent: BackendEvent): Event => {
  const analysis =
    backendEvent.analysis ??
    backendEvent.response

  // Map crisis level to status
  const statusMap: Record<string, Event['status']> = {
    'Critical': 'critical',
    'High': 'elevated',
    'Medium': 'monitoring',
    'Low': 'stable',
  }

  const status = statusMap[analysis?.crisis_level] || 'monitoring'

  return {
    id: backendEvent._id,
    regionId: backendEvent._id.substring(0, 6),
    zoneName: backendEvent.event_text,
    riskScore:  analysis?.confidence_score ?? 0,
    primaryThreatVector: analysis?.recommended_strategy?.name ?? 'Unknown',
    status,
    timestamp: backendEvent.created_at,
    region: 'Global',
    analysis: {
    executive_summary: analysis?.executive_summary,

    recommended_strategy: {
      name: analysis?.recommended_strategy?.name,
      reason: analysis?.recommended_strategy?.reason,
    },

    top_actions: analysis?.top_actions,

    secondary_risks: analysis?.secondary_risks,

    confidence_score: analysis?.confidence_score,

    supply_chain_impact: analysis?.supply_chain_impact,

    recommended_hubs: analysis?.recommended_hubs,
  },
  }
}

export const eventService = {
  async getEvents(filters?: EventFilters): Promise<EventListResponse> {
    const response = await apiClient.get<BackendEventListResponse>('/events', { params: filters })
    
    // Map backend events to frontend format
    const events = response.data.events.map(mapBackendEventToFrontend)

    // Apply client-side filtering if needed (can be moved to backend later)
    let filteredEvents = [...events]
    
    if (filters?.status) {
      filteredEvents = filteredEvents.filter(e => e.status === filters.status)
    }
    if (filters?.region) {
      filteredEvents = filteredEvents.filter(e => e.region === filters.region)
    }
    if (filters?.minRiskScore) {
      filteredEvents = filteredEvents.filter(e => e.riskScore >= filters.minRiskScore!)
    }
    if (filters?.maxRiskScore) {
      filteredEvents = filteredEvents.filter(e => e.riskScore <= filters.maxRiskScore!)
    }
    
    return {
      events: filteredEvents,
      total: filteredEvents.length,
      page: 1,
      pageSize: filteredEvents.length,
    }
  },

  async getEventById(id: string): Promise<Event> {
    const response = await apiClient.get<BackendEvent>(`/events/${id}`)
    return mapBackendEventToFrontend(response.data)
  },

  async searchEvents(query: string) {
  const response = await apiClient.get(
    `/events/search?q=${encodeURIComponent(query)}`
  )

  return response.data.results
},
}
