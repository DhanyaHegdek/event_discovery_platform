import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import { getEvents } from "../services/api";

function Home() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getEvents({
        search: search || undefined,
        category: category || undefined,
        status_filter: status || undefined,
      });

      setEvents(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchEvents, 300);

    return () => clearTimeout(timer);
  }, [search, category, status]);

  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow">✦ DISCOVER WHAT'S NEXT</div>

            <h1>
              Find events that
              <span> move you forward.</span>
            </h1>

            <p>
              Discover conferences, exhibitions, trade shows and business events
              happening around you.
            </p>

            <div className="hero-search">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search events, cities or venues..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* EVENTS */}
        <section className="events-section">
          <div className="section-header">
            <div>
              <p className="section-label">UPCOMING EVENTS</p>

              <h2>Explore events</h2>
            </div>

            <p className="event-count">{events.length} events</p>
          </div>

          {/* FILTERS */}
          <div className="filters">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Conference">Conference</option>
              <option value="Exhibition">Exhibition</option>
              <option value="Trade Show">Trade Show</option>
              <option value="Summit">Summit</option>
              <option value="Forum">Forum</option>
            </select>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* CONTENT */}
          {loading && (
            <div className="state">
              <div className="spinner"></div>
              <p>Discovering events...</p>
            </div>
          )}

          {error && (
            <div className="state error-state">
              <h3>Something went wrong</h3>
              <p>{error}</p>
              <button onClick={fetchEvents}>Try Again</button>
            </div>
          )}

          {!loading && !error && events.length === 0 && (
            <div className="state">
              <div className="empty-icon">⌕</div>
              <h3>No events found</h3>
              <p>Try changing your search or filters.</p>
            </div>
          )}

          {!loading && !error && events.length > 0 && (
            <div className="event-grid">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Home;
