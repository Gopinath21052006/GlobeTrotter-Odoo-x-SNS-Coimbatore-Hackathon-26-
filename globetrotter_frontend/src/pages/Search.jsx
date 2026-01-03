import { useState } from "react";
import { cities } from "../data/cities";
import Header from "../components/Header";

export default function Search() {
  const [query, setQuery] = useState("");

  const results = cities.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.activities.some(a => a.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <>
      <Header />

      <div className="page-container">

        <div className="search-bar">
          <input
            placeholder="Search cities or activities (e.g. Paris, hiking)"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <p style={{ marginBottom: "15px", color: "#666" }}>
          {query
            ? `Showing ${results.length} results for "${query}"`
            : "Start typing to explore destinations and activities"}
        </p>

        {results.length === 0 ? (
          <div className="empty-state">
            😕 No places found. Try a different search.
          </div>
        ) : (
          <div className="results-grid">
            {results.map(c => (
              <div key={c.name} className="search-card">
                <img src={`/cities/${c.image}`} alt={c.name} />
                <div className="search-content">
                  <h3>{c.name}</h3>
                  <p>{c.country}</p>
                  <p className="activities">
                    {c.activities.join(" • ")}
                  </p>
                  <button className="btn-dark">Add to Trip</button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}
