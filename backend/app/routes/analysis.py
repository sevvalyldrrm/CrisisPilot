from fastapi import APIRouter
from pydantic import BaseModel
from app.repositories.event_repository import EventRepository
from app.services.gemini_service import analyze_disruption
from datetime import datetime
router = APIRouter()

class EventRequest(BaseModel):
    event: str

@router.post("/analyze")
def analyze(request: EventRequest):

    result = analyze_disruption(
        request.event
    )

    EventRepository.create(
        {
            "event_text": request.event,
            "analysis": result,
            "created_at": datetime.utcnow()
        }
    )

    return {
        "analysis": result
    }

@router.get("/events")
def get_events():

    events = EventRepository.get_all()

    for event in events:
        event["_id"] = str(event["_id"])

    return {
        "events": events
    }