from datetime import datetime

from app.database import SessionLocal, engine, Base
from app.models import Event


Base.metadata.create_all(bind=engine)


events = [
    Event(
        name="Bengaluru Tech Summit",
        description="A technology conference bringing together innovators, startups, developers, and technology leaders.",
        category="Conference",
        industry="Technology",
        start_date=datetime(2026, 10, 15, 9, 0),
        end_date=datetime(2026, 10, 17, 18, 0),
        venue="Bangalore International Exhibition Centre",
        city="Bengaluru",
        country="India",
        organizer="Karnataka Innovation Authority",
        website="https://example.com",
        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87",
        status="Upcoming",
    ),

    Event(
        name="India AI & Data Conference",
        description="Explore artificial intelligence, machine learning, data engineering, and the future of intelligent applications.",
        category="Conference",
        industry="Artificial Intelligence",
        start_date=datetime(2026, 11, 5, 9, 30),
        end_date=datetime(2026, 11, 6, 17, 30),
        venue="KTPO Convention Centre",
        city="Bengaluru",
        country="India",
        organizer="AI India Network",
        website="https://example.com",
        image="https://images.unsplash.com/photo-1556761175-b413da4baf72",
        status="Upcoming",
    ),

    Event(
        name="Future of Finance Expo",
        description="Discover emerging financial technologies, digital banking solutions, fintech platforms, and investment trends.",
        category="Exhibition",
        industry="Finance",
        start_date=datetime(2026, 10, 22, 10, 0),
        end_date=datetime(2026, 10, 24, 17, 0),
        venue="Bombay Exhibition Centre",
        city="Mumbai",
        country="India",
        organizer="Finance Events India",
        website="https://example.com",
        image="https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
        status="Upcoming",
    ),

    Event(
        name="India Manufacturing Expo",
        description="A leading industrial exhibition covering manufacturing, automation, robotics, machinery, and industrial technology.",
        category="Trade Show",
        industry="Manufacturing",
        start_date=datetime(2026, 12, 2, 9, 0),
        end_date=datetime(2026, 12, 5, 18, 0),
        venue="Pragati Maidan",
        city="New Delhi",
        country="India",
        organizer="Industrial Expo Group",
        website="https://example.com",
        image="https://images.unsplash.com/photo-1565514020179-026b92b84bb6",
        status="Upcoming",
    ),

    Event(
        name="Startup & Innovation Summit",
        description="Connect with entrepreneurs, investors, startup founders, and innovation leaders from across the ecosystem.",
        category="Summit",
        industry="Startups",
        start_date=datetime(2026, 11, 20, 10, 0),
        end_date=datetime(2026, 11, 21, 17, 0),
        venue="Hyderabad International Convention Centre",
        city="Hyderabad",
        country="India",
        organizer="Startup India Network",
        website="https://example.com",
        image="https://images.unsplash.com/photo-1559223607-a43c990c692c",
        status="Upcoming",
    ),

    Event(
        name="Global Business Leadership Forum",
        description="A business leadership forum focused on strategy, innovation, digital transformation, and global business growth.",
        category="Forum",
        industry="Business",
        start_date=datetime(2026, 12, 10, 9, 30),
        end_date=datetime(2026, 12, 11, 16, 30),
        venue="Chennai Trade Centre",
        city="Chennai",
        country="India",
        organizer="Global Business Forum",
        website="https://example.com",
        image="https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
        status="Upcoming",
    ),
]


def seed_database():
    db = SessionLocal()

    try:
        existing_count = db.query(Event).count()

        if existing_count > 0:
            print(f"Database already contains {existing_count} events.")
            print("Skipping seed.")
            return

        db.add_all(events)
        db.commit()

        print(f"Successfully seeded {len(events)} events.")

    except Exception as e:
        db.rollback()
        print(f"Seeding failed: {e}")

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()