import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Sign-up page for account creation.
 */
export default function SignUp() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();
    setError("");
    const ok = await signup(form.email, form.password);
    if (ok) navigate("/dashboard");
    else setError("Sign up failed");
  }

  return (
    <section className="auth-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input name="email" type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          placeholder="Email" required autoFocus />
        <input name="password" type="password"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          placeholder="Password" required />
        <button type="submit">Sign Up</button>
        {error && <div className="auth-error">{error}</div>}
      </form>
      <div>
        Already have an account? <Link to="/signin">Sign in</Link>
      </div>
    </section>
  );
}
