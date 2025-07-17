import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Personalized user dashboard: contributions, favorites, stats.
 */
export default function Dashboard() {
  const { user } = useAuth();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user modules (will need endpoint from backend)
    const token = localStorage.getItem("authToken");
    fetch("/api/user/modules/", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(r => r.json())
      .then(setModules).finally(() => setLoading(false));
  }, []);

  return (
    <section className="dashboard">
      <h2>Welcome, {user ? user.email : "User"}!</h2>
      <h3>Your Contributions</h3>
      {loading
        ? <div>Loading...</div>
        : (!modules.length
            ? <p>You haven't contributed any modules yet. <a href="/contribute">Contribute now</a>.</p>
            : <ul>
                {modules.map(m =>
                  <li key={m.id}>
                    <a href={`/module/${m.id}`}>{m.name}</a>{" "}
                    <small>({m.language}, {m.framework})</small>
                  </li>
                )}
              </ul>
          )
      }
      {/* Add favorites/analytics widgets here */}
    </section>
  );
}
