-- Supabase project "developer-journey": optional accounts for the learning site.
-- progress:      one row per user and track, the same JSON the browser keeps in localStorage.
-- test_attempts: every weekly/monthly test attempt (score, answers, time), kept as a log.
-- Row-level security: every user reads and writes only their own rows.

create table if not exists public.progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  track text not null check (track in ('english', 'n8n')),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, track)
);

create table if not exists public.test_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  track text not null check (track in ('english', 'n8n')),
  test_id text not null check (char_length(test_id) <= 40),
  score int not null check (score >= 0),
  total int not null check (total > 0 and score <= total),
  answers jsonb not null default '[]'::jsonb,
  taken_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (user_id, track, test_id, taken_at)
);
create index if not exists test_attempts_user on public.test_attempts (user_id, track, test_id);

alter table public.progress enable row level security;
alter table public.test_attempts enable row level security;

drop policy if exists "own progress" on public.progress;
create policy "own progress" on public.progress
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "own attempts read" on public.test_attempts;
create policy "own attempts read" on public.test_attempts
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "own attempts insert" on public.test_attempts;
create policy "own attempts insert" on public.test_attempts
  for insert to authenticated with check ((select auth.uid()) = user_id);

-- keep the progress JSON a sane size (a full 24-week journey is well under 1 MB)
alter table public.progress drop constraint if exists progress_size;
alter table public.progress add constraint progress_size check (pg_column_size(data) < 1000000);
