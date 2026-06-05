import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { analysisService } from '@/services/analysisService'
import type { AnalysisRequest } from '@/entities/types'

export const useCreateAnalysis = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (request: AnalysisRequest) => analysisService.createAnalysis(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analysis'] })
    },
  })
}

export const useAnalysis = (id: string) => {
  return useQuery({
    queryKey: ['analysis', id],
    queryFn: () => analysisService.getAnalysisById(id),
    enabled: !!id,
  })
}
