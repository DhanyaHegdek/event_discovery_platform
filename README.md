# Event Discovery Platform

A full-stack web application for discovering, searching, filtering, and managing events.

The platform provides a responsive user-facing event discovery experience along with an admin dashboard for managing event data through REST APIs.

---

## 📌 Project Overview

The Event Discovery Platform allows users to:

- Discover available events
- Search events by name
- Filter events by category
- View detailed information about an event
- Visit the official event website

Administrators can:

- Log in through the admin portal
- View all events
- Create new events
- Edit existing events
- Delete events
- View individual event details
- Log out securely from the admin interface

The application follows a layered full-stack architecture:

```text
React + Vite
      ↓
Axios
      ↓
FastAPI REST API
      ↓
SQLAlchemy ORM
      ↓
PostgreSQL
