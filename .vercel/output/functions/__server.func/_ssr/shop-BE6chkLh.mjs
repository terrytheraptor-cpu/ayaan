import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, n as useSuspenseQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { o as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import { t as AnimatedProductGrid } from "./AnimatedProductGrid-ATvDRgIA.mjs";
import { n as catsOpts, t as allOpts } from "./shop-Bc4bj_uv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-BE6chkLh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Shop() {
	const { t, i18n } = useTranslation();
	const lang = i18n.language || "en";
	const { data: products } = useSuspenseQuery(allOpts);
	const { data: categories } = useSuspenseQuery(catsOpts);
	const [sort, setSort] = (0, import_react.useState)("featured");
	const [cat, setCat] = (0, import_react.useState)(null);
	const [inStock, setInStock] = (0, import_react.useState)(false);
	const [priceMax, setPriceMax] = (0, import_react.useState)(2e4);
	const [showFilters, setShowFilters] = (0, import_react.useState)(false);
	const filtered = (0, import_react.useMemo)(() => {
		let list = products.filter((p) => p.price_aed <= priceMax);
		if (cat) list = list.filter((p) => categories.find((c) => c.id === p.category_id)?.slug === cat);
		if (inStock) list = list.filter((p) => p.stock > 0);
		switch (sort) {
			case "priceAsc":
				list = [...list].sort((a, b) => a.price_aed - b.price_aed);
				break;
			case "priceDesc":
				list = [...list].sort((a, b) => b.price_aed - a.price_aed);
				break;
			case "rating":
				list = [...list].sort((a, b) => b.rating - a.rating);
				break;
			case "newest":
				list = [...list].sort((a, b) => Number(b.is_new) - Number(a.is_new));
				break;
		}
		return list;
	}, [
		products,
		categories,
		cat,
		inStock,
		priceMax,
		sort
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-luxe pb-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-beige rounded-2xl mt-16 md:mt-24 p-6 md:p-10 mb-8 md:mb-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between flex-wrap gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-3",
						children: t("shop.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl md:text-6xl font-semibold tracking-tight",
						children: t("shop.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground",
						children: t("shop.results", { count: filtered.length })
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowFilters((v) => !v),
						className: "md:hidden inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm bg-background",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "h-4 w-4" }),
							" ",
							t("shop.filters")
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: sort,
						onChange: (e) => setSort(e.target.value),
						className: "rounded-full border border-border bg-background px-4 py-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "featured",
								children: t("shop.sortOptions.featured")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "priceAsc",
								children: t("shop.sortOptions.priceAsc")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "priceDesc",
								children: t("shop.sortOptions.priceDesc")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "newest",
								children: t("shop.sortOptions.newest")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "rating",
								children: t("shop.sortOptions.rating")
							})
						]
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10 md:gap-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: `${showFilters ? "block" : "hidden"} md:block`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-24 space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterGroup, {
							label: t("shop.category"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: `block text-sm py-1 ${!cat ? "text-foreground font-medium" : "text-muted-foreground"}`,
								onClick: () => setCat(null),
								children: "All"
							}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setCat(c.slug),
								className: `block text-sm py-1 text-start ${cat === c.slug ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`,
								children: lang === "ar" ? c.name_ar : c.name_en
							}, c.id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
							label: `${t("shop.priceRange")} (0 – ${priceMax.toLocaleString()})`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 500,
								max: 2e4,
								step: 500,
								value: priceMax,
								onChange: (e) => setPriceMax(Number(e.target.value)),
								className: "w-full accent-accent"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
							label: t("shop.availability"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: inStock,
									onChange: (e) => setInStock(e.target.checked),
									className: "accent-accent"
								}), t("shop.onlyInStock")]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setCat(null);
								setInStock(false);
								setPriceMax(2e4);
								setSort("featured");
							},
							className: "text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground",
							children: t("shop.clearFilters")
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "py-24 text-center text-muted-foreground",
				children: t("shop.empty")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedProductGrid, {
				products: filtered,
				className: "grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-16 border-t border-border pt-8 text-sm text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "hover:text-accent",
					children: "← Back to home"
				})
			})] })]
		})]
	});
}
function FilterGroup({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "eyebrow mb-3",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-1",
		children
	})] });
}
//#endregion
export { Shop as component };
