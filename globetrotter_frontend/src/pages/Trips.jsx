import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Trips({ user }) {
  const [data, setData] = useState({ ongoing: [], upcoming: [], completed: [] });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    api.get(`/trip-list/${user.user_id}`).then(res => setData(res.data));
  }, []);

  const Card = ({ trip }) => (
    <div className="trip-list-card">
      <h4>{trip.name}</h4>
      <p>{trip.city}</p>
      <p>{trip.start_date} → {trip.end_date}</p>
      <button onClick={() => navigate(`/trip/${trip.id}`)}>View</button>
    </div>
  );

  return (
    <>
      <Header user={user} />

      <div className="page-container">

        <div className="search-bar">
          <input placeholder="Search trips..." />
          <button>Group</button>
          <button>Filter</button>
          <button>Sort</button>
        </div>

        <h3>Ongoing</h3>
        {data.ongoing.map(t => <Card key={t.id} trip={t} />)}

        <h3>Upcoming</h3>
        {data.upcoming.map(t => <Card key={t.id} trip={t} />)}

        <h3>Completed</h3>
        {data.completed.map(t => <Card key={t.id} trip={t} />)}

      </div>
    </>
  );
}
