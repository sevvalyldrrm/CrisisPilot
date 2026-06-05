import apiClient from './apiClient'
import type { Event, EventFilters, EventListResponse } from '@/entities/types'

// Backend event type
interface BackendEvent {
  _id: string
  event_text: string
  analysis: {
    crisis_level: string
    confidence_score: number
    recommended_strategy: {
      name: string
      reason?: string
    }
    executive_summary?: string
    top_actions?: string[]
    secondary_risks?: string[]
    supply_chain_impact?: {
      delay_days?: number
      cost_increase_percent?: number
    }
    recommended_hubs?: string[]
  }
  created_at: string
}

interface BackendEventListResponse {
  events: BackendEvent[]
}

// Mapper function to convert backend events to frontend Event interface
const mapBackendEventToFrontend = (backendEvent: BackendEvent): Event => {
  // Map crisis level to status
  const statusMap: Record<string, Event['status']> = {
    'Critical': 'critical',
    'High': 'elevated',
    'Medium': 'monitoring',
    'Low': 'stable',
  }

  const status = statusMap[backendEvent.analysis.crisis_level] || 'monitoring'

  return {
    id: backendEvent._id,
    regionId: backendEvent._id.substring(0, 6),
    zoneName: backendEvent.event_text,
    riskScore: backendEvent.analysis.confidence_score,
    primaryThreatVector: backendEvent.analysis.recommended_strategy.name,
    status,
    timestamp: backendEvent.created_at,
    region: 'Global',
    analysis: {
      executive_summary: backendEvent.analysis.executive_summary,
      recommended_strategy: {
        name: backendEvent.analysis.recommended_strategy.name,
        reason: backendEvent.analysis.recommended_strategy.reason,
      },
      top_actions: backendEvent.analysis.top_actions,
      secondary_risks: backendEvent.analysis.secondary_risks,
      confidence_score: backendEvent.analysis.confidence_score,
      supply_chain_impact: backendEvent.analysis.supply_chain_impact,
      recommended_hubs: backendEvent.analysis.recommended_hubs,
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
}
