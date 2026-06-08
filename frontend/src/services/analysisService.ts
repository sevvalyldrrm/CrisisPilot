import apiClient from './apiClient'
import type { Analysis, AnalysisRequest } from '@/entities/types'
import { mockAnalysis } from './mockData'

const USE_MOCK = true

export const analysisService = {
  async createAnalysis(request: AnalysisRequest): Promise<Analysis> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 800))
      return { ...mockAnalysis, eventId: request.eventId, type: request.type }
    }
    
    const response = await apiClient.post<Analysis>('/analysis', request)
    return response.data
  },

  async getAnalysisById(id: string): Promise<Analysis> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return mockAnalysis
    }
    
    const response = await apiClient.get<Analysis>(`/analysis/${id}`)
    return response.data
  },
}
