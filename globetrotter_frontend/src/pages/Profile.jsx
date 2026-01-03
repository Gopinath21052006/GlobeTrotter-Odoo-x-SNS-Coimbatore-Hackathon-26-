import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Profile({ user }) {
  const [profile, setProfile] = useState(null);
  const [trips, setTrips] = useState({ upcoming: [], previous: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    Promise.all([
      api.get(`/profile/${user.user_id}`),
      api.get(`/user-trips/${user.user_id}`)
    ]).then(([profileRes, tripsRes]) => {
      setProfile(profileRes.data);
      setTrips(tripsRes.data);
      setLoading(false);
    });
  }, [user]);

  if (loading) {
    return <div className="center-screen">Loading profile…</div>;
  }

  return (
    <>
      <Header user={user} />

      <div className="page-container">

        <div className="profile-header">
          <div className="profile-avatar">
            {profile.name?.charAt(0).toUpperCase()}
          </div>

          <div className="profile-info">
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
            <p>{profile.city}, {profile.country}</p>
            <p>{profile.bio || "No bio added yet."}</p>
          </div>
        </div>

        <h3 className="section-title">🧭 Upcoming Trips</h3>
        <div className="trip-grid">
          {trips.upcoming.length === 0 ? (
            <p style={{ color: "#777" }}>No upcoming trips.</p>
          ) : (
            trips.upcoming.map(t => (
              <div key={t.id} className="trip-card">
                <h4>{t.name}</h4>
                <button className="btn-dark" onClick={() => navigate(`/trip/${t.id}`)}>
                  Open Trip
                </button>
              </div>
            ))
          )}
        </div>

        <h3 className="section-title">📜 Past Trips</h3>
        <div className="trip-grid">
          {trips.previous.length === 0 ? (
            <p style={{ color: "#777" }}>No previous trips.</p>
          ) : (
            trips.previous.map(t => (
              <div key={t.id} className="trip-card">
                <h4>{t.name}</h4>
                <button className="btn-dark" onClick={() => navigate(`/trip/${t.id}`)}>
                  View
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
}
