-- Adds a minimal notification-preferences store to the existing profiles
-- table rather than a new table + RLS policy set - profiles is already
-- 1:1 with the user and already has "users can view/update own profile"
-- RLS policies covering this column.

alter table public.profiles
  add column if not exists notification_preferences jsonb not null default '{
    "styling_recommendations": true,
    "report_updates": true,
    "product_offers": false,
    "account_security": true
  }'::jsonb;
