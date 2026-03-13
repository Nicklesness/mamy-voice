import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="relative h-svh overflow-hidden">
      {/* Full-screen background image */}
      <Image
        src="/images/landing_hero.png"
        alt="Mother bunny reading to baby"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />

      {/* Dark gradient overlay from bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(20,12,5,0.85) 0%, rgba(20,12,5,0.4) 40%, transparent 65%)",
        }}
      />

      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 flex flex-col items-center z-10">
        <h1
          className="tracking-tight animate-fade-in-up text-center"
          style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          <span style={{ color: "var(--accent-warm)" }}>Mamy</span>{" "}
          <span className="text-white">Voice</span>
        </h1>

        <p
          className="leading-relaxed max-w-[280px] animate-fade-in-up text-center"
          style={{ fontSize: 16, lineHeight: 1.6, marginTop: 12, animationDelay: "100ms", color: "rgba(255,255,255,0.8)" }}
        >
          Narrate your child&apos;s favorite story in your own voice — a bedtime gift they&apos;ll never outgrow
        </p>

        <div className="w-full animate-fade-in-up" style={{ marginTop: 32, animationDelay: "300ms" }}>
          <Link href="/onboarding">
            <Button variant="primary" size="lg" fullWidth className="animate-cta-breathe">
              Get Started
            </Button>
          </Link>
        </div>

        <p
          className="animate-fade-in"
          style={{ fontSize: 14, marginTop: 14, animationDelay: "500ms", color: "rgba(255,255,255,0.5)" }}
        >
          Takes just 3 minutes
        </p>
      </div>
    </div>
  );
}
