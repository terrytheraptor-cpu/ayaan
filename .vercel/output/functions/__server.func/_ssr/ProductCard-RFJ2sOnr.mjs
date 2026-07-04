import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { t as formatAED } from "./i18n-CdZxj6no.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as wishlist, i as useWishlist, t as cart } from "./cart-store-BE6ptNQU.mjs";
import { t as assetUrl } from "./assets-BoBqPUAl.mjs";
import { m as Heart } from "../_libs/lucide-react.mjs";
import { t as cn } from "./catalog.functions-Dgbqbzaf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-RFJ2sOnr.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ p, priority = false }) {
	const { i18n, t } = useTranslation();
	const lang = i18n.language || "en";
	const name = lang === "ar" ? p.name_ar : p.name_en;
	const isWished = useWishlist().includes(p.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/product/$slug",
				params: { slug: p.slug },
				className: "block aspect-[4/5] overflow-hidden rounded-2xl bg-secondary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: assetUrl(p.image_key),
						alt: name,
						loading: priority ? "eager" : "lazy",
						className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
					}),
					p.compare_at_price_aed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-3 start-3 bg-background/80 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase",
						children: "Sale"
					}),
					p.is_new && !p.compare_at_price_aed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-3 start-3 bg-background/80 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase",
						children: "New"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"aria-label": "Wishlist",
				onClick: () => {
					wishlist.toggle(p.id);
				},
				className: "absolute top-3 end-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur grid place-items-center hover:bg-background transition",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("h-4 w-4", isWished && "fill-accent text-accent") })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/product/$slug",
						params: { slug: p.slug },
						className: "block font-medium text-sm md:text-base truncate",
						children: name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: p.material
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-end shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-sm md:text-base",
						children: formatAED(p.price_aed, lang)
					}), p.compare_at_price_aed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground line-through",
						children: formatAED(p.compare_at_price_aed, lang)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => {
					cart.add({
						product_id: p.id,
						slug: p.slug,
						name_en: p.name_en,
						name_ar: p.name_ar,
						price_aed: p.price_aed,
						image_key: p.image_key,
						sku: p.sku
					});
					toast.success(t("product.addToCart"));
				},
				className: "mt-3 w-full text-xs uppercase tracking-wider py-2.5 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-colors",
				children: t("product.addToCart")
			})
		]
	});
}
//#endregion
export { ProductCard as t };
