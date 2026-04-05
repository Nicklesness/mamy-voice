"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";
import Button from "@/components/ui/Button";

interface NarrateButtonProps {
  bookId: string;
  duration: number; // book duration in minutes
}

export default function NarrateButton({ bookId, duration }: NarrateButtonProps) {
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

  const hasEnough = minuteBalance !== null && minuteBalance >= duration;
  const notEnough = minuteBalance !== null && minuteBalance < duration;

  return (
    <div className="space-y-3">
      {/* Minutes info */}
      <div
        className="flex items-center justify-between rounded-[14px] px-4 py-3"
        style={{
          background: notEnough ? "rgba(239, 68, 68, 0.06)" : "rgba(139, 92, 246, 0.06)",
          border: notEnough ? "1px solid rgba(239, 68, 68, 0.15)" : "1px solid rgba(139, 92, 246, 0.1)",
        }}
      >
        <div className="flex items-center gap-2">
          <Clock size={15} style={{ color: notEnough ? "#ef4444" : "var(--accent-deep)" }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
            This story needs ~{duration} min
          </span>
        </div>
        {minuteBalance !== null && (
          <span style={{
            fontSize: 13,
            fontWeight: 600,
            color: notEnough ? "#ef4444" : "var(--text-secondary)",
          }}>
            You have {minuteBalance.toFixed(1)}
          </span>
        )}
      </div>

      {/* Action button */}
      {notEnough ? (
        <>
          <Button variant="primary" size="lg" fullWidth onClick={() => router.push("/pricing")}>
            Buy Minutes
          </Button>
          <p className="text-center" style={{ fontSize: 12, color: "var(--text-tertiary)" }}>
            You need {(duration - minuteBalance).toFixed(1)} more minutes to narrate this book
          </p>
        </>
      ) : (
        <Button variant="primary" size="lg" fullWidth onClick={() => router.push(`/generate/${bookId}`)}>
          Narrate in Mom&apos;s Voice
        </Button>
      )}
    </div>
  );
}
