-- Supabase Schema for StyleCompass AI / AURION AI

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Photo Analyses Table
create table public.photo_analyses (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  photo_id text not null,
  photo_url text,
  body_type text,
  skin_tone text,
  hair_color text,
  measurements jsonb default '{}'::jsonb,
  recommended_colors jsonb default '[]'::jsonb,
  avoid_colors jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Premium Users Table
create table public.premium_users (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Saved Items Table (Closet)
create table public.saved_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  product_id text not null,
  product_name text not null,
  product_brand text,
  category text,
  color text,
  image_url text,
  store text,
  store_url text,
  product_price numeric,
  product_discounted_price numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Saved Outfits Table (Closet)
create table public.saved_outfits (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  outfit_id text not null,
  outfit_name text not null,
  outfit_description text,
  outfit_why_it_suits text,
  outfit_products jsonb default '[]'::jsonb not null,
  outfit_color_palette jsonb default '[]'::jsonb,
  outfit_occasion jsonb default '[]'::jsonb,
  outfit_total_price numeric,
  outfit_discounted_price numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Products Catalog Table (Cache)
create table public.products_catalog (
  product_id text primary key,
  name text not null,
  brand text,
  category text,
  color text,
  store text,
  price numeric,
  discounted_price numeric,
  rating numeric,
  image_url text,
  affiliate_url text,
  occasion jsonb default '[]'::jsonb,
  body_types jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Affiliate Clicks Table
create table public.affiliate_clicks (
  id uuid default uuid_generate_v4() primary key,
  product_id text not null,
  affiliate_url text not null,
  user_agent text,
  ip_address text,
  referrer text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Triggers for updated_at
create trigger handle_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at
  before update on public.products_catalog
  for each row execute procedure public.handle_updated_at();

-- ROW LEVEL SECURITY (RLS) POLICIES
alter table public.profiles enable row level security;
alter table public.photo_analyses enable row level security;
alter table public.premium_users enable row level security;
alter table public.saved_items enable row level security;
alter table public.saved_outfits enable row level security;
alter table public.products_catalog enable row level security;
alter table public.affiliate_clicks enable row level security;

-- Profiles: Users can view and update their own profile
create policy "Users can view own profile" 
  on public.profiles for select 
  using ( auth.uid() = id );
create policy "Users can update own profile" 
  on public.profiles for update 
  using ( auth.uid() = id );

-- Photo Analyses: Users can CRUD their own
create policy "Users can access own photo analyses" 
  on public.photo_analyses for all 
  using ( auth.uid() = user_id );

-- Saved Items: Users can CRUD their own
create policy "Users can access own saved items" 
  on public.saved_items for all 
  using ( auth.uid() = user_id );

-- Saved Outfits: Users can CRUD their own
create policy "Users can access own saved outfits" 
  on public.saved_outfits for all 
  using ( auth.uid() = user_id );

-- Products Catalog: Public read-only
create policy "Products map is public viewable" 
  on public.products_catalog for select 
  using ( true );

-- Affiliate Clicks: Edge functions only can insert, but for now we'll restrict to service role
create policy "Service role can insert clicks" 
  on public.affiliate_clicks for all 
  using ( auth.jwt() ->> 'role' = 'service_role' );

-- Premium Users: Service role only
create policy "Service role manages premium" 
  on public.premium_users for all 
  using ( auth.jwt() ->> 'role' = 'service_role' );

-- Create bucket for user photos
insert into storage.buckets (id, name, public) 
values ('user-photos', 'user-photos', false)
on conflict do nothing;

create policy "Users can upload their own photos"
  on storage.objects for insert
  with check ( bucket_id = 'user-photos' AND auth.uid()::text = (storage.foldername(name))[1] );

create policy "Users can view their own photos"
  on storage.objects for select
  using ( bucket_id = 'user-photos' AND auth.uid()::text = (storage.foldername(name))[1] );
