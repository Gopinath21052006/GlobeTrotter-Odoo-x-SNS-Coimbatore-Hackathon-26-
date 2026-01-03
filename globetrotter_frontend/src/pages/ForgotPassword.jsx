import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetLink, setResetLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const send = async () => {
    setMessage("");

    if (!email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/forgot-password", null, {
        params: { email }
      });
      setResetLink(res.data.reset_link);
      setMessage("Reset link sent! Check your email.");
    } catch {
      setMessage("Error sending reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-screen">
      <div className="app-card reset-card">

        <div className="avatar">🔑</div>
        <h2 className="page-title">Forgot Password</h2>
        <p style={{ color: "#666", marginBottom: "15px" }}>
          Enter your email and we’ll send you a reset link.
        </p>

        {message && (
          <div style={{ marginBottom: "12px", color: message.includes("sent") ? "green" : "red" }}>
            {message}
          </div>
        )}

        <input
          className="input-box"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn-primary" onClick={send} disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {resetLink && (
          <div style={{ marginTop: "15px", fontSize: "13px" }}>
            <p>Hackathon Mode Reset Link:</p>
            <a href={resetLink}>{resetLink}</a>
          </div>
        )}

        <div
          className="login-footer link"
          style={{ marginTop: "20px" }}
          onClick={() => navigate("/login")}
        >
          Back to Login
        </div>

      </div>
    </div>
  );
}
