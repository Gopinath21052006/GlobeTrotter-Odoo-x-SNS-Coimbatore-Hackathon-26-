import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", null, {
        params: { email, password }
      });
      setUser(res.data);
      navigate("/dashboard");
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="center-screen">
      <div className="login-wrapper">

        {/* LEFT */}
        <div className="login-left">
          <img src="https://cdn-icons-png.flaticon.com/512/201/201623.png" alt="travel" />
          <h2 className="page-title">Travel The World With Us</h2>
          <p>Plan trips, explore cities, manage budgets and create memories with GlobeTrotter.</p>
          <button className="btn-primary" style={{ width: "200px", marginTop: "20px" }}>
            Let’s Go!
          </button>
        </div>

        {/* RIGHT */}
        <div className="login-right">
          <h2>Login To Your Account</h2>

          <form onSubmit={handleLogin}>
            <input
              className="input-box"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="input-box"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div style={{ textAlign: "right", marginBottom: "10px" }}>
              <Link className="link" to="/forgot">Forgot Password?</Link>
            </div>

            <button className="btn-primary">Login</button>
          </form>

          <div className="login-footer">
            Don’t have an account?{" "}
            <Link className="link" to="/signup">Sign Up</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
