import { useState } from "react";
import { api } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reset = async () => {
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/reset-password", null, {
        params: { token, new_password: password }
      });
      navigate("/login");
    } catch {
      setError("Invalid or expired reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-screen">
      <div className="app-card reset-card">

        <div className="avatar">🔐</div>
        <h2 className="page-title">Reset Password</h2>

        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

        <input
          className="input-box"
          type="password"
          placeholder="New password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="input-box"
          type="password"
          placeholder="Confirm password"
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button className="btn-primary" onClick={reset} disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>

      </div>
    </div>
  );
}
