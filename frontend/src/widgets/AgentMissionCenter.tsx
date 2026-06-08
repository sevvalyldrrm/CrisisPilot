import { Card, Icon } from '@/shared/ui'
import type { AgentStep } from '@/entities/types'

interface AgentMissionCenterProps {
  steps: AgentStep[]
}

export const AgentMissionCenter = ({ steps }: AgentMissionCenterProps) => {
  const getStepIcon = (status: AgentStep['status']) => {
    switch (status) {
      case 'complete':
        return 'check'
      case 'processing':
        return null // Will show processing dot
      case 'failed':
        return 'close'
      default:
        return null
    }
  }

  const getStepColor = (status: AgentStep['status']) => {
    switch (status) {
      case 'complete':
        return 'bg-[#238636]/20 border-[#238636] text-[#238636]'
      case 'processing':
        return 'bg-primary/20 border-primary'
      case 'failed':
        return 'bg-[#F85149]/20 border-[#F85149] text-[#F85149]'
      default:
        return 'border-outline-variant'
    }
  }

  const getTextColor = (status: AgentStep['status']) => {
    switch (status) {
      case 'complete':
        return 'text-on-surface'
      case 'processing':
      case 'failed':
        return 'text-primary'
      default:
        return 'text-on-surface opacity-50'
    }
  }

  return (
    <Card className="col-span-4 row-span-1 border border-primary/40 flex flex-col overflow-hidden relative shadow-[0_0_15px_rgba(65,143,255,0.15)]">
      <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="px-density-med py-density-high border-b border-primary/20 bg-primary/5 flex justify-between items-center">
        <span className="text-label-caps font-label-caps text-primary uppercase tracking-widest flex items-center gap-2 font-bold">
          <Icon name="model_training" className="text-[16px]" />
          Agent Mission Center
        </span>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
      </div>
      <div className="p-density-med flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3 font-reasoning-log text-[11px]">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex flex-col items-center mt-0.5">
                <div className={`w-4 h-4 rounded-full ${getStepColor(step.status)} border flex items-center justify-center`}>
                  {step.status === 'processing' ? (
                    <div className="w-2 h-2 bg-primary rounded-full processing-dot" />
                  ) : (
                    getStepIcon(step.status) && (
                      <Icon name={getStepIcon(step.status)!} className="text-[10px] font-bold" />
                    )
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-px h-8 my-1 ${step.status === 'pending' ? 'bg-outline-variant/30 border-dashed border-l border-outline-variant' : 'bg-outline-variant'}`} />
                )}
              </div>
              <div className="flex-1">
                <div className={`font-bold ${getTextColor(step.status)}`}>{step.step}</div>
                <div className="text-on-surface-variant flex justify-between mt-0.5">
                  <span className={step.status === 'processing' ? 'text-primary' : ''}>
                    Status: {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                  </span>
                  <span className="text-outline">{step.timestamp}</span>
                </div>
                {step.confidence !== undefined && (
                  <div className={`mt-0.5 ${step.status === 'complete' ? 'text-[#238636]' : 'text-primary'}`}>
                    Confidence: {step.confidence}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
