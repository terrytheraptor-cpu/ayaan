import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { l as Search } from "../_libs/lucide-react.mjs";
import { o as searchProducts } from "./catalog.functions-Dgbqbzaf.mjs";
import { t as ProductCard } from "./ProductCard-RFJ2sOnr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-sRRzpje6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const { t } = useTranslation();
	const [q, setQ] = (0, import_react.useState)("");
	const [results, setResults] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const doSearch = useServerFn(searchProducts);
	(0, import_react.useEffect)(() => {
		if (!q.trim()) {
			setResults([]);
			return;
		}
		const id = setTimeout(async () => {
			setLoading(true);
			try {
				setResults(await doSearch({ data: { q } }));
			} finally {
				setLoading(false);
			}
		}, 240);
		return () => clearTimeout(id);
	}, [q, doSearch]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-luxe py-16 md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl md:text-6xl font-semibold tracking-tight mb-8",
				children: t("searchLabel")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute top-1/2 -translate-y-1/2 start-4 h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					autoFocus: true,
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: t("searchPlaceholder"),
					className: "w-full h-14 ps-12 pe-4 rounded-full border border-border bg-background text-lg"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12",
				children: [
					loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "…"
					}),
					!loading && q && results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "No results."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10",
						children: results.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.id))
					})
				]
			})
		]
	});
}
//#endregion
export { SearchPage as component };
