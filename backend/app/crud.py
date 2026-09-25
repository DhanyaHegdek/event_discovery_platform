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
            | (models.Event.city.ilike(search_term))
            | (models.Event.location.ilike(search_term))
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
    db_event = models.Event(
        **event.model_dump(mode="json")
    )

    db.add(db_event)
    db.commit()
    db.refresh(db_event)

    return db_event


def update_event(
    db: Session,
    event_id: int,
    event: schemas.EventUpdate
):
    db_event = get_event(db, event_id)

    if not db_event:
        return None

    update_data = event.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
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