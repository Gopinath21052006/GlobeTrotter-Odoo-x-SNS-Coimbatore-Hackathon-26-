import axios from "axios";
import { useState } from "react";
import { api } from "../api";


export default function Login({ setUser, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
  try {
    const res = await api.post("/login", null, {
      params: { email, password }
    });
    console.log("LOGIN RESPONSE:", res.data);   // <--- add this
    setUser(res.data);
    setPage("dashboard");
  } catch {
    alert("Invalid login");
  }
};



  return (
    <div>
      <h2>GlobeTrotter Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <button onClick={() => setPage("signup")}>Create Account</button>
      <p onClick={() => setPage("forgot")} style={{cursor:"pointer", color:"blue"}}>
  Forgot Password?
</p>

    </div>
  );
}
