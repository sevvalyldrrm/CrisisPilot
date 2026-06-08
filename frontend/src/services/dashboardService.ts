import apiClient from './apiClient'
import type { DashboardMetrics } from '@/entities/types/dashboard.types'

export const dashboardService = {
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const response = await apiClient.get<DashboardMetrics>('/dashboard/metrics')
    return response.data
  },
}
