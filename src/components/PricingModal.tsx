"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import { PLANS } from "@/lib/pricing";

interface PricingModalProps {
  onClose: () => void;
}

export default function PricingModal({ onClose }: PricingModalProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handlePurchase = async (packId: string) => {
    setLoading(packId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Payment failed. Please try again.");
      }
      const { paymentUrl } = await res.json();
      if (!paymentUrl) throw new Error("Payment URL not received.");
      window.location.href = paymentUrl;
    } catch (err) {
      setLoading(null);
      alert(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 animate-fade-in" />

      {/* Modal */}
      <div
        className="relative w-full sm:max-w-lg mx-auto bg-white rounded-t-[24px] sm:rounded-[24px] p-6 pb-8 animate-slide-up"
        style={{ maxHeight: "90svh", overflowY: "auto" }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-text-primary" style={{ fontSize: 22, fontWeight: 700 }}>
            Buy minutes
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent border-none cursor-pointer transition-colors hover:bg-gray-100"
            aria-label="Close"
          >
            <X size={20} className="text-text-secondary" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className="relative rounded-[16px] p-4 transition-all duration-200"
              style={{
                background: "var(--bg)",
                border: plan.popular ? "2px solid var(--accent-deep)" : "1.5px solid rgba(26, 18, 7, 0.08)",
              }}
            >
              {plan.popular && (
                <span
                  className="absolute -top-2.5 left-4 rounded-full px-2.5 py-0.5"
                  style={{
                    background: "var(--accent-deep)",
                    color: "white",
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                >
                  BEST VALUE
                </span>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-primary" style={{ fontSize: 15, fontWeight: 700 }}>
                    {plan.name}
                  </p>
                  <span className="text-text-secondary" style={{ fontSize: 13 }}>
                    {plan.hours} hours of narration
                  </span>
                </div>
                <Button
                  variant={plan.popular ? "primary" : "secondary"}
                  size="sm"
                  disabled={loading === plan.id}
                  onClick={() => handlePurchase(plan.id)}
                >
                  {loading === plan.id ? "..." : plan.priceDisplay}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
