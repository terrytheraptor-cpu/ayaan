import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getProductBySlug } from "@/lib/catalog.functions";
import { assetUrl } from "@/lib/assets";
import { formatAED, type Lang } from "@/lib/i18n";
import { productWhatsappText, whatsappLink } from "@/lib/whatsapp";
import { cart, recentlyViewed } from "@/lib/cart-store";
import { ProductCard } from "@/components/site/ProductCard";
import { Star, Minus, Plus, ShieldCheck, Truck, Wrench, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const opts = (slug: string) => queryOptions({
  queryKey: ["product", slug],
  queryFn: () => getProductBySlug({ data: { slug } }),
});

export const Route = createFileRoute("/product/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(opts(params.slug));
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Product not found" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    const title = `${p.name_en} — AL AYAAN Furniture`;
    return {
      meta: [
        { title },
        { name: "description", content: (p.description_en ?? "").slice(0, 160) },
        { property: "og:title", content: title },
        { property: "og:description", content: (p.description_en ?? "").slice(0, 160) },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => <div className="container-luxe py-32 text-center">Product not found</div>,
  errorComponent: ({ error }) => <div className="container-luxe py-32 text-center">{error.message}</div>,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(opts(slug));
  const { t, i18n } = useTranslation();
  const lang = (i18n.language as Lang) || "en";
  const [qty, setQty] = useState(1);

  useEffect(() => { if (data) recentlyViewed.push(data.product.id); }, [data]);
  if (!data) return null;
  const { product, similar } = data;
  const name = lang === "ar" ? product.name_ar : product.name_en;
  const desc = lang === "ar" ? product.description_ar : product.description_en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name_en,
    sku: product.sku,
    description: product.description_en,
    offers: {
      "@type": "Offer",
      priceCurrency: "AED",
      price: product.price_aed,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    aggregateRating: product.review_count ? {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.review_count,
    } : undefined,
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-luxe pt-8 md:pt-12 pb-24">
        <nav className="text-xs text-muted-foreground mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">{t("shop.title")}</Link>
          <span>/</span>
          <span className="text-foreground">{name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* GALLERY */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-secondary">
              <img src={assetUrl(product.image_key)} alt={name} className="h-full w-full object-cover" width={1024} height={1024} />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[product.image_key, product.image_key, product.image_key, product.image_key].map((k, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-secondary opacity-70 hover:opacity-100 transition">
                  <img src={assetUrl(k)} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div className="md:sticky md:top-24 md:self-start">
            {product.collection && <p className="eyebrow mb-3">{product.collection}</p>}
            <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">{name}</h1>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[0,1,2,3,4].map(i => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{product.rating.toFixed(1)} · {product.review_count} {t("product.reviews")}</p>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <p className="font-display text-3xl font-semibold">{formatAED(product.price_aed, lang)}</p>
              {product.compare_at_price_aed && (
                <p className="text-muted-foreground line-through">{formatAED(product.compare_at_price_aed, lang)}</p>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{t("footer.vatIncl")}</p>

            {desc && <p className="mt-8 text-base md:text-lg text-foreground/80 leading-relaxed">{desc}</p>}

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center rounded-full border border-border">
                  <button className="h-11 w-11 grid place-items-center hover:bg-muted rounded-s-full" onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="-"><Minus className="h-4 w-4" /></button>
                  <span className="w-10 text-center font-medium">{qty}</span>
                  <button className="h-11 w-11 grid place-items-center hover:bg-muted rounded-e-full" onClick={() => setQty(q => Math.min(product.stock, q + 1))} aria-label="+"><Plus className="h-4 w-4" /></button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {product.stock > 0 ? (product.stock < 5 ? t("product.lowStock", { count: product.stock }) : t("product.inStock")) : t("product.outOfStock")}
                </p>
              </div>

              <button
                onClick={() => {
                  cart.add({ product_id: product.id, slug: product.slug, name_en: product.name_en, name_ar: product.name_ar, price_aed: product.price_aed, image_key: product.image_key, sku: product.sku }, qty);
                  toast.success(t("product.addToCart"));
                }}
                disabled={product.stock === 0}
                className="w-full rounded-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-wider uppercase hover:bg-primary/90 transition disabled:opacity-50"
              >
                {t("product.addToCart")}
              </button>
              <a
                href={whatsappLink(productWhatsappText({ name: product.name_en, sku: product.sku, price_aed: product.price_aed, slug: product.slug }))}
                target="_blank" rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-full border border-border py-4 text-sm font-medium tracking-wider uppercase hover:bg-secondary transition"
              >
                <MessageCircle className="h-4 w-4" /> {t("product.whatsappOrder")}
              </a>
            </div>

            <ul className="mt-10 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3"><Truck className="h-5 w-5 text-accent shrink-0" strokeWidth={1.2} /> {t("product.deliveryEstimate")}</li>
              <li className="flex gap-3"><ShieldCheck className="h-5 w-5 text-accent shrink-0" strokeWidth={1.2} /> {t("product.warranty")}</li>
              <li className="flex gap-3"><Wrench className="h-5 w-5 text-accent shrink-0" strokeWidth={1.2} /> {t("product.installation")}</li>
            </ul>

            <div className="mt-10 pt-10 border-t border-border">
              <h3 className="eyebrow mb-4">{t("product.specifications")}</h3>
              <dl className="grid grid-cols-2 gap-y-3 text-sm">
                <dt className="text-muted-foreground">{t("product.material")}</dt><dd>{product.material}</dd>
                <dt className="text-muted-foreground">{t("product.color")}</dt><dd>{product.color}</dd>
                <dt className="text-muted-foreground">{t("product.room")}</dt><dd>{product.room}</dd>
                <dt className="text-muted-foreground">{t("product.sku")}</dt><dd>{product.sku}</dd>
              </dl>
            </div>
          </div>
        </div>

        {/* SIMILAR */}
        {similar.length > 0 && (
          <section className="mt-24 pt-16 border-t border-border">
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-10">{t("product.similar")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
              {similar.map(p => <ProductCard key={p.id} p={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
