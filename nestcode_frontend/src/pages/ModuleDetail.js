import React, { useState, useEffect } from "react";
import { useParams, Link, Routes, Route, useNavigate } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Detail & version page for a code module.
 */
export default function ModuleDetail() {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/modules/${moduleId}/`)
      .then(r => r.json())
      .then(data => {
        setModule(data);
        setVersions(data.versions || []);
        setSelectedVersion(data.versions?.[0] || null);
      })
      .finally(() => setLoading(false));
  }, [moduleId]);

  if (loading) return <div>Loading...</div>;
  if (!module) return <div>Not found.</div>;

  return (
    <section className="module-detail">
      <h2>{module.name}</h2>
      <span className="module-meta">{module.language} | {module.framework} | {module.category}</span>
      <p>{module.description}</p>
      <div className="module-rating">
        Rating: {"★".repeat(module.rating || 0)}{"☆".repeat(5 - (module.rating || 0))}
      </div>
      <div className="module-actions">
        <button onClick={() => navigator.clipboard.writeText(module.install_snippet || "")}>
          Copy Installation
        </button>
        <Link to="contribute">Submit update</Link>
      </div>
      <div className="module-versions">
        <h3>Versions</h3>
        {versions.map((ver, i) =>
          <button key={ver.id}
            onClick={() => setSelectedVersion(ver)}
            className={selectedVersion === ver ? "active" : ""}>
            {ver.name || `v${ver.version}`}
          </button>)
        }
      </div>
      {selectedVersion && (
        <div className="module-version-detail">
          <pre className="module-code-block">{selectedVersion.code_snippet || "No code preview"}</pre>
          <div className="module-version-info">
            Uploaded: {new Date(selectedVersion.created_at).toLocaleDateString()}
            {selectedVersion.release_notes && <p>Release notes: {selectedVersion.release_notes}</p>}
          </div>
        </div>
      )}
      <div className="module-feedback-link">
        <Link to={`/feedback?module=${moduleId}`}>Leave Feedback</Link>
      </div>

      {/* Nested route for contributing */}
      <Routes>
        <Route path="contribute" element={<ModuleContribute moduleId={module.id} />} />
      </Routes>
    </section>
  );
}

// Minimal version of a contribute form for a given module
function ModuleContribute({ moduleId }) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  // Only for illustrative of the contribution process for a module (suggest update or upload new version)
  return (
    <form className="module-contrib-form"
      onSubmit={e => {
        e.preventDefault();
        setStatus("Submitting...");
        setTimeout(() => setStatus("Submitted (example only - connect API)"), 1000);
      }}>
      <h4>Suggest Update / Contribute to Module</h4>
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        required
        placeholder="Describe your update or attach a snippet..."
        rows={5}
        style={{ width: "100%" }}
      />
      <button type="submit">Submit</button>
      {status && <span className="contrib-status">{status}</span>}
    </form>
  );
}
