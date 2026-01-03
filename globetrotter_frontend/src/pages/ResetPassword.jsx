import { useState } from "react";
import { api } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const reset = async () => {
    try {
      await api.post("/reset-password", null, {
        params: { token, new_password: password }
      });
      alert("Password updated successfully");
      navigate("/login");
    } catch {
      alert("Invalid or expired token");
    }
  };

  return (
    <div className="login-container">
      <div className="avatar">🔐</div>
      <h2>Reset Password</h2>

      <input
        className="input-box"
        type="password"
        placeholder="Enter new password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-btn" onClick={reset}>
        Update Password
      </button>
    </div>
  );
}
