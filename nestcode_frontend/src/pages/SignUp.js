import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Sign-up page for account creation.
 * Now supports mobile number, email, password.
 */
export default function SignUp() {
  const [form, setForm] = useState({ email: "", password: "", mobile: "" });
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  function validateMobile(mobile) {
    // Simple mobile validation: numbers 8-15 digits
    return /^\d{8,15}$/.test(mobile.trim());
  }
  function validateEmail(email) {
    // Minimal email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function validatePassword(password) {
    // At least 6 chars
    return password && password.length >= 6;
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setError("");
    if (!validateMobile(form.mobile))
      return setError("Please provide a valid mobile number.");

    if (!validateEmail(form.email))
      return setError("Please provide a valid email address.");

    if (!validatePassword(form.password))
      return setError("Password must be at least 6 characters.");

    // Send all fields
    const ok = await signup(form.email, form.password, form.mobile);
    if (ok) navigate("/dashboard");
    else setError("Sign up failed");
  }

  return (
    <section className="auth-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input name="mobile" type="tel"
          value={form.mobile}
          onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))}
          placeholder="Mobile Number"
          autoFocus
          pattern="\d{8,15}"
          minLength={8}
          maxLength={15}
          required
        />
        <input name="email" type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          placeholder="Email" required
        />
        <input name="password" type="password"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          placeholder="Password"
          minLength={6}
          required
        />
        <button type="submit">Sign Up</button>
        {error && <div className="auth-error">{error}</div>}
      </form>
      <div>
        Already have an account? <Link to="/signin">Sign in</Link>
      </div>
    </section>
  );
}
