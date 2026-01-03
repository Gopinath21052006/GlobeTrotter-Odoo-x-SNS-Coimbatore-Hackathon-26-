import { useEffect, useState } from "react";
import { api } from "../api";
import Header from "../components/Header";

export default function Community({ user }) {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    api.get("/community")
      .then(res => setPosts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const submit = async () => {
    if (!text || !city) return alert("Please enter both city and experience.");

    try {
      setPosting(true);
      await api.post("/community", null, {
        params: {
          user_id: user.user_id,
          username: user.name,
          content: text,
          city
        }
      });
      const res = await api.get("/community");
      setPosts(res.data);
      setText("");
      setCity("");
    } finally {
      setPosting(false);
    }
  };

  return (
    <>
      <Header user={user} />

      <div className="page-container">
        <h2 className="page-title">🌍 Community</h2>

        {/* CREATE POST */}
        <div className="post-box app-card">
          <input
            placeholder="City you visited"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <textarea
            placeholder="Share your travel experience..."
            value={text}
            maxLength={250}
            onChange={e => setText(e.target.value)}
          />
          <small style={{ color: "#777" }}>{text.length}/250</small>

          <button className="btn-primary" onClick={submit} disabled={posting}>
            {posting ? "Posting..." : "Share"}
          </button>
        </div>

        {/* POSTS */}
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <div className="app-card" style={{ textAlign: "center" }}>
            <p>No posts yet. Be the first to share!</p>
          </div>
        ) : (
          posts.map(p => (
            <div key={p.id} className="post-card">
              <h4>{p.username} — 📍 {p.city}</h4>
              <p>{p.content}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
