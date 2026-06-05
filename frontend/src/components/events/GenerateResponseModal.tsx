import { Modal } from '@/shared/ui/Modal'
import { ExpectedOutcomeMetrics } from './ExpectedOutcomeMetrics'
import { TopActionsList } from './TopActionsList'
import { SecondaryRisksList } from './SecondaryRisksList'
import type { Event } from '@/entities/types'

interface GenerateResponseModalProps {
  isOpen: boolean
  onClose: () => void
  selectedEvent: Event | null
}

export const GenerateResponseModal = ({ isOpen, onClose, selectedEvent }: GenerateResponseModalProps) => {
  if (!selectedEvent) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Operational Response Plan"
    >
      <div className="space-y-4">
        <div>
          <div className="text-[10px] font-label-caps text-on-surface-variant mb-1">EVENT NAME</div>
          <p className="text-on-surface font-bold">{selectedEvent.zoneName}</p>
        </div>
        <div>
          <div className="text-[10px] font-label-caps text-on-surface-variant mb-1">RECOMMENDED STRATEGY</div>
          <p className="text-on-surface">{selectedEvent.analysis?.recommended_strategy?.name || selectedEvent.primaryThreatVector}</p>
          {selectedEvent.analysis?.recommended_strategy?.reason && (
            <p className="text-on-surface-variant text-sm mt-1">{selectedEvent.analysis.recommended_strategy.reason}</p>
          )}
        </div>
        {selectedEvent.analysis?.expected_outcome && (
          <div>
            <div className="text-[10px] font-label-caps text-on-surface-variant mb-2">EXPECTED OUTCOME METRICS</div>
            <ExpectedOutcomeMetrics event={selectedEvent} />
          </div>
        )}
        <div>
          <div className="text-[10px] font-label-caps text-on-surface-variant mb-2">PRIORITY ACTIONS</div>
          <TopActionsList event={selectedEvent} />
        </div>
        <div>
          <div className="text-[10px] font-label-caps text-on-surface-variant mb-2">SECONDARY RISKS</div>
          <SecondaryRisksList event={selectedEvent} />
        </div>
      </div>
    </Modal>
  )
}
