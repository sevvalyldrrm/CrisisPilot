from fastapi import FastAPI

from app.routes.analysis import router as analysis_router

app = FastAPI(
    title="CrisisPilot"
)

app.include_router(
    analysis_router,
    prefix="/api"
)

@app.get("/")
def root():
    return {
        "status": "online"
    }