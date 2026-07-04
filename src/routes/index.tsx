import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { listCategories, listProducts } from "@/lib/catalog.functions";
import { assetUrl, heroLiving, lifestyleHotel, lifestyleVilla } from "@/lib/assets";
import { ProductCard } from "@/components/site/ProductCard";
import { ArrowRight, ShieldCheck, Truck, Wrench, Headset } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { whatsappLink } from "@/lib/whatsapp";

const categoriesOpts = queryOptions({ queryKey: ["categories"], queryFn: () => listCategories() });
const featuredOpts = queryOptions({ queryKey: ["products", "featured"], queryFn: () => listProducts({ data: { featured: true, limit: 8 } }) });
const newOpts = queryOptions({ queryKey: ["products", "new"], queryFn: () => listProducts({ data: { is_new: true, limit: 8 } }) });
const bestOpts = queryOptions({ queryKey: ["products", "bestsellers"], queryFn: () => listProducts({ data: { is_bestseller: true, limit: 8 } }) });

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AL AYAAN Furniture — Premium furniture for modern living in the UAE" },
      { name: "description", content: "Luxury sofas, bedrooms, dining, office and outdoor furniture in Dubai, Abu Dhabi and across the UAE. Free white-glove delivery over AED 1,500." },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(categoriesOpts);
    context.queryClient.ensureQueryData(featuredOpts);
    context.queryClient.ensureQueryData(newOpts);
    context.queryClient.ensureQueryData(bestOpts);
  },
  component: Home,
});

function Home() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language as Lang) || "en";
  const { data: categories } = useSuspenseQuery(categoriesOpts);
  const { data: featured } = useSuspenseQuery(featuredOpts);
  const { data: nu } = useSuspenseQuery(newOpts);
  const { data: best } = useSuspenseQuery(bestOpts);

  return (
    <div>
      {/* HERO ------------------------------------------------ */}
      <section className="relative -mt-16 md:-mt-20 h-[92vh] min-h-[640px] w-full overflow-hidden">
        <img
          src={heroLiving}
          alt="AL AYAAN luxury Dubai living room"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-background/20 to-transparent" />
        <div className="relative z-10 container-luxe h-full flex flex-col justify-end pb-16 md:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="eyebrow mb-6"
          >
            {t("hero.eyebrow")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display font-semibold tracking-tight text-[clamp(2.6rem,7vw,6.5rem)] leading-[1.02] max-w-5xl"
          >
            {t("tagline")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-6 max-w-xl text-base md:text-lg text-foreground/80"
          >
            {t("subtagline")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-medium hover:bg-primary/90 transition">
              {t("exploreCollection")} <ArrowRight className="h-4 w-4 mirror-rtl" />
            </Link>
            <Link to="/category/living-room" className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/60 backdrop-blur px-7 py-3.5 text-sm font-medium hover:bg-background transition">
              {t("shopNow")}
            </Link>
            <a href={whatsappLink("Hello AL AYAAN, I'm interested in your collection.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/60 backdrop-blur px-7 py-3.5 text-sm font-medium hover:bg-background transition">
              {t("whatsapp")}
            </a>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES ------------------------------------------ */}
      <section className="container-luxe py-24 md:py-32">
        <div className="flex items-end justify-between mb-10 md:mb-16">
          <div>
            <p className="eyebrow mb-3">{t("home.categoriesTitle")}</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight max-w-2xl">
              {t("home.categoriesSub")}
            </h2>
          </div>
          <Link to="/shop" className="hidden md:inline-flex items-center gap-2 text-sm hover:text-accent">
            {t("nav.shop")} <ArrowRight className="h-4 w-4 mirror-rtl" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
          {categories.map(c => (
            <Link
              key={c.id}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary"
            >
              <img
                src={assetUrl(c.image_key)}
                alt={lang === "ar" ? c.name_ar : c.name_en}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-4 start-4 end-4 text-white">
                <p className="font-display text-lg md:text-xl font-medium">{lang === "ar" ? c.name_ar : c.name_en}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* EDITORIAL SPLIT ------------------------------------- */}
      <section className="bg-secondary/50">
        <div className="container-luxe grid md:grid-cols-2 gap-12 md:gap-20 py-24 md:py-32 items-center">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden">
            <img src={lifestyleVilla} alt="Dubai luxury villa" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div>
            <p className="eyebrow mb-4">{t("home.editorial.eyebrow")}</p>
            <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              {t("home.editorial.heading")}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
              {t("home.editorial.copy")}
            </p>
            <Link to="/shop" className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-medium">
              {t("nav.collections")} <ArrowRight className="h-4 w-4 mirror-rtl" />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED -------------------------------------------- */}
      <ProductRail title={t("home.featuredTitle")} sub={t("home.featuredSub")} products={featured} />

      {/* WHY ------------------------------------------------- */}
      <section className="container-luxe py-24 md:py-32 border-t border-border">
        <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-center max-w-3xl mx-auto">
          {t("home.why.heading")}
        </h2>
        <div className="mt-16 grid md:grid-cols-4 gap-8">
          {[
            { Icon: ShieldCheck, t: "quality" },
            { Icon: Truck, t: "delivery" },
            { Icon: Wrench, t: "install" },
            { Icon: Headset, t: "support" },
          ].map(({ Icon, t: key }) => (
            <div key={key} className="text-center md:text-start">
              <Icon className="h-8 w-8 text-accent mb-4 mx-auto md:mx-0" strokeWidth={1.2} />
              <h3 className="font-display text-lg font-medium">{t(`home.why.${key}`)}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t(`home.why.${key}Copy`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* NEW / BEST rails */}
      <ProductRail title={t("home.newTitle")} products={nu} />
      <ProductRail title={t("home.bestsellersTitle")} products={best} />

      {/* PROJECTS ------------------------------------------- */}
      <section className="container-luxe py-24 md:py-32 border-t border-border">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow mb-4">Projects</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
              {t("home.projects.heading")}
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">{t("home.projects.copy")}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={lifestyleHotel} alt="Luxury hotel lobby" className="rounded-2xl aspect-[3/4] object-cover" loading="lazy" />
            <img src={lifestyleVilla} alt="Luxury villa" className="rounded-2xl aspect-[3/4] object-cover mt-8" loading="lazy" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS --------------------------------------- */}
      <section className="bg-ink text-primary-foreground">
        <div className="container-luxe py-24 md:py-32">
          <p className="eyebrow mb-4 text-primary-foreground/60">{t("home.testimonials.heading")}</p>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 mt-8">
            {[
              { q: "The Halo sectional transformed our entire villa. Craftsmanship you can feel.", a: "— Fatima A., Palm Jumeirah" },
              { q: "AL AYAAN furnished four boardrooms for us in ten days. Flawless.", a: "— Kareem H., DIFC" },
              { q: "The most patient, elegant delivery team in Dubai.", a: "— Sara B., Emirates Hills" },
            ].map((r, i) => (
              <div key={i} className="border-t border-primary-foreground/20 pt-8">
                <p className="font-display text-xl md:text-2xl leading-snug">"{r.q}"</p>
                <p className="mt-6 text-sm text-primary-foreground/70">{r.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductRail({ title, sub, products }: { title: string; sub?: string; products: import("@/lib/catalog.functions").Product[] }) {
  return (
    <section className="container-luxe py-20 md:py-24 border-t border-border">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight">{title}</h2>
          {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
        </div>
        <Link to="/shop" className="hidden md:inline-flex items-center gap-2 text-sm hover:text-accent">
          View all <ArrowRight className="h-4 w-4 mirror-rtl" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
        {products.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}
// touch
// nudge Fri Jul  3 15:24:21 UTC 2026
