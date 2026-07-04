import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { t as formatAED } from "./i18n-CdZxj6no.mjs";
import { r as useCart, t as cart } from "./cart-store-BE6ptNQU.mjs";
import { t as assetUrl } from "./assets-BoBqPUAl.mjs";
import { d as Minus, t as X, u as Plus } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-Ctyh9qdZ.js
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const items = useCart();
	const { t, i18n } = useTranslation();
	const lang = i18n.language || "en";
	const subtotal = items.reduce((n, i) => n + i.qty * i.price_aed, 0);
	const vat = Math.round(subtotal * .05 * 100) / 100;
	const shipping = subtotal === 0 ? 0 : subtotal >= 1500 ? 0 : 150;
	const total = subtotal + vat + shipping;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-luxe pt-16 md:pt-24 pb-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl md:text-6xl font-semibold tracking-tight mb-10",
			children: t("cart.title")
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "py-24 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: t("cart.empty")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				className: "mt-6 inline-block rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm",
				children: t("cart.continueShopping")
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid md:grid-cols-[1fr_360px] gap-10 md:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border",
				children: items.map((i) => {
					const name = lang === "ar" ? i.name_ar : i.name_en;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "py-6 flex gap-4 md:gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/product/$slug",
								params: { slug: i.slug },
								className: "w-24 md:w-32 aspect-square rounded-2xl overflow-hidden bg-secondary shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: assetUrl(i.image_key),
									alt: name,
									className: "h-full w-full object-cover",
									loading: "lazy"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/product/$slug",
										params: { slug: i.slug },
										className: "font-medium hover:text-accent",
										children: name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground mt-1",
										children: i.sku
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center rounded-full border border-border",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => cart.update(i.product_id, i.qty - 1),
													className: "h-9 w-9 grid place-items-center hover:bg-muted rounded-s-full",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3.5 w-3.5" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "w-8 text-center text-sm",
													children: i.qty
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => cart.update(i.product_id, i.qty + 1),
													className: "h-9 w-9 grid place-items-center hover:bg-muted rounded-e-full",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => cart.remove(i.product_id),
											className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" }),
												" ",
												t("cart.remove")
											]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: formatAED(i.price_aed * i.qty, lang)
								})
							})
						]
					}, i.product_id);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "md:sticky md:top-24 md:self-start rounded-3xl bg-secondary/60 p-6 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold mb-6",
						children: t("checkout.review")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "space-y-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: t("cart.subtotal")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatAED(subtotal, lang) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: t("cart.vat")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatAED(vat, lang) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: t("cart.shipping")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: shipping === 0 ? "—" : formatAED(shipping, lang) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-3 border-t border-border flex justify-between font-medium text-base",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("cart.total") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatAED(total, lang) })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-muted-foreground",
						children: t("cart.freeShippingOver")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/checkout",
						className: "mt-6 block text-center rounded-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-wider uppercase hover:bg-primary/90",
						children: t("cart.checkout")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "mt-3 block text-center text-sm text-muted-foreground hover:text-foreground",
						children: t("cart.continueShopping")
					})
				]
			})]
		})]
	});
}
//#endregion
export { CartPage as component };
