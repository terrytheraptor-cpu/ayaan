import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { cart, useCart } from "@/lib/cart-store";
import { assetUrl } from "@/lib/assets";
import { formatAED, type Lang } from "@/lib/i18n";
import { Minus, Plus, X } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your cart — AL AYAAN" }, { name: "robots", content: "noindex" }] }),
  component: CartPage,
});

function CartPage() {
  const items = useCart();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language as Lang) || "en";
  const subtotal = items.reduce((n, i) => n + i.qty * i.price_aed, 0);
  const vat = Math.round(subtotal * 0.05 * 100) / 100;
  const shipping = subtotal === 0 ? 0 : subtotal >= 1500 ? 0 : 150;
  const total = subtotal + vat + shipping;

  return (
    <div className="container-luxe pt-16 md:pt-24 pb-24">
      <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight mb-10">{t("cart.title")}</h1>
      {items.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-muted-foreground">{t("cart.empty")}</p>
          <Link to="/shop" className="mt-6 inline-block rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm">{t("cart.continueShopping")}</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-[1fr_360px] gap-10 md:gap-16">
          <ul className="divide-y divide-border">
            {items.map(i => {
              const name = lang === "ar" ? i.name_ar : i.name_en;
              return (
                <li key={i.product_id} className="py-6 flex gap-4 md:gap-6">
                  <Link to="/product/$slug" params={{ slug: i.slug }} className="w-24 md:w-32 aspect-square rounded-2xl overflow-hidden bg-secondary shrink-0">
                    <img src={assetUrl(i.image_key)} alt={name} className="h-full w-full object-cover" loading="lazy" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to="/product/$slug" params={{ slug: i.slug }} className="font-medium hover:text-accent">{name}</Link>
                    <p className="text-xs text-muted-foreground mt-1">{i.sku}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="inline-flex items-center rounded-full border border-border">
                        <button onClick={() => cart.update(i.product_id, i.qty - 1)} className="h-9 w-9 grid place-items-center hover:bg-muted rounded-s-full"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-8 text-center text-sm">{i.qty}</span>
                        <button onClick={() => cart.update(i.product_id, i.qty + 1)} className="h-9 w-9 grid place-items-center hover:bg-muted rounded-e-full"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <button onClick={() => cart.remove(i.product_id)} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive">
                        <X className="h-3 w-3" /> {t("cart.remove")}
                      </button>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="font-medium">{formatAED(i.price_aed * i.qty, lang)}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="md:sticky md:top-24 md:self-start rounded-3xl bg-secondary/60 p-6 md:p-8">
            <h2 className="font-display text-2xl font-semibold mb-6">{t("checkout.review")}</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">{t("cart.subtotal")}</dt><dd>{formatAED(subtotal, lang)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">{t("cart.vat")}</dt><dd>{formatAED(vat, lang)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">{t("cart.shipping")}</dt><dd>{shipping === 0 ? "—" : formatAED(shipping, lang)}</dd></div>
              <div className="pt-3 border-t border-border flex justify-between font-medium text-base"><dt>{t("cart.total")}</dt><dd>{formatAED(total, lang)}</dd></div>
            </dl>
            <p className="mt-4 text-xs text-muted-foreground">{t("cart.freeShippingOver")}</p>
            <Link to="/checkout" className="mt-6 block text-center rounded-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-wider uppercase hover:bg-primary/90">
              {t("cart.checkout")}
            </Link>
            <Link to="/shop" className="mt-3 block text-center text-sm text-muted-foreground hover:text-foreground">
              {t("cart.continueShopping")}
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
