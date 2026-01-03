import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/login", null, {
        params: { email, password }
      });

      setUser(res.data);

      if (remember) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }

      navigate("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-screen">
      <div className="login-wrapper">

        {/* LEFT */}
        <div className="login-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/201/201623.png"
            alt="travel"
          />
          <h2 className="page-title">Travel smarter with GlobeTrotter</h2>
          <p>
            Discover cities, plan trips, track budgets and share memories.
          </p>
        </div>

        {/* RIGHT */}
        <div className="login-right">
          <h2>Welcome back 👋</h2>

          {error && (
            <div style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <input
              className="input-box"
              type="email"
              placeholder="Email address"
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

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <label style={{ fontSize: "14px" }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />{" "}
                Remember me
              </label>

              <Link className="link" to="/forgot">
                Forgot password?
              </Link>
            </div>

            <button className="btn-primary" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="login-footer">
            New to GlobeTrotter?{" "}
            <Link className="link" to="/signup">
              Create an account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
