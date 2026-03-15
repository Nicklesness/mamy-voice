"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const questions = [
  {
    q: "Is my voice recording stored securely?",
    a: "Yes. Your voice recording is encrypted and stored securely. It is only used to generate narrations for your books and is never shared with third parties.",
  },
  {
    q: "How long does it take to generate a story?",
    a: "Usually 1-2 minutes. You'll see a progress bar while the narration is being created. Once done, you can listen to it immediately.",
  },
  {
    q: "What devices does it work on?",
    a: "Mamy Voice works on any modern smartphone, tablet, or computer with a microphone. It's a web app — no download needed.",
  },
  {
    q: "Can I re-record my voice?",
    a: "Absolutely. You can re-record your voice at any time from your account settings. The new recording will replace the previous one.",
  },
  {
    q: "Is it really free to try?",
    a: "Yes! New users get 5 free minutes of narration — enough for 1-2 stories. After that, you can purchase additional minutes.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y" style={{ borderColor: "rgba(26, 18, 7, 0.06)" }}>
      {questions.map((item, i) => (
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
              className="text-text-tertiary shrink-0 transition-transform duration-200"
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
  );
}
