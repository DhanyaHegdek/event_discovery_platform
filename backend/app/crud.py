from sqlalchemy.orm import Session

from . import models, schemas


def get_events(
    db: Session,
    search: str | None = None,
    category: str | None = None,
    status: str | None = None
):
    query = db.query(models.Event)

    if search:
        search_term = f"%{search}%"

        query = query.filter(
            (models.Event.name.ilike(search_term))
            | (models.Event.venue.ilike(search_term))
            | (models.Event.city.ilike(search_term))
            | (models.Event.country.ilike(search_term))
        )

    if category:
        query = query.filter(
            models.Event.category == category
        )

    if status:
        query = query.filter(
            models.Event.status == status
        )

    return query.order_by(
        models.Event.start_date.asc()
    ).all()


def get_event(
    db: Session,
    event_id: int
):
    return db.query(models.Event).filter(
        models.Event.id == event_id
    ).first()


def create_event(
    db: Session,
    event: schemas.EventCreate
):
    event_data = event.model_dump()

    if event_data.get("website"):
        event_data["website"] = str(event_data["website"])

    if event_data.get("image"):
        event_data["image"] = str(event_data["image"])

    db_event = models.Event(**event_data)

    db.add(db_event)
    db.commit()
    db.refresh(db_event)

    return db_event

def update_event(db, event_id, event):
    db_event = db.query(models.Event).filter(
        models.Event.id == event_id
    ).first()

    if not db_event:
        return None

    event_data = event.model_dump()

    # Convert Pydantic HttpUrl objects to normal strings
    if event_data.get("website"):
        event_data["website"] = str(event_data["website"])

    if event_data.get("image"):
        event_data["image"] = str(event_data["image"])

    for key, value in event_data.items():
        setattr(db_event, key, value)

    db.commit()
    db.refresh(db_event)

    return db_event


def delete_event(
    db: Session,
    event_id: int
):
    db_event = get_event(db, event_id)

    if not db_event:
        return None

    db.delete(db_event)
    db.commit()

    return db_event