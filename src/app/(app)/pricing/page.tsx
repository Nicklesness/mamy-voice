"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, Check } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { MINUTE_PACKS } from "@/lib/pricing";

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handlePurchase = async (packId: string) => {
    setLoading(packId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packId }),
      });
      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
      setTimeout(() => router.push("/account"), 1500);
    } catch {
      setLoading(null);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-svh px-6 gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center animate-bounce-in"
          style={{ background: "var(--success)", color: "white" }}
        >
          <Check size={32} />
        </div>
        <h2 className="text-text-primary animate-fade-in-up" style={{ fontSize: 22, fontWeight: 700 }}>
          Minutes added!
        </h2>
        <p className="text-text-secondary text-sm animate-fade-in-up delay-200">
          Redirecting to your account...
        </p>
      </div>
    );
  }

  return (
    <div className="relative px-6 md:px-8 lg:px-12 pt-12 pb-8 min-h-svh overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(139, 92, 246, 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <Link
          href="/account"
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
          {MINUTE_PACKS.map((pack, i) => (
            <div
              key={pack.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              <div
                className="relative rounded-[20px] p-5 transition-all duration-200"
                style={{
                  background: "var(--surface)",
                  boxShadow: pack.popular ? "var(--shadow-lg)" : "var(--shadow-sm)",
                  border: pack.popular ? "2px solid var(--accent-deep)" : "2px solid transparent",
                }}
              >
                {pack.popular && (
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

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-primary" style={{ fontSize: 18, fontWeight: 700 }}>
                      {pack.name}
                    </p>
                    <p className="text-text-secondary mt-0.5" style={{ fontSize: 14 }}>
                      {pack.minutes} minutes
                    </p>
                  </div>
                  <p className="text-text-primary" style={{ fontSize: 24, fontWeight: 800 }}>
                    {pack.priceDisplay}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-2 text-text-tertiary" style={{ fontSize: 12 }}>
                  <Check size={14} style={{ color: "var(--success)" }} />
                  ~{Math.floor(pack.minutes / 3)} stories
                </div>

                <div className="mt-4">
                  <Button
                    variant={pack.popular ? "primary" : "secondary"}
                    size="md"
                    fullWidth
                    disabled={loading === pack.id}
                    onClick={() => handlePurchase(pack.id)}
                  >
                    {loading === pack.id ? "Processing..." : "Buy Now"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-text-tertiary text-center mt-6 animate-fade-in delay-400" style={{ fontSize: 12 }}>
          Payment integration coming soon. Currently in test mode.
        </p>

        <div className="mt-4 animate-fade-in delay-400">
          <Button variant="text" fullWidth onClick={() => router.push("/books")}>
            Back to Catalog
          </Button>
        </div>
      </div>
    </div>
  );
}
