"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Mail } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    title: "Account & Getting Started",
    items: [
      {
        q: "How do I create an account?",
        a: 'Tap "Try Free" on our homepage, then sign up with your email. It takes less than a minute — and you\'ll get 5 free minutes of narration right away.',
      },
      {
        q: "How do I record my voice?",
        a: 'After signing in, you\'ll see a "Record Your Voice" button. Find a quiet spot, hold your phone comfortably, and read the passage on screen out loud. It only takes about 30 seconds. Don\'t worry about being perfect — just be yourself.',
      },
      {
        q: "What if my recording doesn't sound good?",
        a: "You can always re-record. For the best results, try a quiet room without background noise, hold the phone about 15 cm from your mouth, and speak in your natural voice — the same warm tone your child knows and loves.",
      },
    ],
  },
  {
    title: "Books & Generation",
    items: [
      {
        q: "How long does it take to generate a story?",
        a: "Usually 1-2 minutes. You'll see a progress bar while the narration is being created. Once it's done, you can listen to it right away.",
      },
      {
        q: "What if generation gets stuck?",
        a: "Sometimes it takes a little longer than usual. If it's been more than 5 minutes, try refreshing the page. If the problem continues, please reach out to us — we'll sort it out.",
      },
      {
        q: "Can I re-record my voice?",
        a: "Absolutely. You can re-record your voice at any time from your account settings. The new recording will replace the previous one, and future stories will use your updated voice.",
      },
      {
        q: "How many books are available?",
        a: "We currently have 10 beloved children's classics — a mix of timeless favorites and Russian folk tales. We're adding new titles regularly, so there will always be something fresh for bedtime.",
      },
    ],
  },
  {
    title: "Payment & Billing",
    items: [
      {
        q: "Is it really free to try?",
        a: "Yes! New users get 5 free minutes of narration — enough for 1-2 stories. No credit card needed. After that, you can purchase additional minutes whenever you'd like.",
      },
      {
        q: "How do I buy more minutes?",
        a: "Go to your account and choose a minute pack that works for you. Payment is quick and secure. Your new minutes are available instantly after purchase.",
      },
      {
        q: "How do I request a refund?",
        a: "We want you to be happy. If something went wrong — a technical issue, an accidental charge, or anything else — email us at support@mamyvoice.com with your account email and a short description of the issue. We'll do our best to make it right within 24 hours. You can also read our full Refund Policy for details.",
      },
      {
        q: "How do I cancel my subscription?",
        a: "You can cancel anytime from your account settings. Cancellation stops future billing, but you'll keep access to your minutes until they're used up. No hard feelings — and you're always welcome back.",
      },
    ],
  },
  {
    title: "Privacy & Security",
    items: [
      {
        q: "Is my voice recording stored securely?",
        a: "Yes. Your voice recording is encrypted and stored securely. It is only used to generate narrations for your books and is never shared with third parties. Your voice is yours.",
      },
      {
        q: "Can I delete my voice data?",
        a: "Of course. You can delete your voice recording at any time from your account settings. Once deleted, we permanently remove it from our servers. You can always record again later if you change your mind.",
      },
      {
        q: "Who has access to my recordings?",
        a: "Only you. Your recordings are processed by our AI narration system to create stories, but no human listens to them. We never share, sell, or use your voice data for anything else.",
      },
    ],
  },
  {
    title: "Technical",
    items: [
      {
        q: "What devices does it work on?",
        a: "Mamy Voice works on any modern smartphone, tablet, or computer with a microphone. It's a web app — no download needed. Just open mamyvoice.com in your browser and you're ready to go.",
      },
      {
        q: "The player is not working — what do I do?",
        a: "First, try refreshing the page. If the audio still won't play, check that your device volume is turned up and that no other app is using the speaker. On iPhones, make sure the silent mode switch is off. If none of that helps, email us and we'll look into it.",
      },
      {
        q: "Can I download the audio to play offline?",
        a: "Not yet, but it's on our roadmap. For now, stories are available for streaming anytime you have an internet connection. We'll let you know as soon as offline playback is ready.",
      },
    ],
  },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "/legal/terms" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Refund Policy", href: "/legal/refund" },
  { label: "Cookies Policy", href: "/legal/cookies" },
];

function FAQCategorySection({ category, isFirst }: { category: FAQCategory; isFirst: boolean }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={isFirst ? "" : "pt-8 border-t"} style={!isFirst ? { borderColor: "rgba(26, 18, 7, 0.06)" } : undefined}>
      <h2
        className="text-text-primary mb-3"
        style={{ fontSize: 18, fontWeight: 700 }}
      >
        {category.title}
      </h2>
      <div className="divide-y" style={{ borderColor: "rgba(26, 18, 7, 0.06)" }}>
        {category.items.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left bg-transparent border-none cursor-pointer group"
              style={{ minHeight: 44 }}
            >
              <span
                className="text-text-primary pr-4"
                style={{ fontSize: 15, fontWeight: 600 }}
              >
                {item.q}
              </span>
              <ChevronDown
                size={18}
                className="text-text-tertiary shrink-0 transition-transform duration-200 group-hover:text-text-secondary"
                style={{ transform: open === i ? "rotate(180deg)" : "rotate(0)" }}
              />
            </button>
            <div
              className="overflow-hidden transition-all duration-200"
              style={{ maxHeight: open === i ? 200 : 0, opacity: open === i ? 1 : 0 }}
            >
              <p
                className="text-text-secondary pb-5"
                style={{ fontSize: 14, lineHeight: 1.7 }}
              >
                {item.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SupportPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <header className="px-6 py-5 border-b" style={{ borderColor: "rgba(26, 18, 7, 0.06)" }}>
        <div className="max-w-3xl mx-auto">
          <Link href="/" style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em", textDecoration: "none" }}>
            <span style={{ color: "var(--accent-warm)" }}>Mamy</span>{" "}
            <span className="text-text-primary">Voice</span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="px-6 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <h1
              className="text-text-primary"
              style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              How can we help?
            </h1>
            <p
              className="text-text-secondary mt-2"
              style={{ fontSize: 16, lineHeight: 1.6 }}
            >
              Whether it&apos;s your first recording or your tenth story, we&apos;ve got answers. And if you can&apos;t find what you need — we&apos;re just an email away.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="flex flex-col gap-8">
            {faqCategories.map((category, i) => (
              <FAQCategorySection key={category.title} category={category} isFirst={i === 0} />
            ))}
          </div>

          {/* Contact Section */}
          <div
            className="mt-12 text-center"
            style={{
              background: "var(--surface)",
              borderRadius: 20,
              padding: 28,
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <h2
              className="text-text-primary"
              style={{ fontSize: 18, fontWeight: 700 }}
            >
              Still need help?
            </h2>
            <p
              className="text-text-secondary mt-1.5"
              style={{ fontSize: 14 }}
            >
              We&apos;re a small team of parents who built this for our own families. If you have a question, a suggestion, or just want to say hi — we&apos;d love to hear from you.
            </p>
            <a
              href="mailto:support@mamyvoice.com"
              className="inline-flex items-center gap-2 mt-4 w-full sm:w-auto justify-center transition-all duration-200 hover:-translate-y-px active:scale-[0.97]"
              style={{
                background: "var(--accent-warm-light)",
                color: "var(--accent-warm)",
                fontSize: 15,
                fontWeight: 600,
                padding: "12px 24px",
                borderRadius: 9999,
                textDecoration: "none",
                minHeight: 44,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#FADDD2";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(232, 115, 74, 0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--accent-warm-light)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <Mail size={18} />
              support@mamyvoice.com
            </a>
            <p
              className="text-text-secondary mt-3"
              style={{ fontSize: 13 }}
            >
              We usually reply within 24 hours.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mt-8 pb-10">
            <h3
              className="text-text-tertiary uppercase mb-3"
              style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.06em" }}
            >
              Legal & Policies
            </h3>
            <div className="flex flex-wrap justify-center sm:justify-start gap-y-3 gap-x-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-text-tertiary hover:text-text-secondary transition-colors py-1"
                  style={{ fontSize: 14, textDecoration: "none" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
