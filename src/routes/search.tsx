import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { searchProducts, type Product } from "@/lib/catalog.functions";
import { ProductCard } from "@/components/site/ProductCard";
import { Search as SearchIcon } from "lucide-react";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search — AL AYAAN" }] }),
  component: SearchPage,
});

function SearchPage() {
  const { t } = useTranslation();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const doSearch = useServerFn(searchProducts);

  useEffect(() => {
    if (!q.trim()) { setResults([]); return; }
    const id = setTimeout(async () => {
      setLoading(true);
      try { setResults(await doSearch({ data: { q } })); } finally { setLoading(false); }
    }, 240);
    return () => clearTimeout(id);
  }, [q, doSearch]);

  return (
    <div className="container-luxe py-16 md:py-24">
      <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight mb-8">{t("searchLabel")}</h1>
      <div className="relative">
        <SearchIcon className="absolute top-1/2 -translate-y-1/2 start-4 h-5 w-5 text-muted-foreground" />
        <input
          autoFocus
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full h-14 ps-12 pe-4 rounded-full border border-border bg-background text-lg"
        />
      </div>

      <div className="mt-12">
        {loading && <p className="text-muted-foreground">…</p>}
        {!loading && q && results.length === 0 && <p className="text-muted-foreground">No results.</p>}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
          {results.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </div>
  );
}
