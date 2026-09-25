import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8000";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("evently_admin_token", response.data.access_token);

      localStorage.setItem("evently_admin_email", email);

      navigate("/admin");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("Unable to connect to the server. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="login-glow login-glow-one"></div>
        <div className="login-glow login-glow-two"></div>
      </div>

      <div className="login-container">
        <div className="login-brand">
          EVENTLY<span>.</span>
        </div>

        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">🔐</div>

            <p className="login-eyebrow">ADMIN PORTAL</p>

            <h1>Welcome back</h1>

            <p>Sign in to manage your events and keep everything organized.</p>
          </div>

          {error && (
            <div className="login-error">
              <span>⚠</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                type="email"
                placeholder="admin@evently.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (
                <>
                  <span className="login-spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          <button className="back-to-events" onClick={() => navigate("/")}>
            ← Back to events
          </button>
        </div>

        <p className="login-footer">EVENTLY • Event Discovery Platform</p>
      </div>
    </div>
  );
}

export default Login;
