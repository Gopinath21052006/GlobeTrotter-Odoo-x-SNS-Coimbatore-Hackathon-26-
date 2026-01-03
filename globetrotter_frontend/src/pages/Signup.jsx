import { useState } from "react";
import { api } from "../api";

export default function Signup({ setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      await api.post("/signup", null, {
        params: { name, email, password }
      });
      alert("Account created!");
      setPage("login");
    } catch {
      alert("Email already exists");
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={signup}>Signup</button>
    </div>
  );
}
