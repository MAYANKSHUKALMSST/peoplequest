-- Grant execute on has_role to authenticated users
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon;

-- Also grant SELECT on user_roles to authenticated (for direct REST queries)
GRANT SELECT ON public.user_roles TO authenticated;
