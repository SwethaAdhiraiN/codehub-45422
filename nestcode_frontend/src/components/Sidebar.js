import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Sidebar navigation for NestCode.
 * Responsive/minimal style, collapses on mobile (not implemented here).
 */
export default function Sidebar() {
  const { user } = useAuth();

  const links = [
    { to: "/explore", label: "Explore" },
    ...(user ? [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/contribute", label: "Contribute" },
      { to: "/upload", label: "Upload" },
      { to: "/billing", label: "Billing" }
    ] : []),
    { to: "/feedback", label: "Feedback" },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <span>NestCode</span>
      </div>
      <ul>
        {links.map((link, i) => (
          <li key={i}>
            <NavLink to={link.to} className={({ isActive }) => isActive ? "active" : ""}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <footer className="sidebar-footer">
        <small>&copy; {new Date().getFullYear()} NestCode</small>
      </footer>
    </nav>
  );
}
