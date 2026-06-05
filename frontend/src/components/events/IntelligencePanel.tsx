import { Icon } from '@/shared/ui'
import { ExpectedOutcomeMetrics } from './ExpectedOutcomeMetrics'
import { TopActionsList } from './TopActionsList'
import { SecondaryRisksList } from './SecondaryRisksList'
import type { Event } from '@/entities/types'

interface IntelligencePanelProps {
  selectedEvent: Event | null
  onEventClose: () => void
  onGenerateResponse: () => void
  onShare: () => void
}

const getStatusLabel = (status: Event['status']) => {
  switch (status) {
    case 'critical': return 'CRITICAL'
    case 'elevated': return 'ELEVATED'
    case 'monitoring': return 'MONITOR'
    default: return 'STABLE'
  }
}

export const IntelligencePanel = ({ selectedEvent, onEventClose, onGenerateResponse, onShare }: IntelligencePanelProps) => {
  if (!selectedEvent) {
    return (
      <div className="w-96 border-l border-outline-variant bg-surface flex flex-col flex-shrink-0 z-10 shadow-[-10px_0_20px_rgba(0,0,0,0.5)]">
        <div className="flex-1 flex items-center justify-center p-density-med">
          <div className="text-center">
            <Icon name="sensors" className="text-on-surface-variant text-4xl mb-4 opacity-50" />
            <p className="text-on-surface-variant text-sm">Select an event to view details</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-96 border-l border-outline-variant bg-surface flex flex-col flex-shrink-0 z-10 shadow-[-10px_0_20px_rgba(0,0,0,0.5)]">
      <div className="p-density-med border-b border-outline-variant bg-surface-container flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Icon name="warning" className={`text-[16px] ${selectedEvent.status === 'critical' ? 'text-error' : 'text-[#d29922]'}`} />
            <span className={`text-[10px] font-label-caps ${selectedEvent.status === 'critical' ? 'text-error' : 'text-[#d29922]'}`}>
              {getStatusLabel(selectedEvent.status)} SEVERITY
            </span>
          </div>
          <h2 className="text-headline-md font-headline-md font-bold text-on-surface leading-tight">{selectedEvent.zoneName}</h2>
        </div>
        <button onClick={onEventClose} className="text-on-surface-variant hover:text-on-surface">
          <Icon name="close" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-density-med space-y-6">
        {/* AI Summary */}
        <div className="space-y-2">
          <h3 className="text-label-caps font-label-caps text-on-surface-variant flex items-center gap-2">
            <Icon name="smart_toy" className="text-[14px]" />
            AI Situation Assessment
          </h3>
          <div className="bg-surface-container-low border border-outline-variant p-3 rounded font-reasoning-log text-on-surface leading-tight space-y-3">
            {selectedEvent.analysis?.executive_summary ? (
              <div>
                <div className="text-[10px] font-label-caps text-on-surface-variant mb-1">EXECUTIVE SUMMARY</div>
                <p>{selectedEvent.analysis.executive_summary}</p>
              </div>
            ) : null}
            <div>
              <div className="text-[10px] font-label-caps text-on-surface-variant mb-1">RECOMMENDED STRATEGY</div>
              <p>{selectedEvent.analysis?.recommended_strategy?.name || selectedEvent.primaryThreatVector}</p>
              {selectedEvent.analysis?.recommended_strategy?.reason ? (
                <p className="text-on-surface-variant text-xs mt-1">{selectedEvent.analysis.recommended_strategy.reason}</p>
              ) : null}
            </div>
            <ExpectedOutcomeMetrics event={selectedEvent} />
            <TopActionsList event={selectedEvent} />
            <SecondaryRisksList event={selectedEvent} />
            <div>
              <div className="text-[10px] font-label-caps text-on-surface-variant mb-1">CONFIDENCE SCORE</div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-data-metric font-bold">{selectedEvent.analysis?.confidence_score || selectedEvent.riskScore.toFixed(1)}%</span>
                  <span className="text-xs text-on-surface-variant">
                    {(selectedEvent.analysis?.confidence_score || selectedEvent.riskScore) >= 80 ? 'High Confidence' :
                     (selectedEvent.analysis?.confidence_score || selectedEvent.riskScore) >= 60 ? 'Medium Confidence' :
                     'Low Confidence'}
                  </span>
                </div>
                <div className="w-full bg-surface-variant rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${selectedEvent.analysis?.confidence_score || selectedEvent.riskScore}%`,
                      backgroundColor: (selectedEvent.analysis?.confidence_score || selectedEvent.riskScore) >= 80 ? '#238636' :
                                      (selectedEvent.analysis?.confidence_score || selectedEvent.riskScore) >= 60 ? '#d29922' :
                                      '#F85149'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Metrics Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-surface-container border border-outline-variant p-2 rounded">
            <div className="text-[10px] font-label-caps text-on-surface-variant mb-1">RISK SCORE</div>
            <div className={`text-data-metric text-right ${
              selectedEvent.riskScore >= 90 ? 'text-error' :
              selectedEvent.riskScore >= 70 ? 'text-[#d29922]' :
              'text-on-surface'
            }`}>
              {selectedEvent.riskScore.toFixed(1)}
            </div>
          </div>
          <div className="bg-surface-container border border-outline-variant p-2 rounded">
            <div className="text-[10px] font-label-caps text-on-surface-variant mb-1">STATUS</div>
            <div className="text-data-metric text-right text-on-surface">{getStatusLabel(selectedEvent.status)}</div>
          </div>
          <div className="bg-surface-container border border-outline-variant p-2 rounded col-span-2">
            <div className="text-[10px] font-label-caps text-on-surface-variant mb-1">REGION ID</div>
            <div className="text-data-metric text-on-surface">{selectedEvent.regionId}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t border-outline-variant">
          <button
            onClick={onGenerateResponse}
            className="flex-1 bg-primary text-on-primary py-2 rounded font-label-caps font-bold hover:bg-primary/90 transition-colors"
          >
            Generate Response
          </button>
          <button
            onClick={onShare}
            className="w-10 bg-transparent border border-outline-variant rounded flex items-center justify-center hover:bg-surface-variant transition-colors"
          >
            <Icon name="share" className="text-on-surface" />
          </button>
        </div>
      </div>
    </div>
  )
}
