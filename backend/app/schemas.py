from datetime import datetime

from pydantic import BaseModel, Field, HttpUrl, ConfigDict


class EventBase(BaseModel):
    name: str = Field(
        ...,
        min_length=3,
        max_length=255
    )

    description: str = Field(
        ...,
        min_length=10
    )

    category: str
    industry: str | None = None
    slug: str
    start_date: datetime
    end_date: datetime

    venue: str | None = None

    city: str
    country: str

    organizer: str | None = None

    website: HttpUrl | None = None

    image: HttpUrl | None = None

    status: str = "Upcoming"


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=3,
        max_length=255
    )

    description: str | None = Field(
        default=None,
        min_length=10
    )

    category: str | None = None
    industry: str | None = None

    start_date: datetime | None = None
    end_date: datetime | None = None

    venue: str | None = None
    city: str | None = None
    country: str | None = None

    organizer: str | None = None

    website: HttpUrl | None = None
    image: HttpUrl | None = None

    status: str | None = None


class EventResponse(EventBase):
    id: int

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )       