import json

def parse_json_response(text: str):

    cleaned = (
        text
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    return json.loads(cleaned)