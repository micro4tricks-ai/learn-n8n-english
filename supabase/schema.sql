-- Supabase project "developer-journey": optional accounts for the learning site.
-- progress:      one row per user and track, the same JSON the browser keeps in localStorage.
-- test_attempts: every weekly/monthly test attempt (score, answers, time), kept as a log.
-- Row-level security: every user reads and writes only their own rows.

create table if not exists public.progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  track text not null check (track in ('english', 'n8n', 'python')),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, track)
);

create table if not exists public.test_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  track text not null check (track in ('english', 'n8n', 'python')),
  test_id text not null check (char_length(test_id) <= 40),
  score int not null check (score >= 0),
  total int not null check (total > 0 and score <= total),
  answers jsonb not null default '[]'::jsonb,
  taken_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (user_id, track, test_id, taken_at)
);
create index if not exists test_attempts_user on public.test_attempts (user_id, track, test_id);

-- tracks: the allowed journeys (re-run safely on an existing database when a journey is added)
alter table public.progress drop constraint if exists progress_track_check;
alter table public.progress add constraint progress_track_check check (track in ('english', 'n8n', 'python'));
alter table public.test_attempts drop constraint if exists test_attempts_track_check;
alter table public.test_attempts add constraint test_attempts_track_check check (track in ('english', 'n8n', 'python'));

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

-- user_store: the site's other synced stores (review cards, mistakes notebook, lab, prompts, favourites,
-- speaking scores, finished lessons), one row per user and store key. Each `data` is a map {id: {…, at}};
-- the browser merges item by item (newer `at` wins), so edits from two devices both survive.
create table if not exists public.user_store (
  user_id uuid not null references auth.users(id) on delete cascade,
  key text not null check (key ~ '^[a-z][a-z0-9_-]{0,31}$'),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);
alter table public.user_store enable row level security;
drop policy if exists "own store" on public.user_store;
create policy "own store" on public.user_store
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
alter table public.user_store drop constraint if exists user_store_size;
alter table public.user_store add constraint user_store_size check (pg_column_size(data) < 2000000);
