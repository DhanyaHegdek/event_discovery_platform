from datetime import datetime

from sqlalchemy import Column, Integer, String, Text, DateTime

from .database import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)

    category = Column(String(100), nullable=False)
    industry = Column(String(100), nullable=True)

    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)

    venue = Column(String(255), nullable=True)
    city = Column(String(100), nullable=False)
    country = Column(String(100), nullable=False)

    organizer = Column(String(255), nullable=True)
    website = Column(String(500), nullable=True)
    image = Column(String(500), nullable=True)

    status = Column(
        String(50),
        nullable=False,
        default="Upcoming"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )