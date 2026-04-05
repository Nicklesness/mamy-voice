"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import PricingModal from "@/components/PricingModal";

interface NarrateButtonProps {
  bookId: string;
  duration: number; // book duration in minutes
}

export default function NarrateButton({ bookId, duration }: NarrateButtonProps) {
  const router = useRouter();
  const [minuteBalance, setMinuteBalance] = useState<number | null>(null);
  const [showPricing, setShowPricing] = useState(false);

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
  const hasAny = minuteBalance !== null && minuteBalance > 0;

  return (
    <>
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

        {/* Action buttons */}
        {hasEnough ? (
          <Button variant="primary" size="lg" fullWidth onClick={() => router.push(`/generate/${bookId}`)}>
            Narrate in Mom&apos;s Voice
          </Button>
        ) : (
          <>
            {hasAny && (
              <Button variant="primary" size="lg" fullWidth onClick={() => router.push(`/generate/${bookId}`)}>
                Narrate with {minuteBalance.toFixed(0)} min you have
              </Button>
            )}
            <Button
              variant={hasAny ? "secondary" : "primary"}
              size="lg"
              fullWidth
              onClick={() => setShowPricing(true)}
            >
              Buy More Minutes
            </Button>
          </>
        )}
      </div>

      {showPricing && <PricingModal onClose={() => setShowPricing(false)} />}
    </>
  );
}
