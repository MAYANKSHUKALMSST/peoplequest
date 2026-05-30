import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useReveal } from "@/hooks/use-reveal";
import { Eye, Heart, Users2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — PeopleQuest Data Services" },
      { name: "description", content: "Founded in July 2019 in Mumbai, PeopleQuest Data Services delivers Pan-India HR services backed by 20+ years of industry expertise. 80+ clients across 20 industries." },
      { property: "og:title", content: "About PeopleQuest Data Services" },
      { property: "og:description", content: "You ask. We deliver. Pan-India HR services from a Mumbai-based team with deep industry expertise." },
    ],
  }),
  component: AboutPage,
});

const promise = [
  { icon: Eye, title: "Vision", body: "To be the trusted partner of our customers at all times by providing the highest quality of service." },
  { icon: Heart, title: "Values", body: "We operate at the highest levels of integrity with a passion to ensure the success of our customer's business." },
  { icon: Users2, title: "Culture", body: "We are an organization where each member believes in the power of achieving together." },
];

const facts = [
  { v: "2019", l: "Founded in Mumbai" },
  { v: "80+", l: "Clients served" },
  { v: "20+", l: "Industries catered" },
  { v: "20yrs", l: "Avg. founder experience" },
];

function AboutPage() {
  useReveal();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div className="absolute -top-40 -left-32 w-[480px] h-[480px] rounded-full bg-brand/25 blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -right-32 w-[520px] h-[520px] rounded-full bg-gold/25 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 text-foreground reveal">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand">About us</p>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-[1.05] max-w-3xl">
            You ask. <span className="text-gradient">We deliver.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Founded in July 2019, PeopleQuest Data Services was built on a simple premise — understand
            the needs of our clients and support them through best-in-class Human Resource services.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="reveal">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Who we are</h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>Each of our founding team members brings over two decades of industry experience, contributing deep expertise and strategic insight to every service we deliver.</p>
              <p>Based in Mumbai, PeopleQuest Data Services provides comprehensive Human Resource services with a Pan-India delivery footprint.</p>
              <p>Our core team's HR experience allows us to truly understand what matters most to our customers — and deliver on time, every time.</p>
              <p>With over <strong className="text-foreground">80 clients across 20 different industries</strong>, we are a fast-growing HR services company making a positive impact for each of our clients.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 reveal">
            {facts.map((f) => (
              <div key={f.l} className="rounded-2xl border border-border/60 bg-card p-6 hover-lift">
                <div className="font-display text-3xl font-bold text-gradient">{f.v}</div>
                <div className="mt-1 text-sm text-muted-foreground">{f.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 border-y border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center reveal">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand">Our promise</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">What guides us, every day</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {promise.map((p) => (
              <div key={p.title} className="reveal rounded-2xl border border-border/60 bg-card p-8 hover-lift">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-brand text-brand-foreground">
                  <p.icon size={22} />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 text-center reveal">
        <h2 className="font-display text-3xl md:text-4xl font-bold">Ready to partner with us?</h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Whether you're hiring or looking for your next role — we'd love to talk.</p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link to="/services" className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:scale-105 transition-transform">
            Our services <ArrowRight size={16} />
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 h-11 px-6 rounded-full border border-border text-sm font-semibold hover:bg-muted transition-colors">
            Get in touch
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
