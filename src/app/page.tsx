import Image from "next/image";
import Link from "next/link";
import { Mic, BookOpen, Headphones, ChevronRight, Shield, Lock, Heart, Clock, Sparkles } from "lucide-react";
import FAQ from "@/components/FAQ";
import { MINUTE_PACKS } from "@/lib/pricing";

const steps = [
  { icon: Mic, title: "Record your voice", desc: "Read a short passage out loud — just 30 seconds", color: "var(--accent-warm)", bg: "var(--accent-warm-light)" },
  { icon: BookOpen, title: "Choose a book", desc: "Pick from our library of beloved children's classics", color: "var(--accent-deep)", bg: "var(--accent-deep-light)" },
  { icon: Headphones, title: "Listen together", desc: "Your child hears the story in your voice, anytime", color: "#F5A623", bg: "#FEF3C7" },
];

const books = [
  { id: "goodnight-moon", title: "Goodnight Moon", author: "Margaret Wise Brown" },
  { id: "kolobok", title: "The Round Bun", author: "Russian Folk Tale" },
  { id: "very-hungry-caterpillar", title: "The Very Hungry Caterpillar", author: "Eric Carle" },
  { id: "repka", title: "The Giant Turnip", author: "Russian Folk Tale" },
  { id: "where-wild-things", title: "Where the Wild Things Are", author: "Maurice Sendak" },
  { id: "kurochka-ryaba", title: "The Golden Egg", author: "Russian Folk Tale" },
  { id: "guess-how-much", title: "Guess How Much I Love You", author: "Sam McBratney" },
  { id: "teremok", title: "The Little House", author: "Russian Folk Tale" },
  { id: "giving-tree", title: "The Giving Tree", author: "Shel Silverstein" },
  { id: "tri-medvedya", title: "The Three Bears", author: "Russian Folk Tale" },
];

const studies = [
  { quote: "Hearing mom's voice reduces stress hormones and triggers oxytocin — even when she's not physically there.", source: "University of Wisconsin-Madison", year: "2010", journal: "Proceedings of the Royal Society B" },
  { quote: "Children with insufficient parental attention show worse mental and physical health in adulthood.", source: "American Psychological Association", year: "2019", journal: "Longitudinal research review" },
  { quote: "Children regularly read to develop more active brain regions for imagination and comprehension.", source: "Cincinnati Children's Hospital", year: "2015", journal: "Pediatrics (AAP)" },
  { quote: "The weaker the emotional bond with parents, the higher the level of depressive symptoms.", source: "University of Minnesota", year: "2005", journal: "30-year longitudinal study" },
];

export default function Home() {
  return (
    <div className="min-h-svh" style={{ background: "var(--bg)" }}>
      {/* ─── Navbar ─── */}
      <nav className="sticky top-0 z-50 backdrop-blur-md" style={{ background: "rgba(253, 246, 238, 0.9)", borderBottom: "1px solid rgba(26, 18, 7, 0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: 64 }}>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em" }}>
            <span style={{ color: "var(--accent-warm)" }}>Mamy</span>{" "}
            <span className="text-text-primary">Voice</span>
          </span>
          <Link href="/record" className="inline-flex items-center justify-center rounded-full text-white text-sm font-semibold px-5 transition-all duration-200 active:scale-95" style={{ height: 36, background: "var(--gradient-cta)" }}>
            Try Free
          </Link>
        </div>
      </nav>

      <main>
        {/* ─── Hero ─── */}
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-16 md:pt-24 md:pb-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">
            <div className="lg:w-[55%]">
              <h1 className="text-text-primary" style={{ fontSize: "clamp(34px, 5.5vw, 60px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em" }}>
                Bedtime stories
                <br />
                <span style={{ color: "var(--accent-warm)" }}>in your voice</span>
              </h1>
              <p className="text-text-secondary mt-5 lg:mt-6" style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.7, maxWidth: 480 }}>
                Your child hears your voice reading their favorite story — even when you can&apos;t be there.
              </p>
              <div className="mt-10">
                <Link href="/record" className="inline-flex items-center justify-center rounded-full text-white font-semibold w-full sm:w-auto sm:px-10 transition-all duration-200 active:scale-95 animate-cta-breathe" style={{ height: 56, fontSize: 17, background: "var(--gradient-cta)", boxShadow: "var(--shadow-cta)" }}>
                  Record Your Voice <ChevronRight size={20} className="ml-1" />
                </Link>
              </div>
              <p className="text-text-tertiary mt-4" style={{ fontSize: 14 }}>
                Free to try · No credit card · 30 seconds to start
              </p>
            </div>
            <div className="lg:w-[45%] mt-12 lg:mt-0">
              <div className="relative mx-auto" style={{ maxWidth: 460 }}>
                <div className="absolute -inset-6 rounded-[32px] blur-3xl opacity-15" style={{ background: "var(--accent-warm)" }} />
                <Image src="/images/landing_hero.png" alt="Mother reading to child" width={460} height={460} className="relative rounded-[28px] w-full h-auto" priority />
              </div>
            </div>
          </div>
        </section>

        {/* ─── Trusted By (text-only, clean) ─── */}
        <section className="py-8" style={{ borderTop: "1px solid rgba(26, 18, 7, 0.04)", borderBottom: "1px solid rgba(26, 18, 7, 0.04)" }}>
          <p className="text-text-tertiary text-center" style={{ fontSize: 13, letterSpacing: "0.04em" }}>
            Research from{" "}
            <span className="text-text-secondary font-semibold">Stanford</span> ·{" "}
            <span className="text-text-secondary font-semibold">Harvard</span> ·{" "}
            <span className="text-text-secondary font-semibold">AAP</span> ·{" "}
            <span className="text-text-secondary font-semibold">University of Wisconsin</span>
          </p>
        </section>

        {/* ─── The Problem ─── */}
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center mb-12">
            <h2 className="text-text-primary" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              You know reading matters.
              <br />
              <span className="text-text-secondary" style={{ fontWeight: 400 }}>But life gets in the way.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stat: "83%", text: "of parents feel guilty about not reading enough to their kids" },
              { stat: "30M", text: "word gap by age 3 between children who are read to and those who aren't" },
              { stat: "1 in 3", text: "children are not read to daily at home" },
            ].map((item, i) => (
              <div key={i} className="text-center rounded-[20px] p-8" style={{ background: "var(--surface)", boxShadow: "var(--shadow-sm)" }}>
                <p style={{ fontSize: "clamp(40px, 6vw, 56px)", fontWeight: 800, color: "var(--accent-warm)", lineHeight: 1, letterSpacing: "-0.03em" }}>{item.stat}</p>
                <p className="text-text-secondary mt-4" style={{ fontSize: 15, lineHeight: 1.6 }}>{item.text}</p>
              </div>
            ))}
          </div>
          <p className="text-text-primary text-center mt-14 mx-auto" style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 600, lineHeight: 1.5, maxWidth: 520, letterSpacing: "-0.01em" }}>
            What if your child could hear <span style={{ color: "var(--accent-warm)" }}>your voice</span> reading to them — even when you&apos;re not home?
          </p>
        </section>

        {/* ─── Video ─── */}
        <section className="max-w-4xl mx-auto px-6 pb-20 md:pb-28">
          <div className="relative w-full overflow-hidden rounded-2xl lg:rounded-3xl" style={{ aspectRatio: "16/9", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
            <iframe className="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/E5hDhWSmeoY" title="Why mom's voice matters" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" style={{ border: "none" }} />
          </div>
        </section>

        {/* ─── How It Works ─── */}
        <section className="max-w-5xl mx-auto px-6 pb-20 md:pb-28">
          <h2 className="text-text-primary text-center mb-12" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Three simple steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: step.bg }}>
                  <step.icon size={28} style={{ color: step.color }} />
                </div>
                <h3 className="text-text-primary" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.01em" }}>{step.title}</h3>
                <p className="text-text-secondary mt-2" style={{ fontSize: 15, lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/record" className="inline-flex items-center justify-center rounded-full text-white font-semibold px-10 transition-all duration-200 active:scale-95" style={{ height: 50, fontSize: 16, background: "var(--gradient-cta)", boxShadow: "var(--shadow-cta)" }}>
              Try It Free <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </section>

        {/* ─── Book Showcase ─── */}
        <section className="py-20 md:py-28" style={{ background: "var(--surface)" }}>
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-text-primary text-center mb-3" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Stories your child will <span style={{ color: "var(--accent-warm)" }}>love</span>
            </h2>
            <p className="text-text-secondary text-center mb-10" style={{ fontSize: 16 }}>
              Classic tales from American and Russian traditions
            </p>
          </div>
          <div className="relative">
            <div className="flex gap-5 md:gap-6 overflow-x-auto no-scrollbar px-6 md:px-8 pb-4" style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
              <div className="shrink-0 hidden lg:block" style={{ width: "calc((100vw - 1100px) / 2)" }} />
              {books.map((book) => (
                <Link key={book.id} href={`/books/${book.id}`} className="shrink-0 group" style={{ scrollSnapAlign: "start" }}>
                  <div className="transition-transform duration-300 group-hover:-translate-y-2">
                    <Image
                      src={`/images/books/${book.id}.png`}
                      alt={book.title}
                      width={180}
                      height={245}
                      className="rounded-2xl w-[160px] h-[218px] md:w-[180px] md:h-[245px] object-cover transition-shadow duration-300 group-hover:shadow-xl"
                      style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.1)" }}
                    />
                    <p className="text-text-primary mt-3 w-[160px] md:w-[180px] truncate" style={{ fontSize: 14, fontWeight: 600 }}>
                      {book.title}
                    </p>
                    <p className="text-text-tertiary w-[160px] md:w-[180px] truncate" style={{ fontSize: 12 }}>
                      {book.author}
                    </p>
                  </div>
                </Link>
              ))}
              <div className="shrink-0 hidden lg:block" style={{ width: "calc((100vw - 1100px) / 2)" }} />
            </div>
            <div className="absolute top-0 right-0 bottom-0 w-12 pointer-events-none lg:hidden" style={{ background: "linear-gradient(to left, var(--surface), transparent)" }} />
          </div>
          <div className="text-center mt-8">
            <Link href="/books" className="inline-flex items-center gap-1 font-semibold transition-colors" style={{ color: "var(--accent-warm)", fontSize: 15 }}>
              See all books <ChevronRight size={16} />
            </Link>
          </div>
        </section>

        {/* ─── Backed by Science ─── */}
        <section className="px-6 py-20 md:py-28">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-text-primary text-center mb-14" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Backed by <span style={{ color: "var(--accent-deep)" }}>science</span>
            </h2>

            {/* Hero Stat */}
            <div className="mx-auto text-center rounded-[28px] p-10 md:p-14 mb-12" style={{ maxWidth: 640, background: "var(--surface)", boxShadow: "0 12px 40px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize: "clamp(64px, 10vw, 80px)", fontWeight: 800, color: "var(--accent-deep)", lineHeight: 1, letterSpacing: "-0.04em" }}>97%</p>
              <p className="text-text-primary mt-4 mx-auto" style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.6, maxWidth: 420 }}>
                Children recognize their mother&apos;s voice with 97% accuracy in under one second
              </p>
              <p className="text-text-tertiary mt-4" style={{ fontSize: 14, fontWeight: 500 }}>
                Stanford University · PNAS, 2016
              </p>
            </div>

            {/* Evidence Cards — text only, no logos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ maxWidth: 760, margin: "0 auto" }}>
              {studies.map((study, i) => (
                <div key={i} className="rounded-[20px] p-6 md:p-7" style={{ background: "var(--surface)", boxShadow: "var(--shadow-sm)" }}>
                  <p className="text-text-primary" style={{ fontSize: 15, lineHeight: 1.75 }}>
                    &ldquo;{study.quote}&rdquo;
                  </p>
                  <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(26, 18, 7, 0.06)" }}>
                    <p className="text-text-primary" style={{ fontSize: 13, fontWeight: 600 }}>{study.source}</p>
                    <p className="text-text-tertiary" style={{ fontSize: 12 }}>{study.journal}, {study.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Pricing ─── */}
        <section className="py-20 md:py-28" style={{ background: "var(--surface)" }}>
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-text-primary" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                Simple <span style={{ color: "var(--accent-deep)" }}>pricing</span>
              </h2>
              <p className="text-text-secondary mt-3" style={{ fontSize: 16 }}>
                Start free. Buy minutes when you need more.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Free tier */}
              <div className="rounded-[20px] p-7 flex flex-col" style={{ background: "var(--bg)", boxShadow: "var(--shadow-sm)", border: "1px solid rgba(26, 18, 7, 0.06)" }}>
                <p className="text-text-primary" style={{ fontSize: 18, fontWeight: 700 }}>Free</p>
                <p className="mt-2" style={{ fontSize: 36, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
                  $0
                </p>
                <p className="text-text-secondary mt-1" style={{ fontSize: 14 }}>5 minutes included</p>
                <div className="flex items-center gap-2 mt-5 text-text-secondary" style={{ fontSize: 14 }}>
                  <Clock size={15} style={{ color: "var(--success)" }} /> ~1-2 stories
                </div>
                <div className="mt-auto pt-6">
                  <Link href="/record" className="flex items-center justify-center w-full rounded-full font-semibold transition-all duration-200 active:scale-95" style={{ height: 44, fontSize: 14, color: "var(--accent-warm)", border: "1.5px solid var(--accent-warm)" }}>
                    Get Started
                  </Link>
                </div>
              </div>

              {/* Paid tiers */}
              {MINUTE_PACKS.map((pack) => (
                <div
                  key={pack.id}
                  className="rounded-[20px] p-7 flex flex-col relative"
                  style={{
                    background: pack.popular ? "var(--bg)" : "var(--bg)",
                    boxShadow: pack.popular ? "0 12px 40px rgba(139, 92, 246, 0.12)" : "var(--shadow-sm)",
                    border: pack.popular ? "2px solid var(--accent-deep)" : "1px solid rgba(26, 18, 7, 0.06)",
                  }}
                >
                  {pack.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-white" style={{ background: "var(--accent-deep)", fontSize: 11, fontWeight: 700 }}>
                      BEST VALUE
                    </span>
                  )}
                  <p className="text-text-primary" style={{ fontSize: 18, fontWeight: 700 }}>{pack.name}</p>
                  <p className="mt-2" style={{ fontSize: 36, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
                    {pack.priceDisplay}
                  </p>
                  <p className="text-text-secondary mt-1" style={{ fontSize: 14 }}>{pack.minutes} minutes</p>
                  <div className="flex items-center gap-2 mt-5 text-text-secondary" style={{ fontSize: 14 }}>
                    <Clock size={15} style={{ color: "var(--success)" }} /> ~{Math.floor(pack.minutes / 3)} stories
                  </div>
                  <div className="mt-auto pt-6">
                    <Link
                      href="/pricing"
                      className="flex items-center justify-center w-full rounded-full text-white font-semibold transition-all duration-200 active:scale-95"
                      style={{ height: 44, fontSize: 14, background: pack.popular ? "var(--accent-deep)" : "var(--gradient-cta)" }}
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Trust & Guarantees ─── */}
        <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Free to try", desc: "5 free minutes. No credit card required.", color: "var(--success)" },
              { icon: Lock, title: "Your voice is safe", desc: "Encrypted storage. Never shared with third parties.", color: "var(--accent-deep)" },
              { icon: Heart, title: "Made for busy parents", desc: "30 seconds to record. Stories in your voice forever.", color: "var(--accent-warm)" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: `${item.color}12` }}>
                  <item.icon size={24} style={{ color: item.color }} />
                </div>
                <h3 className="text-text-primary" style={{ fontSize: 17, fontWeight: 700 }}>{item.title}</h3>
                <p className="text-text-secondary mt-2" style={{ fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="max-w-2xl mx-auto px-6 pb-20 md:pb-28">
          <h2 className="text-text-primary text-center mb-12" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Questions?
          </h2>
          <FAQ />
        </section>

        {/* ─── Final CTA ─── */}
        <section className="px-6 py-20 md:py-28" style={{ background: "var(--surface)" }}>
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "var(--accent-warm-light)" }}>
              <Sparkles size={28} style={{ color: "var(--accent-warm)" }} />
            </div>
            <h2 className="text-text-primary" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Give your child the gift of
              <br />
              <span style={{ color: "var(--accent-warm)" }}>your voice</span>
            </h2>
            <p className="text-text-secondary mt-4" style={{ fontSize: 17, lineHeight: 1.65 }}>
              It takes 30 seconds to record. Your child will have it forever.
            </p>
            <div className="mt-10 max-w-sm mx-auto">
              <Link href="/record" className="flex items-center justify-center w-full rounded-full text-white font-semibold transition-all duration-200 active:scale-95 animate-cta-breathe" style={{ height: 56, fontSize: 17, background: "var(--gradient-cta)", boxShadow: "var(--shadow-cta)" }}>
                Record Your Voice Now
              </Link>
            </div>
            <p className="text-text-tertiary mt-5" style={{ fontSize: 14 }}>
              Free to try · No download needed · Works on any device
            </p>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="px-6 py-10 border-t" style={{ borderColor: "rgba(26, 18, 7, 0.06)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em" }}>
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
