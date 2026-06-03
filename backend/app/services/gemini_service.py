from google import genai
from dotenv import load_dotenv
import os
from app.utils.json_parser import parse_json_response

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def analyze_disruption(event_text: str):

    prompt = f"""
    You are CrisisPilot, an AI-powered crisis intelligence and supply chain resilience platform.

    Your task is to analyze a disruption event and produce structured crisis intelligence.

    Event:
    {event_text}

    Instructions:

    - Return ONLY valid JSON.
    - Do NOT use markdown.
    - Do NOT wrap the response in ```json.
    - Do NOT include explanations outside JSON.
    - risk_score must be an integer between 0 and 100.
    - confidence_score must be an integer between 0 and 100.
    - economic_impact.confidence must be a decimal between 0 and 1.
    - severity must follow this mapping:

    0-29 = Low
    30-59 = Medium
    60-79 = High
    80-100 = Critical

    - event_type must be an array.
    - affected_regions must be an array.
    - affected_industries must be an array.
    - recommended_actions must be an array.
    - alternative_routes must contain route objects.

    Estimate realistic values whenever exact data is unavailable.

    Return ONLY this schema:

    {{
    "event_name": "",
    "event_type": [],
    "risk_score": 0,
    "severity": "",

    "affected_regions": [],
    "affected_industries": [],

    "estimated_delay_days": 0,

    "economic_impact": {{
        "daily_loss_estimate": "",
        "confidence": 0.0
    }},

    "recommended_actions": [],

    "alternative_routes": [
        {{
        "route": "",
        "delay_days": 0
        }}
    ],

    "secondary_risks": [],

    "confidence_score": 0
    }}
    """

    response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt
    )

    print(response.text)

    return parse_json_response(response.text)