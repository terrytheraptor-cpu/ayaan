import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { listCategories, listProducts, type Product } from "@/lib/catalog.functions";
import { ProductCard } from "@/components/site/ProductCard";
import { AnimatedProductGrid } from "@/components/site/AnimatedProductGrid";
import type { Lang } from "@/lib/i18n";
import { SlidersHorizontal } from "lucide-react";

const allOpts = queryOptions({ queryKey: ["products", "all"], queryFn: () => listProducts({ data: {} }) });
const catsOpts = queryOptions({ queryKey: ["categories"], queryFn: () => listCategories() });

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop luxury furniture — AL AYAAN" },
      { name: "description", content: "Browse the full AL AYAAN catalog: sofas, beds, dining, office, outdoor and lighting. Delivered across the UAE." },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(allOpts);
    context.queryClient.ensureQueryData(catsOpts);
  },
  component: Shop,
});

type Sort = "featured" | "priceAsc" | "priceDesc" | "newest" | "rating";

function Shop() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language as Lang) || "en";
  const { data: products } = useSuspenseQuery(allOpts);
  const { data: categories } = useSuspenseQuery(catsOpts);

  const [sort, setSort] = useState<Sort>("featured");
  const [cat, setCat] = useState<string | null>(null);
  const [inStock, setInStock] = useState(false);
  const [priceMax, setPriceMax] = useState<number>(20000);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter(p => p.price_aed <= priceMax);
    if (cat) list = list.filter(p => categories.find(c => c.id === p.category_id)?.slug === cat);
    if (inStock) list = list.filter(p => p.stock > 0);
    switch (sort) {
      case "priceAsc": list = [...list].sort((a, b) => a.price_aed - b.price_aed); break;
      case "priceDesc": list = [...list].sort((a, b) => b.price_aed - a.price_aed); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "newest": list = [...list].sort((a, b) => Number(b.is_new) - Number(a.is_new)); break;
    }
    return list;
  }, [products, categories, cat, inStock, priceMax, sort]);

  return (
    <div className="container-luxe pb-24">
      <div className="bg-beige rounded-2xl mt-16 md:mt-24 p-6 md:p-10 mb-8 md:mb-12">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="eyebrow mb-3">{t("shop.title")}</p>
            <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight">
              {t("shop.title")}
            </h1>
            <p className="mt-3 text-muted-foreground">{t("shop.results", { count: filtered.length })}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowFilters(v => !v)} className="md:hidden inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm bg-background">
              <SlidersHorizontal className="h-4 w-4" /> {t("shop.filters")}
            </button>
            <select value={sort} onChange={e => setSort(e.target.value as Sort)} className="rounded-full border border-border bg-background px-4 py-2 text-sm">
              <option value="featured">{t("shop.sortOptions.featured")}</option>
              <option value="priceAsc">{t("shop.sortOptions.priceAsc")}</option>
              <option value="priceDesc">{t("shop.sortOptions.priceDesc")}</option>
              <option value="newest">{t("shop.sortOptions.newest")}</option>
              <option value="rating">{t("shop.sortOptions.rating")}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10 md:gap-12">
        <aside className={`${showFilters ? "block" : "hidden"} md:block`}>
          <div className="sticky top-24 space-y-8">
            <FilterGroup label={t("shop.category")}>
              <button
                className={`block text-sm py-1 ${!cat ? "text-foreground font-medium" : "text-muted-foreground"}`}
                onClick={() => setCat(null)}
              >All</button>
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => setCat(c.slug)}
                  className={`block text-sm py-1 text-start ${cat === c.slug ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {lang === "ar" ? c.name_ar : c.name_en}
                </button>
              ))}
            </FilterGroup>

            <FilterGroup label={`${t("shop.priceRange")} (0 – ${priceMax.toLocaleString()})`}>
              <input type="range" min={500} max={20000} step={500} value={priceMax} onChange={e => setPriceMax(Number(e.target.value))} className="w-full accent-accent" />
            </FilterGroup>

            <FilterGroup label={t("shop.availability")}>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={inStock} onChange={e => setInStock(e.target.checked)} className="accent-accent" />
                {t("shop.onlyInStock")}
              </label>
            </FilterGroup>

            <button
              onClick={() => { setCat(null); setInStock(false); setPriceMax(20000); setSort("featured"); }}
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              {t("shop.clearFilters")}
            </button>
          </div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="py-24 text-center text-muted-foreground">{t("shop.empty")}</div>
          ) : (
            <AnimatedProductGrid
              products={filtered}
              className="grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
            />
          )}
          <div className="mt-16 border-t border-border pt-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-accent">← Back to home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="eyebrow mb-3">{label}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

export type { Product };
