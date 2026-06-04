from fastapi import APIRouter
from pydantic import BaseModel
from app.repositories.event_repository import EventRepository
from app.services.simulation_service import simulate_response
from app.services.simulation_service import simulate_response
from app.models.analysis import SimulationRequest
from datetime import datetime, timezone
router = APIRouter()

class EventRequest(BaseModel):
    event: str

@router.post("/analyze")
def analyze(request: EventRequest):

    result = simulate_response(
        request.event
    )

    EventRepository.create(
        {
            "event_text": request.event,
            "response": result,
            "created_at": datetime.now(timezone.utc)
        }
    )

    return result

@router.get("/events")
def get_events():

    events = EventRepository.get_all()

    for event in events:
        event["_id"] = str(event["_id"])

    return {
        "events": events
    }

@router.post("/simulate")
def simulate(request: SimulationRequest):

    result = simulate_response(
        request.event
    )

    return result