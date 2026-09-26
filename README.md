# Event Discovery Platform

A full-stack Event Discovery Platform built using **React, Vite, FastAPI, Python, PostgreSQL, SQLAlchemy, and Axios**.

The application allows users to discover, search, filter, and view events. An admin can log in and manage events through a dedicated dashboard with complete CRUD functionality.

---

## 🚀 Features

### User Features

- Browse available events
- Search events by name
- Filter events by category
- View detailed event information
- View event images
- View event date and location
- View organizer and industry information
- Visit the official event website
- Responsive UI for desktop, tablet, and mobile

### Admin Features

- Admin login
- Protected admin dashboard
- View all events
- View individual event details
- Create new events
- Edit existing events
- Delete events
- Logout
- Form validation and error handling

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript
- React Router
- Axios
- CSS

### Backend

- Python
- FastAPI
- Pydantic
- SQLAlchemy
- Uvicorn

### Database

- PostgreSQL

### Tools

- Git
- GitHub
- VS Code
- Swagger UI
- Postman

---

## 🏗️ Architecture

```text
                    Browser
                       │
                       ▼
               React + Vite
                       │
                       ▼
                    Axios
                       │
                       ▼
              FastAPI REST API
                       │
              ┌────────┴────────┐
              │                 │
         Event Routes       Auth Routes
              │                 │
              ▼                 ▼
           CRUD Layer       Authentication
              │
              ▼
          SQLAlchemy
              │
              ▼
          PostgreSQL
```

---

## 📁 Project Structure

```text
event-discovery-platform/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   └── routes/
│   │       ├── events.py
│   │       └── auth.py
│   │
│   ├── seed.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── EventCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── EventDetails.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Admin.jsx
│   │   └── services/
│   │       └── api.js
│   │
│   ├── package.json
│   └── index.html
│
└── README.md
```

---

# 📂 Backend Files

## `main.py`

Main entry point of the FastAPI application.

Responsibilities:

- Create the FastAPI application
- Configure CORS
- Register API routers
- Provide application-level endpoints

## `database.py`

Handles the PostgreSQL database connection using SQLAlchemy.

Responsibilities:

- Create database engine
- Create database sessions
- Provide SQLAlchemy Base
- Provide database dependency

Flow:

```text
FastAPI
   ↓
Database Session
   ↓
SQLAlchemy
   ↓
PostgreSQL
```

## `models.py`

Contains SQLAlchemy database models.

The Event model represents the event table in PostgreSQL.

Typical event fields include:

```text
id
name
description
category
start_date
end_date
venue
city
industry
organizer
website
image
status
```

## `schemas.py`

Contains Pydantic schemas used for API validation.

Schemas validate data received from the frontend and define the structure of API responses.

### Model vs Schema

```text
SQLAlchemy Model
      ↓
Database structure

Pydantic Schema
      ↓
API data validation
```

## `crud.py`

Contains database operations.

CRUD stands for:

```text
C → Create
R → Read
U → Update
D → Delete
```

Main operations:

```text
create_event()
get_events()
get_event()
update_event()
delete_event()
```

The CRUD layer separates database logic from API route logic.

## `routes/events.py`

Contains event-related REST API endpoints.

Responsibilities:

- Receive event requests
- Validate input
- Call CRUD functions
- Return event data
- Handle errors

## `routes/auth.py`

Contains the admin authentication endpoint.

Example:

```text
POST /api/auth/login
```

It validates the admin credentials and returns an authentication token.

## `seed.py`

Adds sample event data to the PostgreSQL database.

This is useful for:

- Development
- Testing
- Demonstration
- Populating the initial event list

---

# 📂 Frontend Files

## `main.jsx`

Entry point of the React application.

```text
index.html
    ↓
main.jsx
    ↓
App.jsx
```

## `App.jsx`

Handles application routing using React Router.

Routes include:

```text
/                  → Home
/events/:id        → Event Details
/login             → Login
/admin             → Admin Dashboard
```

The admin route is protected using `ProtectedAdmin`.

## `Home.jsx`

Main event discovery page.

Responsibilities:

- Fetch events
- Display events
- Search events
- Filter events
- Handle loading state
- Handle error state
- Handle empty results
- Render EventCard components

## `EventCard.jsx`

Reusable component used to display an individual event.

```jsx
<EventCard event={event} />
```

## `Navbar.jsx`

Reusable navigation component.

Provides navigation to:

```text
Discover
Admin
```

## `EventDetails.jsx`

Displays complete information about a selected event.

It uses React Router parameters to identify the selected event and calls the backend API to retrieve its information.

The page displays:

- Event image
- Event name
- Category
- Description
- Date
- Location
- Industry
- Organizer
- Website

It also provides:

```text
← Back to Events
```

## `Admin.jsx`

Admin dashboard for event management.

Responsibilities:

- Load all events
- Display events
- Create events
- Edit events
- Delete events
- View event details
- Logout

## `Login.jsx`

Handles admin authentication.

Flow:

```text
Admin Login
    ↓
POST /api/auth/login
    ↓
Backend validates credentials
    ↓
Token returned
    ↓
Token stored in localStorage
    ↓
Navigate to /admin
```

## `services/api.js`

Centralized API communication layer using Axios.

Typical functions include:

```text
getEvents()
getEvent()
createEvent()
updateEvent()
deleteEvent()
login()
```

This keeps HTTP request logic separate from UI components.

---

# 🔄 Complete Technical Flow

## Application Startup

```text
Browser
   ↓
index.html
   ↓
main.jsx
   ↓
App.jsx
   ↓
React Router
```

The router determines which page should be displayed.

---

# 🏠 Event Listing Flow

```text
Browser
   ↓
Home.jsx
   ↓
useEffect()
   ↓
fetchEvents()
   ↓
api.js
   ↓
Axios
   ↓
GET /api/events
   ↓
FastAPI
   ↓
events.py
   ↓
crud.py
   ↓
SQLAlchemy
   ↓
PostgreSQL
   ↓
Event data
   ↓
JSON response
   ↓
React state
   ↓
EventCard.jsx
   ↓
UI
```

---

# 🔎 Search Flow

When a user searches for an event:

```text
User enters "AI"
        ↓
React search state
        ↓
Home.jsx
        ↓
fetchEvents()
        ↓
api.js
        ↓
Axios
        ↓
GET /api/events?search=AI
        ↓
FastAPI
        ↓
events.py
        ↓
crud.py
        ↓
SQLAlchemy
        ↓
PostgreSQL
        ↓
Matching events
        ↓
JSON response
        ↓
setEvents()
        ↓
EventCard.jsx
        ↓
Updated UI
```

The backend can perform a case-insensitive search using PostgreSQL/SQLAlchemy.

---

# 🏷️ Category Filter Flow

Example:

```text
Category = Conference
```

Request:

```text
GET /api/events?category=Conference
```

Search and category filtering can also be combined:

```text
GET /api/events?search=AI&category=Conference
```

---

# 📄 Event Details Flow

```text
EventCard
    ↓
React Router
    ↓
/events/{id}
    ↓
EventDetails.jsx
    ↓
useParams()
    ↓
getEvent(id)
    ↓
api.js
    ↓
GET /api/events/{id}
    ↓
FastAPI
    ↓
CRUD
    ↓
SQLAlchemy
    ↓
PostgreSQL
    ↓
Event data
    ↓
EventDetails.jsx
    ↓
Event information displayed
```

---

# 🔐 Admin Login Flow

```text
/login
   ↓
Login.jsx
   ↓
User enters email/password
   ↓
login()
   ↓
api.js
   ↓
POST /api/auth/login
   ↓
FastAPI
   ↓
Credentials validated
   ↓
Authentication token
   ↓
localStorage
   ↓
/admin
```

---

# 🛡️ Protected Admin Route

```text
/admin
   ↓
ProtectedAdmin
   ↓
Check authentication token
   │
   ├── Token exists
   │       ↓
   │    Admin.jsx
   │
   └── No token
           ↓
        /login
```

---

# ➕ Create Event Flow

```text
Admin
   ↓
Add Event
   ↓
Admin.jsx
   ↓
Form state
   ↓
handleSubmit()
   ↓
createEvent()
   ↓
api.js
   ↓
POST /api/events
   ↓
FastAPI
   ↓
Pydantic validation
   ↓
CRUD
   ↓
SQLAlchemy
   ↓
PostgreSQL INSERT
   ↓
Created event
   ↓
Response
   ↓
Admin event list
```

---

# ✏️ Update Event Flow

```text
Admin clicks Edit
        ↓
handleEdit()
        ↓
Existing data loaded into form
        ↓
Admin modifies data
        ↓
handleSubmit()
        ↓
updateEvent()
        ↓
PUT /api/events/{id}
        ↓
FastAPI
        ↓
CRUD
        ↓
SQLAlchemy
        ↓
PostgreSQL UPDATE
        ↓
Updated event
```

---

# 🗑️ Delete Event Flow

```text
Admin clicks Delete
        ↓
Confirmation
        ↓
handleDelete()
        ↓
deleteEvent()
        ↓
DELETE /api/events/{id}
        ↓
FastAPI
        ↓
CRUD
        ↓
SQLAlchemy
        ↓
PostgreSQL DELETE
        ↓
Event list refreshed
```

---

# 🚪 Logout Flow

```text
Admin clicks Logout
        ↓
handleLogout()
        ↓
Remove evently_admin_token
        ↓
Remove evently_admin_email
        ↓
navigate("/login")
```

After logout:

```text
/admin
   ↓
ProtectedAdmin
   ↓
No token
   ↓
/login
```

---

# 🔌 REST API Endpoints

## Events

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/events` | Get all events |
| GET | `/api/events/{id}` | Get event by ID |
| POST | `/api/events` | Create event |
| PUT | `/api/events/{id}` | Update event |
| DELETE | `/api/events/{id}` | Delete event |

## Search

```text
GET /api/events?search=AI
```

## Category Filter

```text
GET /api/events?category=Conference
```

## Combined Search and Filter

```text
GET /api/events?search=AI&category=Conference
```

## Authentication

```text
POST /api/auth/login
```

---

# 📊 HTTP Status Codes

| Status Code | Meaning |
|---|---|
| 200 | Successful request |
| 201 | Resource created |
| 204 | Resource deleted |
| 400 | Bad request |
| 401 | Unauthorized |
| 404 | Resource not found |
| 422 | Validation error |
| 500 | Internal server error |

---

# 🗄️ Database

PostgreSQL is used as the main database.

The Event entity contains information such as:

```text
Event
├── id
├── name
├── description
├── category
├── start_date
├── end_date
├── venue
├── city
├── industry
├── organizer
├── website
├── image
└── status
```

SQLAlchemy acts as the ORM between FastAPI and PostgreSQL.

```text
Python
  ↓
SQLAlchemy
  ↓
PostgreSQL
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
DATABASE_URL=postgresql+psycopg://username:password@localhost:5432/evently

ADMIN_EMAIL=admin@evently.com
ADMIN_PASSWORD=admin123
ADMIN_TOKEN=evently-admin-token
```

Do not commit `.env` to GitHub.

Add this to `.gitignore`:

```text
.env
venv/
__pycache__/
node_modules/
```

---

# 💻 Installation

## Prerequisites

- Python
- Node.js
- npm
- PostgreSQL
- Git

## Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Configure the `.env` file.

Seed sample data:

```bash
python seed.py
```

Start FastAPI:

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://localhost:8000
```

---

# 📚 Swagger API Documentation

FastAPI automatically provides interactive API documentation.

Open:

```text
http://localhost:8000/docs
```

Swagger allows you to:

- View API endpoints
- Test GET requests
- Test POST requests
- Test PUT requests
- Test DELETE requests
- View request schemas
- View response schemas

---

# ⚛️ Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will provide a local URL such as:

```text
http://localhost:5173
```

or:

```text
http://localhost:5174
```

depending on the available port.

---

# 🧪 Testing

### User Side

Test:

- Event listing
- Search
- Category filtering
- Event details
- Back navigation
- Official website link
- Responsive layout

### Admin Side

Test:

- Login
- Protected admin route
- View events
- Create event
- Edit event
- Delete event
- Logout

### API

Test APIs using:

- Swagger UI
- Postman

Swagger:

```text
http://localhost:8000/docs
```

---

# 📱 Responsive Design

The application is designed for:

- Desktop
- Laptop
- Tablet
- Mobile

Responsive behavior includes:

- Navigation
- Event cards
- Search bar
- Filters
- Admin table
- Forms
- Event details
- Buttons

---

# 🎨 UI/UX

The application focuses on:

- Clean event discovery
- Consistent visual design
- Clear typography
- Reusable components
- Responsive layouts
- Event status badges
- Loading states
- Error states
- Empty states
- Clear admin actions

Admin actions include:

```text
View | Edit | Delete
```

---

# 🧠 Important React Concepts Used

## `useState`

Used to manage component state.

Examples:

```jsx
const [events, setEvents] = useState([]);
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);
```

## `useEffect`

Used for API calls when components load or dependencies change.

```jsx
useEffect(() => {
  fetchEvents();
}, [search, category]);
```

## `useParams`

Used to read dynamic URL parameters.

```jsx
const { id } = useParams();
```

## `useNavigate`

Used for programmatic navigation.

```jsx
navigate("/admin");
```

---

# 🌐 CORS

During development, the frontend and backend run on different ports.

Example:

```text
Frontend
http://localhost:5174

Backend
http://localhost:8000
```

FastAPI CORS configuration allows the frontend to communicate with the backend.

---

# 🔒 Security

The current authentication implementation is designed for the assessment/demo environment.

For production, the following improvements should be implemented:

- Password hashing
- JWT or OAuth authentication
- Server-side token validation
- Role-based authorization
- Secure cookies where appropriate
- HTTPS
- Proper secret management
- Rate limiting
- Input validation
- Database constraints
- Audit logging

Sensitive credentials must not be committed to GitHub.

---

# 🚀 Future Improvements

Potential improvements include:

- Real JWT authentication
- Role-based access control
- Password hashing
- Event registration
- Event bookmarking
- Event image uploads
- Pagination
- Advanced search
- Date filtering
- Location filtering
- Sorting
- Email notifications
- Event reminders
- Automated testing
- CI/CD
- Cloud deployment

---

# 🎯 Project Highlights

This project demonstrates practical experience with:

- Full-stack development
- React
- Vite
- Python
- FastAPI
- REST APIs
- PostgreSQL
- SQLAlchemy
- Pydantic
- Axios
- React Router
- CRUD operations
- Search
- Filtering
- Authentication
- Protected routes
- Responsive UI
- Reusable components
- API integration
- Database integration
- Git and GitHub

---

# 👩‍💻 Author

**Dhanyashree**

Full Stack / Python Developer

### Technologies

```text
Python
FastAPI
PostgreSQL
SQLAlchemy
React
Vite
JavaScript
Axios
Git
GitHub
```

---


