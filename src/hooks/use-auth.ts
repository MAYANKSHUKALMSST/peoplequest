import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async (uid?: string, accessToken?: string) => {
      if (!uid) return setIsAdmin(false);
      try {
        // Use direct REST query — bypasses RPC enum casting issues
        const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/user_roles?user_id=eq.${uid}&role=eq.admin&select=role`;
        const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
        const headers: Record<string, string> = {
          "apikey": anonKey,
          "Content-Type": "application/json",
        };
        if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
        const res = await fetch(url, { headers });
        const rows = await res.json();
        console.log("[useAuth] checkAdmin rows:", rows, "for uid:", uid);
        setIsAdmin(Array.isArray(rows) && rows.length > 0);
      } catch (e) {
        console.error("[useAuth] checkAdmin error:", e);
        setIsAdmin(false);
      }
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      setTimeout(() => checkAdmin(s?.user?.id, s?.access_token), 0);
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      checkAdmin(data.session?.user?.id, data.session?.access_token ?? undefined).finally(() => setLoading(false));
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return { session, user, isAdmin, loading };
}
