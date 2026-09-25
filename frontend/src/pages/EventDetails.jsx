import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getEvent } from "../services/api";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const response = await getEvent(id);
        setEvent(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="state">
          <div className="spinner"></div>
          <p>Loading event...</p>
        </div>
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="state">
          <h3>Event not found</h3>
          <Link to="/">← Back to events</Link>
        </div>
      </>
    );
  }

  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);

  return (
    <>
      <Navbar />

      <main className="details-page">
        <div className="details-image">
          <img src={event.image} alt={event.name} />
        </div>

        <div className="details-content">
          <span className="details-category">{event.category}</span>

          <h1>{event.name}</h1>

          <p className="details-description">{event.description}</p>

          <div className="details-grid">
            <div>
              <span>📅 DATE</span>
              <strong>
                {startDate.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
                {" – "}
                {endDate.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </strong>
            </div>

            <div>
              <span>📍 LOCATION</span>
              <strong>
                {event.venue}, {event.city}
              </strong>
            </div>

            <div>
              <span>🏢 INDUSTRY</span>
              <strong>{event.industry}</strong>
            </div>

            <div>
              <span>👤 ORGANIZER</span>
              <strong>{event.organizer}</strong>
            </div>
          </div>

          <div className="details-actions">
            <a
              href={event.website}
              target="_blank"
              rel="noreferrer"
              className="primary-action"
            >
              Visit Website ↗
            </a>

            <Link to="/" className="secondary-action">
              ← Back to Events
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default EventDetails;
