import Link from "next/link";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-primary">
      <header className="px-6 py-5 border-b" style={{ borderColor: "rgba(26, 18, 7, 0.06)" }}>
        <div className="max-w-3xl mx-auto">
          <Link href="/" style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em", textDecoration: "none" }}>
            <span style={{ color: "var(--accent-warm)" }}>Mamy</span>{" "}
            <span className="text-text-primary">Voice</span>
          </Link>
        </div>
      </header>
      <main className="px-6 py-10">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
