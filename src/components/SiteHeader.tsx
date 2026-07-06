import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeToggle } from "./ThemeToggle";

const nav: { label: string; to: string }[] = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/industries" },
  { label: "Careers", to: "/" },
  { label: "Contact", to: "/contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const check = async (uid?: string) => {
      if (!uid) return setIsAdmin(false);
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid).eq("role", "admin").maybeSingle();
      setIsAdmin(!!data);
    };
    supabase.auth.getSession().then(({ data }) => check(data.session?.user.id));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => check(s?.user.id));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/75 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg group">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-ink text-white shadow-[var(--shadow-glow)] group-hover:scale-105 transition-transform">
            <span>PQ</span>
          </span>
          <span>PeopleQuest</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          {nav.map((n) => (
            <Link key={n.label} to={n.to} className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#apply"
            className="inline-flex items-center justify-center h-9 px-5 rounded-full bg-gradient-brand text-brand-foreground text-sm font-semibold shadow-[var(--shadow-glow)] hover:scale-105 transition-transform"
          >
            Apply now
          </a>
        </div>
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="px-6 py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <Link key={n.label} to={n.to} onClick={() => setOpen(false)} className="text-sm font-medium">
                {n.label}
              </Link>
            ))}
            <a href="#apply" onClick={() => setOpen(false)} className="mt-2 inline-flex justify-center h-10 rounded-full bg-gradient-brand text-brand-foreground items-center text-sm font-semibold">
              Apply now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
