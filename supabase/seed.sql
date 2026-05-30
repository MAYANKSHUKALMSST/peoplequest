-- Insert an admin user into auth.users
INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'admin@peoplequest.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now()
);

-- Insert the corresponding identity
INSERT INTO auth.identities (
  id,
  user_id,
  provider_id,
  identity_data,
  provider,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000000',
  format('{"sub":"%s","email":"%s"}', '00000000-0000-0000-0000-000000000000', 'admin@peoplequest.com')::jsonb,
  'email',
  now(),
  now()
);

-- Assign the 'admin' role to this user in your custom roles table
INSERT INTO public.user_roles (user_id, role)
VALUES ('00000000-0000-0000-0000-000000000000', 'admin');
