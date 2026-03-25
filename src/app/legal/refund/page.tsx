import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy — Mamy Voice",
};

export default function RefundPage() {
  return (
    <article className="legal-content">
      <h1>Refund Policy</h1>
      <p className="legal-updated">Last updated: 15.03.2026</p>

      <h2>1. Introduction</h2>
      <p>
        This Refund Policy explains the conditions under which refunds may be issued for purchases made on mamyvoice.com (&quot;Website&quot;, &quot;Service&quot;).
      </p>
      <p>By purchasing a subscription or digital service through the Website, you agree to this Refund Policy.</p>

      <h2>2. Digital Services</h2>
      <p>MamyVoice provides digital audio content and AI-generated narration services delivered online.</p>
      <p>Because the Service provides instant access to digital content, refunds may be limited once access to the content has been granted.</p>

      <h2>3. Eligibility for Refunds</h2>
      <p>Refunds may be granted in the following circumstances:</p>
      <ul>
        <li>The user was charged incorrectly or multiple times</li>
        <li>A technical issue prevented access to the purchased service</li>
        <li>A payment error occurred</li>
        <li>Refund is required under applicable consumer protection laws</li>
      </ul>
      <p>Refund requests must be submitted within 14 days of the transaction date.</p>
      <p>All refund requests are reviewed individually.</p>

      <h2>4. Non-Refundable Situations</h2>
      <p>Refunds may not be granted in the following cases:</p>
      <ul>
        <li>The subscription was partially used</li>
        <li>The user changed their mind after accessing content</li>
        <li>The user forgot to cancel a subscription before renewal</li>
        <li>The account was suspended due to violation of Terms and Conditions</li>
      </ul>

      <h2>5. Subscription Cancellation</h2>
      <p>Users may cancel their subscription at any time.</p>
      <p>Cancellation will:</p>
      <ul>
        <li>stop future billing</li>
        <li>allow access to the Service until the end of the current billing period</li>
      </ul>
      <p>Cancellation does not automatically generate a refund for the current billing cycle.</p>

      <h2>6. Payment Providers</h2>
      <p>Payments on the Website may be processed by third-party payment providers including:</p>
      <ul>
        <li>UniPAY</li>
        <li>Keepz</li>
      </ul>
      <p>Refund processing times may depend on the policies and procedures of these payment providers.</p>

      <h2>7. How to Request a Refund</h2>
      <p>To request a refund, please contact us with the following information:</p>
      <ul>
        <li>account email</li>
        <li>payment date</li>
        <li>payment confirmation or transaction ID</li>
        <li>description of the issue</li>
      </ul>
      <p>Refund requests can be sent to:</p>
      <p>
        Email: <a href="mailto:support@mamyvoice.com">support@mamyvoice.com</a>
      </p>
    </article>
  );
}
