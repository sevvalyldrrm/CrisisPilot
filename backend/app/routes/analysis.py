from fastapi import APIRouter
from pydantic import BaseModel

from app.services.gemini_service import analyze_disruption

router = APIRouter()

class EventRequest(BaseModel):
    event: str

@router.post("/analyze")
def analyze(request: EventRequest):

    result = analyze_disruption(
        request.event
    )

    return {
        "analysis": result
    }