import React from "react";
import { useTheme } from "../theme/ThemeContext";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Top search/user bar for NestCode.
 */
export default function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <input
        type="search"
        className="topbar-search"
        placeholder="Search modules, languages, frameworks..."
        aria-label="Search"
        onKeyDown={e => {
          if (e.key === "Enter") {
            navigate(`/explore?q=${encodeURIComponent(e.target.value)}`);
          }
        }}
      />
      <div className="topbar-menu">
        <button className="theme-btn" onClick={toggleTheme} title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {user
          ? <div className="user-menu">
              <span className="user-email">{user.email}</span>
              <button onClick={signout} className="signout-btn">Sign out</button>
            </div>
          : <div>
              <button onClick={() => navigate("/signin")} className="login-btn">Sign in</button>
            </div>
        }
      </div>
    </header>
  );
}
