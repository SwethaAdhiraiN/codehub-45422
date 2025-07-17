import React, { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Billing/subscription page (example UI; real implementation should be connected to backend billing).
 */
export default function Billing() {
  const [plan, setPlan] = useState("free");
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    // Fetch user's current plan (placeholder: simulate async)
    setTimeout(() => setPlan("free"), 500);
  }, []);

  const handleUpgrade = () => {
    // Placeholder: integrate billing API (Stripe, etc)
    setPaymentStatus("Processing...");
    setTimeout(() => setPaymentStatus("Upgraded!"), 1000);
  };

  return (
    <section>
      <h2>Billing & Subscription</h2>
      <div>
        <strong>Current plan:</strong> {plan}
      </div>
      <div className="plan-options">
        <button disabled={plan === "free"}>Free (Current)</button>
        <button disabled={plan === "pro"} onClick={handleUpgrade}>Upgrade to Pro</button>
      </div>
      {paymentStatus && <div className="payment-status">{paymentStatus}</div>}
      <small>(Mock UI: connect to real billing API for production)</small>
    </section>
  );
}
