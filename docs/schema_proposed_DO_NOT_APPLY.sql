-- KEIGH'S CORNER — proposed Supabase schema, NOT applied to any project.
-- REVIEW before applying. Requires Supabase/Postgres with pgcrypto, auth schema.
-- Safeguards: public catalog read-only, orders admin read-only, all payment/order writes server-side.

create extension if not exists pgcrypto;

create table if not exists public.kc_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  sku text unique,
  name text not null,
  description text not null default '',
  category text not null check (category in ('Sacs','Écharpes & foulards','Accessoires')),
  brand text,
  color text,
  size text,
  condition text,
  weight_grams integer check (weight_grams is null or weight_grams >= 0),
  price_cents integer not null check (price_cents > 0),
  cost_cents integer not null default 0 check (cost_cents >= 0),
  packing_cost_cents integer not null default 0 check (packing_cost_cents >= 0),
  stock_count integer not null default 0 check (stock_count >= 0),
  low_stock_threshold integer not null default 2 check (low_stock_threshold >= 0),
  image_paths text[] not null default '{}',
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.kc_orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text unique,
  buyer_email text not null,
  buyer_first_name text not null,
  buyer_last_name text not null,
  buyer_phone text,
  shipping_address jsonb not null,
  delivery_method text not null check (delivery_method in ('home','pickup')),
  pickup_point_id text,
  subtotal_cents integer not null check (subtotal_cents >= 0),
  shipping_cents integer not null default 0 check (shipping_cents >= 0),
  total_cents integer not null check (total_cents >= 0),
  currency text not null default 'eur' check (currency = 'eur'),
  payment_status text not null default 'pending' check (payment_status in ('pending','paid','failed','refunded')),
  fulfillment_status text not null default 'new' check (fulfillment_status in ('new','preparing','shipped','delivered','cancelled','returned')),
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create table if not exists public.kc_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.kc_orders(id) on delete restrict,
  product_id uuid references public.kc_products(id) on delete set null,
  sku_snapshot text,
  product_name_snapshot text not null,
  unit_price_cents integer not null check (unit_price_cents >= 0),
  qty integer not null check (qty > 0)
);

create table if not exists public.kc_shipments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.kc_orders(id) on delete restrict,
  carrier text,
  carrier_reference text,
  tracking_number text,
  tracking_url text,
  label_storage_path text,
  shipped_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.kc_order_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.kc_orders(id) on delete restrict,
  event_type text not null,
  actor_type text not null check (actor_type in ('system','admin','customer')),
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists kc_products_published_idx on public.kc_products(is_published,category,created_at desc);
create index if not exists kc_orders_created_idx on public.kc_orders(created_at desc);
create index if not exists kc_orders_buyer_idx on public.kc_orders(lower(buyer_email));
create index if not exists kc_order_items_order_idx on public.kc_order_items(order_id);
create index if not exists kc_shipments_order_idx on public.kc_shipments(order_id);
create index if not exists kc_order_events_order_idx on public.kc_order_events(order_id,created_at);

-- App authorization MUST come from trusted app_metadata assigned by the Supabase Auth admin API,
-- never user_metadata. Refresh/revoke sessions when roles change.
alter table public.kc_products enable row level security;
alter table public.kc_orders enable row level security;
alter table public.kc_order_items enable row level security;
alter table public.kc_shipments enable row level security;
alter table public.kc_order_events enable row level security;

revoke all on public.kc_products from anon, authenticated;
revoke all on public.kc_orders from anon, authenticated;
revoke all on public.kc_order_items from anon, authenticated;
revoke all on public.kc_shipments from anon, authenticated;
revoke all on public.kc_order_events from anon, authenticated;

grant select on public.kc_products to anon,authenticated;
grant insert, update, delete on public.kc_products to authenticated;
grant select on public.kc_orders, public.kc_order_items, public.kc_shipments, public.kc_order_events to authenticated;

create policy kc_public_product_read on public.kc_products for select to anon
using (is_published = true);
create policy kc_auth_product_read on public.kc_products for select to authenticated
using (is_published = true or ((select auth.uid()) is not null and (auth.jwt()->'app_metadata'->>'kc_admin') = 'true'));
create policy kc_admin_product_insert on public.kc_products for insert to authenticated
with check ((select auth.uid()) is not null and (auth.jwt()->'app_metadata'->>'kc_admin') = 'true');
create policy kc_admin_product_update on public.kc_products for update to authenticated
using ((select auth.uid()) is not null and (auth.jwt()->'app_metadata'->>'kc_admin') = 'true')
with check ((select auth.uid()) is not null and (auth.jwt()->'app_metadata'->>'kc_admin') = 'true');
create policy kc_admin_product_delete on public.kc_products for delete to authenticated
using ((select auth.uid()) is not null and (auth.jwt()->'app_metadata'->>'kc_admin') = 'true');

create policy kc_admin_orders_read on public.kc_orders for select to authenticated
using ((select auth.uid()) is not null and (auth.jwt()->'app_metadata'->>'kc_admin') = 'true');
create policy kc_admin_order_items_read on public.kc_order_items for select to authenticated
using ((select auth.uid()) is not null and (auth.jwt()->'app_metadata'->>'kc_admin') = 'true');
create policy kc_admin_shipments_read on public.kc_shipments for select to authenticated
using ((select auth.uid()) is not null and (auth.jwt()->'app_metadata'->>'kc_admin') = 'true');
create policy kc_admin_events_read on public.kc_order_events for select to authenticated
using ((select auth.uid()) is not null and (auth.jwt()->'app_metadata'->>'kc_admin') = 'true');

-- IMPORTANT: Customers do not directly INSERT orders or mark them paid in the Data API.
-- Use server-side Stripe Checkout creation and verified webhook events, with atomic stock
-- reservation/release and idempotency. Do not grant update to public.kc_orders from browser roles.
-- A separate product photo Storage bucket requires its own upload/download policies.
