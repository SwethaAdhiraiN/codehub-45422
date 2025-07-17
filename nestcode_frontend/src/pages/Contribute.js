import React, { useState } from "react";
import { apiUrl } from "../api";

/**
 * PUBLIC_INTERFACE
 * Form to contribute a new code module to NestCode.
 */
export default function Contribute() {
  const [form, setForm] = useState({
    name: "", language: "", framework: "", category: "",
    description: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setStatus("Submitting...");
    // Call backend to contribute a new module
    fetch(apiUrl("/modules/"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken")
      },
      body: JSON.stringify(form)
    })
      .then(r => r.ok ? r.json() : Promise.reject("Failed"))
      .then(() => setStatus("Module submitted!"))
      .catch(() => setStatus("Failed to submit module"));
  };

  return (
    <section>
      <h2>Contribute a New Code Module</h2>
      <form className="contrib-form" onSubmit={handleSubmit}>
        <input name="name" value={form.name}
          onChange={handleChange} placeholder="Module Name" required />
        <input name="language" value={form.language}
          onChange={handleChange} placeholder="Language" required />
        <input name="framework" value={form.framework}
          onChange={handleChange} placeholder="Framework" />
        <input name="category" value={form.category}
          onChange={handleChange} placeholder="Category" />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required rows={4}
        />
        <button type="submit">Submit</button>
        {status && <span className="form-status">{status}</span>}
      </form>
    </section>
  );
}
