import { useNavigate } from "react-router-dom";

export default function Header({ user }) {
  const navigate = useNavigate();

  return (
    <div className="app-header">
      <div className="logo">GlobeTrotter</div>

      <div className="profile-circle" onClick={() => navigate("/profile")}>
        {user?.name?.charAt(0).toUpperCase()}
      </div>
    </div>
  );
}
