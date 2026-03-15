import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-svh" style={{ background: "var(--bg)" }}>
      {/* ─── Hero Section ─── */}
      <section className="relative px-6 pt-14 pb-10">
        <div className="text-center animate-fade-in-up">
          <h1
            className="text-text-primary"
            style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em" }}
          >
            Your child hears{" "}
            <span style={{ color: "var(--accent-warm)" }}>your voice</span>
            <br />
            even when you&apos;re not there
          </h1>
          <p
            className="text-text-secondary mt-3 mx-auto"
            style={{ fontSize: 15, lineHeight: 1.6, maxWidth: 320 }}
          >
            Record 30 seconds of your voice. We&apos;ll narrate any children&apos;s book as if you were reading it yourself.
          </p>
        </div>

        {/* YouTube Video */}
        <div className="mt-7 animate-fade-in-up delay-200">
          <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ paddingBottom: "56.25%", boxShadow: "var(--shadow-lg)" }}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="Why mom's voice matters"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: "none" }}
            />
          </div>
        </div>

        {/* Stanford Quote */}
        <div className="mt-8 animate-fade-in-up delay-300">
          <blockquote className="text-center">
            <p
              className="text-text-primary italic mx-auto"
              style={{ fontSize: 15, lineHeight: 1.7, maxWidth: 320 }}
            >
              &ldquo;Hearing a mother&apos;s voice significantly accelerates a child&apos;s brain development — this can be observed scientifically&rdquo;
            </p>
          </blockquote>
          <div className="flex items-center justify-center gap-2.5 mt-4">
            <Image
              src="/images/logos/stanford.jpeg"
              alt="Stanford University"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="text-text-secondary" style={{ fontSize: 13, fontWeight: 600 }}>
              Stanford University
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 animate-fade-in-up delay-400">
          <Link href="/record">
            <Button variant="primary" size="lg" fullWidth className="animate-cta-breathe">
              Record a Book Now
            </Button>
          </Link>
          <p className="text-text-tertiary text-center mt-3" style={{ fontSize: 13 }}>
            Takes just 30 seconds. No account needed.
          </p>
        </div>
      </section>

      {/* ─── Science Section 1: Attention ─── */}
      <section className="px-6 py-10">
        <div
          className="rounded-[20px] p-6"
          style={{ background: "var(--surface)", boxShadow: "var(--shadow-sm)" }}
        >
          <p
            className="text-text-primary"
            style={{ fontSize: 15, lineHeight: 1.7 }}
          >
            Children who receive insufficient parental attention are scientifically shown to have{" "}
            <strong style={{ color: "var(--accent-warm)" }}>worse mental and physical health</strong>{" "}
            outcomes in adulthood.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <Image
              src="/images/logos/apa.jpeg"
              alt="American Psychological Association"
              width={44}
              height={44}
              className="rounded-lg"
              style={{ objectFit: "contain" }}
            />
            <span className="text-text-secondary" style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>
              American Psychological
              <br />
              Association
            </span>
          </div>
        </div>
      </section>

      {/* ─── Science Section 2: Emotional Bond ─── */}
      <section className="px-6 pb-10">
        <div
          className="rounded-[20px] p-6"
          style={{ background: "var(--surface)", boxShadow: "var(--shadow-sm)" }}
        >
          <p
            className="text-text-primary"
            style={{ fontSize: 15, lineHeight: 1.7 }}
          >
            The weaker the{" "}
            <strong style={{ color: "var(--accent-deep)" }}>emotional bond with parents</strong>
            , the lower the psychological well-being and the higher the level of depressive symptoms.
          </p>
          <div className="flex items-center gap-4 mt-5">
            <Image
              src="/images/logos/aap.jpeg"
              alt="American Academy of Pediatrics"
              width={40}
              height={40}
              className="rounded-full"
              style={{ objectFit: "contain" }}
            />
            <Image
              src="/images/logos/pubmed.jpeg"
              alt="PubMed Central"
              width={80}
              height={28}
              className="rounded"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="px-6 pb-10">
        <h2
          className="text-text-primary text-center mb-6"
          style={{ fontSize: 22, fontWeight: 700 }}
        >
          How it works
        </h2>
        <div className="flex flex-col gap-4">
          {[
            { step: "1", title: "Record your voice", desc: "Read a short passage out loud — 30 seconds is enough" },
            { step: "2", title: "Choose a book", desc: "Pick from our library of children's classics" },
            { step: "3", title: "Listen together", desc: "Your child hears the story in your voice, anytime" },
          ].map((item) => (
            <div
              key={item.step}
              className="flex gap-4 items-start rounded-2xl p-4"
              style={{ background: "var(--surface)", boxShadow: "var(--shadow-sm)" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "var(--accent-warm-light)", color: "var(--accent-warm)", fontSize: 15, fontWeight: 800 }}
              >
                {item.step}
              </div>
              <div>
                <p className="text-text-primary" style={{ fontSize: 15, fontWeight: 700 }}>
                  {item.title}
                </p>
                <p className="text-text-secondary mt-0.5" style={{ fontSize: 13 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="px-6 pb-12">
        <Link href="/record">
          <Button variant="primary" size="lg" fullWidth className="animate-cta-breathe">
            Record a Book Now
          </Button>
        </Link>
      </section>
    </div>
  );
}
