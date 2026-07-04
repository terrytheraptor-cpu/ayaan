
# AL AYAAN Furniture — v1 Storefront Plan

Scope confirmed: **Storefront only** (Home, Shop, Product, Category, Cart, Checkout) with **Lovable Cloud** backend, **EN + AR (RTL)** from day one, and **AI-generated imagery + placeholder catalog**. Admin panel, B2B/RFQ, blog, projects, and services pages are **deferred to a later phase**.

## Design language

Apple-inspired luxury minimalism.

- **Palette:** warm white `#FBFAF7`, matte black `#111111`, soft beige `#EDE6D9`, champagne gold `#B8955A`, luxury brown `#5A3E2B`, warm greys `#8A857C` / `#DED8CE`. No saturated color anywhere.
- **Type:** SF Pro Display / Inter for UI (`@fontsource-variable/inter`), DM Sans for editorial headings (`@fontsource-variable/dm-sans`). Very large hero type (clamp 3rem–7rem), tight tracking on display, generous body leading.
- **Surfaces:** massive whitespace, generous 2xl/3xl radii on cards and buttons, soft layered shadows, glass cards over interior photography. No busy gradients.
- **Motion:** Framer Motion — one signature hero reveal (image parallax + staggered heading), gentle fade/lift on scroll (`IntersectionObserver`), 200–400ms eases; no scattered micro-animations.
- **Photography:** AI-generated luxury UAE interiors, product silhouettes on warm-white sweeps. Stored in `src/assets/`, generated with premium tier for hero shots.

## Sitemap (v1)

```
/                       Home
/shop                   Catalog with filters + search + sort
/category/$slug         Category landing (Living, Bedroom, Dining, Office, Outdoor, Lighting, Decor, Storage, Mattress, Accessories)
/product/$slug          Product detail
/cart                   Cart
/checkout               Guest + logged-in checkout
/wishlist               Wishlist (auth optional; localStorage fallback)
/search                 Search results
/account                Auth-gated: orders, addresses, wishlist
/auth                   Sign in / sign up
```

Company portfolio pages (About, Projects, Services, Contact, RFQ, Blog) and Admin are **phase 2** and intentionally not built now.

## Home page composition

1. Full-bleed hero (AI luxury living room), oversized headline "Premium furniture for modern living", subheading, CTAs: Explore Collection, Shop Now, WhatsApp.
2. Category grid — 10 categories as editorial tiles (portrait imagery, hover lift).
3. Featured collections — horizontal scroller: New Arrivals, Best Sellers, Luxury, Office, Hotel, Villa.
4. Editorial split section — "Crafted for the UAE" with lifestyle image + copy.
5. Trending products carousel (embla-carousel-react).
6. Why AL AYAAN — 4 minimal icon cards (quality, delivery, installation, warranty).
7. Projects strip — villa/hotel/office thumbnails (links deferred to phase 2).
8. Testimonials — large quote cards.
9. Instagram-style gallery grid.
10. Footer (multi-column, newsletter, WhatsApp CTA, VAT/UAE trust marks).

## Shop / Category / Product

- **Shop:** sticky filter sidebar (price AED range, category, material, color, room, availability, size), sort dropdown, grid/list toggle, quick view dialog, wishlist heart, compare (up to 4), recently viewed rail, infinite scroll via TanStack Query.
- **Category:** luxury banner + intro copy + filtered product grid + SEO copy block.
- **Product:** large gallery with zoom (react-medium-image-zoom), thumbnail rail, specs/dimensions/materials/features/delivery/warranty tabs, stock + delivery-date indicator, quantity, Buy Now / Add to Cart / **WhatsApp Order** (prefilled: image URL, name, SKU, price, qty), Frequently Bought Together, Similar Products, Recently Viewed, reviews (schema.org Product + AggregateRating JSON-LD).

## Cart & Checkout

- Cart drawer + full page. Coupon field, AED subtotal, 5% VAT line, shipping estimate, cross-sell rail.
- Checkout is single-page Apple-style: contact → address (UAE emirates dropdown) → delivery slot → payment method (Card, Bank Transfer, Cash on Delivery) → review. Guest checkout enabled. Order confirmation shows WhatsApp share of order summary.

## Localization (EN + AR, RTL)

- `i18next` + `react-i18next` with two JSON namespaces (`common`, `catalog`).
- Language switch persisted in `localStorage` and reflected in `<html lang dir>` at the root route. Full RTL support wired through Tailwind logical properties (`ps-*`, `pe-*`, `text-start`) and one `[dir="rtl"]` override layer for icons that must mirror.
- All product content stored bilingually in the DB (`name_en`, `name_ar`, `description_en`, `description_ar`).
- AED currency formatting via `Intl.NumberFormat` with `ar-AE` / `en-AE` locales.

## Backend (Lovable Cloud)

Enable Cloud, then create schema and RLS in a single migration.

Tables (`public` schema, with grants + RLS as per project rules):

- `categories` — slug, name_en, name_ar, description_en/ar, image_url, sort_order. Public SELECT.
- `products` — slug, name_en/ar, description_en/ar, sku, price_aed, compare_at_price_aed, category_id, material, color, room, dimensions (jsonb), stock, is_featured, is_new, is_bestseller, gallery (jsonb array of image URLs), rating, review_count. Public SELECT.
- `product_variants` — optional size/finish variants (phase 2 ready, minimal now).
- `profiles` — id (auth.users FK), full_name, phone, default_emirate. Owner RLS.
- `addresses` — user_id, line1, line2, emirate, city, postal_code, is_default. Owner RLS.
- `carts` — user_id nullable + session_id for guests. Owner-or-session RLS.
- `cart_items` — cart_id, product_id, qty, unit_price_aed.
- `orders` — user_id nullable, contact info, address snapshot (jsonb), subtotal, vat, shipping, total, status, payment_method, whatsapp_sent. Owner RLS + service_role.
- `order_items` — snapshotted product data.
- `wishlists` — user_id, product_id. Owner RLS.
- `reviews` — product_id, user_id, rating, title, body_en, body_ar, verified. Public SELECT, owner INSERT/UPDATE.

Auth: email/password + Google. Password HIBP enabled. No `profiles.role` — user roles table only if needed later.

Data access:
- Public reads (catalog, category, product detail) via server publishable client through `createServerFn` inside route loaders (paired with `useSuspenseQuery`).
- Cart, wishlist, orders via `createServerFn` + `requireSupabaseAuth` (guest cart keyed by `session_id` cookie).
- `_authenticated/` layout gates `/account`.

Seed migration inserts ~10 categories and ~40 demo products with placeholder image URLs; real hero + category imagery generated with the agent-side `generate_image` tool and stored in `src/assets/`.

## Imagery pipeline

Generated with `imagegen--generate_image` at project setup:
- 1 hero image (1920×1200, premium).
- 10 category tiles (800×1000).
- ~20 product hero shots (1024×1024) — reused across the seeded catalog.
- 6 lifestyle/editorial shots for home and project strip.

Prompts anchor on: warm-white walls, oak/walnut floors, champagne brass accents, natural daylight, Dubai/UAE villa cues.

## WhatsApp commerce

- Business number stored in `.env` as `VITE_WHATSAPP_NUMBER`.
- Deep-link helper builds `https://wa.me/<num>?text=<prefilled>` with product image URL, name (bilingual), SKU, AED price, qty, and optional customer name.
- Present on product page, cart, order confirmation, and floating FAB (bottom-end, RTL-aware).

## Technical notes (for reviewer)

- TanStack Start + Query per template conventions. `QueryClient` created per request in `getRouter`. `defaultPreloadStaleTime: 0`.
- Route file paths follow flat dot-convention; every route sets `head()`, `errorComponent`, `notFoundComponent`. `og:image` only on leaf routes; product pages derive it from the product hero image.
- Tailwind v4 tokens in `src/styles.css` `@theme` block; shadcn tokens via `@theme inline`. Fonts via `@fontsource-variable/*`, never remote `@import`.
- `embla-carousel-react`, `framer-motion`, `i18next`, `react-i18next`, `zod`, `@fontsource-variable/{inter,dm-sans}` added via `bun add`.
- All forms validated with Zod (trim, max length, email/phone rules). No `dangerouslySetInnerHTML` on user content.
- Reviews and products emit JSON-LD (`Product`, `AggregateRating`, `BreadcrumbList`). Sitemap.xml and robots.txt shipped with relative-URL canonicals.
- Responsive: mobile-first, sticky bottom action bar on product page for mobile, drawer nav with mega-menu on desktop.

## Explicitly out of scope for v1 (phase 2)

Admin/Shopify-style dashboard, RFQ builder, B2B pricing, projects/services/blog/about pages, live chat, gift cards, EMI, 360°/video viewer, push notifications, real payment gateway integration (checkout captures order + method; no live card processing).

## Build order

1. Enable Lovable Cloud + auth providers + HIBP.
2. Migration: schema, RLS, grants, seed data.
3. Design system: tokens, fonts, shadcn theming, `dir`/i18n root wiring.
4. Generate imagery batch.
5. Layout shell: root nav (mega-menu, language switch, cart badge, wishlist), footer, WhatsApp FAB.
6. Home page.
7. Shop + Category + filters + search + wishlist + compare + recently-viewed.
8. Product detail + WhatsApp order + reviews.
9. Cart + checkout + order confirmation.
10. `_authenticated/account` (orders, addresses, wishlist).
11. SEO polish, JSON-LD, sitemap, robots, `head()` per route.
12. Responsive + RTL QA pass with Playwright screenshots at desktop and 390px mobile.
