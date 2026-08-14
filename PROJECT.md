# Aurion AI — Project Reference

> **Read this file in full before making any change to this codebase.** It is the single source of truth for what this app is, how it's built, and what must never change without an explicit request.

## Clarifications (read first)

- **Backend is Supabase, not Firebase.** All data, auth, storage, and serverless functions run on Supabase (Postgres + Auth + Storage + Edge Functions). There is no Firebase anywhere in this project.
- **This app is not built on the Lovable.dev no-code platform.** It is a plain Vite + React + TypeScript SPA, hand-coded, using Supabase directly as its backend. However, one of its AI providers is a real third-party product called **"Lovable AI Gateway"** (a hosted proxy that routes requests to models like `google/gemini-2.5-flash` using a `LOVABLE_API_KEY`). That gateway *is* actually used by three Edge Functions (`photos-analysis`, `search-products`, and as the fallback path in `generate-style-report`) — see §9. Don't confuse "not built on Lovable's app builder" with "doesn't use the Lovable AI Gateway API" — both facts are true simultaneously.

---

## 1. What the app is

**Aurion AI** is an AI fashion-styling and shopping web app for the Indian market. A user signs in, answers a style quiz (optionally uploading a photo), and the app produces a full professional **Style Report** (skin-tone analysis, body-type analysis, color palette, signature looks, wardrobe plan). From the report's signature looks, the app searches for real, buyable products from Indian e-commerce stores, presents them as shoppable outfit cards with prices/discounts, and lets the user save items and outfits to a **Virtual Closet**. A floating **StyleAI chatbot** answers styling questions at any time.

Single-page React app + Supabase backend (Postgres + Auth + Storage + Edge Functions). No server-side rendering, no other backend languages.

---

## 2. Tech stack (fixed — do not change without explicit instruction)

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript 5 (Vite 5), SPA only |
| Routing | react-router-dom (BrowserRouter) |
| Styling | Tailwind CSS v3 + shadcn/ui components |
| Animation | framer-motion (AnimatePresence, PageTransition) |
| Data fetching | @tanstack/react-query (retry: 2, staleTime 5 min, gcTime 30 min, refetchOnWindowFocus: false, refetchOnMount: false) |
| Icons | lucide-react only (thin, gold). **Never emojis in UI** |
| Fonts | @fontsource/cormorant-garamond (headings), @fontsource/karla (body) |
| Backend | **Supabase**: Postgres, Auth, Storage, Edge Functions (Deno) |
| AI | Groq `llama-3.3-70b-versatile`; Lovable AI Gateway `google/gemini-2.5-flash`; Google Gemini API `gemini-2.0-flash` |
| Email | Resend API (OTP delivery) |
| Client import | `import { supabase } from "@/integrations/supabase/client"` (auto-generated — never edit) |

**Auto-generated / never hand-edit:** `src/integrations/supabase/client.ts`, `src/integrations/supabase/types.ts`, `.env`, `supabase/config.toml`.

---

## 3. Design system — "Signature Black & Gold" (luxury editorial)

All colors are HSL CSS variables in `src/index.css` and consumed as Tailwind semantic tokens. **Never hardcode** `text-white`, `bg-black`, `bg-[#...]` in components — always use the tokens below.

### 3.1 Tokens (exact values)

```
--background          0 0% 4%      /* #0A0A0A luxury black */
--foreground          0 0% 100%
--card                0 0% 8%      /* #151515 panel grey */
--popover             0 0% 10%     /* #1A1A1A rich charcoal */
--primary / --accent / --ring   45 66% 52%   /* #D4AF37 premium gold */
--primary-foreground  0 0% 4%
--secondary / --input 0 0% 7%      /* #111111 deep graphite */
--muted               0 0% 8%
--muted-foreground    0 0% 71%     /* #B5B5B5 silver grey */
--border              0 0% 15%
--destructive         0 62% 50%
--radius              0.75rem

--gold           45 66% 52%
--gold-light     45 58% 87%   /* #F2E8C9 */
--gold-dark      35 41% 61%   /* #C5A572 */
--charcoal            0 0% 10%
--charcoal-light      0 0% 8%
--luxury-black        0 0% 4%
--deep-graphite       0 0% 7%
--dark-matte          0 0% 5%
--pure-white          0 0% 100%
--soft-white          0 0% 96%
--silver-grey         0 0% 71%
```

A `.dark` block mirrors the same values — the app is **permanently dark**, there is no light theme.

### 3.2 Gradients & shadows (CSS vars, used via Tailwind utilities)

```
--gradient-gold          linear-gradient(135deg, hsl(45 66% 52%), hsl(45 58% 87%))
--gradient-gold-dark     linear-gradient(135deg, hsl(45 66% 52%), hsl(35 41% 61%))
--gradient-black-gloss   linear-gradient(180deg, hsl(0 0% 10%), hsl(0 0% 4%))
--gradient-card-shine    linear-gradient(145deg, rgba(255,255,255,.08), rgba(0,0,0,0))

--shadow-gold            0 4px 16px hsl(45 66% 52% / .25)
--shadow-gold-glow       0 0 20px hsl(45 66% 52% / .35)
--shadow-gold-intense    0 0 25px hsl(45 66% 52% / .45)
--shadow-card            0 4px 20px hsl(0 0% 0% / .4)
--shadow-card-depth      0 12px 40px hsl(0 0% 0% / .45)
--shadow-ambient         0 0 50px hsl(0 0% 0% / .5)
--shadow-elevated        0 20px 60px hsl(0 0% 0% / .7)
```

### 3.3 Typography

- Headings: Cormorant Garamond (`--font-serif`), often italic for accent words.
- Body/UI: Karla (`--font-sans`).
- `.eyebrow` — uppercase, letter-spaced, small, gold/muted editorial label above headings.
- `.gold-rule` — thin gold hairline divider used under section headers.

### 3.4 Layout & components

- **Bento grid**: `.bento-grid` container, `.bento-tile` cards with hairline borders + depth shadows.
- **Buttons** (`src/components/ui/button.tsx`): variants `luxury` (gold gradient + shine-sweep animation) and `luxuryOutline`; all buttons have a tactile press animation; primary action height `h-12`.
- **Cards** (`src/components/ui/card.tsx`): subtle gradient + inner shadow.
- **Outfit cards**: hover scale 1.02, gold glow, discount badge, AI rationale text.
- **Product cards**: anti-scraping fallback design — metadata + store badge + gold icon placeholder when no image.
- **Mobile**: fixed `BottomNav`; page container has `pb-16 md:pb-0`. Style Wizard has its own fixed bottom nav sitting above the global nav.
- **Global overlays** mounted once in `App.tsx`: `Toaster`, `Sonner`, `BottomNav`, lazy `StyleAIChatbot`.

---

## 4. Architecture

```
Browser (React SPA, Vite, port 8080 dev)
  ├─ AuthProvider (Supabase session) ─ ProtectedRoute guards
  ├─ Pages (lazy-loaded) + framer-motion PageTransition
  ├─ Hooks: useAuth, usePremium, useStyleReport, useStyleReportHistory,
  │          useProductSearch, useCloset, use-toast, use-mobile
  └─ supabase-js client (anon key)
        ├─ Postgres (RLS enforced, all reads/writes scoped by auth.uid())
        ├─ Storage bucket `user-photos` (PRIVATE, owner-only, signed URLs)
        └─ Edge Functions (Deno) ── external AI / email providers
              generate-style-report → Groq → fallback Lovable AI Gateway
              photos-upload         → Storage (service role)
              photos-analysis       → Lovable AI Gateway (vision)
              search-products       → Lovable AI Gateway (per look)
              recommendations       → rule-based catalog filter
              products-redirect     → affiliate click log + 302
              style-ai-chat         → Google Gemini API
              send-auth-email       → Resend
```

All Edge Functions are declared in `supabase/config.toml` with `verify_jwt = false`, and 6 of the 8 perform **manual bearer-token verification inside the handler**. `products-redirect` and `send-auth-email` are intentionally public (browser redirect / pre-auth OTP).

Every function **duplicates** the same CORS helpers (`ALLOWED_ORIGINS = http://localhost:5173, http://localhost:8080, http://localhost:3000`, plus a regex allowlist for `*.lovable.app` and `*.lovableproject.com`; `getCorsHeaders` sets `Access-Control-Allow-Credentials: 'true'`). There is **no `_shared/` directory** — this duplication is intentional, not an oversight to "clean up."

---

## 5. Routes (exact)

| Path | Page | Guard |
|---|---|---|
| `/auth` | Auth | public |
| `/` | Index (home) | ProtectedRoute |
| `/get-outfit` | StyleWizard | ProtectedRoute |
| `/style-quiz` | StyleQuiz | ProtectedRoute |
| `/reports` | Reports | ProtectedRoute |
| `/recommendations` | Recommendations | ProtectedRoute |
| `/closet` | Closet | ProtectedRoute |
| `/explore` | Explore | ProtectedRoute |
| `/profile` | Profile | ProtectedRoute |
| `*` | NotFound | public |

All pages are `React.lazy` imports behind a `Suspense` `PageLoader` (pulsing gold sparkles tile).

---

## 6. Database (Postgres, schema `public`) — exact structure

RLS is enabled on **every table**. Roles: `authenticated` for user data, `anon` read-only where noted, `service_role` for edge functions. Every table's PK is `uuid default gen_random_uuid()`.

### 6.1 `profiles`
`id uuid PK` (= `auth.users.id`), `full_name text`, `avatar_url text`, `created_at timestamptz`, `updated_at timestamptz`.
Policies: select/insert/update own row (`auth.uid() = id`). `updated_at` maintained by trigger `update_updated_at_column()`.

### 6.2 `photo_analyses`
`id`, `user_id uuid`, `photo_id text/uuid` (unique key used for upsert), `photo_url text`, `body_type text`, `skin_tone text`, `hair_color text`, `measurements jsonb`, `recommended_colors jsonb`, `avoid_colors jsonb`, `analyzed_at timestamptz`, `created_at timestamptz`.
Policies: users select/insert/update/delete own rows; `service_role` full access.

### 6.3 `style_reports`
`id`, `user_id uuid`, `report_data jsonb` (the full Style Report object), `quiz_inputs jsonb`, `created_at`.
Policies: users select/insert/delete own rows.

### 6.4 `saved_items` (closet — single products)
`id`, `user_id uuid`, `product_id text`, `product_name text`, `product_brand text`, `product_category text`, `product_color text`, `product_price numeric`, `product_discounted_price numeric`, `product_image_url text`, `product_store text`, `product_store_url text`, `created_at`.
Policies: users select/insert/delete own rows.

### 6.5 `saved_outfits` (closet — full looks)
`id`, `user_id uuid`, `outfit_id text`, `outfit_name text`, `outfit_description text`, `outfit_why_it_suits text`, `outfit_color_palette jsonb`, `outfit_occasion jsonb`, `outfit_products jsonb` (array of Product), `outfit_total_price numeric`, `outfit_discounted_price numeric`, `created_at`.
Policies: users select/insert/delete own rows.

### 6.6 `products_catalog`
`id`, `product_id text`, `name text`, `brand text`, `category text`, `color text`, `price numeric NOT NULL`, `discounted_price numeric`, `image_url text`, `affiliate_url text NOT NULL`, `store text`, `rating numeric`, `occasion jsonb`, `body_types jsonb`, `created_at`.
Policies: anyone (public) can select; `service_role` manages.

### 6.7 `affiliate_clicks`
`id`, `product_id text`, `affiliate_url text`, `user_agent text`, `ip_address text`, `referrer text` (all free-text truncated to 500 chars), `clicked_at timestamptz`.
Policies: `service_role` manages; authenticated users may insert.

### 6.8 `premium_users`
`id`, `user_id uuid`, `email text`, `tier text default 'free'/'premium'`, `is_active boolean`, `created_at`.
Policy: user can read own row, matched via `auth.jwt()` email claim (**must not** query `auth.users`).

### 6.9 `outfit_generations` (free-tier metering)
`id`, `user_id uuid`, `created_at`.
Policies: users select/insert own rows.

### 6.10 Storage
Bucket `user-photos`, `public = false`. Object path `<user_id>/<photo_id>.<ext>`. Policies: authenticated user may insert/select/delete only when `auth.uid()::text = (storage.foldername(name))[1]`; `service_role` full access. Access is always via **24-hour signed URLs** (`createSignedUrl(path, 86400)`).

### 6.11 Rules for any new table
`CREATE TABLE` → `GRANT` (authenticated / anon-if-public / service_role) → `ENABLE ROW LEVEL SECURITY` → `CREATE POLICY`, **in that order**. Roles, if ever added, go in a separate `user_roles` table with a `security definer has_role()` function — **never on `profiles`**.

---

## 7. Auth flow

- `/auth` supports Google OAuth (`supabase.auth.signInWithOAuth`, redirect to `window.location.origin`) and email OTP (`supabase.auth.signInWithOtp`).
- OTP UI is two steps: `AuthStep = 'email' | 'otp'`, 6-slot `InputOTP` component.
- Branded OTP emails are sent through the `send-auth-email` function (Resend), templates for `signup`, `login`, `magic_link`, "expires in 10 minutes".
- `AuthProvider` (`src/hooks/useAuth.tsx`) exposes `user`, `session`, `loading`, `signInWithGoogle`, `signOut` (which also wipes local storage state).
- `ProtectedRoute` redirects unauthenticated users to `/auth`. All core features require auth.
- No anonymous sign-up; no email auto-confirm unless explicitly requested.

---

## 8. Workflow / data flow (step by step)

### Step 1 — Style Wizard (`/get-outfit`)
Sub-forms in `src/components/StyleWizard/`: `PhotoUpload` → `AttributesForm` → `OccasionForm` → `BudgetForm`, with a fixed bottom step nav and step-specific backgrounds. Collected shape (`src/types/outfit.ts::UserProfile`):

```ts
{ photo?: File | null; gender; skinTone; hairColor; bodyType; occasion; season; budgetMin: number; budgetMax: number }
```

### Step 2 — Photo upload (optional)
`POST photos-upload` (multipart, field `file`). Validates MIME in `['image/jpeg','image/png','image/webp','image/avif']` and size ≤ 10 MB. Stores at `user-photos/<uid>/<photo_id>.<ext>`, inserts a `photo_analyses` stub row, returns `{ success, photo_id, photo_url (24h signed), message }`. Errors: 401 auth, 400 validation, 500 upload/sign failure.

### Step 3 — Photo analysis (vision)
`photos-analysis` (GET with `photo_id`/`photo_url`, or POST `{ photo_id?, photo_url?, image_base64? }`). SSRF guard `isValidPhotoUrl`: HTTPS only, ≤ 500 chars, blocks localhost / private / link-local / metadata IPs. Model: **Lovable AI Gateway** `google/gemini-2.5-flash` (vision). System prompt: *"You are a fashion photo analysis assistant. Return ONLY valid JSON. Do not wrap in markdown or code blocks."* The model first decides `isHuman`. If not human → `{ isHuman: false, confidence: 0, error }` and the UI asks for a new photo. If human:

```json
{
  "isHuman": true, "photo_id": "...", "photo_url": "...",
  "analysis": {
    "body_type": "hourglass|pear|apple|rectangle|inverted-triangle|athletic",
    "skin_tone": "...", "skin_undertone": "...", "hair_color": "...", "face_shape": "...",
    "style_personality": "<one of 6 personas>",
    "measurements": {},
    "recommended_colors": [/* 6-8 with hex */],
    "avoid_colors": [/* 3-4 with hex */],
    "style_notes": [/* 4-5 strings */]
  },
  "analyzed_at": "..."
}
```

Result is upserted into `photo_analyses` on `photo_id` conflict. Errors: 401, 400, 404 photo not found, 429, 402, 500.

### Step 4 — Style quiz (`/style-quiz`)
One question at a time with back navigation (back on first question → `/`). Answers are mapped to the report request body.

### Step 5 — Style report generation
`POST generate-style-report`, body (`StyleReportRequest`):

```ts
{ gender, preferredColors: string[], bodyType, heightShape, occasion,
  stylePersonality, budget, skinTone?, hairColor?, season?,
  photoAnalysis?: Record<string, unknown> }
```

Server-side label maps: `budgetMap → budget`: `"Under ₹1,500"`, `mid`: `"₹1,500–₹5,000"`, `premium`: `"₹5,000–₹15,000"`, `luxury`: `"₹15,000+"`; plus `colorMap`, `heightMap`, `styleMap`, `occasionMap`.

Model chain: **Groq `llama-3.3-70b-versatile`** (temperature 0.7, max_tokens 8000, `response_format: {type:"json_object"}`), up to 3 attempts, backing off `3000*(attempt+1)` ms on HTTP 429; if still failing → fallback **Lovable AI Gateway `google/gemini-2.5-flash`**.

Stylist persona/prompt rules (must be preserved verbatim in spirit): world-class professional fashion stylist (15+ years, luxury), no emojis, no fluff, no repetition, strict JSON only, exactly 8 best colors, 4 colors to avoid, 4 patterns, 4 signature looks, never mention AI/models/prompts, respect the stated budget band.

Response `{ report: StyleReport }` with keys: `styleProfileSummary`, `skinToneAnalysis`, `bodyTypeAnalysis`, `colorStrategy`, `bestColors[8]` (name + hex + why), `colorsToAvoid[4]`, `heightProportionStyling`, `lifestyleOutfitDirection`, `stylePersonalityDeepDive`, `budgetStrategy`, `bestPatterns[4]`, `signatureLooks[4]` (`{ name, description, keyPieces[], occasion, stylingNotes?, confidenceBooster? }`), `essentialWardrobe`, `stylingTips`, `stylingDos`, `stylingDonts`, `accessoryGuide`, `shoppingGuide`, `seasonalWardrobe`, `finalStylistNote`.

Errors: 401, 429 ("AI is busy…"), 402 (credits), 500. Report is persisted into `style_reports` (`report_data`, `quiz_inputs`) and listed on `/reports` via `useStyleReportHistory`. Reports are exportable as a premium printable HTML document.

### Step 6 — Shoppable product search
`useProductSearch.searchProducts(report, budgetMin, budgetMax, gender, occasion, season)` takes `report.signatureLooks.slice(0, 4)` and calls `POST search-products`:

```ts
{ signatureLooks: SignatureLook[], budgetMin, budgetMax, gender, occasion, season }
```

Validation: `VALID_GENDERS = ['male','female','non-binary','other']`; `VALID_OCCASIONS = ['wedding','diwali','office','date-night','party','casual','formal','christmas','brunch','weekend','festive','traditional','college','club']`; `VALID_SEASONS = ['summer','winter','monsoon','spring','all']`; budget clamped to `[0, 1000000]`. All prompt-bound strings go through `sanitizeForPrompt` (strip control/non-ASCII chars, truncate 200 chars).

One **Lovable AI Gateway** call per look (`google/gemini-2.5-flash`, temperature 0.3), asking for 4–6 real products from Myntra, Ajio, Amazon India, Flipkart, Tata CLiQ, Nykaa Fashion, H&M India, Zara India, within the combined ₹budgetMin–₹budgetMax total, JSON array only. Rate-limit handling: on 429 wait 2000 ms and skip that look; on 402 log and skip; 500 ms courtesy delay between successful looks.

`buildSearchUrl(store, query)` produces a store search-URL (**never** a scraped product URL) for each supported store, falling back to Google Shopping. Product `imageUrl` is intentionally `''` because Indian e-commerce blocks scraping — the UI renders the metadata/icon fallback card.

Response:

```ts
{ success: true, totalOutfits: number,
  outfits: [{ id, name, description, whyItSuits, colorPalette: string[],
    occasion: [occasion], season: [season],
    products: [{ id, name, brand, category, imageUrl: '', originalPrice,
      discountedPrice, discount, store, storeUrl, rating, color }],
    totalOriginalPrice, totalDiscountedPrice }] }
```

The client overwrites `colorPalette` with `report.bestColors.slice(0,4).map(c => c.hex)`. Budget enforcement is two-layered: strict prompt rules plus server-side proportional price scaling. Errors surface via toast ("Product search error", "No products found").

### Step 7 — Rule-based recommendations (alternate path)
`POST recommendations { photo_id?, budget_min?, budget_max?, occasion? }` (UUID-validated `photo_id`; `MIN_BUDGET 0`, `MAX_BUDGET 1000000`; `VALID_OCCASIONS = [...,'all']`). Reads `body_type` from `photo_analyses`, filters `products_catalog` by price range (falls back to 10 hardcoded mock products `prod_001..prod_010`), returns max 12 products with `redirect_url = <SUPABASE_URL>/functions/v1/products-redirect?product_id=…`. Errors: 401, 500 (message intentionally generic).

### Step 8 — Outbound click
`GET products-redirect?product_id=…` (public): looks up `products_catalog.affiliate_url`, logs a row in `affiliate_clicks`, then 302 to the store. Store fallbacks: Myntra→myntra.com, Ajio→ajio.com, Flipkart→flipkart.com, Amazon→amazon.in, TataCliq→tatacliq.com; ultimate fallback `https://www.myntra.com/`. Never returns JSON — always a redirect.

### Step 9 — Virtual Closet (`/closet`)
`useCloset` reads/writes `saved_items` and `saved_outfits`. Interactions: red heart toggle, toast with Undo. Layout: dynamic mobile hero, horizontal filter chips, desktop 5-column grid.

### Step 10 — Explore (`/explore`)
TikTok-style infinite-scroll feed with quick-buy and automatic discount display.

### Step 11 — StyleAI chatbot (global)
`POST style-ai-chat { message, history?: [{role:'user'|'assistant', content}] }`. Limits: `MAX_MESSAGE_LENGTH 2000`, `MAX_HISTORY_LENGTH 20` (older trimmed), `MAX_HISTORY_ITEM_LENGTH 1000` (truncated with `...`). Model: **Google Gemini API direct** `gemini-2.0-flash`, temperature 0.7, `maxOutputTokens 500`, history converted to Gemini `contents` with a priming assistant turn. Persona: *"StyleAI, a friendly and knowledgeable Indian fashion advisor"* — names Indian stores, quotes ₹ ranges, max 2–3 short paragraphs, breaks looks into top / bottom / footwear / accessories. **Note: this is the only surface where the prompt allows emojis** (chat text only, never app UI). Response `{ response: string }`. Errors: 401, 400, 429, 500.

### Step 12 — Premium metering
`usePremium` reads `premium_users.is_active` by email and counts `outfit_generations` rows for the user. `FREE_GENERATION_LIMIT = 2`; `canGenerate = isPremium || generationCount < 2`. `recordGeneration()` inserts a row into `outfit_generations`. Non-premium users hitting the limit are routed to `/profile` upgrade CTAs.

---

## 9. Frontend data structures (`src/types/outfit.ts`)

```ts
interface UserProfile {
  photo?: File | null; gender: string; skinTone: string; hairColor: string;
  bodyType: string; occasion: string; season: string; budgetMin: number; budgetMax: number;
}

interface Product {
  id: string; name: string; brand: string; category: string; imageUrl: string;
  originalPrice: number; discountedPrice: number; discount: number; store: string;
  storeUrl: string; rating: number; color: string;
}

interface OutfitRecommendation {
  id: string; name: string; description: string; whyItSuits: string;
  colorPalette: string[]; occasion?: string[]; season?: string[]; products: Product[];
  totalOriginalPrice: number; totalDiscountedPrice: number;
}
```

`src/types/styleReport.ts` mirrors the report JSON of §8 Step 5.

---

## 10. Edge function env vars

| Function | Env vars |
|---|---|
| `generate-style-report` | `GROQ_API_KEY`, `LOVABLE_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY` |
| `photos-analysis` | `LOVABLE_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY` |
| `photos-upload` | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` |
| `search-products` | `LOVABLE_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY` |
| `recommendations` | `SUPABASE_URL`, `SUPABASE_ANON_KEY` |
| `products-redirect` | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` |
| `style-ai-chat` | `GOOGLE_GEMINI_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY` |
| `send-auth-email` | `RESEND_API_KEY` |

Auth pattern: anon-key client + forwarded `Authorization: Bearer <token>` + `supabase.auth.getUser(token)` (correct) — `getClaims` is not available in older clients; prefer `getUser`. `photos-upload` verifies with a service-role client. Shared JSON-parse pattern: try `` /```json\n?([\s\S]*?)\n?```/ `` then fall back to raw content.

---

## 11. Security & constraints (non-negotiable)

- RLS on every table; all user data scoped to `auth.uid()`. `user-photos` bucket private, owner-only, signed URLs.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` or DB password to the client or logs.
- SSRF guard on any user-supplied image URL; prompt-injection sanitization on any user text sent to an LLM.
- Indian e-commerce blocks scraping — never fetch product images/pages. Use store search URLs and metadata fallback cards.
- Emails: header-injection guard, HTML escaping, alphanumeric OTP, generic 500 messages to prevent enumeration.
- Local storage wiped on sign-out; CSP applied.
- No emojis anywhere in the app UI or in the stylist report (chatbot replies are the sole exception).
- Never place `<noscript><img></noscript>` in `<head>`.

---

## 12. How an agent should behave on this codebase

- Read before editing; keep changes scoped to the request.
- Reuse existing tokens, `luxury`/`luxuryOutline` buttons, `.bento-tile`, `.eyebrow`, `.gold-rule`.
- Add new AI calls through the Lovable AI Gateway with `google/gemini-2.5-flash` unless told otherwise.
- Any new table follows the `CREATE` → `GRANT` → `ENABLE RLS` → `POLICY` order.
- Do not rename routes, tables, columns, function names, request/response fields, or design tokens listed above.
- Do not add a non-JS backend, another framework, or another database (backend is Supabase — never Firebase or anything else).

---

## 13. Final output of the application

For one authenticated user, one full pass yields:

1. A stored, re-openable **Style Report** (`style_reports.report_data`) — skin tone, body type, 8 best colors + 4 to avoid, 4 patterns, 4 signature looks, wardrobe/accessory/shopping/seasonal guidance, final stylist note — downloadable as a premium printable HTML document.
2. Up to **4 shoppable outfit cards**, each with 4–6 real Indian-store products, per-item and total original/discounted prices, discount badges, gold color-palette swatches, an AI "why it suits you" rationale, and a store search link that redirects through affiliate-click logging.
3. Saved products and outfits in the **Virtual Closet**, plus an always-available **StyleAI chat advisor**, all inside the Signature Black & Gold luxury bento-grid interface.
