import React from "react";
/**
 * PUBLIC_INTERFACE
 * Simple page for 404/unknown routes.
 */
export default function NotFound() {
  return (
    <div style={{margin:"4em auto", textAlign:"center"}}>
      <h2>404 Not Found</h2>
      <p>This page does not exist.</p>
      <a href="/explore">Go to Explore</a>
    </div>
  );
}
