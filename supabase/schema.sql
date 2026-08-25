-- Project Anak Kamar — Plus (one-time upgrade) schema.
-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query).

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  is_plus boolean not null default false,
  plus_since timestamptz,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: read own" on public.profiles
  for select using (auth.uid() = id);

-- No insert/update policy for authenticated users: the row is created by the
-- trigger below and flipped to is_plus by the webhook, both running as the
-- service role, which bypasses RLS entirely.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- One row per checkout attempt. order_id is the Midtrans transaction id.
create table if not exists public.purchases (
  order_id text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  amount integer not null,
  status text not null default 'pending', -- pending | settlement | expired | failed
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.purchases enable row level security;

create policy "purchases: read own" on public.purchases
  for select using (auth.uid() = user_id);

create policy "purchases: insert own pending" on public.purchases
  for insert with check (auth.uid() = user_id and status = 'pending');

-- Status transitions (pending → settlement/expired/failed) happen in the
-- Midtrans webhook via the service role, which bypasses RLS — users cannot
-- mark their own purchase as paid.
