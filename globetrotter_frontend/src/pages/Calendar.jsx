import { useEffect, useState } from "react";
import { api } from "../api";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function Calendar({ user }) {
  const navigate = useNavigate();
  const [month, setMonth] = useState(new Date());
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    api.get(`/trips/${user.user_id}`)
      .then(res => setTrips(res.data))
      .finally(() => setLoading(false));
  }, [user]);

  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0
  ).getDate();

  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();

  const prevMonth = () =>
    setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1));
  const nextMonth = () =>
    setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1));

  const today = new Date();

  const getTripsForDay = (day) => {
    const date = `${month.getFullYear()}-${String(month.getMonth()+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return trips.filter(t => date >= t.start_date && date <= t.end_date);
  };

  if (loading) {
    return <div className="center-screen">Loading calendar…</div>;
  }

  return (
    <>
      <Header user={user} />

      <div className="calendar-page">

        <div className="calendar-header">
          <button onClick={prevMonth}>◀</button>
          <h2>
            {month.toLocaleString("default", { month: "long", year: "numeric" })}
          </h2>
          <button onClick={nextMonth}>▶</button>
        </div>

        <div className="calendar-grid">

          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
            <div key={d} className="calendar-day-name">{d}</div>
          ))}

          {/* Empty spaces before first day */}
          {[...Array(firstDay)].map((_, i) => (
            <div key={"empty" + i}></div>
          ))}

          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const dayTrips = getTripsForDay(day);
            const isToday =
              today.getDate() === day &&
              today.getMonth() === month.getMonth() &&
              today.getFullYear() === month.getFullYear();

            return (
              <div key={day} className={`calendar-cell ${isToday ? "today" : ""}`}>
                <span className="day-number">{day}</span>

                {dayTrips.length === 0 && (
                  <small style={{ color: "#aaa" }}>No trips</small>
                )}

                {dayTrips.map(t => (
                  <div
                    key={t.id}
                    className="calendar-event"
                    onClick={() => navigate(`/trip/${t.id}`)}
                  >
                    {t.name}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
