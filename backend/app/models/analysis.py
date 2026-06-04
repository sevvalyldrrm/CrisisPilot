from pydantic import BaseModel
from app.services.simulation_service import simulate_response
class AlternativeRoute(BaseModel):
    route: str
    delay_days: int

class EconomicImpact(BaseModel):
    daily_loss_estimate: str
    confidence: float

class CrisisAnalysis(BaseModel):
    event_name: str
    event_type: list[str]
    risk_score: int
    severity: str

    affected_regions: list[str]
    affected_industries: list[str]

    economic_impact: EconomicImpact

    recommended_actions: list[str]

    alternative_routes: list[AlternativeRoute]

    confidence_score: int

class SimulationRequest(BaseModel):
    event: str