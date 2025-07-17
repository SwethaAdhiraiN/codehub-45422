import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Sign-in page with OAuth and email/password support.
 */
export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { signin, oauth } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    const ok = await signin(form.email, form.password);
    if (ok) navigate("/dashboard");
    else setError("Invalid email or password");
  }

  return (
    <section className="auth-page">
      <h2>Sign In</h2>
      <form onSubmit={handleLogin}>
        <input name="email" type="email" autoFocus autoComplete="username"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          placeholder="Email" required />
        <input name="password" type="password" autoComplete="current-password"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          placeholder="Password" required />
        <button type="submit">Sign In</button>
        {error && <div className="auth-error">{error}</div>}
      </form>
      <div className="oauth-row">
        <span>or</span>
        <button onClick={() => oauth("google")}>Continue with Google</button>
        <button onClick={() => oauth("github")}>GitHub</button>
      </div>
      <div>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </section>
  );
}
