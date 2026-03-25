import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies Policy — Mamy Voice",
};

export default function CookiesPage() {
  return (
    <article className="legal-content">
      <h1>Cookies Policy</h1>
      <p className="legal-updated">Last updated: 15.03.2026</p>

      <h2>1. Introduction</h2>
      <p>
        This Cookies Policy explains how mamyvoice.com (&quot;Website&quot;, &quot;Service&quot;) uses cookies and similar technologies to recognize users when they visit our Website.
      </p>
      <p>It explains what these technologies are and why we use them.</p>

      <h2>2. What Are Cookies</h2>
      <p>Cookies are small text files stored on your device when you visit a website.</p>
      <p>Cookies help websites:</p>
      <ul>
        <li>remember user preferences</li>
        <li>maintain login sessions</li>
        <li>analyze website performance</li>
        <li>improve user experience</li>
      </ul>

      <h2>3. Types of Cookies We Use</h2>

      <h3>Essential Cookies</h3>
      <p>These cookies are necessary for the Website to function properly.</p>
      <p>They allow features such as:</p>
      <ul>
        <li>account login</li>
        <li>secure navigation</li>
        <li>subscription access</li>
      </ul>
      <p>Without these cookies, some parts of the Website may not work correctly.</p>

      <h3>Analytics Cookies</h3>
      <p>These cookies help us understand how visitors use the Website.</p>
      <p>They may collect information such as:</p>
      <ul>
        <li>pages visited</li>
        <li>time spent on pages</li>
        <li>device type</li>
        <li>traffic sources</li>
      </ul>
      <p>This information helps us improve the Service.</p>

      <h3>Functional Cookies</h3>
      <p>Functional cookies allow the Website to remember user preferences such as:</p>
      <ul>
        <li>language settings</li>
        <li>playback preferences</li>
        <li>user interface settings</li>
      </ul>

      <h2>4. Third-Party Cookies</h2>
      <p>Some cookies may be set by third-party services integrated into the Website, including:</p>
      <ul>
        <li>analytics providers</li>
        <li>hosting services</li>
        <li>payment services such as UniPAY and Keepz</li>
      </ul>
      <p>These third parties may collect information according to their own privacy policies.</p>

      <h2>5. Managing Cookies</h2>
      <p>Users can control or disable cookies through their browser settings.</p>
      <p>Most browsers allow you to:</p>
      <ul>
        <li>block cookies</li>
        <li>delete existing cookies</li>
        <li>receive notifications when cookies are used</li>
      </ul>
      <p>Please note that disabling cookies may affect the functionality of the Website.</p>

      <h2>6. Updates to This Policy</h2>
      <p>We may update this Cookies Policy periodically.</p>
      <p>Changes will be reflected by updating the &quot;Last updated&quot; date.</p>

      <h2>7. Contact</h2>
      <p>If you have questions about our use of cookies, please contact us:</p>
      <p>
        Email: <a href="mailto:support@mamyvoice.com">support@mamyvoice.com</a>
        <br />
        Website: <a href="https://mamyvoice.com">https://mamyvoice.com</a>
      </p>
    </article>
  );
}
