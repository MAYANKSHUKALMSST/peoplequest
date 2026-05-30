
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Jobs
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  job_type TEXT NOT NULL DEFAULT 'Full-time',
  experience TEXT NOT NULL DEFAULT '0-2 years',
  salary_range TEXT,
  description TEXT NOT NULL,
  requirements TEXT,
  audience TEXT NOT NULL DEFAULT 'both' CHECK (audience IN ('individual','corporate','both')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone views active jobs" ON public.jobs FOR SELECT USING (is_active = true);
CREATE POLICY "Admins view all jobs" ON public.jobs FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert jobs" ON public.jobs FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update jobs" ON public.jobs FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete jobs" ON public.jobs FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Applications
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
  audience_type TEXT NOT NULL DEFAULT 'individual' CHECK (audience_type IN ('individual','corporate')),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT,
  company_size TEXT,
  hiring_needs TEXT,
  current_ctc TEXT,
  expected_ctc TEXT,
  notice_period TEXT,
  experience_years TEXT,
  resume_url TEXT,
  cover_letter TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can apply" ON public.applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view applications" ON public.applications FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update applications" ON public.applications FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER jobs_updated_at BEFORE UPDATE ON public.jobs
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed sample jobs
INSERT INTO public.jobs (title, department, location, job_type, experience, salary_range, description, requirements, audience) VALUES
('Senior HR Business Partner', 'Human Resources', 'Bangalore, India', 'Full-time', '5-8 years', '₹12-18 LPA', 'Partner with leadership to drive talent strategy across business units.', 'MBA in HR, strong stakeholder management, analytics-driven mindset.', 'individual'),
('Talent Acquisition Lead', 'Recruitment', 'Mumbai, India', 'Full-time', '4-7 years', '₹10-15 LPA', 'Lead end-to-end recruitment for tech and non-tech roles.', 'Proven hiring track record, sourcing strategies, ATS expertise.', 'individual'),
('Enterprise RPO Partnership', 'Corporate Solutions', 'Pan India', 'Engagement', 'Enterprise', 'Custom', 'Partner with PeopleQuest for end-to-end RPO across your organization.', 'Mid to large enterprises hiring 50+ roles annually.', 'corporate'),
('Executive Search — Leadership Hiring', 'Corporate Solutions', 'Pan India', 'Engagement', 'C-Suite', 'Custom', 'Confidential leadership and CXO search mandates.', 'Organizations hiring senior leadership.', 'corporate');
