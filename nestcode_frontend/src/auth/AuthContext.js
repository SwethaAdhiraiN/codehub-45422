import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * This should be configured for your Django backend endpoints.
 * Uses the standard environment variable REACT_APP_API_BASE_URL for flexibility.
 */
const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

const AuthContext = createContext();

/**
 * PUBLIC_INTERFACE
 * Provides authentication context across the app.
 * Handles user login, registration, logout, OAuth, and stores user info.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Try auto-login from previous session
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetch(`${API_URL}/auth/me/`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => res.ok ? res.json() : Promise.reject())
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch(() => {
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // PUBLIC_INTERFACE
  const signin = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error("Invalid login");
      const data = await res.json();
      localStorage.setItem("authToken", data.token);
      setUser(data.user);
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      return false;
    }
  };

  // PUBLIC_INTERFACE
  /**
   * signup(username, email, password, mobile)
   * Registers a new user, sending username, email, password, and mobile_number to backend.
   * All params required.
   */
  const signup = async (username, email, password, mobile) => {
    setLoading(true);
    try {
      // Django backend requires username, password, mobile_number (REQUIRED), email (optional)
      const body = { username, password, mobile_number: mobile, email };
      const res = await fetch(`${API_URL}/auth/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error("Sign up failed");
      const data = await res.json();
      localStorage.setItem("authToken", data.token);
      setUser(data.user);
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      return false;
    }
  };

  // PUBLIC_INTERFACE (OAuth via popup for Google/GitHub etc -- simplified example)
  const oauth = async (provider) => {
    setLoading(true);
    try {
      window.location.href = `${API_URL}/auth/oauth/${provider}/`;
    } finally {
      setLoading(false);
    }
  };

  // PUBLIC_INTERFACE: logs out user
  const signout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signin, signup, signout, oauth }}>
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE: returns auth object
export function useAuth() {
  return useContext(AuthContext);
}
