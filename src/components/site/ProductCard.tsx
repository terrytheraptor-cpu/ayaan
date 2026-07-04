import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Product } from "@/lib/catalog.functions";
import { assetUrl } from "@/lib/assets";
import { formatAED, type Lang } from "@/lib/i18n";
import { cart, wishlist, useWishlist } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function ProductCard({ p, priority = false }: { p: Product; priority?: boolean }) {
  const { i18n, t } = useTranslation();
  const lang = (i18n.language as Lang) || "en";
  const name = lang === "ar" ? p.name_ar : p.name_en;
  const wish = useWishlist();
  const isWished = wish.includes(p.id);

  return (
    <div className="group relative">
      <Link
        to="/product/$slug"
        params={{ slug: p.slug }}
        className="block aspect-[4/5] overflow-hidden rounded-2xl bg-secondary"
      >
        <img
          src={assetUrl(p.image_key)}
          alt={name}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {p.compare_at_price_aed && (
          <span className="absolute top-3 start-3 bg-background/80 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase">
            Sale
          </span>
        )}
        {p.is_new && !p.compare_at_price_aed && (
          <span className="absolute top-3 start-3 bg-background/80 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase">
            New
          </span>
        )}
      </Link>
      <button
        aria-label="Wishlist"
        onClick={() => { wishlist.toggle(p.id); }}
        className="absolute top-3 end-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur grid place-items-center hover:bg-background transition"
      >
        <Heart className={cn("h-4 w-4", isWished && "fill-accent text-accent")} />
      </button>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <Link to="/product/$slug" params={{ slug: p.slug }} className="block font-medium text-sm md:text-base truncate">
            {name}
          </Link>
          <p className="text-xs text-muted-foreground mt-0.5">{p.material}</p>
        </div>
        <div className="text-end shrink-0">
          <p className="font-medium text-sm md:text-base">{formatAED(p.price_aed, lang)}</p>
          {p.compare_at_price_aed && (
            <p className="text-xs text-muted-foreground line-through">
              {formatAED(p.compare_at_price_aed, lang)}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={() => {
          cart.add({ product_id: p.id, slug: p.slug, name_en: p.name_en, name_ar: p.name_ar, price_aed: p.price_aed, image_key: p.image_key, sku: p.sku });
          toast.success(t("product.addToCart"));
        }}
        className="mt-3 w-full text-xs uppercase tracking-wider py-2.5 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        {t("product.addToCart")}
      </button>
    </div>
  );
}
