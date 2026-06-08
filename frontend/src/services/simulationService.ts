import apiClient from './apiClient'
import type { Simulation, SimulationRequest } from '@/entities/types'
import { mockSimulation } from './mockData'

const USE_MOCK = true

export const simulationService = {
  async createSimulation(request: SimulationRequest): Promise<Simulation> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 800))
      return { ...mockSimulation, eventId: request.eventId }
    }
    
    const response = await apiClient.post<Simulation>('/simulate', request)
    return response.data
  },

  async getSimulationById(id: string): Promise<Simulation> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return mockSimulation
    }
    
    const response = await apiClient.get<Simulation>(`/simulate/${id}`)
    return response.data
  },
}
