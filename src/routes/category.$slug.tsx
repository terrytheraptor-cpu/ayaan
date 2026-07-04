import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getCategoryBySlug } from "@/lib/catalog.functions";
import { AnimatedProductGrid } from "@/components/site/AnimatedProductGrid";
import { assetUrl } from "@/lib/assets";
import type { Lang } from "@/lib/i18n";

const opts = (slug: string) => queryOptions({
  queryKey: ["category", slug],
  queryFn: () => getCategoryBySlug({ data: { slug } }),
});

export const Route = createFileRoute("/category/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(opts(params.slug));
    if (!data) throw notFound();
  },
  head: ({ loaderData: _l, params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — AL AYAAN Furniture` },
      { name: "description", content: `Shop AL AYAAN ${params.slug.replace(/-/g, " ")} furniture. Delivered across the UAE.` },
    ],
  }),
  component: CategoryPage,
  notFoundComponent: NotFound,
  errorComponent: ({ error }) => <div className="container-luxe py-32 text-center">{error.message}</div>,
});

function NotFound() {
  return (
    <div className="container-luxe py-32 text-center">
      <h1 className="font-display text-4xl font-semibold">Category not found</h1>
      <Link to="/shop" className="mt-6 inline-block text-accent">Back to Shop</Link>
    </div>
  );
}

function CategoryPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(opts(slug));
  const { i18n, t } = useTranslation();
  const lang = (i18n.language as Lang) || "en";
  if (!data) return null;
  const { category, products } = data;
  const name = lang === "ar" ? category.name_ar : category.name_en;
  const desc = lang === "ar" ? category.description_ar : category.description_en;

  return (
    <div>
      <section className="relative -mt-16 md:-mt-20 h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src={assetUrl(category.image_key)} alt={name} className="absolute inset-0 h-full w-full object-cover" width={1600} height={1000} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background" />
        <div className="relative z-10 container-luxe h-full flex flex-col justify-end pb-14">
          <p className="eyebrow mb-3">{t("nav.collections")}</p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight max-w-3xl">{name}</h1>
          {desc && <p className="mt-4 max-w-xl text-muted-foreground">{desc}</p>}
        </div>
      </section>

      <section className="container-luxe py-16 md:py-24">
        <p className="text-sm text-muted-foreground mb-8">{t("shop.results", { count: products.length })}</p>
        <AnimatedProductGrid products={products} />
      </section>
    </div>
  );
}
