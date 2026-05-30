
-- Fix search_path on trigger function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Restrict has_role execution (only used internally by RLS)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;

-- Tighten public application insert: require non-empty key fields
DROP POLICY IF EXISTS "Anyone can apply" ON public.applications;
CREATE POLICY "Public can apply with valid data" ON public.applications
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(trim(full_name)) > 0
  AND length(trim(email)) > 4
  AND length(trim(phone)) > 4
);
