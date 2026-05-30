import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useReveal } from "@/hooks/use-reveal";
import { useEffect, useRef, useState } from "react";
import {
  UserSearch, Users, Settings2, GraduationCap, Wallet, LineChart,
  ArrowRight, CheckCircle2, X, ChevronDown,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — PeopleQuest Data Services" },
      { name: "description", content: "Talent acquisition, contract staffing, HR operations, learning & development, payroll & compliance, and organization development — delivered Pan-India." },
      { property: "og:title", content: "Services — PeopleQuest Data Services" },
      { property: "og:description", content: "End-to-end HR services for growing companies across India." },
    ],
  }),
  component: ServicesPage,
});

type Service = {
  id: string;
  icon: React.ElementType;
  title: string;
  tagline: string;
  body: string;
  highlights: string[];
  detail: {
    overview: string;
    whatWeOffer: string[];
    howItWorks: { step: string; desc: string }[];
    outcomes: string[];
  };
};

const services: Service[] = [
  {
    id: "talent-acquisition",
    icon: UserSearch,
    title: "Talent Acquisition",
    tagline: "Full-cycle hiring across IT & Non-IT",
    body: "Full-cycle talent acquisition for IT and Non-IT hiring across technologies and levels for multiple industries. We support the end-to-end talent acquisition process of Sourcing, Screening, Scheduling and follow ups till closure ensuring efficient realization of our client's time. Our strength is targeted hiring support through our dedicated recruitment arm.",
    highlights: ["IT & Non-IT hiring", "End-to-end process", "Dedicated recruitment arm", "Multi-industry coverage"],
    detail: {
      overview: "Our talent acquisition practice is built on speed, precision, and deep domain expertise. We run full-cycle recruitment — from the first sourcing call to offer closure — across technology and business functions, spanning startups to large enterprises.",
      whatWeOffer: [
        "Sourcing via niche job boards, LinkedIn, referrals, and our proprietary talent network",
        "Structured multi-round screening with technical and cultural fit assessment",
        "Coordinated interview scheduling and candidate communication",
        "Offer negotiation, follow-up, and joining confirmation",
        "Dedicated recruiters aligned to specific domains or tech stacks",
        "Replacement guarantee on every closed position",
      ],
      howItWorks: [
        { step: "Intake & JD Workshop", desc: "We deep-dive into your role requirements, culture, and success metrics to build a precise hiring brief." },
        { step: "Targeted Sourcing", desc: "Our recruiters activate multiple channels simultaneously — headhunting, community outreach, referrals, and AI-assisted search." },
        { step: "Screen & Shortlist", desc: "Candidates are assessed for skills, culture fit, and motivation. You receive a curated shortlist within 48 hours of intake." },
        { step: "Interview Coordination", desc: "We own the calendar — scheduling, reminders, and feedback loops — so your team focuses on evaluation, not logistics." },
        { step: "Offer to Onboard", desc: "We support salary negotiation, manage counter-offer scenarios, and track candidates through their notice period to ensure joining." },
      ],
      outcomes: [
        "48-hour average time-to-shortlist",
        "95%+ offer acceptance rate",
        "60% faster closure than in-house hiring",
        "Zero-cost replacement within 90 days",
      ],
    },
  },
  {
    id: "contract-staffing",
    icon: Users,
    title: "Contract / Third-Party Staffing",
    tagline: "Flexible workforce, on demand",
    body: "Reliable contract staffing solutions across IT and Non-IT roles, spanning industries and skillsets — built for flexibility and scale.",
    highlights: ["IT & Non-IT roles", "Rapid deployment", "Flexible tenure", "Managed payroll & compliance"],
    detail: {
      overview: "Our contract staffing model gives businesses the agility to scale their workforce up or down without the overhead of permanent employment. We place pre-vetted professionals on fixed-term contracts and manage the full employer-of-record relationship.",
      whatWeOffer: [
        "Contract professionals for project-based and surge hiring needs",
        "Third-party payroll management and statutory compliance",
        "Background verification and credential validation",
        "Replacement SLAs and performance monitoring",
        "Industry coverage: IT, BFSI, retail, manufacturing, healthcare, and more",
        "Bulk staffing for large-scale projects and launch phases",
      ],
      howItWorks: [
        { step: "Requirement Briefing", desc: "We understand your project timeline, skill requirements, and headcount targets." },
        { step: "Rapid Deployment", desc: "Candidates from our active talent pool are screened and deployed within 3–5 business days." },
        { step: "Onboarding & Documentation", desc: "We manage all joining formalities, documentation, and orientation." },
        { step: "Ongoing Management", desc: "Attendance, leaves, grievances, and performance are monitored throughout the engagement." },
        { step: "Exit & Transition", desc: "Smooth offboarding with full statutory settlement handled by our team." },
      ],
      outcomes: [
        "3–5 day average deployment time",
        "Pan-India presence across 40+ cities",
        "Statutory compliance managed end-to-end",
        "Flexible contract durations from 1 month to 3 years",
      ],
    },
  },
  {
    id: "hr-operations",
    icon: Settings2,
    title: "HR Operations Management",
    tagline: "Your complete outsourced HR partner",
    body: "End-to-end HR operations: onboarding, attendance, payroll inputs, employee letters, HR policies, and exit formalities — as your complete outsourced HR partner.",
    highlights: ["Onboarding to exit", "Policy design", "Attendance management", "HR documentation"],
    detail: {
      overview: "For organizations that want to focus on their core business, we act as a fully embedded HR operations partner — managing everything from day-one onboarding to full-cycle exit processing with precision and compliance.",
      whatWeOffer: [
        "Employee onboarding: documentation, induction, and system setup",
        "Attendance and leave management with custom policy configurations",
        "Payroll inputs preparation and coordination",
        "Employee letters: offer, confirmation, increment, and relieving",
        "HR policy drafting, review, and communication",
        "Exit management: resignation processing, F&F settlements, and experience letters",
        "HRIS setup and maintenance support",
      ],
      howItWorks: [
        { step: "HR Audit", desc: "We assess your current HR maturity, identify gaps, and design a tailored operations model." },
        { step: "Process Setup", desc: "Policies, templates, and workflows are established and aligned with your organization's culture." },
        { step: "Embedded Execution", desc: "Our HR managers operate as an extension of your team, handling day-to-day operations seamlessly." },
        { step: "Monthly Reporting", desc: "You receive structured MIS reports covering headcount, attrition, attendance, and compliance metrics." },
        { step: "Continuous Optimization", desc: "We review and improve processes quarterly based on feedback and organizational growth." },
      ],
      outcomes: [
        "100% statutory compliance adherence",
        "Zero-gap onboarding for every new hire",
        "Reduction in HR admin overhead by up to 70%",
        "Structured exit process with legal compliance",
      ],
    },
  },
  {
    id: "learning-development",
    icon: GraduationCap,
    title: "Learning & Development",
    tagline: "Building capability, one program at a time",
    body: "Corporate training, soft-skills development, communication programs, and mid-level sales training and networking modules — customized to client needs.",
    highlights: ["Corporate training", "Soft skills", "Sales enablement", "Custom programs"],
    detail: {
      overview: "Our Learning & Development practice designs and delivers capability-building programs that align to your business goals. From leadership workshops to technical upskilling, we create learning experiences that drive measurable change in behavior and performance.",
      whatWeOffer: [
        "Soft skills and professional effectiveness programs",
        "Business communication and executive presence training",
        "Mid-level leadership and people management modules",
        "Sales training and client networking workshops",
        "Domain-specific technical upskilling programs",
        "Custom eLearning content and blended learning design",
        "Training needs analysis (TNA) and L&D strategy consulting",
      ],
      howItWorks: [
        { step: "Needs Assessment", desc: "We conduct a training needs analysis (TNA) to identify skill gaps and learning priorities across levels." },
        { step: "Program Design", desc: "Customized curriculum is designed aligning to your business context, culture, and learner profiles." },
        { step: "Facilitation", desc: "Experienced facilitators deliver engaging in-person or virtual sessions with real-world application." },
        { step: "Reinforcement", desc: "Post-training assignments, manager toolkits, and follow-up sessions ensure learning transfer." },
        { step: "Measurement", desc: "Kirkpatrick-aligned evaluation measures reaction, learning, behavior change, and business impact." },
      ],
      outcomes: [
        "Measurable improvement in targeted competencies",
        "Higher engagement scores post-training",
        "Reduced onboarding ramp-time for new hires",
        "Custom programs across all industry verticals",
      ],
    },
  },
  {
    id: "payroll-compliance",
    icon: Wallet,
    title: "Payroll & Compliance",
    tagline: "Accurate, on-time, every cycle",
    body: "Complete payroll processing, statutory compliance management and regulatory adherence — accurate, on-time, every cycle.",
    highlights: ["Payroll processing", "PF / ESI / PT", "Statutory filings", "Regulatory adherence"],
    detail: {
      overview: "Payroll errors and compliance lapses are costly — both financially and reputationally. Our payroll and compliance practice ensures every employee is paid accurately and on time, and every statutory obligation is met without exception.",
      whatWeOffer: [
        "End-to-end payroll processing for 10 to 10,000+ employees",
        "Statutory deductions: PF, ESI, Professional Tax, TDS",
        "Monthly salary slips and Form 16 generation",
        "Quarterly and annual statutory filings",
        "Bonus, gratuity, and full-and-final settlement calculations",
        "Compliance audits and gap assessments",
        "Labour law advisory and regulatory change management",
      ],
      howItWorks: [
        { step: "Data Collection", desc: "We receive attendance, leave, and variable inputs from your HR or HRMS system each month." },
        { step: "Payroll Processing", desc: "Our team processes salaries with all applicable deductions, benefits, and statutory computations." },
        { step: "Verification & Sign-Off", desc: "Processed payroll is shared for your approval before any disbursements." },
        { step: "Disbursement & Filings", desc: "Salaries are disbursed and all statutory challans, returns, and filings are submitted on time." },
        { step: "MIS & Reconciliation", desc: "Monthly payroll MIS and variance reports are shared for your records and audits." },
      ],
      outcomes: [
        "Zero payroll errors with dual-layer verification",
        "100% on-time statutory filings",
        "Full audit trail maintained digitally",
        "Scalable from 10 to 10,000+ headcount",
      ],
    },
  },
  {
    id: "org-development",
    icon: LineChart,
    title: "Organization Development",
    tagline: "Building long-term organizational capability",
    body: "Skill-gap analysis, training needs identification, KRAs/KPIs, employee assessments, and Rewards & Recognition program design to build long-term capability.",
    highlights: ["KRA / KPI design", "Skill-gap analysis", "R&R programs", "Employee assessments"],
    detail: {
      overview: "Organization Development is about building the structures, systems, and culture that allow your business to grow sustainably. We partner with leadership to design performance frameworks, identify capability gaps, and create a culture of recognition and high performance.",
      whatWeOffer: [
        "KRA / KPI framework design and alignment",
        "Performance management system design and rollout",
        "Skill-gap analysis and competency mapping",
        "Employee engagement surveys and action planning",
        "Rewards & Recognition (R&R) program design and implementation",
        "Leadership assessment and succession planning",
        "Change management advisory for org restructuring",
      ],
      howItWorks: [
        { step: "Org Diagnostics", desc: "We assess your current culture, performance systems, and engagement levels through surveys and interviews." },
        { step: "Framework Design", desc: "Customized OD interventions are designed — from KRA frameworks to R&R structures — aligned to your strategy." },
        { step: "Leadership Alignment", desc: "We facilitate leadership workshops to build ownership and cascade the new systems across the organization." },
        { step: "Rollout & Adoption", desc: "OD programs are implemented with communication campaigns, manager enablement, and employee orientation." },
        { step: "Review & Iterate", desc: "We track adoption metrics and outcomes, iterating the programs based on data and feedback." },
      ],
      outcomes: [
        "Improved performance clarity across all levels",
        "Higher employee engagement and retention",
        "Structured succession pipeline for key roles",
        "Culture of recognition driving discretionary effort",
      ],
    },
  },
];

const tabs = [
  { id: "all", label: "All Services" },
  { id: "talent-acquisition", label: "Talent Acquisition" },
  { id: "contract-staffing", label: "Staffing" },
  { id: "hr-operations", label: "HR Operations" },
  { id: "learning-development", label: "Learning & Development" },
  { id: "payroll-compliance", label: "Payroll & Compliance" },
  { id: "org-development", label: "Org Development" },
];

// Inline detail panel that slides open below the clicked card
function DetailPanel({ service, onClose }: { service: Service; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll to the panel after it renders
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, [service.id]);

  return (
    <div
      ref={ref}
      className="col-span-full mt-2 rounded-2xl border border-brand/30 bg-card shadow-[var(--shadow-elegant)] overflow-hidden"
      style={{ animation: "fadeSlideDown 0.3s ease forwards" }}
    >
      {/* Panel header */}
      <div className="flex items-center justify-between px-7 py-5 border-b border-border/60 bg-gradient-hero">
        <div className="flex items-center gap-4">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-brand text-brand-foreground shadow-[var(--shadow-glow)]">
            <service.icon size={20} />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold">{service.title}</h2>
            <p className="text-xs text-brand font-semibold uppercase tracking-wider mt-0.5">{service.tagline}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-muted hover:bg-muted/80 inline-flex items-center justify-center transition-colors shrink-0"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>

      {/* Panel content — 3-column layout */}
      <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-border/60">

        {/* Col 1 — Overview + What we offer */}
        <div className="p-7 space-y-6">
          <div>
            <h3 className="font-display font-semibold text-base mb-2 text-foreground">Overview</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{service.detail.overview}</p>
          </div>
          <div>
            <h3 className="font-display font-semibold text-base mb-3 text-foreground">What we offer</h3>
            <ul className="space-y-2">
              {service.detail.whatWeOffer.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 size={14} className="text-brand mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Col 2 — How it works */}
        <div className="p-7">
          <h3 className="font-display font-semibold text-base mb-4 text-foreground">How it works</h3>
          <div className="space-y-4">
            {service.detail.howItWorks.map((step, i) => (
              <div key={step.step} className="flex gap-3">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-brand text-brand-foreground inline-flex items-center justify-center text-xs font-bold shadow-[var(--shadow-glow)]">
                  {i + 1}
                </div>
                <div>
                  <div className="font-semibold text-sm">{step.step}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3 — Outcomes + CTA */}
        <div className="p-7 flex flex-col justify-between gap-6">
          <div>
            <h3 className="font-display font-semibold text-base mb-4 text-foreground">Key outcomes</h3>
            <div className="rounded-2xl bg-gradient-ink text-primary-foreground p-5 space-y-3">
              {service.detail.outcomes.map((o) => (
                <div key={o} className="flex items-start gap-2 text-sm text-primary-foreground/90">
                  <CheckCircle2 size={14} className="text-brand mt-0.5 shrink-0" />
                  {o}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              to="/contact"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full bg-gradient-brand text-brand-foreground text-sm font-semibold hover:scale-105 transition-transform shadow-[var(--shadow-glow)]"
            >
              Get started <ArrowRight size={14} />
            </Link>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full border border-border/60 text-sm font-medium hover:bg-muted transition-colors"
            >
              Close details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesPage() {
  useReveal();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visible = activeTab === "all" ? services : services.filter((s) => s.id === activeTab);
  const selectedService = services.find((s) => s.id === selectedId) ?? null;

  const handleCardClick = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  // Build rows of 3 (matching the lg:grid-cols-3 layout) so we can inject the panel after each row
  const COLS = 3;
  const rows: Service[][] = [];
  for (let i = 0; i < visible.length; i += COLS) {
    rows.push(visible.slice(i, i + COLS));
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-brand/25 blur-3xl animate-blob" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-28 text-foreground reveal">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand">Service offering</p>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-[1.05] max-w-3xl">
            Full-stack HR services, <span className="text-gradient">delivered Pan-India</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            One partner across the entire employee life cycle — from first hire to compliance, capability building, and beyond.
          </p>
        </div>
      </section>

      {/* TAB SELECTOR */}
      <div className="sticky top-16 z-40 bg-background/90 backdrop-blur border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-3">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => { setActiveTab(t.id); setSelectedId(null); }}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === t.id
                    ? "bg-gradient-brand text-brand-foreground shadow-[var(--shadow-glow)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SERVICE CARDS — row-by-row with inline detail panel */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="space-y-6">
          {rows.map((row, rowIdx) => {
            // Does this row contain the selected card?
            const panelInThisRow = selectedService && row.some((s) => s.id === selectedService.id);
            return (
              <div key={rowIdx}>
                {/* Cards row */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {row.map((s) => {
                    const isOpen = selectedId === s.id;
                    return (
                      <article
                        key={s.id}
                        onClick={() => handleCardClick(s.id)}
                        className={`reveal rounded-2xl border bg-card p-7 cursor-pointer group transition-all ${
                          isOpen
                            ? "border-brand/50 shadow-[var(--shadow-elegant)] ring-1 ring-brand/20"
                            : "border-border/60 hover:border-brand/40 hover:shadow-[var(--shadow-elegant)] hover-lift"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-brand text-brand-foreground">
                            <s.icon size={22} />
                          </div>
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold text-brand transition-all ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                            {isOpen ? "Close" : "Explore"}
                            <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                          </span>
                        </div>
                        <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                        <p className="mt-1 text-xs font-medium text-brand uppercase tracking-wider">{s.tagline}</p>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">{s.body}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {s.highlights.map((h) => (
                            <span key={h} className="inline-flex items-center gap-1 text-xs bg-brand/10 text-brand px-2.5 py-1 rounded-full font-medium">
                              <CheckCircle2 size={10} /> {h}
                            </span>
                          ))}
                        </div>
                        <div className={`mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand transition-all ${isOpen ? "gap-2" : "group-hover:gap-2"}`}>
                          {isOpen ? "Hide details" : "View details"} <ArrowRight size={14} className={isOpen ? "rotate-90" : ""} />
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* Inline detail panel — only shown under the row containing the selected card */}
                {panelInThisRow && selectedService && (
                  <DetailPanel
                    key={selectedService.id}
                    service={selectedService}
                    onClose={() => setSelectedId(null)}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 reveal rounded-3xl bg-gradient-ink text-primary-foreground p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold">Let's build your team.</h3>
            <p className="mt-2 text-primary-foreground/75 max-w-lg">Share your hiring brief — we'll come back with a shortlist within 48 hours.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-gradient-brand text-brand-foreground text-sm font-semibold hover:scale-105 transition-transform">
            Contact us <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
