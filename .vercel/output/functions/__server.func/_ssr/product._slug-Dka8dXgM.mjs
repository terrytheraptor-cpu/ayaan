import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, n as useSuspenseQuery, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { t as formatAED } from "./i18n-CdZxj6no.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as recentlyViewed, t as cart } from "./cart-store-BE6ptNQU.mjs";
import { t as assetUrl } from "./assets-BoBqPUAl.mjs";
import { a as Star, c as ShieldCheck, d as Minus, f as MessageCircle, i as Truck, n as Wrench, u as Plus } from "../_libs/lucide-react.mjs";
import { t as ProductCard } from "./ProductCard-RFJ2sOnr.mjs";
import { n as whatsappLink, t as productWhatsappText } from "./whatsapp-19okXLFM.mjs";
import { n as opts, t as Route } from "./product._slug-51E5_RFM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._slug-Dka8dXgM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { slug } = Route.useParams();
	const { data } = useSuspenseQuery(opts(slug));
	const { t, i18n } = useTranslation();
	const lang = i18n.language || "en";
	const [qty, setQty] = (0, import_react.useState)(1);
	(0, import_react.useEffect)(() => {
		if (data) recentlyViewed.push(data.product.id);
	}, [data]);
	if (!data) return null;
	const { product, similar } = data;
	const name = lang === "ar" ? product.name_ar : product.name_en;
	const desc = lang === "ar" ? product.description_ar : product.description_en;
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: product.name_en,
		sku: product.sku,
		description: product.description_en,
		offers: {
			"@type": "Offer",
			priceCurrency: "AED",
			price: product.price_aed,
			availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
		},
		aggregateRating: product.review_count ? {
			"@type": "AggregateRating",
			ratingValue: product.rating,
			reviewCount: product.review_count
		} : void 0
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		type: "application/ld+json",
		dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) }
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-luxe pt-8 md:pt-12 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "text-xs text-muted-foreground mb-8 flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-foreground",
						children: "Home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "hover:text-foreground",
						children: t("shop.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "/" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: name
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-2 gap-8 md:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-square rounded-3xl overflow-hidden bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: assetUrl(product.image_key),
							alt: name,
							className: "h-full w-full object-cover",
							width: 1024,
							height: 1024
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-4 gap-3",
						children: [
							product.image_key,
							product.image_key,
							product.image_key,
							product.image_key
						].map((k, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-square rounded-xl overflow-hidden bg-secondary opacity-70 hover:opacity-100 transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: assetUrl(k),
								alt: "",
								loading: "lazy",
								className: "h-full w-full object-cover"
							})
						}, i))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:sticky md:top-24 md:self-start",
					children: [
						product.collection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow mb-3",
							children: product.collection
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]",
							children: name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-1",
								children: [
									0,
									1,
									2,
									3,
									4
								].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-4 w-4 ${i < Math.round(product.rating) ? "fill-accent text-accent" : "text-muted-foreground/30"}` }, i))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									product.rating.toFixed(1),
									" · ",
									product.review_count,
									" ",
									t("product.reviews")
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-baseline gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-3xl font-semibold",
								children: formatAED(product.price_aed, lang)
							}), product.compare_at_price_aed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground line-through",
								children: formatAED(product.compare_at_price_aed, lang)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: t("footer.vatIncl")
						}),
						desc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-8 text-base md:text-lg text-foreground/80 leading-relaxed",
							children: desc
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex items-center rounded-full border border-border",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "h-11 w-11 grid place-items-center hover:bg-muted rounded-s-full",
												onClick: () => setQty((q) => Math.max(1, q - 1)),
												"aria-label": "-",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-10 text-center font-medium",
												children: qty
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "h-11 w-11 grid place-items-center hover:bg-muted rounded-e-full",
												onClick: () => setQty((q) => Math.min(product.stock, q + 1)),
												"aria-label": "+",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: product.stock > 0 ? product.stock < 5 ? t("product.lowStock", { count: product.stock }) : t("product.inStock") : t("product.outOfStock")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										cart.add({
											product_id: product.id,
											slug: product.slug,
											name_en: product.name_en,
											name_ar: product.name_ar,
											price_aed: product.price_aed,
											image_key: product.image_key,
											sku: product.sku
										}, qty);
										toast.success(t("product.addToCart"));
									},
									disabled: product.stock === 0,
									className: "w-full rounded-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-wider uppercase hover:bg-primary/90 transition disabled:opacity-50",
									children: t("product.addToCart")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: whatsappLink(productWhatsappText({
										name: product.name_en,
										sku: product.sku,
										price_aed: product.price_aed,
										slug: product.slug
									})),
									target: "_blank",
									rel: "noreferrer",
									className: "w-full flex items-center justify-center gap-2 rounded-full border border-border py-4 text-sm font-medium tracking-wider uppercase hover:bg-secondary transition",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }),
										" ",
										t("product.whatsappOrder")
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-10 space-y-3 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, {
											className: "h-5 w-5 text-accent shrink-0",
											strokeWidth: 1.2
										}),
										" ",
										t("product.deliveryEstimate")
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
											className: "h-5 w-5 text-accent shrink-0",
											strokeWidth: 1.2
										}),
										" ",
										t("product.warranty")
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, {
											className: "h-5 w-5 text-accent shrink-0",
											strokeWidth: 1.2
										}),
										" ",
										t("product.installation")
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 pt-10 border-t border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "eyebrow mb-4",
								children: t("product.specifications")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "grid grid-cols-2 gap-y-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: t("product.material")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: product.material }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: t("product.color")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: product.color }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: t("product.room")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: product.room }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: t("product.sku")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: product.sku })
								]
							})]
						})
					]
				})]
			}),
			similar.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-24 pt-16 border-t border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl md:text-4xl font-semibold tracking-tight mb-10",
					children: t("product.similar")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10",
					children: similar.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.id))
				})]
			})
		]
	})] });
}
//#endregion
export { ProductPage as component };
