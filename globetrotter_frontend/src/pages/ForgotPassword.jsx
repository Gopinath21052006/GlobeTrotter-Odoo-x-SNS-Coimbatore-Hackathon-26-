import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetLink, setResetLink] = useState("");
  const navigate = useNavigate();

  const send = async () => {
    try {
      const res = await api.post("/forgot-password", null, {
        params: { email }
      });
      setResetLink(res.data.reset_link);
    } catch {
      alert("Error sending reset link");
    }
  };

  return (
    <div className="login-container">
      <div className="avatar">🔑</div>
      <h2>Forgot Password</h2>

      <input
        className="input-box"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="login-btn" onClick={send}>
        Send Reset Link
      </button>

      {resetLink && (
        <div style={{ marginTop: "15px" }}>
          <p>Reset Link (Hackathon Mode)</p>
          <a href={resetLink}>{resetLink}</a>
        </div>
      )}

      <div className="forgot" onClick={() => navigate("/login")}>
        Back to Login
      </div>
    </div>
  );
}
