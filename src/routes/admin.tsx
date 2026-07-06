import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Trash2, LogOut, Briefcase, Mail, Building2, ShieldAlert, Pencil, X, BarChart3, Download, Search, CheckCircle2, Clock, XCircle } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — PeopleQuest" }] }),
  component: AdminPage,
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
  requirements: string | null;
  audience: string;
  is_active: boolean;
  created_at: string;
};

type Application = {
  id: string;
  job_id: string | null;
  audience_type: string;
  full_name: string;
  email: string;
  phone: string;
  company_name: string | null;
  hiring_needs: string | null;
  current_ctc: string | null;
  expected_ctc: string | null;
  notice_period: string | null;
  cover_letter: string | null;
  status: string;
  created_at: string;
};

const empty = {
  title: "",
  department: "",
  location: "",
  job_type: "Full-time",
  experience: "0-2 years",
  salary_range: "",
  description: "",
  requirements: "",
  audience: "individual",
  is_active: true,
};

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [apps, setApps] = useState<Application[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [showForm, setShowForm] = useState(false);
  const [jobSearch, setJobSearch] = useState("");
  const [appFilter, setAppFilter] = useState("all");

  const filteredJobs = useMemo(() => jobs.filter(j =>
    j.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
    j.department.toLowerCase().includes(jobSearch.toLowerCase()) ||
    j.location.toLowerCase().includes(jobSearch.toLowerCase())
  ), [jobs, jobSearch]);

  const filteredApps = useMemo(() => appFilter === "all" ? apps : apps.filter(a => a.status === appFilter), [apps, appFilter]);

  const stats = useMemo(() => ({
    totalJobs: jobs.length,
    activeJobs: jobs.filter(j => j.is_active).length,
    totalApps: apps.length,
    newApps: apps.filter(a => a.status === "new").length,
    reviewingApps: apps.filter(a => a.status === "reviewing").length,
    hiredApps: apps.filter(a => a.status === "hired").length,
    corporateApps: apps.filter(a => a.audience_type === "corporate").length,
  }), [jobs, apps]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase.from("applications").update({ status }).eq("id", id);
      if (error) throw error;
      setApps(x => x.map(a => a.id === id ? { ...a, status } : a));
      toast.success("Status updated");
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || "Failed to update status");
    }
  };

  const exportCSV = () => {
    const headers = ["Name","Email","Phone","Type","Company","Status","Date"];
    const rows = filteredApps.map(a => [a.full_name, a.email, a.phone, a.audience_type, a.company_name||"—", a.status, new Date(a.created_at).toLocaleDateString()]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "applications.csv"; a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported!");
  };

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    const load = async () => {
      const [j, a] = await Promise.all([
        supabase.from("jobs").select("*").order("created_at", { ascending: false }),
        supabase.from("applications").select("*").order("created_at", { ascending: false }),
      ]);
      if (j.data) setJobs(j.data as Job[]);
      if (a.data) setApps(a.data as Application[]);
    };
    load();
  }, [isAdmin]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const payload = { ...form, created_by: user.id };
    try {
      if (editing) {
        const { error, data } = await supabase.from("jobs").update(payload).eq("id", editing).select().single();
        if (error) throw error;
        setJobs((x) => x.map((j) => (j.id === editing ? (data as Job) : j)));
        toast.success("Job updated");
      } else {
        const { error, data } = await supabase.from("jobs").insert(payload).select().single();
        if (error) throw error;
        setJobs((x) => [data as Job, ...x]);
        toast.success("Job posted");
      }
      setForm({ ...empty });
      setEditing(null);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || "Failed to save job");
    }
  };

  const edit = (j: Job) => {
    setEditing(j.id);
    setForm({
      title: j.title, department: j.department, location: j.location,
      job_type: j.job_type, experience: j.experience, salary_range: j.salary_range || "",
      description: j.description, requirements: j.requirements || "",
      audience: j.audience, is_active: j.is_active,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const del = async (id: string) => {
    if (!confirm("Delete this job?")) return;
    try {
      const { error } = await supabase.from("jobs").delete().eq("id", id);
      if (error) throw error;
      setJobs((x) => x.filter((j) => j.id !== id));
      toast.success("Deleted");
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || "Failed to delete job");
    }
  };

  const toggle = async (j: Job) => {
    try {
      const { error } = await supabase.from("jobs").update({ is_active: !j.is_active }).eq("id", j.id);
      if (error) throw error;
      setJobs((x) => x.map((y) => (y.id === j.id ? { ...y, is_active: !y.is_active } : y)));
      toast.success(j.is_active ? "Job deactivated" : "Job activated");
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || "Failed to toggle status");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;

  if (user && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center rounded-3xl border border-border/60 bg-card p-10 shadow-[var(--shadow-elegant)]">
          <ShieldAlert className="w-12 h-12 text-gold mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Admin access required</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Your account <span className="font-mono">{user.email}</span> is signed in but not an admin yet.
            An existing admin can grant your user the <code className="text-brand">admin</code> role in the database.
          </p>
          <p className="text-xs text-muted-foreground mb-6">
            Your user id: <code className="text-foreground">{user.id}</code>
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={signOut} variant="outline"><LogOut className="w-4 h-4 mr-1" /> Sign out</Button>
            <Link to="/" className="inline-flex items-center justify-center h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium">Back to site</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card/60 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-ink text-white inline-flex items-center justify-center font-bold">PQ</div>
            <div>
              <div className="font-display font-bold text-sm leading-tight">Admin Console</div>
              <div className="text-xs text-muted-foreground">{user?.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">View site</Link>
            <Button onClick={signOut} variant="outline" size="sm"><LogOut className="w-4 h-4 mr-1" /> Sign out</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <Tabs defaultValue="overview">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Active Jobs", value: stats.activeJobs, sub: `${stats.totalJobs} total`, color: "text-brand" },
              { label: "Applications", value: stats.totalApps, sub: `${stats.newApps} new`, color: "text-gold" },
              { label: "Reviewing", value: stats.reviewingApps, sub: "in progress", color: "text-blue-500" },
              { label: "Hired", value: stats.hiredApps, sub: "converted", color: "text-green-500" },
            ].map(s => (
              <div key={s.label} className="rounded-2xl border border-border/60 bg-card p-4">
                <div className={`text-3xl font-bold font-display ${s.color}`}>{s.value}</div>
                <div className="text-sm font-medium">{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.sub}</div>
              </div>
            ))}
          </div>
          <TabsList>
            <TabsTrigger value="overview"><BarChart3 className="w-4 h-4 mr-1" /> Overview</TabsTrigger>
            <TabsTrigger value="jobs"><Briefcase className="w-4 h-4 mr-1" /> Jobs ({jobs.length})</TabsTrigger>
            <TabsTrigger value="apps"><Mail className="w-4 h-4 mr-1" /> Applications ({apps.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border/60 bg-card p-6">
                <h3 className="font-bold text-lg mb-4">Application breakdown</h3>
                {[
                  { label: "New", count: stats.newApps, icon: <Clock className="w-4 h-4 text-gold" />, color: "bg-gold/10" },
                  { label: "Reviewing", count: stats.reviewingApps, icon: <CheckCircle2 className="w-4 h-4 text-blue-500" />, color: "bg-blue-500/10" },
                  { label: "Hired", count: stats.hiredApps, icon: <CheckCircle2 className="w-4 h-4 text-green-500" />, color: "bg-green-500/10" },
                  { label: "Rejected", count: apps.filter(a=>a.status==="rejected").length, icon: <XCircle className="w-4 h-4 text-destructive" />, color: "bg-destructive/10" },
                ].map(s => (
                  <div key={s.label} className={`flex items-center justify-between rounded-xl p-3 mb-2 ${s.color}`}>
                    <div className="flex items-center gap-2">{s.icon}<span className="font-medium text-sm">{s.label}</span></div>
                    <span className="font-bold">{s.count}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-border/60 bg-card p-6">
                <h3 className="font-bold text-lg mb-4">Audience split</h3>
                <div className="flex items-end gap-4 mt-6">
                  <div className="flex-1 text-center">
                    <div className="bg-brand rounded-xl mb-2 mx-auto" style={{height: `${Math.max(20, (stats.totalApps - stats.corporateApps) / Math.max(1,stats.totalApps) * 160)}px`, width:"60px"}} />
                    <div className="text-sm font-bold">{stats.totalApps - stats.corporateApps}</div>
                    <div className="text-xs text-muted-foreground">Individual</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="bg-gold rounded-xl mb-2 mx-auto" style={{height: `${Math.max(20, stats.corporateApps / Math.max(1,stats.totalApps) * 160)}px`, width:"60px"}} />
                    <div className="text-sm font-bold">{stats.corporateApps}</div>
                    <div className="text-xs text-muted-foreground">Corporate</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-border/60 bg-card p-6">
              <h3 className="font-bold text-lg mb-4">Recent applications</h3>
              {apps.slice(0,5).map(a => (
                <div key={a.id} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                  <div>
                    <div className="font-medium text-sm">{a.full_name}</div>
                    <div className="text-xs text-muted-foreground">{a.email} • {new Date(a.created_at).toLocaleDateString()}</div>
                  </div>
                  <Badge variant={a.status==="new"?"secondary":a.status==="hired"?"default":"outline"}>{a.status}</Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="mt-6">
            <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
              <h2 className="text-2xl font-bold">Job postings</h2>
              <div className="flex gap-2 items-center flex-1 max-w-sm">
                <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input className="pl-9" placeholder="Search jobs…" value={jobSearch} onChange={e=>setJobSearch(e.target.value)} /></div>
              </div>
              <Button onClick={() => { setEditing(null); setForm({ ...empty }); setShowForm((s) => !s); }} className="bg-gradient-brand text-brand-foreground">
                {showForm ? <><X className="w-4 h-4 mr-1" /> Close</> : <><Plus className="w-4 h-4 mr-1" /> New job</>}
              </Button>
            </div>

            {showForm && (
              <form onSubmit={save} className="rounded-2xl border border-border/60 bg-card p-6 mb-8 shadow-[var(--shadow-soft)] grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2"><Label>Job title *</Label><Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><Label>Department *</Label><Input required value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} /></div>
                <div><Label>Location *</Label><Input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
                <div><Label>Job type</Label>
                  <Select value={form.job_type} onValueChange={(v) => setForm({ ...form, job_type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Engagement">Engagement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Experience</Label><Input value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} /></div>
                <div><Label>Salary range</Label><Input value={form.salary_range} onChange={(e) => setForm({ ...form, salary_range: e.target.value })} placeholder="₹8-12 LPA" /></div>
                <div><Label>Audience *</Label>
                  <Select value={form.audience} onValueChange={(v) => setForm({ ...form, audience: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual job seekers</SelectItem>
                      <SelectItem value="corporate">Corporate / Enterprise</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2"><Label>Description *</Label><Textarea required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                <div className="md:col-span-2"><Label>Requirements</Label><Textarea rows={3} value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} /></div>
                <div className="md:col-span-2 flex items-center gap-2">
                  <input id="active" type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
                  <Label htmlFor="active" className="cursor-pointer">Active (visible on careers page)</Label>
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <Button type="submit" className="bg-gradient-brand text-brand-foreground">{editing ? "Update job" : "Post job"}</Button>
                </div>
              </form>
            )}

            <div className="grid gap-3">
              {filteredJobs.length === 0 && <p className="text-muted-foreground text-sm">{jobSearch ? "No jobs match your search." : "No jobs yet. Click \"New job\" to post one."}</p>}
              {filteredJobs.map((j) => (
                <div key={j.id} className="rounded-2xl border border-border/60 bg-card p-5 hover-lift">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display font-bold text-lg">{j.title}</h3>
                        <Badge variant={j.audience === "corporate" ? "default" : "secondary"}>
                          {j.audience === "corporate" ? <><Building2 className="w-3 h-3 mr-1" /> Corporate</> : j.audience === "both" ? "Both" : "Individual"}
                        </Badge>
                        {!j.is_active && <Badge variant="outline">Inactive</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{j.department} • {j.location} • {j.job_type} • {j.experience}</p>
                      <p className="text-sm mt-2 line-clamp-2">{j.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => toggle(j)}>{j.is_active ? "Hide" : "Show"}</Button>
                      <Button size="sm" variant="outline" onClick={() => edit(j)}><Pencil className="w-4 h-4" /></Button>
                      <Button size="sm" variant="outline" onClick={() => del(j.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="apps" className="mt-6">
            <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
              <h2 className="text-2xl font-bold">Applications received</h2>
              <div className="flex gap-2">
                <Select value={appFilter} onValueChange={setAppFilter}>
                  <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reviewing">Reviewing</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={exportCSV}><Download className="w-4 h-4 mr-1" />Export CSV</Button>
              </div>
            </div>
            <div className="grid gap-3">
              {filteredApps.length === 0 && <p className="text-muted-foreground text-sm">No applications found.</p>}
              {filteredApps.map((a) => {
                const j = jobs.find((x) => x.id === a.job_id);
                return (
                  <div key={a.id} className="rounded-2xl border border-border/60 bg-card p-5">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display font-bold">{a.full_name}</h3>
                          <Badge variant={a.audience_type === "corporate" ? "default" : "secondary"}>
                            {a.audience_type === "corporate" ? <><Building2 className="w-3 h-3 mr-1"/>Corporate</> : "Individual"}
                          </Badge>
                          <Badge variant={a.status==="new"?"secondary":a.status==="hired"?"default":"outline"}>{a.status}</Badge>
                          <span className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{a.email} • {a.phone}{a.company_name ? ` • ${a.company_name}` : ""}</p>
                        {j && <p className="text-sm mt-1">For: <span className="font-medium">{j.title}</span></p>}
                        {a.audience_type === "individual" && (a.current_ctc || a.expected_ctc || a.notice_period) && (
                          <p className="text-xs text-muted-foreground mt-1">Current: {a.current_ctc||"—"} • Expected: {a.expected_ctc||"—"} • Notice: {a.notice_period||"—"}</p>
                        )}
                        {a.hiring_needs && <p className="text-sm mt-2"><span className="font-medium">Hiring needs:</span> {a.hiring_needs}</p>}
                        {a.cover_letter && <p className="text-sm mt-2 text-muted-foreground line-clamp-2">{a.cover_letter}</p>}
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <a href={`mailto:${a.email}`} className="text-sm text-brand hover:underline">Reply →</a>
                        <Select value={a.status} onValueChange={v => updateStatus(a.id, v)}>
                          <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="reviewing">Reviewing</SelectItem>
                            <SelectItem value="shortlisted">Shortlisted</SelectItem>
                            <SelectItem value="hired">Hired</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
