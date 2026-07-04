import { t as queryOptions } from "../_libs/react+tanstack__react-query.mjs";
import { F as notFound, f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as getProductBySlug } from "./catalog.functions-Dgbqbzaf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._slug-51E5_RFM.js
var opts = (slug) => queryOptions({
	queryKey: ["product", slug],
	queryFn: () => getProductBySlug({ data: { slug } })
});
var $$splitErrorComponentImporter = () => import("./product._slug-DkONtw1y.mjs");
var $$splitNotFoundComponentImporter = () => import("./product._slug-BAwcYqmJ.mjs");
var $$splitComponentImporter = () => import("./product._slug-Dka8dXgM.mjs");
var Route = createFileRoute("/product/$slug")({
	loader: async ({ context, params }) => {
		const data = await context.queryClient.ensureQueryData(opts(params.slug));
		if (!data) throw notFound();
		return data;
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Product not found" }, {
			name: "robots",
			content: "noindex"
		}] };
		const p = loaderData.product;
		const title = `${p.name_en} — AL AYAAN Furniture`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: (p.description_en ?? "").slice(0, 160)
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: (p.description_en ?? "").slice(0, 160)
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { opts as n, Route as t };
