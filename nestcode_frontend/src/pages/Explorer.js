import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

/**
 * PUBLIC_INTERFACE
 * Explorer page: search, browse, filter code modules.
 */
export default function Explorer() {
  const [modules, setModules] = useState([]);
  const [filters, setFilters] = useState({ language: "", framework: "", category: "" });
  const [loading, setLoading] = useState(true);
  const query = useQuery();

  useEffect(() => {
    setLoading(true);
    let url = "/api/modules/?";
    if (query.get("q")) url += `q=${encodeURIComponent(query.get("q"))}&`;
    if (filters.language) url += `language=${encodeURIComponent(filters.language)}&`;
    if (filters.framework) url += `framework=${encodeURIComponent(filters.framework)}&`;
    if (filters.category) url += `category=${encodeURIComponent(filters.category)}&`;
    fetch(url)
      .then(r => r.json())
      .then(setModules)
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [query, filters]);

  // Simplified form controls
  return (
    <section className="explorer">
      <h2>Explore Code Nests</h2>
      <div className="explorer-filters">
        <input placeholder="Language" value={filters.language}
          onChange={e => setFilters(f => ({ ...f, language: e.target.value }))} />
        <input placeholder="Framework" value={filters.framework}
          onChange={e => setFilters(f => ({ ...f, framework: e.target.value }))} />
        <input placeholder="Category" value={filters.category}
          onChange={e => setFilters(f => ({ ...f, category: e.target.value }))} />
      </div>
      {loading
        ? <div>Loading...</div>
        : (!modules.length
            ? <p>No results found.</p>
            : <ul className="explorer-list">
                {modules.map(m =>
                  <li key={m.id}>
                    <Link to={`/module/${m.id}`}>{m.name}</Link>
                    <span className="explorer-meta">{m.language} / {m.framework} / {m.category}</span>
                  </li>
                )}
              </ul>
          )
      }
    </section>
  );
}
