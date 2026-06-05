import type { Event } from '@/entities/types'

export const generateBriefing = (event: Event): string => {
  const topActions = event.analysis?.top_actions?.map(a => typeof a === 'string' ? a : a.action).join(', ') || 'N/A'

  let briefing = `CRISISPILOT BRIEFING
==================

EVENT
-----
${event.zoneName}

STRATEGY
--------
${event.analysis?.recommended_strategy?.name || event.primaryThreatVector}
${event.analysis?.recommended_strategy?.reason ? `\nReason: ${event.analysis.recommended_strategy.reason}` : ''}

TOP ACTIONS
-----------
${topActions}

RISK SCORE
-----------
${event.riskScore.toFixed(1)}

STATUS
------
${event.status.toUpperCase()}
`

  if (event.analysis?.expected_outcome) {
    const expectedOutcome = `Delay: ${event.analysis.expected_outcome.delay_reduction_percent || 0}%, Cost: ${event.analysis.expected_outcome.cost_saving_percent || 0}%, Risk: ${event.analysis.expected_outcome.risk_reduction_percent || 0}%`
    briefing = briefing.replace(
      'TOP ACTIONS',
      `EXPECTED OUTCOME
----------------
${expectedOutcome}

TOP ACTIONS`
    )
  }

  return briefing
}
