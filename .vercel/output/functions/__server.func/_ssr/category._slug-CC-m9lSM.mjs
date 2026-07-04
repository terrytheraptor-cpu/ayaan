import { a as require_jsx_runtime, n as useSuspenseQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { t as assetUrl } from "./assets-BoBqPUAl.mjs";
import { n as opts, t as Route } from "./category._slug-fnhWLJ-Y.mjs";
import { t as AnimatedProductGrid } from "./AnimatedProductGrid-ATvDRgIA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category._slug-CC-m9lSM.js
var import_jsx_runtime = require_jsx_runtime();
function CategoryPage() {
	const { slug } = Route.useParams();
	const { data } = useSuspenseQuery(opts(slug));
	const { i18n, t } = useTranslation();
	const lang = i18n.language || "en";
	if (!data) return null;
	const { category, products } = data;
	const name = lang === "ar" ? category.name_ar : category.name_en;
	const desc = lang === "ar" ? category.description_ar : category.description_en;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative -mt-16 md:-mt-20 h-[60vh] min-h-[420px] w-full overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: assetUrl(category.image_key),
				alt: name,
				className: "absolute inset-0 h-full w-full object-cover",
				width: 1600,
				height: 1e3
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 container-luxe h-full flex flex-col justify-end pb-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-3",
						children: t("nav.collections")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-5xl md:text-7xl font-semibold tracking-tight max-w-3xl",
						children: name
					}),
					desc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-muted-foreground",
						children: desc
					})
				]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "container-luxe py-16 md:py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground mb-8",
			children: t("shop.results", { count: products.length })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedProductGrid, { products })]
	})] });
}
//#endregion
export { CategoryPage as component };
