import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useReveal } from "@/hooks/use-reveal";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — PeopleQuest Data Services" },
      { name: "description", content: "Get in touch with PeopleQuest Data Services in Mumbai. Phone +91 9820437781 / +91 9167424540, email connect@peoplequestds.com." },
      { property: "og:title", content: "Contact PeopleQuest Data Services" },
      { property: "og:description", content: "Mumbai-based HR partner with Pan-India delivery. Let's talk." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  useReveal();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-brand/25 blur-3xl animate-blob" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-28 text-foreground reveal">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand">Get in touch</p>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-[1.05] max-w-3xl">
            Let's talk <span className="text-gradient">talent.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Hiring, partnering or just exploring — reach out. We respond within one business day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-2 gap-6">
        <div className="reveal rounded-2xl border border-border/60 bg-card p-8 hover-lift">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-brand text-brand-foreground">
            <Phone size={22} />
          </div>
          <h3 className="mt-5 font-display text-xl font-semibold">Phone</h3>
          <ul className="mt-3 space-y-1 text-muted-foreground">
            <li><a href="tel:+919820437781" className="hover:text-foreground">+91 98204 37781</a></li>
            <li><a href="tel:+919167424540" className="hover:text-foreground">+91 91674 24540</a></li>
          </ul>
        </div>

        <div className="reveal rounded-2xl border border-border/60 bg-card p-8 hover-lift">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-brand text-brand-foreground">
            <Mail size={22} />
          </div>
          <h3 className="mt-5 font-display text-xl font-semibold">Email</h3>
          <p className="mt-3 text-muted-foreground">
            <a href="mailto:connect@peoplequestds.com" className="hover:text-foreground">connect@peoplequestds.com</a>
          </p>
        </div>

        <div className="reveal rounded-2xl border border-border/60 bg-card p-8 hover-lift">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-brand text-brand-foreground">
            <MapPin size={22} />
          </div>
          <h3 className="mt-5 font-display text-xl font-semibold">Corporate office</h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Floor 6, Community Coworks, 5th &amp; 6th Floor, Ackruti Trade Centre,<br />
            Road Number 7, Kondivita, MIDC, Andheri East,<br />
            Mumbai, Maharashtra 400093
          </p>
        </div>

        <div className="reveal rounded-2xl border border-border/60 bg-card p-8 hover-lift">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-brand text-brand-foreground">
            <MapPin size={22} />
          </div>
          <h3 className="mt-5 font-display text-xl font-semibold">Registered office</h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            C-202, Corolla Jewel, Military Road, Marol,<br />
            Andheri East, Mumbai, Maharashtra 400072, India
          </p>
        </div>

        <div className="reveal md:col-span-2 rounded-2xl border border-border/60 bg-gradient-ink text-primary-foreground p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Globe size={20} className="text-brand" />
            <span className="font-medium">peoplequestds.com</span>
          </div>
          <a href="https://www.peoplequestds.com" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-gradient-brand text-brand-foreground text-sm font-semibold hover:scale-105 transition-transform">
            Visit website
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
