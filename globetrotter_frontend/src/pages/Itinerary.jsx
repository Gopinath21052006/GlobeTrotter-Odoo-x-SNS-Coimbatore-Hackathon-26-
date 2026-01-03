import { useEffect, useState } from "react";
import { api } from "../api";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

export default function Itinerary() {
  const { tripId } = useParams();
  const [data, setData] = useState({ days: {}, totals: {} });

  useEffect(() => {
    api.get(`/itinerary/${tripId}`).then(res => setData(res.data));
  }, []);

  return (
    <>
      <Header />

      <div className="page-container">
        <h2 className="page-title">Trip Itinerary</h2>

        {Object.keys(data.days).map((day, i) => (
          <div key={day} className="day-card">

            <h3>Day {i + 1} — {day}</h3>

            {data.days[day].map((a, idx) => (
              <div key={idx} className="activity-row">
                <span>{a.activity} ({a.city})</span>
                <span>₹{a.cost}</span>
              </div>
            ))}

            <div className="day-total">
              Total: ₹{data.totals[day]}
            </div>

          </div>
        ))}
      </div>
    </>
  );
}
