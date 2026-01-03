import { useEffect, useState } from "react";
import { api } from "../api";

export default function Admin() {
  const [stats, setStats] = useState({});
  const [pop, setPop] = useState({});

  useEffect(() => {
    api.get("/admin/stats").then(r => setStats(r.data));
    api.get("/admin/popular").then(r => setPop(r.data));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Users: {stats.users}</p>
      <p>Trips: {stats.trips}</p>
      <p>Cities: {stats.cities}</p>
      <p>Activities: {stats.activities}</p>

      <h3>Popular Cities</h3>
      {pop.cities?.map((c, i) => <div key={i}>{c[0]} – {c[1]}</div>)}

      <h3>Popular Activities</h3>
      {pop.activities?.map((a, i) => <div key={i}>{a[0]} – {a[1]}</div>)}
    </div>
  );
}
