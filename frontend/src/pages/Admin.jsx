import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../services/api";

const emptyForm = {
  name: "",
  description: "",
  category: "Conference",
  industry: "",
  start_date: "",
  end_date: "",
  venue: "",
  city: "",
  country: "India",
  organizer: "",
  website: "",
  image: "",
  status: "Upcoming",
};

function Admin() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...form,
        start_date: `${form.start_date}T09:00:00`,
        end_date: `${form.end_date}T17:00:00`,
      };

      if (editingId) {
        await updateEvent(editingId, payload);
      } else {
        await createEvent(payload);
      }

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);

      await loadEvents();
    } catch (error) {
      console.error("SAVE EVENT ERROR:", error);

      alert(
        error.response?.data?.detail
          ? JSON.stringify(error.response.data.detail)
          : "Unable to save event. Check the backend terminal.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("evently_admin_token");
    localStorage.removeItem("evently_admin_email");

    navigate("/login");
  };

  const handleEdit = (event) => {
    setEditingId(event.id);

    setForm({
      name: event.name || "",
      description: event.description || "",
      category: event.category || "Conference",
      industry: event.industry || "",
      start_date: event.start_date?.slice(0, 16) || "",
      end_date: event.end_date?.slice(0, 16) || "",
      venue: event.venue || "",
      city: event.city || "",
      country: event.country || "India",
      organizer: event.organizer || "",
      website: event.website || "",
      image: event.image || "",
      status: event.status || "Upcoming",
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (!confirmed) return;

    try {
      await deleteEvent(id);
      await loadEvents();
    } catch (error) {
      console.error(error);
      alert("Unable to delete event.");
    }
  };

  //   const handleView = (id) => {
  //     navigate(`/events/${id}`);
  //   };

  const createSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleView = (event) => {
    const slug = createSlug(event.name);
    navigate(`/events/${slug}`);
  };

  //   <button className="view-btn" onClick={() => handleView(event)}>
  //     View
  //   </button>;

  const cancelForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <>
      <Navbar />

      <main className="admin-page">
        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage your events</p>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

          <button
            className="add-event-btn"
            onClick={() => {
              setForm(emptyForm);
              setEditingId(null);
              setShowForm(true);
            }}
          >
            + Add Event
          </button>
        </div>

        {showForm && (
          <form className="event-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <h2>{editingId ? "Edit Event" : "Create Event"}</h2>

              <button type="button" onClick={cancelForm} className="close-btn">
                ×
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group full">
                <label>Event Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  minLength={3}
                  placeholder="e.g. Bengaluru Tech Summit"
                />
              </div>

              <div className="form-group full">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  minLength={10}
                  rows="4"
                  placeholder="Describe the event..."
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option>Conference</option>
                  <option>Exhibition</option>
                  <option>Trade Show</option>
                  <option>Summit</option>
                  <option>Forum</option>
                </select>
              </div>

              <div className="form-group">
                <label>Industry</label>
                <input
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  placeholder="Technology"
                />
              </div>

              <div className="form-group">
                <label>Start Date *</label>
                <input
                  type="date"
                  name="start_date"
                  value={form.start_date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>End Date *</label>
                <input
                  type="date"
                  name="end_date"
                  value={form.end_date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Venue</label>
                <input
                  name="venue"
                  value={form.venue}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>City *</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Country *</label>
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Organizer</label>
                <input
                  name="organizer"
                  value={form.organizer}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Upcoming</option>
                  <option>Ongoing</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={cancelForm}>
                Cancel
              </button>

              <button type="submit" className="save-btn" disabled={loading}>
                {loading
                  ? "Saving..."
                  : editingId
                    ? "Update Event"
                    : "Create Event"}
              </button>
            </div>
          </form>
        )}

        <div className="admin-table-wrapper">
          <div className="admin-table-header">
            <h2>All Events</h2>
            <span>{events.length} events</span>
          </div>

          <div className="admin-table">
            <div className="table-row table-head">
              <span>Event</span>
              <span>Category</span>
              <span>Location</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            {events.map((event) => (
              <div className="table-row" key={event.id}>
                <div className="event-name-cell">
                  <img src={event.image} alt="" />

                  <div>
                    <strong>{event.name}</strong>
                    <small>{event.organizer}</small>
                  </div>
                </div>

                <span>{event.category}</span>

                <span>
                  {event.city}, {event.country}
                </span>

                <span className="table-status">{event.status}</span>

                <div className="actions">
                  <button
                    className="view-btn"
                    onClick={() => handleView(event)}
                  >
                    View
                  </button>

                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(event)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Admin;
