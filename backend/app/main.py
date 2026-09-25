from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routes.events import router as events_router

from . import models


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Event Discovery Platform API",
    description="API for discovering and managing events",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(events_router)


@app.get("/")
def root():
    return {
        "message": "Event Discovery Platform API"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }