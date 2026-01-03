import { useState } from "react";
import { api } from "../api";

export default function ResetPassword({ token, setPage }) {
  const [password, setPassword] = useState("");

  const reset = async () => {
    await api.post("/reset-password", null, {
      params: { token, new_password: password }
    });
    alert("Password updated");
    setPage("login");
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input type="password" placeholder="New password" onChange={e => setPassword(e.target.value)} />
      <button onClick={reset}>Update Password</button>
    </div>
  );
}
