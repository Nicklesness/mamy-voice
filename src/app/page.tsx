import Image from "next/image";
import Link from "next/link";
import { Mic, BookOpen, Headphones, ChevronRight } from "lucide-react";

const studies = [
  {
    quote:
      "A mother's voice activates a child's brain more powerfully than any other sound — lighting up regions responsible for emotion, reward, and social bonding.",
    source: "Stanford University School of Medicine",
    detail: "PNAS, 2016 — Children recognize their mother's voice with 97% accuracy in under 1 second",
    logo: "/images/logos/stanford.jpeg",
    logoSize: 40,
    rounded: true,
  },
  {
    quote:
      "Just hearing mom's voice reduces a child's stress hormones and triggers oxytocin release — even when she's not physically present.",
    source: "University of Wisconsin-Madison",
    detail: "Proceedings of the Royal Society B, 2010",
    logo: null,
    logoSize: 0,
    rounded: false,
  },
  {
    quote:
      "Children who receive insufficient parental attention show significantly worse mental and physical health outcomes in adulthood.",
    source: "American Psychological Association",
    detail: "Based on decades of longitudinal research",
    logo: "/images/logos/apa.jpeg",
    logoSize: 44,
    rounded: false,
  },
  {
    quote:
      "Children regularly read to at home develop more active brain regions for imagination and narrative comprehension — visible on brain scans.",
    source: "Cincinnati Children's Hospital",
    detail: "Published in Pediatrics (AAP journal), 2015",
    logo: "/images/logos/aap.jpeg",
    logoSize: 40,
    rounded: true,
  },
  {
    quote:
      "The weaker the emotional bond with parents, the lower the psychological well-being and the higher the level of depressive symptoms in adulthood.",
    source: "PubMed Central / Minnesota Longitudinal Study",
    detail: "30+ years of research tracking children into adulthood",
    logo: "/images/logos/pubmed.jpeg",
    logoSize: 80,
    rounded: false,
  },
];

const steps = [
  {
    icon: Mic,
    title: "Record your voice",
    desc: "Read a short passage out loud — just 30 seconds is enough",
    color: "var(--accent-warm)",
    bg: "var(--accent-warm-light)",
  },
  {
    icon: BookOpen,
    title: "Choose a book",
    desc: "Pick from our library of beloved children's classics",
    color: "var(--accent-deep)",
    bg: "var(--accent-deep-light)",
  },
  {
    icon: Headphones,
    title: "Listen together",
    desc: "Your child hears the story in your voice — anytime, anywhere",
    color: "var(--amber)",
    bg: "var(--amber-light, #FEF3C7)",
  },
];

export default function Home() {
  return (
    <div className="min-h-svh" style={{ background: "var(--bg)" }}>
      {/* ─── Navbar ─── */}
      <nav className="sticky top-0 z-50 backdrop-blur-md" style={{ background: "rgba(253, 246, 238, 0.9)", borderBottom: "1px solid rgba(26, 18, 7, 0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: 64 }}>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em" }}>
            <span style={{ color: "var(--accent-warm)" }}>Mamy</span>{" "}
            <span className="text-text-primary">Voice</span>
          </span>
          <Link
            href="/record"
            className="inline-flex items-center justify-center rounded-full text-white text-sm font-semibold px-5 transition-all duration-200 active:scale-95"
            style={{ height: 36, background: "var(--gradient-cta)" }}
          >
            Try Free
          </Link>
        </div>
      </nav>

      <main>
      {/* ─── Hero ─── */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          {/* Text */}
          <div className="lg:w-[55%] animate-fade-in-up">
            <h1
              className="text-text-primary"
              style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              Bedtime stories
              <br />
              <span style={{ color: "var(--accent-warm)" }}>in your voice</span>
            </h1>
            <p
              className="text-text-secondary mt-4 lg:mt-5"
              style={{ fontSize: "clamp(15px, 2vw, 20px)", lineHeight: 1.65, maxWidth: 520 }}
            >
              Your child hears your voice reading their favorite story — even when you can&apos;t be there. Record 30 seconds, choose a book, and let the magic begin.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="/record"
                className="inline-flex items-center justify-center rounded-full text-white font-semibold w-full sm:w-auto sm:px-10 transition-all duration-200 active:scale-95 animate-cta-breathe"
                style={{ height: 52, fontSize: 16, background: "var(--gradient-cta)", boxShadow: "var(--shadow-cta)" }}
              >
                Record Your Voice
                <ChevronRight size={18} className="ml-1" />
              </Link>
            </div>
            <p className="text-text-tertiary mt-3" style={{ fontSize: 13 }}>
              Free to try. No credit card needed.
            </p>
          </div>

          {/* Hero Image */}
          <div className="lg:w-[45%] mt-10 lg:mt-0 animate-fade-in-scale delay-200">
            <div className="relative mx-auto" style={{ maxWidth: 420 }}>
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-20"
                style={{ background: "var(--accent-warm)" }}
              />
              <Image
                src="/images/landing_hero.png"
                alt="Mother reading to child"
                width={420}
                height={420}
                className="relative rounded-3xl w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Video Section ─── */}
      <section className="max-w-4xl mx-auto px-6 pb-16 md:pb-24">
        <div className="text-center mb-8 animate-fade-in-up">
          <h2
            className="text-text-primary"
            style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700 }}
          >
            Why your voice <span style={{ color: "var(--accent-warm)" }}>matters</span>
          </h2>
        </div>
        <div
          className="relative w-full overflow-hidden rounded-2xl lg:rounded-3xl"
          style={{ aspectRatio: "16/9", boxShadow: "var(--shadow-lg)" }}
        >
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="Why mom's voice matters"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            style={{ border: "none" }}
          />
        </div>
      </section>

      {/* ─── Key Stat ─── */}
      <section className="px-6 pb-16 md:pb-24">
        <div
          className="max-w-3xl mx-auto text-center rounded-3xl p-8 md:p-12"
          style={{ background: "var(--surface)", boxShadow: "var(--shadow-md)" }}
        >
          <p
            className="text-text-primary italic mx-auto"
            style={{ fontSize: "clamp(17px, 2.5vw, 22px)", lineHeight: 1.7, maxWidth: 560 }}
          >
            &ldquo;Hearing a mother&apos;s voice activates a child&apos;s brain more powerfully than any other sound in the world&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <Image
              src="/images/logos/stanford.jpeg"
              alt="Stanford University"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="text-text-secondary" style={{ fontSize: 14, fontWeight: 600 }}>
              Stanford University, 2016
            </span>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="max-w-5xl mx-auto px-6 pb-16 md:pb-24">
        <h2
          className="text-text-primary text-center mb-10"
          style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700 }}
        >
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 md:p-8 text-center md:text-left"
              style={{ background: "var(--surface)", boxShadow: "var(--shadow-sm)" }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-4"
                style={{ background: step.bg }}
              >
                <step.icon size={24} style={{ color: step.color }} />
              </div>
              <h3 className="text-text-primary" style={{ fontSize: 18, fontWeight: 700 }}>
                {step.title}
              </h3>
              <p className="text-text-secondary mt-2" style={{ fontSize: 14, lineHeight: 1.6 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Science / Research Section ─── */}
      <section className="px-6 pb-16 md:pb-24" style={{ background: "rgba(26, 18, 7, 0.02)" }}>
        <div className="max-w-5xl mx-auto pt-16 md:pt-24">
          <h2
            className="text-text-primary text-center mb-4"
            style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700 }}
          >
            Backed by <span style={{ color: "var(--accent-deep)" }}>science</span>
          </h2>
          <p className="text-text-secondary text-center mb-12" style={{ fontSize: 15, maxWidth: 480, margin: "0 auto" }}>
            Leading universities and medical institutions confirm: a parent&apos;s voice is irreplaceable for a child&apos;s development.
          </p>

          <div className="flex flex-col gap-6">
            {studies.map((study, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 md:p-8 md:flex md:items-start md:gap-8"
                style={{ background: "var(--surface)", boxShadow: "var(--shadow-sm)" }}
              >
                <div className="md:flex-1">
                  <p
                    className="text-text-primary"
                    style={{ fontSize: 15, lineHeight: 1.75 }}
                  >
                    &ldquo;{study.quote}&rdquo;
                  </p>
                  <p className="text-text-tertiary mt-2" style={{ fontSize: 12 }}>
                    {study.detail}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-4 md:mt-0 md:shrink-0">
                  {study.logo && (
                    <Image
                      src={study.logo}
                      alt={study.source}
                      width={study.logoSize}
                      height={study.logoSize}
                      className={study.rounded ? "rounded-full" : "rounded-lg"}
                      style={{ objectFit: "contain" }}
                    />
                  )}
                  <span
                    className="text-text-secondary"
                    style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}
                  >
                    {study.source}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-xl mx-auto text-center">
          <h2
            className="text-text-primary"
            style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700 }}
          >
            Give your child the gift of
            <br />
            <span style={{ color: "var(--accent-warm)" }}>your voice</span>
          </h2>
          <p className="text-text-secondary mt-4" style={{ fontSize: 16, lineHeight: 1.65 }}>
            It takes 30 seconds to record. Your child will have it forever.
          </p>
          <div className="mt-8 max-w-sm mx-auto">
            <Link
              href="/record"
              className="flex items-center justify-center w-full rounded-full text-white font-semibold transition-all duration-200 active:scale-95 animate-cta-breathe"
              style={{ height: 52, fontSize: 16, background: "var(--gradient-cta)", boxShadow: "var(--shadow-cta)" }}
            >
              Record Your Voice Now
            </Link>
          </div>
        </div>
      </section>

      </main>

      {/* ─── Footer ─── */}
      <footer className="px-6 py-8 border-t" style={{ borderColor: "rgba(26, 18, 7, 0.06)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span style={{ fontSize: 15, fontWeight: 700 }}>
            <span style={{ color: "var(--accent-warm)" }}>Mamy</span>{" "}
            <span className="text-text-primary">Voice</span>
          </span>
          <p className="text-text-tertiary" style={{ fontSize: 13 }}>
            &copy; {new Date().getFullYear()} Mamy Voice. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
