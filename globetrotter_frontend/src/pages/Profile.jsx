import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Profile({ user }) {
  const [profile, setProfile] = useState({});
  const [trips, setTrips] = useState({ upcoming: [], previous: [] });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    api.get(`/profile/${user.user_id}`).then(res => setProfile(res.data));
    api.get(`/user-trips/${user.user_id}`).then(res => setTrips(res.data));
  }, []);

  return (
    <>
      <Header user={user} />

      <div className="page-container">

        <div className="profile-header">
          <div className="profile-avatar">
            {profile.name?.charAt(0)}
          </div>

          <div className="profile-info">
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
            <p>{profile.city}, {profile.country}</p>
            <p>{profile.bio}</p>
          </div>
        </div>

        <h3 className="section-title">Preplanned Trips</h3>
        <div className="trip-grid">
          {trips.upcoming.map(t => (
            <div key={t.id} className="trip-card">
              <h4>{t.name}</h4>
              <button onClick={() => navigate(`/trip/${t.id}`)}>View</button>
            </div>
          ))}
        </div>

        <h3 className="section-title">Previous Trips</h3>
        <div className="trip-grid">
          {trips.previous.map(t => (
            <div key={t.id} className="trip-card">
              <h4>{t.name}</h4>
              <button onClick={() => navigate(`/trip/${t.id}`)}>View</button>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
