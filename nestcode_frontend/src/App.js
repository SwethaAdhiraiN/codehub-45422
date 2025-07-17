import React, { Suspense, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeContext";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Dashboard from "./pages/Dashboard";
import Explorer from "./pages/Explorer";
import ModuleDetail from "./pages/ModuleDetail";
import Contribute from "./pages/Contribute";
import Upload from "./pages/Upload";
import Feedback from "./pages/Feedback";
import Billing from "./pages/Billing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Spinner from "./components/Spinner";
import "./App.css";

// Generic error boundary for React runtime errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // You can log errorInfo to error reporting service here
    // eslint-disable-next-line no-console
    console.error("Uncaught React error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2em", textAlign: "center", color: "red" }}>
          <h2>Something went wrong.</h2>
          <pre>{String(this.state.error)}</pre>
          <a href="/" style={{ color: "#EE6352" }}>Reload App</a>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppLayout() {
  const { user } = useAuth();
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="main-content-inner">
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to={user ? "/dashboard" : "/explore"} replace />}
                />
                <Route path="/dashboard" element={
                  <RequireAuth><Dashboard /></RequireAuth>} 
                />
                <Route path="/explore" element={<Explorer />} />
                <Route path="/module/:moduleId/*" element={<ModuleDetail />} />
                <Route path="/contribute" element={
                  <RequireAuth><Contribute /></RequireAuth>} 
                />
                <Route path="/upload" element={
                  <RequireAuth><Upload /></RequireAuth>}
                />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/billing" element={
                  <RequireAuth><Billing /></RequireAuth>}
                />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  return user ? children : <Navigate to="/signin" replace />;
}

// PUBLIC_INTERFACE: main app entrypoint
export default function App() {
  // Theme and Auth context applied at highest level
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppLayout />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
