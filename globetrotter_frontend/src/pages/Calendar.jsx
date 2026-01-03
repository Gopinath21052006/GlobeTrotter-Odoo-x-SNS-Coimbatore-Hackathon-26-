import { useEffect, useState } from "react";
import { api } from "../api";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function Calendar({ user }) {
  const navigate = useNavigate();
  const [month, setMonth] = useState(new Date());
  const [trips, setTrips] = useState([]);

  // protect route
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    api.get(`/trips/${user.user_id}`).then(res => {
      setTrips(res.data);
    });
  }, [user]);

  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0
  ).getDate();

  const prevMonth = () =>
    setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1));
  const nextMonth = () =>
    setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1));

  const getTripsForDay = (day) => {
    const date = `${month.getFullYear()}-${String(month.getMonth()+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return trips.filter(t => date >= t.start_date && date <= t.end_date);
  };

  return (
    <>
      <Header user={user} />

      <div className="calendar-page">

        <div className="calendar-header">
          <button onClick={prevMonth}>◀</button>
          <h2>
            {month.toLocaleString("default", { month: "long" })}{" "}
            {month.getFullYear()}
          </h2>
          <button onClick={nextMonth}>▶</button>
        </div>

        <div className="calendar-grid">

          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
            <div key={d} className="calendar-day-name">{d}</div>
          ))}

          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const dayTrips = getTripsForDay(day);

            return (
              <div key={day} className="calendar-cell">
                <span className="day-number">{day}</span>

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
