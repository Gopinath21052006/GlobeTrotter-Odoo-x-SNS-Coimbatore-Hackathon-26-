import { useState } from "react";
import { api } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    country: "",
    bio: ""
  });

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    try {
      await api.post("/signup", null, { params: form });
      alert("Account created");
      navigate("/login");
    } catch {
      alert("Email already exists");
    }
  };

  return (
    <div className="center-screen">
      <div className="app-card signup-card">

        <div className="avatar">📸</div>
        <h2 className="page-title" style={{ textAlign: "center" }}>
          Create Account
        </h2>

        <div className="signup-grid">
          <input className="input-box" name="first_name" placeholder="First Name" onChange={handle} />
          <input className="input-box" name="last_name" placeholder="Last Name" onChange={handle} />
        </div>

        <div className="signup-grid">
          <input className="input-box" name="email" placeholder="Email" onChange={handle} />
          <input className="input-box" name="phone" placeholder="Phone" onChange={handle} />
        </div>

        <div className="signup-grid">
          <input className="input-box" name="city" placeholder="City" onChange={handle} />
          <input className="input-box" name="country" placeholder="Country" onChange={handle} />
        </div>

        <input
          className="input-box"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handle}
        />

        <textarea
          className="input-box"
          name="bio"
          placeholder="Additional Information..."
          onChange={handle}
          style={{ height: "90px" }}
        />

        <button className="btn-primary" onClick={register}>
          Register
        </button>

        <div className="login-footer">
          Already have an account?{" "}
          <Link className="link" to="/login">Login</Link>
        </div>

      </div>
    </div>
  );
}
