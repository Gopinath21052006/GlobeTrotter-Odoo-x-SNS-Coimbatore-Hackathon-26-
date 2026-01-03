import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import Header from "../components/Header";

export default function Itinerary({ user }) {
  const { tripId } = useParams();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    api.get(`/itinerary/${tripId}`).then(res => {
      setSections(res.data);
    });
  }, [tripId]);

  const addSection = async () => {
    const city = prompt("Enter city");
    if (!city) return;

    await api.post("/stops", null, {
      params: {
        trip_id: tripId,
        city,
        start_date: "2025-01-01",
        end_date: "2025-01-02"
      }
    });

    const res = await api.get(`/itinerary/${tripId}`);
    setSections(res.data);
  };

  return (
    <>
      <Header user={user} />

      <div className="page-container">
        <h2 className="page-title">Build Itinerary</h2>

        {sections.map((s, index) => (
          <div key={s.id} className="itinerary-section">
            <h3>Section {index + 1}: {s.city}</h3>

            <p>
              Travel, stay and activities planned for {s.city}
            </p>

            <div className="section-row">
              <div className="date-box">
                Date Range: {s.start_date} → {s.end_date}
              </div>

              <div className="budget-box">
                Budget: ₹{s.budget}
              </div>
            </div>
          </div>
        ))}

        <button className="btn-primary" onClick={addSection}>
          + Add another Section
        </button>
      </div>
    </>
  );
}
