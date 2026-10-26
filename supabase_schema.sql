-- =========================================================================
-- OUR LADY OF GRACE SENIOR HIGH SCHOOL (OLAG SHS)
-- Student Personality of the Week (SPOT WEEK) Assessment System
-- Supabase Cloud Database Schema & Realtime Setup
-- =========================================================================
-- Instructions:
-- 1. Go to https://supabase.com and create a free project.
-- 2. In your Supabase Dashboard, click on "SQL Editor" in the left sidebar.
-- 3. Click "New query", paste the entire contents of this file, and click "Run".
-- 4. Copy your Project URL and Anon/Public API Key from Project Settings > API.
-- 5. Paste them into the SPOT WEEK app under Settings > Cloud Database Connection.
-- =========================================================================

-- 1. Primary App State Table (Single-row synchronized document store for instant multi-device sync)
create table if not exists public.spot_app_state (
  id text primary key default 'current',
  state jsonb not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.spot_app_state enable row level security;

-- Drop existing policies if any
drop policy if exists "Public Read State" on public.spot_app_state;
drop policy if exists "Public Insert State" on public.spot_app_state;
drop policy if exists "Public Update State" on public.spot_app_state;

-- Create open access policies for the SPOT application
create policy "Public Read State" on public.spot_app_state for select using (true);
create policy "Public Insert State" on public.spot_app_state for insert with check (true);
create policy "Public Update State" on public.spot_app_state for update using (true);

-- 2. Structured Relational Tables (For direct SQL reporting and analytics)

-- Table: Week Intervals
create table if not exists public.spot_weeks (
  id text primary key,
  no integer,
  name text not null,
  date_range text,
  start_date date,
  end_date date,
  status text default 'Open',
  is_current boolean default false,
  top_student text,
  total_score numeric,
  max_score numeric default 80,
  percentage numeric,
  updated_at timestamptz default timezone('utc'::text, now())
);
alter table public.spot_weeks enable row level security;
drop policy if exists "Public Weeks Access" on public.spot_weeks;
create policy "Public Weeks Access" on public.spot_weeks for all using (true) with check (true);

-- Table: Students
create table if not exists public.spot_students (
  id text primary key,
  name text not null,
  class text not null,
  house text not null,
  created_at timestamptz default timezone('utc'::text, now())
);
alter table public.spot_students enable row level security;
drop policy if exists "Public Students Access" on public.spot_students;
create policy "Public Students Access" on public.spot_students for all using (true) with check (true);

-- Table: Committee Members
create table if not exists public.spot_members (
  id text primary key,
  name text not null,
  role text not null,
  username text not null,
  password text,
  created_at timestamptz default timezone('utc'::text, now())
);
alter table public.spot_members enable row level security;
drop policy if exists "Public Members Access" on public.spot_members;
create policy "Public Members Access" on public.spot_members for all using (true) with check (true);

-- Table: Weekly Assessment Scores
create table if not exists public.spot_scores (
  id text primary key,
  week_id text not null,
  student_id text not null,
  evaluator_id text,
  scores jsonb not null,
  total numeric not null,
  pct numeric not null,
  updated_at timestamptz default timezone('utc'::text, now())
);
alter table public.spot_scores enable row level security;
drop policy if exists "Public Scores Access" on public.spot_scores;
create policy "Public Scores Access" on public.spot_scores for all using (true) with check (true);

-- 3. Enable Realtime Broadcasting on Tables
-- Allows automatic live updates across all connected tablets, phones, and PCs without refreshing.
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'spot_app_state') then
    alter publication supabase_realtime add table public.spot_app_state;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'spot_weeks') then
    alter publication supabase_realtime add table public.spot_weeks;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'spot_students') then
    alter publication supabase_realtime add table public.spot_students;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'spot_scores') then
    alter publication supabase_realtime add table public.spot_scores;
  end if;
end $$;

-- 4. Initial Placeholder Row in spot_app_state
insert into public.spot_app_state (id, state, updated_at)
values ('current', '{"initialized": true, "weeks": [], "students": [], "scores": {}, "members": []}'::jsonb, now())
on conflict (id) do nothing;
