import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, BookOpen, Brain, Heart, Baby, GraduationCap, AlertTriangle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Research — Why Mom's Voice Matters",
  description:
    "Peer-reviewed studies from Stanford, APA, PubMed and more proving the lasting impact of a mother's voice on child brain development, emotional bonding, and lifelong mental health.",
};

interface Study {
  category: string;
  categoryIcon: typeof Brain;
  categoryColor: string;
  title: string;
  source: string;
  year: string;
  finding: string;
  summary: string;
  url: string;
}

const studies: Study[] = [
  // ─── Brain & Voice ───
  {
    category: "Brain Development",
    categoryIcon: Brain,
    categoryColor: "var(--accent-deep)",
    title: "Mother's Voice Activates More Brain Regions Than Any Other Sound",
    source: "Stanford Medicine",
    year: "2025",
    finding:
      "A mother's voice triggers not just auditory processing, but emotion, reward, and social bonding circuits in a child's brain.",
    summary:
      "Stanford researchers used fMRI to show that children's brains respond to their mother's voice with far greater neural activation than to unfamiliar voices. The response spans brain regions responsible for emotion, reward processing, face recognition, and social cognition — explaining why mom's voice is uniquely calming and developmentally powerful.",
    url: "https://med.stanford.edu/news/all-news/2025/10/mothers-voice-premature.html",
  },
  {
    category: "Brain Development",
    categoryIcon: Brain,
    categoryColor: "var(--accent-deep)",
    title: "Neural Signatures of Maternal Voice Processing in Children",
    source: "Frontiers in Human Neuroscience",
    year: "2025",
    finding:
      "Children process their mother's voice through a dedicated neural circuit that differs fundamentally from how they process other voices.",
    summary:
      "This peer-reviewed study demonstrates that a mother's voice engages a specialized network in children's brains, activating areas linked to emotional regulation, memory formation, and language development. The findings suggest that regular exposure to a mother's voice strengthens these neural pathways during critical developmental windows.",
    url: "https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2025.1673471/full",
  },
  // ─── Infant Development ───
  {
    category: "Infant Development",
    categoryIcon: Baby,
    categoryColor: "var(--accent-warm)",
    title: "Maternal Voice Reduces Stress and Improves Outcomes in Premature Infants",
    source: "PubMed Central",
    year: "2017",
    finding:
      "Premature infants exposed to recordings of their mother's voice showed significantly better developmental outcomes.",
    summary:
      "A landmark study on Brazilian infants found that premature babies who heard recorded maternal voice and heartbeat sounds showed lower stress hormones, better feeding behaviors, and improved neurological development. The effect was measurable even when the mother wasn't physically present — the voice recording alone was enough.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5744270/",
  },
  {
    category: "Infant Development",
    categoryIcon: Baby,
    categoryColor: "var(--accent-warm)",
    title: "Impact of Parental Voice on Neonatal Brain Development",
    source: "PubMed Central",
    year: "2023",
    finding:
      "Consistent exposure to parental voice in early life shapes brain architecture in regions critical for language and emotion.",
    summary:
      "This research review synthesizes evidence showing that a parent's voice is the single most important auditory stimulus for infant brain development. Regular voice exposure strengthens neural connections in language centers and emotional regulation areas, with effects detectable through brain imaging even months later.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9923605/",
  },
  // ─── Reading & Language ───
  {
    category: "Reading & Language",
    categoryIcon: BookOpen,
    categoryColor: "var(--success)",
    title: "Daily Parental Reading Improves Infant Language Scores",
    source: "Journal of the American Board of Family Medicine",
    year: "2022",
    finding:
      "Infants read to daily in their first year scored significantly higher on language development assessments.",
    summary:
      "Marshall University researchers tracked infants whose parents read to them consistently from birth. By 12 months, these children showed measurably higher language comprehension and expression scores compared to peers. The study, published with a DOI and cited by American universities, provides strong evidence that daily reading — in a parent's voice — directly accelerates language acquisition.",
    url: "https://www.jabfm.org/content/35/6/1156",
  },
  {
    category: "Reading & Language",
    categoryIcon: GraduationCap,
    categoryColor: "var(--success)",
    title: "Marshall University: Reading in the First Year Transforms Language Development",
    source: "Marshall University / Joan C. Edwards School of Medicine",
    year: "2022",
    finding:
      "Consistent daily reading by parents in the first year of life leads to significantly improved language scores in infants.",
    summary:
      "This university-backed study showed that parents who read aloud to their infants every day saw dramatic improvements in their child's language capabilities. The key factor wasn't the content of the books — it was the consistent, daily exposure to a parent's voice reading expressively. Even short daily sessions produced measurable cognitive benefits.",
    url: "https://jcesom.marshall.edu/news/musom-news/marshall-university-study-shows-daily-consistent-parental-reading-in-the-first-year-of-life-improves-infants-language-scores/",
  },
  // ─── Long-term Impact ───
  {
    category: "Long-term Impact",
    categoryIcon: AlertTriangle,
    categoryColor: "#ef4444",
    title: "Insufficient Parental Support Linked to Depression and Chronic Health Issues in Adults",
    source: "American Psychological Association",
    year: "2019",
    finding:
      "Adults who lacked parental support in childhood show higher rates of depression and worse physical health across their entire lifespan.",
    summary:
      "In a study of nearly 3,000 adults, the APA found that insufficient parental support in childhood is associated with higher depressive symptoms, more frequent chronic health conditions, and worse overall mental health in adulthood. These effects persisted throughout life — the damage from emotional neglect in childhood doesn't fade with time.",
    url: "https://www.eurekalert.org/news-releases/588329",
  },
  {
    category: "Long-term Impact",
    categoryIcon: Heart,
    categoryColor: "#ef4444",
    title: "Childhood Emotional Neglect Predicts Low Wellbeing and Depression in Midlife",
    source: "PubMed Central — Epidemiological Study",
    year: "2024",
    finding:
      "The less emotional connection with parents in childhood, the higher the depression and the lower the psychological wellbeing in adulthood.",
    summary:
      "This large-scale study of 2,079 middle-aged adults found that childhood emotional neglect — measured as low parental bonding — directly predicts worse psychological wellbeing and higher depressive symptoms decades later. The difference between the most and least supported childhood groups was 0.65–0.74 standard deviations on health scales, a significant effect in psychology.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10904890/",
  },
];

const categories = [...new Set(studies.map((s) => s.category))];

export default function ResourcesPage() {
  return (
    <div className="min-h-svh" style={{ background: "var(--bg)" }}>
      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{
          background: "rgba(253, 246, 238, 0.9)",
          borderBottom: "1px solid rgba(26, 18, 7, 0.06)",
        }}
      >
        <div
          className="max-w-7xl mx-auto px-6 flex items-center justify-between"
          style={{ height: 64 }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em" }}>
              <span style={{ color: "var(--accent-warm)" }}>Mamy</span>{" "}
              <span className="text-text-primary">Voice</span>
            </span>
          </Link>
          <Link
            href="/record"
            className="inline-flex items-center justify-center rounded-full text-white text-sm font-semibold px-5 transition-all duration-200 active:scale-95"
            style={{ height: 36, background: "var(--gradient-cta)" }}
          >
            Try Free
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-secondary mb-8 transition-colors hover:text-text-primary"
          style={{ fontSize: 14, fontWeight: 500 }}
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        {/* Header */}
        <div className="mb-16">
          <h1
            className="text-text-primary"
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            The science behind{" "}
            <span style={{ color: "var(--accent-warm)" }}>mom&apos;s voice</span>
          </h1>
          <p
            className="text-text-secondary mt-4"
            style={{ fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.7, maxWidth: 640 }}
          >
            Mamy Voice isn&apos;t built on marketing claims. It&apos;s built on peer-reviewed
            research from Stanford, the American Psychological Association, PubMed, and leading
            universities. Here&apos;s what the science says.
          </p>
        </div>

        {/* Studies by category */}
        {categories.map((cat) => {
          const catStudies = studies.filter((s) => s.category === cat);
          const Icon = catStudies[0].categoryIcon;
          const color = catStudies[0].categoryColor;

          return (
            <section key={cat} className="mb-16">
              <ScrollReveal>
                <div className="flex items-center gap-2.5 mb-6">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: `${color}18` }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <h2
                    className="text-text-primary"
                    style={{ fontSize: 22, fontWeight: 700 }}
                  >
                    {cat}
                  </h2>
                </div>
              </ScrollReveal>

              <div className="flex flex-col gap-5">
                {catStudies.map((study, i) => (
                  <ScrollReveal key={i}>
                    <article
                      className="rounded-[20px] p-6 transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: "white",
                        boxShadow: "var(--shadow-sm)",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="text-text-tertiary"
                          style={{ fontSize: 12, fontWeight: 600 }}
                        >
                          {study.source}
                        </span>
                        <span className="text-text-tertiary" style={{ fontSize: 12 }}>
                          &middot;
                        </span>
                        <span className="text-text-tertiary" style={{ fontSize: 12 }}>
                          {study.year}
                        </span>
                      </div>

                      <h3
                        className="text-text-primary"
                        style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.35 }}
                      >
                        {study.title}
                      </h3>

                      <p
                        className="mt-3 rounded-xl px-4 py-3"
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          lineHeight: 1.6,
                          color: "var(--text-primary)",
                          background: `${color}0a`,
                          borderLeft: `3px solid ${color}`,
                        }}
                      >
                        {study.finding}
                      </p>

                      <p
                        className="text-text-secondary mt-3"
                        style={{ fontSize: 14, lineHeight: 1.7 }}
                      >
                        {study.summary}
                      </p>

                      <a
                        href={study.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-4 transition-colors hover:opacity-80"
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color,
                        }}
                      >
                        Read full study <ExternalLink size={13} />
                      </a>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </section>
          );
        })}

        {/* Bottom CTA */}
        <ScrollReveal>
          <div
            className="rounded-[24px] p-8 md:p-12 text-center mt-8"
            style={{ background: "white", boxShadow: "var(--shadow-md)" }}
          >
            <h2
              className="text-text-primary"
              style={{ fontSize: 26, fontWeight: 700 }}
            >
              The research is clear
            </h2>
            <p
              className="text-text-secondary mt-3 mx-auto"
              style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 480 }}
            >
              Your voice isn&apos;t just comforting — it&apos;s building your child&apos;s brain,
              language, and emotional foundation. Every story counts.
            </p>
            <Link
              href="/record"
              className="inline-flex items-center justify-center rounded-full text-white font-semibold px-10 mt-6 transition-all duration-200 active:scale-95 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                height: 50,
                fontSize: 16,
                background: "var(--gradient-cta)",
                boxShadow: "var(--shadow-cta)",
              }}
            >
              Try It Free
            </Link>
          </div>
        </ScrollReveal>
      </main>

      {/* Footer */}
      <footer
        className="border-t px-6 py-8"
        style={{ borderColor: "rgba(26, 18, 7, 0.06)" }}
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-text-tertiary" style={{ fontSize: 13 }}>
            &copy; {new Date().getFullYear()} Mamy Voice
          </span>
          <div className="flex gap-6">
            <Link href="/legal/privacy" className="text-text-tertiary hover:text-text-primary transition-colors" style={{ fontSize: 13 }}>
              Privacy
            </Link>
            <Link href="/legal/terms" className="text-text-tertiary hover:text-text-primary transition-colors" style={{ fontSize: 13 }}>
              Terms
            </Link>
            <Link href="/support" className="text-text-tertiary hover:text-text-primary transition-colors" style={{ fontSize: 13 }}>
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
