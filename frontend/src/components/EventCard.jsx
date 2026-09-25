import { Link } from "react-router-dom";

function EventCard({ event }) {
  const startDate = new Date(event.start_date);

  return (
    <article className="event-card">
      <div className="event-image-wrapper">
        <img
          src={event.image}
          alt={event.name}
          className="event-image"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1505373877841-8d25f7d46678";
          }}
        />

        <span className="status-badge">{event.status}</span>
      </div>

      <div className="event-content">
        <div className="event-category">{event.category}</div>

        <h3>{event.name}</h3>

        <p className="event-description">{event.description}</p>

        <div className="event-info">
          <span>
            📅{" "}
            {startDate.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>

          <span>
            📍 {event.city}, {event.country}
          </span>
        </div>

        <Link to={`/events/${event.id}`} className="details-btn">
          View Details →
        </Link>
      </div>
    </article>
  );
}

export default EventCard;
