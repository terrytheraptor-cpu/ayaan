import { t as queryOptions } from "../_libs/react+tanstack__react-query.mjs";
import { F as notFound, f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getCategoryBySlug } from "./catalog.functions-Dgbqbzaf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category._slug-fnhWLJ-Y.js
var opts = (slug) => queryOptions({
	queryKey: ["category", slug],
	queryFn: () => getCategoryBySlug({ data: { slug } })
});
var $$splitErrorComponentImporter = () => import("./category._slug-C0GxIG1u.mjs");
var $$splitNotFoundComponentImporter = () => import("./category._slug-Dtuhr5Fh.mjs");
var $$splitComponentImporter = () => import("./category._slug-CC-m9lSM.mjs");
var Route = createFileRoute("/category/$slug")({
	loader: async ({ context, params }) => {
		if (!await context.queryClient.ensureQueryData(opts(params.slug))) throw notFound();
	},
	head: ({ loaderData: _l, params }) => ({ meta: [{ title: `${params.slug.replace(/-/g, " ")} — AL AYAAN Furniture` }, {
		name: "description",
		content: `Shop AL AYAAN ${params.slug.replace(/-/g, " ")} furniture. Delivered across the UAE.`
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { opts as n, Route as t };
