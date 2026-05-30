import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useReveal } from "@/hooks/use-reveal";
import {
  Cpu, Server, Boxes, MonitorSmartphone, ShieldCheck, Building, Microchip,
  Briefcase, Wrench, BedDouble, HeartPulse, Home, FileSpreadsheet, Plane,
  Megaphone, Sparkles, BarChart3, ShoppingCart, Truck, Target, Landmark,
} from "lucide-react";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — PeopleQuest Data Services" },
      { name: "description", content: "Hiring expertise across 20+ industries — IT, semiconductors, BFSI, healthcare, hospitality, aviation, real estate, supply chain, e-commerce and more." },
      { property: "og:title", content: "Industries we serve" },
      { property: "og:description", content: "20+ industries across IT, BFSI, healthcare, aviation and more." },
    ],
  }),
  component: IndustriesPage,
});

const industries = [
  { icon: Cpu, name: "Information Technology" },
  { icon: Server, name: "IT Service Companies" },
  { icon: Boxes, name: "IT Product Companies" },
  { icon: MonitorSmartphone, name: "IT Hardware" },
  { icon: ShieldCheck, name: "Networking & Security" },
  { icon: Building, name: "Infrastructure" },
  { icon: Microchip, name: "Semi-Conductor" },
  { icon: Briefcase, name: "HRO Services" },
  { icon: Wrench, name: "Engineering" },
  { icon: BedDouble, name: "Hospitality" },
  { icon: HeartPulse, name: "Healthcare" },
  { icon: Home, name: "Real Estate" },
  { icon: FileSpreadsheet, name: "Accounting Firms" },
  { icon: Plane, name: "Aviation" },
  { icon: Megaphone, name: "Media & Advertisement" },
  { icon: Sparkles, name: "Digital Marketing" },
  { icon: BarChart3, name: "Sales & Marketing" },
  { icon: ShoppingCart, name: "E-Commerce" },
  { icon: Truck, name: "Supply Chain" },
  { icon: Target, name: "Lead Generation" },
  { icon: Landmark, name: "Banking & NBFC" },
];

const itProfiles = [
  "Full Stack", "Cloud Architecture", "Cyber Risk", "Data Analyst", "AI & NLP",
  "SAP ABAP / FICO / Basis", "ServiceNow ITSM / ITOM", "Salesforce Developer",
  "React JS", "Node JS", "Angular", "Vue.js", "Java", "Python", ".NET Core",
  "Adaptive Autosar (KPIT)", "Embedded Developer", "SOC / FPGA Verification",
  "Dynamics 365", "Oracle DBA", "SQL Server DBA", "Machine Learning",
  "Android Automotive OS", "iOS", "UI / UX", "Quality Analyst", "Business Analyst",
];

const nonItProfiles = [
  "Chartered Accountant", "Chief Financial Officer", "Finance Manager",
  "Corporate HR Manager", "Plant HR Manager", "Compliance Head",
  "Corporate Sales", "Channel Sales Manager", "Key Account Head",
  "Brand Manager", "Content Strategist", "Copy Writer", "Graphic Designer",
  "SEO / Google & Meta Ads", "Influencer Marketing", "E-Commerce Manager",
  "Shopify", "Marketplace Ads Specialist", "Supply Chain Analyst",
  "Logistics Manager", "Procurement & Admin", "Plant Head - Aerospace",
  "Project Manager - Structure MEP", "Portfolio Manager - Real Estate",
  "Company Secretary", "Executive Assistant", "Wealth Manager",
];

function IndustriesPage() {
  useReveal();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Ultra-Premium Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden">
        {/* Dynamic decorative blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-brand/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-6 text-center reveal">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-dark border border-brand/30 text-brand font-semibold text-xs md:text-sm mb-8 shadow-[var(--shadow-glow)] uppercase tracking-widest">
            <Sparkles className="w-4 h-4" /> Powering 21+ Sectors
          </div>
          <h1 className="font-display text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
            We build teams for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-brand-glow to-gold">every industry.</span>
          </h1>
          <p className="mt-8 mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            From deep-tech startups to global hospitality chains, PeopleQuest delivers pre-vetted, high-impact talent across the entire economic spectrum.
          </p>
        </div>
      </section>

      {/* 3D Glowing Industries Grid */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {industries.map((i, index) => (
            <div 
              key={i.name} 
              className="animate-fade-up card-3d flex flex-col items-center justify-center text-center gap-5 rounded-3xl border border-white/10 bg-card p-6 md:p-8" 
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-brand blur-xl opacity-40 rounded-full" />
                <span className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-brand text-white shadow-lg">
                  <i.icon size={24} />
                </span>
              </div>
              <span className="text-sm md:text-base font-bold text-foreground leading-tight">{i.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Infinite Marquee Profiles Section */}
      <section className="py-24 border-t border-border/50 bg-surface/50 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="text-center mb-16 reveal">
          <h2 className="font-display text-3xl md:text-5xl font-bold">Hundreds of specialized roles.</h2>
          <p className="mt-4 text-muted-foreground text-lg">We actively hire for these critical profiles every single day.</p>
        </div>

        {/* IT Marquee */}
        <div className="flex whitespace-nowrap overflow-hidden py-4">
          <div className="animate-marquee inline-flex gap-4 items-center w-max">
            {[...itProfiles, ...itProfiles].map((p, idx) => (
              <span key={`it-${idx}`} className="px-6 py-3 text-sm md:text-base font-bold rounded-full glass border border-brand/20 text-brand whitespace-nowrap shadow-[var(--shadow-soft)] hover-lift">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Non-IT Marquee */}
        <div className="flex whitespace-nowrap overflow-hidden py-4 mt-2">
          <div className="animate-marquee inline-flex gap-4 items-center w-max" style={{ animationDirection: "reverse", animationDuration: "40s" }}>
            {[...nonItProfiles, ...nonItProfiles].map((p, idx) => (
              <span key={`nit-${idx}`} className="px-6 py-3 text-sm md:text-base font-bold rounded-full glass border border-gold/20 text-gold whitespace-nowrap shadow-[var(--shadow-soft)] hover-lift">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
