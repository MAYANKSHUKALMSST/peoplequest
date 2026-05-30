import { Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display font-bold text-xl">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-brand text-brand-foreground">PQ</span>
            PeopleQuest Data Services
          </div>
          <p className="mt-4 text-sm text-primary-foreground/70 max-w-md">
            You ask. We deliver. End-to-end HR, staffing and workforce solutions trusted by growing companies across India.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-brand">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li>IT Staffing</li>
            <li>General Staffing</li>
            <li>Temporary Staffing</li>
            <li>HR Operations</li>
            <li>Learning &amp; Development</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-brand">Get in touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
            <li className="flex gap-2"><MapPin size={16} className="text-brand mt-0.5" /> Andheri East, Mumbai 400093</li>
            <li className="flex gap-2"><Mail size={16} className="text-brand mt-0.5" /> connect@peoplequestds.com</li>
            <li className="flex gap-2"><Phone size={16} className="text-brand mt-0.5" /> +91 98204 37781</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-primary-foreground/60 flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} PeopleQuest Data Services Pvt Ltd. All rights reserved.</span>
          <span>Privacy · Terms · Cookies</span>
        </div>
      </div>
    </footer>
  );
}
