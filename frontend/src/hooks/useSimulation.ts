import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { simulationService } from '@/services/simulationService'
import type { SimulationRequest } from '@/entities/types'

export const useCreateSimulation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (request: SimulationRequest) => simulationService.createSimulation(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['simulation'] })
    },
  })
}

export const useSimulation = (id: string) => {
  return useQuery({
    queryKey: ['simulation', id],
    queryFn: () => simulationService.getSimulationById(id),
    enabled: !!id,
  })
}
