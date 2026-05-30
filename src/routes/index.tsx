import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, Briefcase, MapPin, Clock, Users, Sparkles,
  TrendingUp, CheckCircle2, Building2, User, Search,
  Target, Rocket, Award, Globe2, Zap, Shield,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useReveal } from "@/hooks/use-reveal";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PeopleQuest Data Services — HR & Staffing for Talent and Enterprises" },
      { name: "description", content: "PeopleQuest Data Services connects exceptional individuals with great careers and partners with corporates on RPO, executive search and workforce solutions across India." },
      { property: "og:title", content: "PeopleQuest Data Services" },
      { property: "og:description", content: "Where talent meets opportunity — for individuals and corporates." },
    ],
  }),
  component: HomePage,
});

type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  job_type: string;
  experience: string;
  salary_range: string | null;
  description: string;
  audience: string;
};

const stats = [
  { v: "10+", l: "Years of expertise" },
  { v: "100+", l: "Corporate clients" },
  { v: "48h", l: "AVG. Shortlist time" },
  { v: "5K+", l: "Successful placements" },
];

const individualPerks = [
  { icon: Rocket, title: "Curated opportunities", desc: "Hand-picked roles at companies that match your ambition and values." },
  { icon: Target, title: "Career partnership", desc: "Honest feedback, interview prep and negotiation support — every step." },
  { icon: Award, title: "Premium employers", desc: "Access roles at India's most loved tech, BFSI and consulting brands." },
  { icon: TrendingUp, title: "Long-term growth", desc: "We invest in relationships, not transactions. We're here for your next 10 years." },
];

const corporatePerks = [
  { icon: Zap, title: "Speed at scale", desc: "Pre-vetted talent pools and tech-enabled sourcing. Fill roles 60% faster." },
  { icon: Shield, title: "Quality guaranteed", desc: "Replacement guarantee, structured assessments, and 95% offer-acceptance rates." },
  { icon: Globe2, title: "Pan-India footprint", desc: "Hire across 40+ cities with on-ground recruiters who know the local market." },
  { icon: Building2, title: "Enterprise RPO", desc: "Embedded recruitment teams that scale up and down with your hiring plan." },
];

function HomePage() {
  useReveal();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState("");
  const [audienceFilter, setAudienceFilter] = useState<"all" | "individual" | "corporate">("all");

  useEffect(() => {
    supabase.from("jobs").select("*").eq("is_active", true).order("created_at", { ascending: false })
      .then(({ data }) => { if (data) setJobs(data as Job[]); });
  }, []);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const matchAud = audienceFilter === "all" || j.audience === audienceFilter || j.audience === "both";
      const q = query.toLowerCase();
      const matchQ = !q || j.title.toLowerCase().includes(q) || j.department.toLowerCase().includes(q) || j.location.toLowerCase().includes(q);
      return matchAud && matchQ;
    });
  }, [jobs, query, audienceFilter]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO with 3D scene */}
      <section id="home" className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] rounded-full bg-brand/25 blur-3xl animate-blob" />
          <div className="absolute -bottom-32 right-0 w-[32rem] h-[32rem] rounded-full bg-gold/20 blur-3xl animate-blob" style={{ animationDelay: "5s" }} />
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand bg-brand/10 px-3 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Talent · Trust · Transformation
            </span>
            <h1 className="mt-6 font-display font-extrabold text-5xl md:text-7xl leading-[1.02] tracking-tight">
              Where <span className="text-gradient">talent</span><br />
              meets <span className="shimmer-text">opportunity</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              PeopleQuest Data Services partners with ambitious professionals and forward-thinking
              enterprises across India — connecting the right people to the right roles, faster.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#individuals" className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-gradient-brand text-brand-foreground font-semibold shadow-[var(--shadow-glow)] hover:scale-105 transition-transform">
                <User className="w-4 h-4" /> I'm looking for a job
              </a>
              <a href="#corporates" className="inline-flex items-center gap-2 h-12 px-6 rounded-full glass-dark text-primary-foreground font-semibold hover:scale-105 transition-transform">
                <Building2 className="w-4 h-4" /> We're hiring talent
              </a>
            </div>
          </div>

          {/* 3D scene — orbiting cards */}
          <div className="relative h-[420px] hidden lg:block reveal">
            <div className="absolute inset-0 perspective-1200">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-96 rounded-3xl bg-gradient-ink text-primary-foreground shadow-[var(--shadow-3d)] float-3d p-8 flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest opacity-70">Live placement</div>
                  <div className="mt-3 text-2xl font-bold">Senior PM<br />→ Razorpay</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs opacity-70">Closed in</div>
                  <div className="text-xl font-bold text-gradient">11 days</div>
                </div>
              </div>

              <div className="absolute top-4 right-0 w-56 rounded-2xl glass p-5 shadow-[var(--shadow-elegant)] animate-float">
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><CheckCircle2 className="w-4 h-4 text-brand" /> Offer accepted</div>
                <div className="mt-2 font-semibold">VP Engineering</div>
                <div className="text-xs text-muted-foreground">Bengaluru · ₹85 LPA</div>
              </div>

              <div className="absolute bottom-0 left-0 w-60 rounded-2xl glass p-5 shadow-[var(--shadow-elegant)] animate-float" style={{ animationDelay: "2s" }}>
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><Building2 className="w-4 h-4 text-gold" /> Enterprise RPO</div>
                <div className="mt-2 font-semibold">142 hires this quarter</div>
                <div className="text-xs text-muted-foreground">Across 32 client orgs</div>
              </div>

              <div className="absolute -top-2 left-8 w-12 h-12 rounded-full bg-gold/30 blur-md animate-orbit" />
            </div>
          </div>
        </div>

        {/* stats strip */}
        <div className="border-t border-border/60 bg-card/40 backdrop-blur">
          <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={s.l} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient">{s.v}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDIVIDUALS section with 3D flip cards */}
      <section id="individuals" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl reveal">
            <Badge className="bg-brand/10 text-brand hover:bg-brand/10 border-0">For job seekers</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-display font-bold tracking-tight">
              Your next role,<br /><span className="text-gradient">handpicked.</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Stop scrolling job boards. We learn what you actually want and only bring you roles worth your time.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 perspective-1200">
            {individualPerks.map((p, i) => (
              <div key={p.title} className="flip-card h-56 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flip-card-inner">
                  <div className="flip-face rounded-2xl bg-card border border-border/60 p-6 shadow-[var(--shadow-soft)] flex flex-col justify-between">
                    <div className="w-11 h-11 rounded-xl bg-gradient-brand text-brand-foreground inline-flex items-center justify-center">
                      <p.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold">{p.title}</h3>
                      <div className="mt-1 text-xs text-muted-foreground">Hover to learn more</div>
                    </div>
                  </div>
                  <div className="flip-face flip-back rounded-2xl bg-gradient-ink text-primary-foreground p-6 shadow-[var(--shadow-3d)] flex items-center">
                    <p className="text-sm">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORPORATES section with 3D tilt board */}
      <section id="corporates" className="py-24 md:py-32 bg-gradient-ink text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-brand/30 blur-3xl animate-blob" />
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-gold/20 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
        </div>
        <div className="mx-auto max-w-7xl px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <Badge className="bg-gold/20 text-gold hover:bg-gold/20 border-0">For enterprises</Badge>
              <h2 className="mt-4 text-4xl md:text-5xl font-display font-bold tracking-tight">
                Build the team<br />that builds your <span className="text-gradient">future</span>.
              </h2>
              <p className="mt-4 text-primary-foreground/80 text-lg">
                From single critical hires to embedded RPO across thousands of roles —
                we design the talent engine your business actually needs.
              </p>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {corporatePerks.map((p) => (
                  <div key={p.title} className="rounded-xl glass-dark p-5 hover-lift">
                    <p.icon className="w-5 h-5 text-gold mb-2" />
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-xs text-primary-foreground/70 mt-1">{p.desc}</div>
                  </div>
                ))}
              </div>
              <a href="#apply" className="mt-8 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-gold text-gold-foreground font-semibold hover:scale-105 transition-transform">
                Talk to our enterprise team <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* 3D tilted dashboard mock */}
            <div className="reveal hidden lg:block">
              <div className="tilt-3d rounded-2xl glass-dark p-6 shadow-[var(--shadow-3d)]">
                <div className="text-xs uppercase tracking-widest text-gold/80">Hiring dashboard</div>
                <div className="mt-2 text-2xl font-bold">Q2 Pipeline</div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { l: "Sourced", v: "1,284" },
                    { l: "Screened", v: "412" },
                    { l: "Offered", v: "67" },
                  ].map((m) => (
                    <div key={m.l} className="rounded-lg bg-white/5 p-3">
                      <div className="text-2xl font-bold text-gradient">{m.v}</div>
                      <div className="text-[10px] uppercase tracking-wider text-primary-foreground/60">{m.l}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-2">
                  {["Engineering · 24 open", "Product · 8 open", "GTM · 12 open"].map((r) => (
                    <div key={r} className="flex items-center justify-between text-sm bg-white/5 rounded-lg px-3 py-2">
                      <span>{r}</span>
                      <span className="text-xs text-brand">on track</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section id="roles" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between flex-wrap gap-4 reveal">
            <div>
              <Badge className="bg-brand/10 text-brand hover:bg-brand/10 border-0">Open positions</Badge>
              <h2 className="mt-4 text-4xl md:text-5xl font-display font-bold tracking-tight">
                Find your <span className="text-gradient">next move</span>.
              </h2>
            </div>
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search by title, location…" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>

          <Tabs value={audienceFilter} onValueChange={(v) => setAudienceFilter(v as "all" | "individual" | "corporate")} className="mt-8 reveal">
            <TabsList>
              <TabsTrigger value="all">All ({jobs.length})</TabsTrigger>
              <TabsTrigger value="individual"><User className="w-3.5 h-3.5 mr-1" /> For individuals</TabsTrigger>
              <TabsTrigger value="corporate"><Building2 className="w-3.5 h-3.5 mr-1" /> For corporates</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mt-8 grid md:grid-cols-2 gap-5">
            {filtered.length === 0 && (
              <div className="md:col-span-2 text-center py-16 text-muted-foreground">
                No roles match your search. Try a different keyword or check back soon.
              </div>
            )}
            {filtered.map((j, i) => (
              <article key={j.id} className="animate-fade-up card-3d rounded-2xl bg-card border border-border/60 p-6 shadow-[var(--shadow-soft)]" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-brand uppercase tracking-widest">{j.department}</div>
                    <h3 className="mt-1 font-display font-bold text-xl">{j.title}</h3>
                  </div>
                  <Badge variant={j.audience === "corporate" ? "default" : "secondary"} className="shrink-0">
                    {j.audience === "corporate" ? "Corporate" : j.audience === "both" ? "Both" : "Individual"}
                  </Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {j.location}</span>
                  <span className="inline-flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {j.job_type}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {j.experience}</span>
                  {j.salary_range && <span className="inline-flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> {j.salary_range}</span>}
                </div>
                <p className="mt-4 text-sm text-muted-foreground line-clamp-3">{j.description}</p>
                <a href={`#apply`} onClick={() => sessionStorage.setItem("pq_job", j.id)} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:gap-2 transition-all">
                  Apply for this role <ArrowRight className="w-4 h-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <ApplyForm jobs={jobs} />

      <SiteFooter />
    </div>
  );
}

function ApplyForm({ jobs }: { jobs: Job[] }) {
  const [tab, setTab] = useState<"individual" | "corporate">("individual");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    job_id: "",
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    company_size: "",
    hiring_needs: "",
    current_ctc: "",
    expected_ctc: "",
    notice_period: "",
    experience_years: "",
    cover_letter: "",
  });

  useEffect(() => {
    const saved = sessionStorage.getItem("pq_job");
    if (saved) {
      setForm((f) => ({ ...f, job_id: saved }));
      setTab("individual");
    }
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const payload = {
      audience_type: tab,
      job_id: form.job_id || null,
      full_name: form.full_name,
      email: form.email,
      phone: form.phone,
      company_name: form.company_name || null,
      company_size: tab === "corporate" ? form.company_size || null : null,
      hiring_needs: tab === "corporate" ? form.hiring_needs || null : null,
      current_ctc: tab === "individual" ? form.current_ctc || null : null,
      expected_ctc: tab === "individual" ? form.expected_ctc || null : null,
      notice_period: tab === "individual" ? form.notice_period || null : null,
      experience_years: tab === "individual" ? form.experience_years || null : null,
      cover_letter: form.cover_letter || null,
    };
    const { error } = await supabase.from("applications").insert(payload);
    setBusy(false);
    if (error) return toast.error(error.message);
    setDone(true);
    toast.success("Application submitted — we'll be in touch.");
    sessionStorage.removeItem("pq_job");
  };

  return (
    <section id="apply" className="py-24 md:py-32 bg-surface-muted">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center reveal max-w-2xl mx-auto">
          <Badge className="bg-brand/10 text-brand hover:bg-brand/10 border-0">Get started</Badge>
          <h2 className="mt-4 text-4xl md:text-5xl font-display font-bold tracking-tight">
            Let's <span className="text-gradient">talk</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Whether you're hunting for your next role or your next 100 hires — we're listening.
          </p>
        </div>

        <div className="mt-12 rounded-3xl bg-card border border-border/60 shadow-[var(--shadow-elegant)] p-6 md:p-10 reveal card-3d">
          {done ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-gradient-brand mx-auto inline-flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-brand-foreground" />
              </div>
              <h3 className="mt-6 text-2xl font-bold shimmer-text">Thank you!</h3>
              <p className="mt-2 text-muted-foreground">A PeopleQuest consultant will reach out within 1 business day.</p>
              <Button className="mt-6" variant="outline" onClick={() => { setDone(false); setForm({ ...form, full_name: "", email: "", phone: "", cover_letter: "" }); }}>
                Submit another
              </Button>
            </div>
          ) : (
            <>
              <Tabs value={tab} onValueChange={(v) => setTab(v as "individual" | "corporate")}>
                <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
                  <TabsTrigger value="individual"><User className="w-4 h-4 mr-1.5" /> I'm a candidate</TabsTrigger>
                  <TabsTrigger value="corporate"><Building2 className="w-4 h-4 mr-1.5" /> We're hiring</TabsTrigger>
                </TabsList>

                <form onSubmit={submit} className="mt-8 grid md:grid-cols-2 gap-5">
                  <div><Label>Full name *</Label><Input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="mt-1.5" /></div>
                  <div><Label>Email *</Label><Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5" /></div>
                  <div><Label>Phone *</Label><Input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5" /></div>

                  <TabsContent value="individual" asChild>
                    <div className="contents">
                      <div>
                        <Label>Role you're applying for</Label>
                        <Select value={form.job_id} onValueChange={(v) => setForm({ ...form, job_id: v })}>
                          <SelectTrigger className="mt-1.5"><SelectValue placeholder="Choose a role (optional)" /></SelectTrigger>
                          <SelectContent>
                            {jobs.filter((j) => j.audience !== "corporate").map((j) => (
                              <SelectItem key={j.id} value={j.id}>{j.title} — {j.location}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div><Label>Years of experience</Label><Input value={form.experience_years} onChange={(e) => setForm({ ...form, experience_years: e.target.value })} placeholder="e.g. 5" className="mt-1.5" /></div>
                      <div><Label>Current CTC</Label><Input value={form.current_ctc} onChange={(e) => setForm({ ...form, current_ctc: e.target.value })} placeholder="₹ LPA" className="mt-1.5" /></div>
                      <div><Label>Expected CTC</Label><Input value={form.expected_ctc} onChange={(e) => setForm({ ...form, expected_ctc: e.target.value })} placeholder="₹ LPA" className="mt-1.5" /></div>
                      <div className="md:col-span-2">
                        <Label>Notice period</Label>
                        <Select value={form.notice_period} onValueChange={(v) => setForm({ ...form, notice_period: v })}>
                          <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Immediate">Immediate</SelectItem>
                            <SelectItem value="15 days">15 days</SelectItem>
                            <SelectItem value="30 days">30 days</SelectItem>
                            <SelectItem value="60 days">60 days</SelectItem>
                            <SelectItem value="90 days">90 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="corporate" asChild>
                    <div className="contents">
                      <div><Label>Company name *</Label><Input required={tab === "corporate"} value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} className="mt-1.5" /></div>
                      <div>
                        <Label>Company size</Label>
                        <Select value={form.company_size} onValueChange={(v) => setForm({ ...form, company_size: v })}>
                          <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-50">1-50</SelectItem>
                            <SelectItem value="51-200">51-200</SelectItem>
                            <SelectItem value="201-1000">201-1000</SelectItem>
                            <SelectItem value="1001-5000">1001-5000</SelectItem>
                            <SelectItem value="5000+">5000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2">
                        <Label>Hiring needs</Label>
                        <Textarea rows={3} value={form.hiring_needs} onChange={(e) => setForm({ ...form, hiring_needs: e.target.value })} placeholder="What roles, how many, by when, target locations…" className="mt-1.5" />
                      </div>
                    </div>
                  </TabsContent>

                  <div className="md:col-span-2">
                    <Label>{tab === "individual" ? "A short note (optional)" : "Anything else we should know?"}</Label>
                    <Textarea rows={3} value={form.cover_letter} onChange={(e) => setForm({ ...form, cover_letter: e.target.value })} className="mt-1.5" />
                  </div>

                  <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" /> Your data is confidential. We never share without consent.
                    </p>
                    <Button type="submit" disabled={busy} className="bg-gradient-brand text-brand-foreground h-12 px-8 font-semibold shadow-[var(--shadow-glow)] hover:scale-105 transition-transform">
                      {busy ? "Sending…" : "Submit application"}
                    </Button>
                  </div>
                </form>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
