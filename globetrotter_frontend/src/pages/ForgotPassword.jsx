import { useState } from "react";
import { api } from "../api";

export default function ForgotPassword({ setPage }) {
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");

  const send = async () => {
    const res = await api.post("/forgot-password", null, { params: { email } });
    setLink(res.data.reset_link);
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <button onClick={send}>Send Reset Link</button>

      {link && (
        <div>
          <p>Reset Link (Hackathon Mode):</p>
          <a href={link}>{link}</a>
        </div>
      )}

      <button onClick={() => setPage("login")}>Back</button>
    </div>
  );
}
