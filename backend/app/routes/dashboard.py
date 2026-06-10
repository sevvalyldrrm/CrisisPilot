from fastapi import APIRouter
from app.repositories.event_repository import EventRepository

router = APIRouter()

@router.get("/dashboard/metrics")
def get_dashboard_metrics():

    events = EventRepository.get_all()

    total_events = len(events)

    if total_events == 0:
        return {
            "globalRiskScore": 0,
            "activeDisruptions": 0,
            "criticalAlerts": 0,
            "stabilityIndex": 100,
            "recentEscalations": [],
            "activeMissions": []
        }

    critical_count = 0
    confidence_sum = 0

    for event in events:

        analysis = (
            event.get("analysis")
            or event.get("response")
            or {}
        )
        level = analysis.get("crisis_level", "").lower()
        if "critical" in level:
            critical_count += 1       

        confidence_sum += analysis.get("confidence_score", 0)

    global_risk_score = round(confidence_sum / total_events)

    stability_index = max(
        0,
        min(100, 100 - (global_risk_score * 0.4))
    )

    recent_escalations = [
        {
            "title": event["event_text"],
            "level": event.get("analysis", {}).get("crisis_level", "Unknown")
        }
        for event in events[:5]
    ]

    active_missions = [
        {
            "name": event["event_text"],
            "risk": event.get("analysis", {}).get("confidence_score", 0),
            "progress": max(
                10,
                100 - event.get("analysis", {})
                .get("supply_chain_impact", {})
                .get("cost_increase_percent", 0)
            )
        }
        for event in events[:3]
    ]

    return {
        "globalRiskScore": global_risk_score,
        "activeDisruptions": total_events,
        "criticalAlerts": critical_count,
        "stabilityIndex": stability_index,
        "recentEscalations": recent_escalations,
        "activeMissions": active_missions
    }