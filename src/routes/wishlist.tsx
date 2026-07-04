import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { listProducts } from "@/lib/catalog.functions";
import { ProductCard } from "@/components/site/ProductCard";
import { useWishlist } from "@/lib/cart-store";

const opts = queryOptions({ queryKey: ["products", "all"], queryFn: () => listProducts({ data: {} }) });

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Your wishlist — AL AYAAN" }, { name: "robots", content: "noindex" }] }),
  loader: ({ context }) => { context.queryClient.ensureQueryData(opts); },
  component: WishlistPage,
});

function WishlistPage() {
  const { t } = useTranslation();
  const { data: products } = useSuspenseQuery(opts);
  const wish = useWishlist();
  const items = products.filter(p => wish.includes(p.id));

  return (
    <div className="container-luxe pt-16 md:pt-24 pb-24">
      <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight mb-10">{t("wishlistLabel")}</h1>
      {items.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-muted-foreground">{t("account.noWishlist")}</p>
          <Link to="/shop" className="mt-6 inline-block rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm">{t("cart.continueShopping")}</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
          {items.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}
