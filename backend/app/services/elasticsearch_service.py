from elasticsearch import Elasticsearch

es = Elasticsearch("http://localhost:9200")


INDEX_NAME = "events"


def create_index():
    if not es.indices.exists(index=INDEX_NAME):
        es.indices.create(
            index=INDEX_NAME,
            mappings={
                "properties": {
                    "event_text": {"type": "text"},
                    "risk_score": {"type": "float"},
                    "crisis_level": {"type": "keyword"},
                    "created_at": {"type": "date"}
                }
            }
        )


def index_event(event: dict):
    return es.index(index=INDEX_NAME, document=event)


def search_similar(query: str):
    return es.search(
        index=INDEX_NAME,
        query={
            "multi_match": {
                "query": query,
                "fields": ["event_text", "crisis_level"]
            }
        }
    )

def get_similar_events(query: str):

    result = es.search(
        index=INDEX_NAME,
        query={
            "match": {
                "event_text": query
            }
        },
        size=3
    )

    similar = []

    for hit in result["hits"]["hits"]:
        source = hit["_source"]

        similar.append(
            f"""
Event: {source.get('event_text')}
Risk Score: {source.get('risk_score')}
Crisis Level: {source.get('crisis_level')}
"""
        )

    return "\n".join(similar)

def search_events(query: str):

    result = es.search(
        index=INDEX_NAME,
        query={
            "multi_match": {
                "query": query,
                "fields": [
                    "event_text",
                    "crisis_level"
                ]
            }
        },
        size=10
    )

    return [
        hit["_source"]
        for hit in result["hits"]["hits"]
    ]