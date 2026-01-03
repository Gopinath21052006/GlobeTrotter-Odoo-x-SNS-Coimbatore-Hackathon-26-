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
            placeholder="Search city or activity..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button>Group</button>
          <button>Filter</button>
          <button>Sort</button>
        </div>

        <div className="results">
          {results.map(c => (
            <div key={c.name} className="search-card">
              <img src={`/cities/${c.image}`} />
              <div>
                <h3>{c.name}</h3>
                <p>{c.country}</p>
                <p>Activities: {c.activities.join(", ")}</p>
                <button>Add to Trip</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
