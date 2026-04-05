"use client";

import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function MinutesBadge() {
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

  const isLow = minuteBalance !== null && minuteBalance < 1;

  return (
    <button
      onClick={() => router.push("/pricing")}
      className="flex items-center gap-1.5 rounded-full px-3 py-1.5 cursor-pointer border-none transition-all duration-200 active:scale-95"
      style={{
        background: isLow ? "rgba(239, 68, 68, 0.1)" : "var(--accent-deep-light)",
        color: isLow ? "#ef4444" : "var(--accent-deep)",
        fontSize: 12,
        fontWeight: 600,
      }}
      aria-label="Minute balance"
    >
      <Clock size={14} />
      {minuteBalance !== null ? `${minuteBalance.toFixed(0)} min` : "0 min"}
    </button>
  );
}
