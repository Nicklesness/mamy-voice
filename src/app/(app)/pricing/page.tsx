"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, Check } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { PLANS } from "@/lib/pricing";

export default function PricingPage() {
  const router = useRouter();
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
      if (!paymentUrl) throw new Error("Payment URL not received. Please try again.");
      window.location.href = paymentUrl;
    } catch (err) {
      setLoading(null);
      alert(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative px-6 md:px-8 lg:px-12 pt-12 pb-8 min-h-svh overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(139, 92, 246, 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <Link
          href="/books"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white mb-6 active:scale-95 transition-all duration-200"
          style={{ boxShadow: "var(--shadow-sm)" }}
          aria-label="Back"
        >
          <ArrowLeft size={20} className="text-text-secondary" />
        </Link>

        <div className="text-center animate-fade-in-up">
          <div
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 mb-4"
            style={{
              background: "var(--accent-deep-light)",
              color: "var(--accent-deep)",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <Sparkles size={14} />
            Narration Minutes
          </div>
          <h1
            className="text-text-primary md:text-3xl"
            style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2 }}
          >
            Buy <span style={{ color: "var(--accent-deep)" }}>minutes</span>
          </h1>
          <p className="text-text-secondary mt-2 md:text-base" style={{ fontSize: 14 }}>
            Each story uses minutes based on its length
          </p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-6 mt-8">
          {PLANS.map((plan, i) => (
            <div
              key={plan.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              <div
                className="relative rounded-[20px] p-5 transition-all duration-200"
                style={{
                  background: "var(--surface)",
                  boxShadow: plan.popular ? "var(--shadow-lg)" : "var(--shadow-sm)",
                  border: plan.popular ? "2px solid var(--accent-deep)" : "2px solid transparent",
                }}
              >
                {plan.popular && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5"
                    style={{
                      background: "var(--accent-deep)",
                      color: "white",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                    }}
                  >
                    BEST VALUE
                  </span>
                )}

                <p className="text-text-primary" style={{ fontSize: 16, fontWeight: 700 }}>
                  {plan.name}
                </p>
                <p className="text-text-primary mt-1" style={{ fontSize: 32, fontWeight: 800 }}>
                  {plan.priceDisplay}
                </p>
                <p className="text-text-secondary mt-1" style={{ fontSize: 14, fontWeight: 600 }}>
                  {plan.hours} hours of narration
                </p>

                <p className="mt-2 italic text-text-tertiary" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  ≈ {plan.bookExample}
                </p>

                <p className="mt-2" style={{ fontSize: 12, color: "var(--accent-warm)", fontWeight: 600 }}>
                  + {plan.extraHourDisplay} / extra hour
                </p>

                <div className="mt-4">
                  <Button
                    variant={plan.popular ? "primary" : "secondary"}
                    size="md"
                    fullWidth
                    disabled={loading === plan.id}
                    onClick={() => handlePurchase(plan.id)}
                  >
                    {loading === plan.id ? "Processing..." : "Get started"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 animate-fade-in delay-400">
          <Button variant="text" fullWidth onClick={() => router.push("/books")}>
            Back to Catalog
          </Button>
        </div>
      </div>
    </div>
  );
}
