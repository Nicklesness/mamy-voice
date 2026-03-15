import Image from "next/image";
import Link from "next/link";
import { Mic, BookOpen, Headphones, ChevronRight } from "lucide-react";
import FAQ from "@/components/FAQ";

const steps = [
  {
    icon: Mic,
    title: "Record your voice",
    desc: "Read a short passage out loud — just 30 seconds",
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
    desc: "Your child hears the story in your voice, anytime",
    color: "#F5A623",
    bg: "#FEF3C7",
  },
];

const bookCovers = [
  "goodnight-moon",
  "kolobok",
  "very-hungry-caterpillar",
  "repka",
  "where-wild-things",
  "kurochka-ryaba",
  "guess-how-much",
  "teremok",
  "giving-tree",
  "tri-medvedya",
];

const studies = [
  {
    quote: "Hearing mom's voice reduces stress hormones and triggers oxytocin — even when she's not physically there.",
    source: "University of Wisconsin",
    detail: "Proceedings of the Royal Society B, 2010",
    logo: null,
    initial: "W",
  },
  {
    quote: "Children with insufficient parental attention show worse mental and physical health in adulthood.",
    source: "American Psychological Association",
    detail: "Decades of longitudinal research",
    logo: "/images/logos/apa.jpeg",
    initial: null,
  },
  {
    quote: "Children regularly read to develop more active brain regions for imagination and comprehension.",
    source: "Cincinnati Children's Hospital",
    detail: "Published in Pediatrics, 2015",
    logo: "/images/logos/aap.jpeg",
    initial: null,
  },
  {
    quote: "The weaker the emotional bond with parents, the higher the level of depressive symptoms in adulthood.",
    source: "PubMed Central",
    detail: "Minnesota Longitudinal Study, 30+ years",
    logo: "/images/logos/pubmed.jpeg",
    initial: null,
  },
];

export default function Home() {
  return (
    <div className="min-h-svh" style={{ background: "var(--bg)" }}>
      {/* ─── Navbar ─── */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ background: "rgba(253, 246, 238, 0.9)", borderBottom: "1px solid rgba(26, 18, 7, 0.06)" }}
      >
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
                Your child hears your voice reading their favorite story — even when you can&apos;t be there.
                Record 30 seconds, choose a book, and let the magic begin.
              </p>
              <div className="mt-8">
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

        {/* ─── Book Showcase ─── */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-5xl mx-auto px-6">
            <h2
              className="text-text-primary text-center mb-3"
              style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700 }}
            >
              Stories your child will{" "}
              <span style={{ color: "var(--accent-warm)" }}>love</span>
            </h2>
            <p className="text-text-secondary text-center mb-6" style={{ fontSize: 15 }}>
              Classic tales from two traditions
            </p>
            <div className="flex justify-center gap-2 mb-8">
              <span
                className="rounded-full px-3 py-1"
                style={{ fontSize: 12, fontWeight: 600, background: "var(--accent-warm-light)", color: "var(--accent-warm)" }}
              >
                American Classics
              </span>
              <span
                className="rounded-full px-3 py-1"
                style={{ fontSize: 12, fontWeight: 600, background: "var(--accent-deep-light)", color: "var(--accent-deep)" }}
              >
                Russian Tales
              </span>
            </div>
          </div>

          {/* Horizontal scroll strip */}
          <div className="relative">
            <div
              className="flex gap-4 overflow-x-auto no-scrollbar px-6 md:px-8"
              style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
            >
              {/* Left spacer for centering on desktop */}
              <div className="shrink-0 hidden lg:block" style={{ width: "calc((100vw - 1024px) / 2)" }} />

              {bookCovers.map((bookId) => (
                <Link
                  key={bookId}
                  href={`/books/${bookId}`}
                  className="shrink-0 transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-lg rounded-xl"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <Image
                    src={`/images/books/${bookId}.png`}
                    alt={bookId}
                    width={140}
                    height={190}
                    className="rounded-xl w-[140px] h-[190px] md:w-[160px] md:h-[220px] object-cover"
                    style={{ boxShadow: "var(--shadow-md)" }}
                  />
                </Link>
              ))}

              {/* Right spacer */}
              <div className="shrink-0 hidden lg:block" style={{ width: "calc((100vw - 1024px) / 2)" }} />
            </div>

            {/* Right fade hint (mobile) */}
            <div
              className="absolute top-0 right-0 bottom-0 w-8 pointer-events-none lg:hidden"
              style={{ background: "linear-gradient(to left, var(--bg), transparent)" }}
            />
          </div>

          <div className="text-center mt-6">
            <Link
              href="/books"
              className="inline-flex items-center gap-1 text-sm font-semibold transition-colors"
              style={{ color: "var(--accent-warm)" }}
            >
              See all books <ChevronRight size={14} />
            </Link>
          </div>
        </section>

        {/* ─── Backed by Science ─── */}
        <section
          className="px-6 py-16 md:py-24"
          style={{ background: "rgba(26, 18, 7, 0.02)" }}
        >
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-text-primary text-center mb-12"
              style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700 }}
            >
              Backed by <span style={{ color: "var(--accent-deep)" }}>science</span>
            </h2>

            {/* Hero Stat */}
            <div
              className="mx-auto text-center rounded-3xl p-8 md:p-12 mb-10"
              style={{ maxWidth: 640, background: "var(--surface)", boxShadow: "var(--shadow-md)" }}
            >
              <p style={{ fontSize: "clamp(56px, 8vw, 72px)", fontWeight: 800, color: "var(--accent-deep)", lineHeight: 1 }}>
                97%
              </p>
              <p
                className="text-text-primary mt-3 mx-auto"
                style={{ fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.65, maxWidth: 440 }}
              >
                Children recognize their mother&apos;s voice with 97% accuracy in under one second
              </p>
              <div className="flex items-center justify-center gap-2.5 mt-5">
                <Image
                  src="/images/logos/stanford.jpeg"
                  alt="Stanford University"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-text-tertiary" style={{ fontSize: 13, fontWeight: 600 }}>
                  Stanford University · PNAS, 2016
                </span>
              </div>
            </div>

            {/* Evidence Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5" style={{ maxWidth: 720, margin: "0 auto" }}>
              {studies.map((study, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 md:p-6"
                  style={{ background: "var(--surface)", boxShadow: "var(--shadow-sm)" }}
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    {study.logo ? (
                      <Image
                        src={study.logo}
                        alt={study.source}
                        width={32}
                        height={32}
                        className="rounded-lg"
                        style={{ objectFit: "contain" }}
                      />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ background: "var(--accent-deep)" }}
                      >
                        {study.initial}
                      </div>
                    )}
                    <span className="text-text-secondary" style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>
                      {study.source}
                    </span>
                  </div>
                  <p className="text-text-primary" style={{ fontSize: 14, lineHeight: 1.7 }}>
                    {study.quote}
                  </p>
                  <p className="text-text-tertiary mt-2" style={{ fontSize: 11 }}>
                    {study.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="max-w-2xl mx-auto px-6 py-16 md:py-24">
          <h2
            className="text-text-primary text-center mb-10"
            style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700 }}
          >
            Common questions
          </h2>
          <FAQ />
        </section>

        {/* ─── Final CTA ─── */}
        <section className="px-6 pb-16 md:pb-24">
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
