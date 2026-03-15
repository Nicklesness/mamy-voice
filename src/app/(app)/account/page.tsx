"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Mic, LogOut, Clock } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface UserBalance {
  minuteBalance: number;
}

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [balance, setBalance] = useState<UserBalance | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetch("/api/user/balance")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setBalance(data);
      });
  }, []);

  if (status === "loading" || !session) {
    return (
      <div className="flex items-center justify-center min-h-svh">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full dot-bounce"
              style={{ background: "var(--accent-warm)" }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-6 md:px-8 pt-12 pb-8 min-h-svh overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Back button */}
        <Link
          href="/books"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white mb-6 active:scale-95 transition-all duration-200"
          style={{ boxShadow: "var(--shadow-sm)" }}
          aria-label="Back"
        >
          <ArrowLeft size={20} className="text-text-secondary" />
        </Link>

        {/* Profile header */}
        <div className="animate-fade-in-up">
          <h1
            className="text-text-primary md:text-3xl"
            style={{ fontSize: 28, fontWeight: 700 }}
          >
            My Account
          </h1>
          <p className="text-text-secondary mt-1 md:text-base" style={{ fontSize: 14 }}>
            {session.user?.email}
          </p>
        </div>

        {/* Balance card */}
        <div
          className="mt-6 bg-white rounded-[20px] p-5 animate-fade-in-up delay-200"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-text-tertiary"
                style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}
              >
                Minutes Balance
              </p>
              <p
                className="text-text-primary mt-1"
                style={{ fontSize: 32, fontWeight: 800 }}
              >
                {balance ? balance.minuteBalance.toFixed(1) : "..."}
              </p>
            </div>
            <Badge variant="warm" icon={Clock}>
              minutes
            </Badge>
          </div>
          <Link href="/pricing" className="block mt-4">
            <Button variant="primary" size="md" fullWidth>
              Buy More Minutes
            </Button>
          </Link>
        </div>

        {/* Voice section */}
        <div
          className="mt-4 bg-white rounded-[20px] p-5 animate-fade-in-up delay-300"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "var(--accent-deep-light)" }}
            >
              <Mic size={18} style={{ color: "var(--accent-deep)" }} />
            </div>
            <div>
              <p className="text-text-primary" style={{ fontSize: 15, fontWeight: 600 }}>
                My Voice
              </p>
              <p className="text-text-secondary" style={{ fontSize: 13 }}>
                Manage your voice recording
              </p>
            </div>
          </div>
          <Link href="/voice" className="block mt-3">
            <Button variant="secondary" size="md" fullWidth>
              Voice Settings
            </Button>
          </Link>
        </div>

        {/* Sign out */}
        <div className="mt-6 animate-fade-in-up delay-400">
          <Button
            variant="ghost"
            size="md"
            fullWidth
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <span className="flex items-center gap-2">
              <LogOut size={16} /> Sign Out
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
