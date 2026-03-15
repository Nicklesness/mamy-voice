"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/books";

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegister) {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Registration failed");
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(isRegister ? "Account created but login failed. Try logging in." : "Invalid email or password");
      }

      router.push(callbackUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 14,
    border: "1.5px solid rgba(26, 18, 7, 0.1)",
    background: "var(--surface)",
    fontSize: 15,
    color: "var(--text-primary)",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-svh px-6 py-8 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top, rgba(232, 115, 74, 0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-5 w-full max-w-sm">
        <div className="animate-fade-in-scale">
          <Image src="/images/hero.png" alt="Mamy Voice" width={100} height={100} className="rounded-2xl" />
        </div>

        <div className="text-center animate-fade-in-up delay-200">
          <h1 className="text-text-primary" style={{ fontSize: 26, fontWeight: 700 }}>
            {isRegister ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-text-secondary mt-1" style={{ fontSize: 14 }}>
            {isRegister ? "Sign up to start narrating stories" : "Sign in to continue"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 animate-fade-in-up delay-300">
          {isRegister && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={inputStyle}
          />

          {error && (
            <p className="text-center" style={{ color: "var(--error)", fontSize: 13 }}>
              {error}
            </p>
          )}

          <Button variant="primary" size="lg" fullWidth disabled={loading}>
            {loading ? "Please wait..." : isRegister ? "Sign Up" : "Sign In"}
          </Button>
        </form>

        <button
          onClick={() => { setIsRegister(!isRegister); setError(null); }}
          className="bg-transparent border-none cursor-pointer"
          style={{ color: "var(--accent-warm)", fontSize: 14, fontWeight: 600 }}
        >
          {isRegister ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
