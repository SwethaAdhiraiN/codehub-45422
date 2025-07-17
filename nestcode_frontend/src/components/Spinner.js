import React from "react";
/**
 * PUBLIC_INTERFACE
 * Simple centered spinner/loading indicator.
 */
export default function Spinner() {
  return (
    <div style={{
      minHeight: "200px", display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div className="spinner" />
      <style>
        {`
        .spinner {
          border: 4px solid #e9ecef;
          border-top: 4px solid #EE6352;
          border-radius: 50%;
          width: 40px; height: 40px;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% {transform: rotate(360deg);}
        }
        `}
      </style>
    </div>
  );
}
