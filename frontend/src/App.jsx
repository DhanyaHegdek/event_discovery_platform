import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

import "./App.css";

function ProtectedAdmin() {
  const token = localStorage.getItem("evently_admin_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Admin />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />

        <Route path="/events/:id" element={<EventDetails />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />

        {/* Protected admin */}
        <Route path="/admin" element={<ProtectedAdmin />} />

        {/* Unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
