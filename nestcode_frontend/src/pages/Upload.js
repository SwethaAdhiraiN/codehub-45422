import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Upload form for code files/snippets for a code module.
 */
export default function Upload() {
  const [form, setForm] = useState({ file: null, notes: "" });
  const [status, setStatus] = useState("");

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({
      ...f,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.file) return setStatus("Please select a file");
    setStatus("Uploading...");
    const data = new FormData();
    data.append("file", form.file);
    data.append("notes", form.notes || "");
    fetch("/api/uploads/", {
      method: "POST",
      headers: { Authorization: "Bearer " + localStorage.getItem("authToken") },
      body: data
    })
      .then(r => r.ok ? r.json() : Promise.reject("Failed"))
      .then(() => setStatus("File uploaded!"))
      .catch(() => setStatus("Upload failed"));
  };

  return (
    <section>
      <h2>Upload Code File or Snippet</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <input type="file" name="file" accept=".zip,.py,.js,.txt"
          onChange={handleChange} required />
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Optional notes..."
          rows={2}
        />
        <button type="submit">Upload</button>
        {status && <span className="form-status">{status}</span>}
      </form>
    </section>
  );
}
