import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Shield, Lock, Heart, Clock, Sparkles, Play, SkipBack, SkipForward } from "lucide-react";
import FAQ from "@/components/FAQ";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import NavbarShadow from "@/components/NavbarShadow";
import { MINUTE_PACKS } from "@/lib/pricing";

const steps = [
  { image: "/images/landing/step_record.png", title: "Record your voice", desc: "Read a short passage out loud — just 30 seconds" },
  { image: "/images/landing/step_choose.png", title: "Choose a book", desc: "Pick from our library of beloved children's classics" },
  { image: "/images/landing/step_listen.png", title: "Listen together", desc: "Your child hears the story in your voice, anytime" },
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
  { quote: "Hearing mom's voice reduces stress hormones and triggers oxytocin — even when she's not physically there.", source: "University of Wisconsin-Madison", year: "2010", journal: "Proceedings of the Royal Society B", logo: null },
  { quote: "Children with insufficient parental attention show worse mental and physical health in adulthood.", source: "American Psychological Association", year: "2019", journal: "Longitudinal research review", logo: "/images/logos/apa-full.png" },
  { quote: "Children regularly read to develop more active brain regions for imagination and comprehension.", source: "Cincinnati Children's Hospital", year: "2015", journal: "Pediatrics (AAP)", logo: "/images/logos/aap-full.jpg" },
  { quote: "The weaker the emotional bond with parents, the higher the level of depressive symptoms.", source: "University of Minnesota", year: "2005", journal: "30-year longitudinal study", logo: null },
];

const testimonials = [
  { initials: "S", name: "Sarah", context: "mom of a 3-year-old", quote: "My daughter asks for 'mommy stories' every night now. She doesn't know I'm not actually reading!", color: "var(--accent-warm)" },
  { initials: "E", name: "Emily", context: "mom of two", quote: "I travel for work a lot. Knowing my son hears my voice at bedtime makes everything easier.", color: "var(--accent-deep)" },
  { initials: "J", name: "Jessica", context: "mom of a 4-year-old", quote: "I was skeptical but the voice quality is incredible. My kids can't tell the difference!", color: "#F5A623" },
];

export default function Home() {
  return (
    <div className="min-h-svh" style={{ background: "var(--bg)" }}>
      {/* ─── Navbar ─── */}
      <nav className="sticky top-0 z-50 backdrop-blur-md relative" style={{ background: "rgba(253, 246, 238, 0.9)", borderBottom: "1px solid rgba(26, 18, 7, 0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: 64 }}>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em" }}>
            <span style={{ color: "var(--accent-warm)" }}>Mamy</span>{" "}
            <span className="text-text-primary">Voice</span>
          </span>
          <Link href="/record" className="inline-flex items-center justify-center rounded-full text-white text-sm font-semibold px-5 transition-all duration-200 active:scale-95 hover:-translate-y-0.5 hover:shadow-lg" style={{ height: 36, background: "var(--gradient-cta)" }}>
            Try Free
          </Link>
        </div>
        <NavbarShadow />
      </nav>

      <main>
        {/* ─── Hero ─── */}
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-16 md:pt-24 md:pb-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">
            <div className="lg:w-[55%]">
              <h1 className="text-text-primary animate-fade-in-up" style={{ fontSize: "clamp(34px, 5.5vw, 60px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em" }}>
                Every Story,
                <br />
                <span style={{ color: "var(--accent-warm)" }}>In Mom&apos;s Voice</span>
              </h1>
              <p className="text-text-secondary mt-5 lg:mt-6 animate-fade-in-up delay-200" style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.7, maxWidth: 520 }}>
                AI reading books in a mother&apos;s voice — inspired by research on how a mom&apos;s voice supports a child&apos;s emotional and brain development.
              </p>
              <div className="mt-10 animate-fade-in-up delay-400">
                <Link href="/record" className="inline-flex items-center justify-center rounded-full text-white font-semibold w-full sm:w-auto sm:px-10 transition-all duration-200 active:scale-95 hover:-translate-y-0.5 hover:shadow-lg animate-cta-breathe" style={{ height: 56, fontSize: 17, background: "var(--gradient-cta)", boxShadow: "var(--shadow-cta)" }}>
                  Record Your Voice <ChevronRight size={20} className="ml-1" />
                </Link>
              </div>
              <p className="text-text-tertiary mt-4 animate-fade-in delay-500" style={{ fontSize: 14 }}>
                Free to try · No credit card · 30 seconds to start
              </p>
            </div>
            <div className="lg:w-[45%] mt-12 lg:mt-0 animate-fade-in-scale delay-300">
              <div className="relative mx-auto" style={{ maxWidth: 340 }}>
                <div className="absolute -inset-6 rounded-[32px] blur-3xl opacity-12" style={{ background: "var(--accent-warm)" }} />
                {/* Floating decorative elements */}
                <span className="absolute -top-6 -right-4 text-3xl animate-float-slow" style={{ opacity: 0.25 }}>&#9733;</span>
                <span className="absolute top-1/4 -left-8 text-2xl animate-float-slow-alt" style={{ opacity: 0.2, animationDelay: "1s" }}>&#9790;</span>
                <span className="absolute bottom-1/3 -right-6 text-2xl animate-float-slow-reverse" style={{ opacity: 0.22, animationDelay: "2s" }}>&#9829;</span>
                <span className="absolute -bottom-4 left-1/4 text-2xl animate-float-slow" style={{ opacity: 0.2, animationDelay: "0.5s" }}>&#9834;</span>
                <span className="absolute top-1/2 -left-4 text-sm animate-float-slow-alt" style={{ opacity: 0.18, animationDelay: "3s" }}>&#9829;</span>
                <span className="absolute top-10 right-1/4 text-sm animate-float-slow-reverse" style={{ opacity: 0.15, animationDelay: "1.5s" }}>&#10022;</span>
                {/* Player mockup card */}
                <div className="relative rounded-[28px] p-5 md:p-6" style={{ background: "var(--surface)", boxShadow: "0 20px 60px rgba(232, 115, 74, 0.15), 0 4px 20px rgba(0,0,0,0.06)" }}>
                  <div className="w-full rounded-2xl mb-4 overflow-hidden" style={{ aspectRatio: "1/1" }}>
                    <Image src="/images/landing/player_mockup.png" alt="Child sleeping while listening" width={300} height={300} className="w-full h-full object-cover" priority />
                  </div>
                  <p className="text-text-primary text-center" style={{ fontSize: 16, fontWeight: 700 }}>Goodnight Moon</p>
                  <p className="text-text-secondary text-center mt-0.5" style={{ fontSize: 13 }}>Margaret Wise Brown</p>
                  <div className="mt-4">
                    <div className="w-full h-1.5 rounded-full" style={{ background: "var(--bg-warm)" }}>
                      <div className="h-full rounded-full progress-bar-animated" style={{ width: "60%", background: "var(--gradient-cta)" }} />
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-text-tertiary" style={{ fontSize: 11 }}>1:24</span>
                      <span className="text-text-tertiary" style={{ fontSize: 11 }}>3:15</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "var(--bg-warm)" }}>
                      <SkipBack size={16} className="text-text-secondary" />
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ background: "var(--gradient-cta)", boxShadow: "var(--shadow-cta)" }}>
                      <Play size={20} className="ml-0.5" />
                    </div>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "var(--bg-warm)" }}>
                      <SkipForward size={16} className="text-text-secondary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Trusted By (logos) ─── */}
        <ScrollReveal>
          <section className="py-12 md:py-16 px-6" style={{ background: "white" }}>
            <p className="text-text-tertiary text-center mb-8" style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Research backed by
            </p>
            <div className="flex items-center justify-center gap-12 md:gap-20 flex-wrap max-w-4xl mx-auto">
              <Image src="/images/logos/stanford-full.png" alt="Stanford School of Medicine" width={300} height={80} className="opacity-50 hover:opacity-80 transition-opacity duration-300 h-[50px] md:h-[65px] w-auto" style={{ objectFit: "contain" }} />
              <Image src="/images/logos/apa-full.png" alt="American Psychological Association" width={300} height={80} className="opacity-50 hover:opacity-80 transition-opacity duration-300 h-[44px] md:h-[58px] w-auto" style={{ objectFit: "contain" }} />
              <Image src="/images/logos/aap-full.jpg" alt="American Academy of Pediatrics" width={300} height={80} className="opacity-50 hover:opacity-80 transition-opacity duration-300 h-[50px] md:h-[65px] w-auto" style={{ objectFit: "contain" }} />
            </div>
          </section>
        </ScrollReveal>

        {/* ─── The Problem ─── */}
        <ScrollReveal>
          <section className="relative max-w-5xl mx-auto px-6 py-20 md:py-28">
            {/* Decorative elements */}
            <span className="absolute top-12 left-4 md:left-8 text-2xl animate-float-slow" style={{ opacity: 0.18 }}>&#9733;</span>
            <span className="absolute top-24 right-6 md:right-12 text-3xl animate-float-slow-alt" style={{ opacity: 0.15, animationDelay: "1.5s" }}>&#9829;</span>
            <span className="absolute bottom-16 left-10 text-xl animate-float-slow-reverse" style={{ opacity: 0.12, animationDelay: "2.5s" }}>&#9834;</span>
            <span className="absolute bottom-32 right-8 text-lg animate-float-slow" style={{ opacity: 0.14, animationDelay: "0.5s" }}>&#10022;</span>
            <span className="absolute top-1/2 left-2 text-sm animate-float-slow-alt" style={{ opacity: 0.1, animationDelay: "3s" }}>&#9790;</span>
            <div className="text-center mb-12">
              <h2 className="text-text-primary" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                You know reading matters.
                <br />
                <span className="text-text-secondary" style={{ fontWeight: 400 }}>But life gets in the way.</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stat: "83%", suffix: "%", text: "of parents feel guilty about not reading enough to their kids" },
                { stat: "30M", suffix: "M", text: "word gap by age 3 between children who are read to and those who aren't" },
                { stat: "1 in 3", suffix: "", text: "children are not read to daily at home" },
              ].map((item, i) => (
                <div key={i} className="text-center rounded-[20px] p-8" style={{ background: "var(--surface)", boxShadow: "var(--shadow-sm)" }}>
                  <p style={{ fontSize: "clamp(40px, 6vw, 56px)", fontWeight: 800, color: "var(--accent-warm)", lineHeight: 1, letterSpacing: "-0.03em" }}>
                    {item.stat === "1 in 3" ? item.stat : <AnimatedCounter value={item.stat} />}
                  </p>
                  <p className="text-text-secondary mt-4" style={{ fontSize: 15, lineHeight: 1.6 }}>{item.text}</p>
                </div>
              ))}
            </div>
            <p className="text-text-primary text-center mt-14 mx-auto" style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 600, lineHeight: 1.5, maxWidth: 520, letterSpacing: "-0.01em" }}>
              What if your child could hear <span style={{ color: "var(--accent-warm)" }}>your voice</span> reading to them — even when you&apos;re not home?
            </p>
          </section>
        </ScrollReveal>

        {/* ─── Video ─── */}
        <ScrollReveal>
          <section className="max-w-4xl mx-auto px-6 pb-20 md:pb-28">
            <div className="relative w-full overflow-hidden rounded-2xl lg:rounded-3xl" style={{ aspectRatio: "16/9", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
              <iframe className="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/E5hDhWSmeoY" title="Why mom's voice matters" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" style={{ border: "none" }} />
            </div>
          </section>
        </ScrollReveal>

        {/* ─── How It Works ─── */}
        <ScrollReveal>
          <section className="relative max-w-5xl mx-auto px-6 pb-20 md:pb-28">
            <span className="absolute top-4 right-6 text-2xl animate-float-slow" style={{ opacity: 0.15 }}>&#9733;</span>
            <span className="absolute bottom-16 left-4 text-xl animate-float-slow-alt" style={{ opacity: 0.12, animationDelay: "1.5s" }}>&#9829;</span>
            <h2 className="text-text-primary text-center mb-12" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Three simple steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl overflow-hidden mx-auto mb-5" style={{ boxShadow: "var(--shadow-sm)" }}>
                    <Image src={step.image} alt={step.title} width={144} height={144} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-text-primary" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.01em" }}>{step.title}</h3>
                  <p className="text-text-secondary mt-2" style={{ fontSize: 15, lineHeight: 1.65 }}>{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/record" className="inline-flex items-center justify-center rounded-full text-white font-semibold px-10 transition-all duration-200 active:scale-95 hover:-translate-y-0.5 hover:shadow-lg" style={{ height: 50, fontSize: 16, background: "var(--gradient-cta)", boxShadow: "var(--shadow-cta)" }}>
                Try It Free <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* ─── Book Showcase ─── */}
        <ScrollReveal>
          <section className="relative py-20 md:py-28" style={{ background: "var(--surface)" }}>
            {/* Decorative elements */}
            <span className="absolute top-8 right-8 text-3xl animate-float-slow" style={{ opacity: 0.2 }}>&#9733;</span>
            <span className="absolute top-16 left-4 text-2xl animate-float-slow-alt" style={{ opacity: 0.16, animationDelay: "2s" }}>&#9829;</span>
            <span className="absolute bottom-12 right-12 text-2xl animate-float-slow-reverse" style={{ opacity: 0.14, animationDelay: "1s" }}>&#9834;</span>
            <span className="absolute top-1/2 right-4 text-xl animate-float-slow" style={{ opacity: 0.12, animationDelay: "3s" }}>&#9790;</span>
            <span className="absolute bottom-24 left-8 text-lg animate-float-slow-alt" style={{ opacity: 0.1, animationDelay: "0.5s" }}>&#10022;</span>
            <span className="absolute top-1/3 right-1/4 text-sm animate-float-slow-reverse" style={{ opacity: 0.13, animationDelay: "2.5s" }}>&#9733;</span>
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-text-primary text-center mb-3" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                Stories your child will <span style={{ color: "var(--accent-warm)" }}>love</span>
              </h2>
              <p className="text-text-secondary text-center mb-10" style={{ fontSize: 16 }}>
                Classic tales from American and Russian traditions
              </p>
            </div>
            <div className="max-w-4xl mx-auto px-6">
              <div className="grid grid-cols-5 gap-3 md:gap-5">
                {books.slice(0, 5).map((book) => (
                  <Link key={book.id} href={`/books/${book.id}`} className="group">
                    <div className="transition-transform duration-300 group-hover:-translate-y-2">
                      <Image src={`/images/books/${book.id}.png`} alt={book.title} width={160} height={218}
                        className="rounded-xl md:rounded-2xl w-full object-cover transition-shadow duration-300 group-hover:shadow-xl"
                        style={{ aspectRatio: "3/4", boxShadow: "0 8px 30px rgba(0,0,0,0.1)" }} />
                      <p className="text-text-primary mt-2 truncate" style={{ fontSize: "clamp(10px, 1.4vw, 14px)", fontWeight: 600 }}>{book.title}</p>
                      <p className="text-text-tertiary truncate hidden md:block" style={{ fontSize: 12 }}>{book.author}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-3 md:gap-5 mt-3 md:mt-5">
                {books.slice(5, 10).map((book) => (
                  <Link key={book.id} href={`/books/${book.id}`} className="group">
                    <div className="transition-transform duration-300 group-hover:-translate-y-2">
                      <Image src={`/images/books/${book.id}.png`} alt={book.title} width={160} height={218}
                        className="rounded-xl md:rounded-2xl w-full object-cover transition-shadow duration-300 group-hover:shadow-xl"
                        style={{ aspectRatio: "3/4", boxShadow: "0 8px 30px rgba(0,0,0,0.1)" }} />
                      <p className="text-text-primary mt-2 truncate" style={{ fontSize: "clamp(10px, 1.4vw, 14px)", fontWeight: 600 }}>{book.title}</p>
                      <p className="text-text-tertiary truncate hidden md:block" style={{ fontSize: 12 }}>{book.author}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href="/books" className="inline-flex items-center gap-1 font-semibold transition-colors" style={{ color: "var(--accent-warm)", fontSize: 15 }}>
                See all books <ChevronRight size={16} />
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* ─── Backed by Science ─── */}
        <ScrollReveal>
          <section className="px-6 py-20 md:py-28">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-text-primary text-center mb-14" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                Backed by <span style={{ color: "var(--accent-deep)" }}>science</span>
              </h2>

              {/* Hero Stat */}
              <div className="relative mx-auto text-center rounded-[28px] p-10 md:p-14 mb-12" style={{ maxWidth: 640, background: "var(--surface)", boxShadow: "0 12px 40px rgba(0,0,0,0.06)" }}>
                <span className="absolute -top-4 -right-4 text-2xl animate-float-slow" style={{ opacity: 0.25 }}>&#10022;</span>
                <span className="absolute -bottom-3 -left-3 text-2xl animate-float-slow-alt" style={{ opacity: 0.2, animationDelay: "1.5s" }}>&#9733;</span>
                <span className="absolute top-1/2 -right-6 text-xl animate-float-slow-reverse" style={{ opacity: 0.18, animationDelay: "2s" }}>&#9829;</span>
                <span className="absolute -top-2 left-1/4 text-lg animate-float-slow" style={{ opacity: 0.15, animationDelay: "0.5s" }}>&#9834;</span>
                <p style={{ fontSize: "clamp(64px, 10vw, 80px)", fontWeight: 800, color: "var(--accent-deep)", lineHeight: 1, letterSpacing: "-0.04em" }}>
                  <AnimatedCounter value="97%" />
                </p>
                <p className="text-text-primary mt-4 mx-auto" style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.6, maxWidth: 420 }}>
                  Children recognize their mother&apos;s voice with 97% accuracy in under one second
                </p>
                <div className="flex items-center justify-center gap-3 mt-5">
                  <Image src="/images/logos/stanford-full.png" alt="Stanford School of Medicine" width={160} height={40} className="h-[30px] w-auto opacity-60" style={{ objectFit: "contain" }} />
                </div>
                <p className="text-text-tertiary mt-2" style={{ fontSize: 13 }}>
                  PNAS, 2016
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
                      {study.logo ? (
                        <Image src={study.logo} alt={study.source} width={140} height={32} className="h-[24px] w-auto mb-1.5 opacity-60" style={{ objectFit: "contain" }} />
                      ) : (
                        <p className="text-text-primary" style={{ fontSize: 13, fontWeight: 600 }}>{study.source}</p>
                      )}
                      <p className="text-text-tertiary" style={{ fontSize: 12 }}>{study.journal}, {study.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ─── Testimonials ─── */}
        <ScrollReveal>
          <section className="py-20 md:py-28" style={{ background: "var(--bg-warm)" }}>
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-text-primary text-center mb-12" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                What moms are <span style={{ color: "var(--accent-warm)" }}>saying</span>
              </h2>
              {/* Mobile: horizontal scroll, Desktop: 3-col grid */}
              <div className="flex gap-5 overflow-x-auto no-scrollbar md:grid md:grid-cols-3 md:overflow-visible pb-4 md:pb-0">
                {testimonials.map((t, i) => (
                  <div key={i} className="shrink-0 w-[300px] md:w-auto rounded-[20px] p-6 md:p-7 flex flex-col" style={{ background: "var(--surface)", boxShadow: "var(--shadow-sm)" }}>
                    <p className="text-text-primary italic flex-1" style={{ fontSize: 15, lineHeight: 1.75 }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 mt-5 pt-4" style={{ borderTop: "1px solid rgba(26, 18, 7, 0.06)" }}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: t.color, fontSize: 15 }}>
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-text-primary" style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</p>
                        <p className="text-text-tertiary" style={{ fontSize: 12 }}>{t.context}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ─── Pricing ─── */}
        <ScrollReveal>
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

              {/* Free badge */}
              <div className="flex items-center justify-center gap-2 mb-8 rounded-full px-5 py-2.5 mx-auto w-fit" style={{ background: "var(--bg)", border: "1px solid rgba(26, 18, 7, 0.08)" }}>
                <Sparkles size={16} style={{ color: "var(--success)" }} />
                <span className="text-text-primary" style={{ fontSize: 14, fontWeight: 600 }}>5 free minutes for every new account</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                    <p className="text-text-secondary" style={{ fontSize: 18, fontWeight: 700 }}>{pack.name}</p>
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
                        className="flex items-center justify-center w-full rounded-full text-white font-semibold transition-all duration-200 active:scale-95 hover:-translate-y-0.5 hover:shadow-lg"
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
        </ScrollReveal>

        {/* ─── Trust & Guarantees ─── */}
        <ScrollReveal>
          <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: Shield, title: "Free to try", desc: "5 free minutes for every new account. No credit card required.", color: "var(--success)", image: "/images/landing/trust_free.png" },
                { icon: Lock, title: "Your voice is safe", desc: "Encrypted storage. Never shared with third parties.", color: "var(--accent-deep)", image: "/images/landing/trust_hands.png" },
                { icon: Heart, title: "Made for busy parents", desc: "30 seconds to record. Your child gets stories in your voice forever.", color: "var(--accent-warm)", image: "/images/landing/trust_parent.png" },
              ].map((item, i) => (
                <div key={i} className="rounded-[20px] p-6 text-center" style={{ background: "var(--surface)", boxShadow: "var(--shadow-sm)" }}>
                  <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                    <Image src={item.image} alt={item.title} width={80} height={80} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-text-primary" style={{ fontSize: 17, fontWeight: 700 }}>{item.title}</h3>
                  <p className="text-text-secondary mt-2" style={{ fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ─── FAQ ─── */}
        <ScrollReveal>
          <section className="max-w-2xl mx-auto px-6 pb-20 md:pb-28">
            <h2 className="text-text-primary text-center mb-12" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Questions?
            </h2>
            <FAQ />
            <p className="text-center mt-8">
              <a href="mailto:support@mamyvoice.com" className="font-semibold transition-colors" style={{ color: "var(--accent-warm)", fontSize: 15 }}>
                Still have questions? Contact us
              </a>
            </p>
          </section>
        </ScrollReveal>

        {/* ─── Final CTA ─── */}
        <ScrollReveal>
          <section className="relative px-6 py-20 md:py-28" style={{ background: "var(--surface)" }}>
            {/* Decorative elements */}
            <span className="absolute top-10 left-[10%] text-3xl animate-float-slow" style={{ opacity: 0.2 }}>&#9733;</span>
            <span className="absolute top-16 right-[8%] text-2xl animate-float-slow-alt" style={{ opacity: 0.18, animationDelay: "1s" }}>&#9829;</span>
            <span className="absolute bottom-10 left-[15%] text-2xl animate-float-slow-reverse" style={{ opacity: 0.16, animationDelay: "2s" }}>&#9834;</span>
            <span className="absolute bottom-20 right-[12%] text-3xl animate-float-slow" style={{ opacity: 0.15, animationDelay: "0.5s" }}>&#9790;</span>
            <span className="absolute top-1/2 left-[5%] text-xl animate-float-slow-alt" style={{ opacity: 0.14, animationDelay: "3s" }}>&#10022;</span>
            <span className="absolute top-1/3 right-[5%] text-lg animate-float-slow-reverse" style={{ opacity: 0.12, animationDelay: "1.5s" }}>&#9733;</span>
            <span className="absolute bottom-1/3 left-[25%] text-sm animate-float-slow" style={{ opacity: 0.18, animationDelay: "2.5s" }}>&#9829;</span>
            <span className="absolute top-24 left-[30%] text-xl animate-float-slow-alt" style={{ opacity: 0.1, animationDelay: "0.8s" }}>&#9734;</span>
            <div className="max-w-xl mx-auto text-center relative z-10">
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
                <Link href="/record" className="flex items-center justify-center w-full rounded-full text-white font-semibold transition-all duration-200 active:scale-95 hover:-translate-y-0.5 hover:shadow-lg animate-cta-breathe" style={{ height: 56, fontSize: 17, background: "var(--gradient-cta)", boxShadow: "var(--shadow-cta)" }}>
                  Record Your Voice Now
                </Link>
              </div>
              <p className="text-text-tertiary mt-5" style={{ fontSize: 14 }}>
                Free to try · No download needed · Works on any device
              </p>
            </div>
          </section>
        </ScrollReveal>
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
