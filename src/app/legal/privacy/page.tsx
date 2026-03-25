import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Mamy Voice",
};

export default function PrivacyPage() {
  return (
    <article className="legal-content">
      <h1>Privacy Policy</h1>
      <p className="legal-updated">Last updated: 15.03.2026</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to mamyvoice.com (&quot;Website&quot;, &quot;Service&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
      </p>
      <p>
        This Privacy Policy explains how we collect, use, store, and protect personal information when users access or use our Service.
      </p>
      <p>
        By using the Website, you agree to the collection and use of information in accordance with this Privacy Policy.
      </p>

      <h2>2. Information We Collect</h2>
      <p>We may collect several types of information from users of the Service.</p>

      <h3>2.1 Personal Information</h3>
      <p>When you create an account, subscribe, or interact with the Website, we may collect:</p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Account login information</li>
        <li>Payment-related information (processed by third-party payment providers)</li>
      </ul>
      <p>We do not store full credit card information on our servers.</p>

      <h3>2.2 Usage Data</h3>
      <p>We may automatically collect information about how the Service is used, including:</p>
      <ul>
        <li>IP address</li>
        <li>Browser type</li>
        <li>Device type</li>
        <li>Pages visited</li>
        <li>Time spent on the website</li>
        <li>Interaction with audio content</li>
      </ul>
      <p>This data helps us improve the performance and usability of the Service.</p>

      <h3>2.3 Cookies and Tracking Technologies</h3>
      <p>We may use cookies and similar technologies to:</p>
      <ul>
        <li>maintain user sessions</li>
        <li>remember preferences</li>
        <li>analyze website traffic</li>
        <li>improve user experience</li>
      </ul>
      <p>Users may disable cookies in their browser settings, although some features of the Service may not function properly without them.</p>

      <h2>3. Children&apos;s Privacy and Parental Responsibility</h2>
      <p>MamyVoice is designed for families and children.</p>
      <p>However:</p>
      <ul>
        <li>Users under 18 years of age must use the Service under the supervision of a parent or legal guardian.</li>
        <li>Parents or guardians are responsible for monitoring children&apos;s use of the Service.</li>
        <li>We do not knowingly collect personal information directly from children without parental consent.</li>
      </ul>
      <p>If a parent believes that their child has provided personal information without permission, they may contact us to request removal of that data.</p>

      <h2>4. How We Use Your Information</h2>
      <p>We use collected information to:</p>
      <ul>
        <li>provide and maintain the Service</li>
        <li>manage user accounts</li>
        <li>process subscriptions and payments</li>
        <li>improve product functionality</li>
        <li>communicate with users about updates or support</li>
        <li>detect fraud or misuse of the platform</li>
      </ul>
      <p>We may also use anonymized data for analytics and product development.</p>

      <h2>5. Payment Processing</h2>
      <p>Payments made through the Website are processed by third-party payment providers including:</p>
      <ul>
        <li>UniPAY</li>
        <li>Keepz</li>
      </ul>
      <p>These providers process payment information according to their own privacy policies.</p>
      <p>MamyVoice does not store full credit card or payment details.</p>
      <p>Users are encouraged to review the privacy policies of these payment providers before completing transactions.</p>

      <h2>6. Sharing of Information</h2>
      <p>We do not sell or rent personal information.</p>
      <p>We may share information only in the following situations:</p>
      <ul>
        <li>with service providers that help operate the platform (hosting, analytics, payment processing)</li>
        <li>when required by law or legal process</li>
        <li>to protect the rights, property, or safety of MamyVoice or its users</li>
      </ul>
      <p>All partners and service providers are required to maintain appropriate security standards.</p>

      <h2>7. Data Security</h2>
      <p>We take reasonable measures to protect user information from unauthorized access, loss, misuse, or disclosure.</p>
      <p>However, no internet transmission or storage system can be guaranteed to be completely secure.</p>
      <p>Users should also take precautions to protect their account credentials.</p>

      <h2>8. Data Retention</h2>
      <p>We retain personal information only as long as necessary to:</p>
      <ul>
        <li>provide the Service</li>
        <li>comply with legal obligations</li>
        <li>resolve disputes</li>
        <li>enforce agreements</li>
      </ul>
      <p>Users may request deletion of their personal information where permitted by applicable law.</p>

      <h2>9. International Users</h2>
      <p>The Service is available to users worldwide.</p>
      <p>By using the Website, users acknowledge that their information may be transferred to and processed in different countries where data protection laws may differ.</p>
      <p>We take reasonable measures to ensure that data remains protected in accordance with applicable privacy standards.</p>

      <h2>10. Third-Party Links</h2>
      <p>The Website may contain links to third-party services or websites.</p>
      <p>We are not responsible for the privacy practices or content of those third-party services.</p>
      <p>Users should review their privacy policies separately.</p>

      <h2>11. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy periodically.</p>
      <p>When changes are made:</p>
      <ul>
        <li>the &quot;Last updated&quot; date will be revised</li>
        <li>significant changes may be communicated through the Website or email</li>
      </ul>
      <p>Continued use of the Service after updates constitutes acceptance of the revised policy.</p>

      <h2>12. Contact Information</h2>
      <p>If you have questions about this Privacy Policy or how your data is handled, please contact us:</p>
      <p>
        Email: <a href="mailto:support@mamyvoice.com">support@mamyvoice.com</a>
        <br />
        Website: <a href="https://mamyvoice.com">https://mamyvoice.com</a>
      </p>
    </article>
  );
}
