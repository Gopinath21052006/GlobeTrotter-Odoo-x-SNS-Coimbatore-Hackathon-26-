import { useEffect, useState } from "react";
import { api } from "../api";
import Header from "../components/Header";

export default function Community({ user }) {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    api.get("/community").then(res => setPosts(res.data));
  }, []);

  const submit = async () => {
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
  };

  return (
    <>
      <Header user={user} />

      <div className="page-container">
        <h2>Community</h2>

        <div className="post-box">
          <input placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
          <textarea placeholder="Share your experience..." value={text} onChange={e => setText(e.target.value)} />
          <button onClick={submit}>Post</button>
        </div>

        {posts.map(p => (
          <div key={p.id} className="post-card">
            <h4>{p.username} — {p.city}</h4>
            <p>{p.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}
