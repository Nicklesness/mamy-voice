"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LowMinutesBanner() {
  const router = useRouter();
  const [minuteBalance, setMinuteBalance] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/user/balance")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.minuteBalance === "number") {
          setMinuteBalance(data.minuteBalance);
        }
      })
      .catch(() => {});
  }, []);

  if (minuteBalance === null || minuteBalance >= 1) {
    return null;
  }

  return (
    <div
      className="flex items-center justify-between gap-3 rounded-[16px] mb-4"
      style={{
        background: "rgba(239, 68, 68, 0.06)",
        padding: "12px 16px",
      }}
    >
      <p
        className="text-text-primary"
        style={{ fontSize: 13, fontWeight: 500 }}
      >
        You&apos;re running low on minutes!
      </p>
      <button
        onClick={() => router.push("/pricing")}
        className="shrink-0 rounded-full px-3.5 py-1.5 cursor-pointer border-none transition-all duration-200 active:scale-95"
        style={{
          background: "#ef4444",
          color: "#fff",
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        Buy Minutes
      </button>
    </div>
  );
}
