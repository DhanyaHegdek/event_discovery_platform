from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from .. import crud, schemas


router = APIRouter(
    prefix="/api/events",
    tags=["Events"]
)


@router.get(
    "",
    response_model=list[schemas.EventResponse]
)
def list_events(
    search: str | None = None,
    category: str | None = None,
    status_filter: str | None = None,
    db: Session = Depends(get_db)
):
    return crud.get_events(
        db,
        search=search,
        category=category,
        status=status_filter
    )


@router.get(
    "/{event_id}",
    response_model=schemas.EventResponse
)
def get_event(
    event_id: int,
    db: Session = Depends(get_db)
):
    event = crud.get_event(db, event_id)

    if not event:
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )

    return event


@router.post(
    "",
    response_model=schemas.EventResponse,
    status_code=status.HTTP_201_CREATED
)
def create_event(
    event: schemas.EventCreate,
    db: Session = Depends(get_db)
):
    return crud.create_event(db, event)


@router.put(
    "/{event_id}",
    response_model=schemas.EventResponse
)
def update_event(
    event_id: int,
    event: schemas.EventUpdate,
    db: Session = Depends(get_db)
):
    updated_event = crud.update_event(
        db,
        event_id,
        event
    )

    if not updated_event:
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )

    return updated_event


@router.delete(
    "/{event_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_event(
    event_id: int,
    db: Session = Depends(get_db)
):
    deleted_event = crud.delete_event(
        db,
        event_id
    )

    if not deleted_event:
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )