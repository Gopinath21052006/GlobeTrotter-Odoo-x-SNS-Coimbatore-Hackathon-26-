import { useEffect, useState } from "react";
import { api } from "../api";

export default function Profile({ user, setPage }) {
  const [name, setName] = useState("");

  useEffect(() => {
    api.get(`/user/${user.user_id}`).then(res => setName(res.data.name));
  }, []);

  const save = async () => {
    await api.put(`/user/${user.user_id}`, null, { params: { name } });
    alert("Profile updated");
  };

  const del = async () => {
    await api.delete(`/user/${user.user_id}`);
    alert("Account deleted");
    window.location.reload();
  };

  return (
    <div>
      <h2>Profile</h2>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={save}>Save</button>
      <button onClick={del}>Delete Account</button>
      <button onClick={() => setPage("dashboard")}>Back</button>
    </div>
  );
}
