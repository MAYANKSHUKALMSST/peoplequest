import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sparkles, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — PeopleQuest Admin" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. Check your email to confirm.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
        navigate({ to: "/admin" });
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand/30 blur-3xl animate-blob" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gold/20 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
      </div>

      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={16} /> Back to careers
        </Link>

        <div className="rounded-3xl bg-card border border-border/60 shadow-[var(--shadow-elegant)] p-8 card-3d">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-brand" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Admin portal</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {mode === "login" ? "Sign in to manage jobs and applications." : "Set up admin access to post and manage roles."}
          </p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" />
            </div>
            <Button type="submit" disabled={busy} className="w-full bg-gradient-brand text-brand-foreground h-11 font-semibold">
              {busy ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? (
              <>No account? <button onClick={() => setMode("signup")} className="text-brand font-semibold hover:underline">Sign up</button></>
            ) : (
              <>Already have one? <button onClick={() => setMode("login")} className="text-brand font-semibold hover:underline">Sign in</button></>
            )}
          </div>

          <p className="mt-4 text-xs text-muted-foreground text-center">
            New accounts need admin role granted by an existing admin to post jobs.
          </p>
        </div>
      </div>
    </div>
  );
}
