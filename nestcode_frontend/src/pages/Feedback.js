import React, { useState } from "react";
import { apiUrl } from "../api";

/**
 * PUBLIC_INTERFACE
 * Page for submitting feedback & rating on code modules.
 */
export default function Feedback() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const moduleId = params.get("module");

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    setStatus("Sending...");
    // The backend expects "nest" (not "module"), and "rating" should be sent as "score" per OpenAPI.
    fetch(apiUrl("/feedback/"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken")
      },
      body: JSON.stringify({
        nest: moduleId,
        message: comment,
        score: rating
      })
    })
      .then(r => r.ok ? r.json() : Promise.reject("Failed"))
      .then(() => setStatus("Thanks for your feedback!"))
      .catch(() => setStatus("Failed to send feedback"));
  };

  return (
    <section>
      <h2>Rate & Leave Feedback</h2>
      {moduleId && <div>
        <span>For module <code>{moduleId}</code></span>
      </div>}
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div>
          <label>Rating: </label>
          {[1,2,3,4,5].map(n =>
            <span key={n}
              className={n <= rating ? "star selected" : "star"}
              onClick={() => setRating(n)}
              style={{ fontSize: "1.6em", cursor: "pointer" }}
            >★</span>
          )}
        </div>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Leave a comment..."
          required
          rows={4}
        />
        <button type="submit">Submit Feedback</button>
        {status && <span className="form-status">{status}</span>}
      </form>
    </section>
  );
}
