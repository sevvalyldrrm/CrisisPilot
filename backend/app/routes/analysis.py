from fastapi import APIRouter
from pydantic import BaseModel
from app.services.elasticsearch_service import search_similar
from app.services.elasticsearch_service import index_event
from app.repositories.event_repository import EventRepository
from app.services.simulation_service import simulate_response
from app.services.simulation_service import simulate_response
from app.services.elasticsearch_service import search_events
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

    now = datetime.now(timezone.utc)
    
    EventRepository.create(
        {
            "event_text": request.event,
            "response": result,
            "created_at": now
        }
    )

    risk_score = result.get("confidence_score", 50)
    crisis_level = result.get("crisis_level", "Medium")

    index_event({
        "event_text": request.event,
        "risk_score": risk_score,
        "crisis_level": crisis_level,
        "created_at": now.isoformat()
    })
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

@router.get("/search-events")
def search_events_endpoint(q: str):
    return {
        "results": search_events(q)
    }

@router.get("/events/search")
def search_events(q: str):

    results = search_similar(q)

    return {
        "results": [
            hit["_source"]
            for hit in results["hits"]["hits"]
        ]
    }