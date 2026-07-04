import { a as require_jsx_runtime, n as useSuspenseQuery } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { i as lifestyle_villa_default, n as hero_living_default, r as lifestyle_hotel_default, t as assetUrl } from "./assets-BoBqPUAl.mjs";
import { c as ShieldCheck, h as Headset, i as Truck, n as Wrench, v as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as ProductCard } from "./ProductCard-RFJ2sOnr.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { n as whatsappLink } from "./whatsapp-19okXLFM.mjs";
import { i as newOpts, n as categoriesOpts, r as featuredOpts, t as bestOpts } from "./routes-CGG7-YvF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CpPYt---.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { t, i18n } = useTranslation();
	const lang = i18n.language || "en";
	const { data: categories } = useSuspenseQuery(categoriesOpts);
	const { data: featured } = useSuspenseQuery(featuredOpts);
	const { data: nu } = useSuspenseQuery(newOpts);
	const { data: best } = useSuspenseQuery(bestOpts);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative -mt-16 md:-mt-20 h-[92vh] min-h-[640px] w-full overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_living_default,
					alt: "AL AYAAN luxury Dubai living room",
					className: "absolute inset-0 h-full w-full object-cover",
					width: 1920,
					height: 1200
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-background/50 via-background/20 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 container-luxe h-full flex flex-col justify-end pb-16 md:pb-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { duration: .8 },
							className: "eyebrow mb-6",
							children: t("hero.eyebrow")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
							initial: {
								opacity: 0,
								y: 30
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .9,
								delay: .1
							},
							className: "font-display font-semibold tracking-tight text-[clamp(2.6rem,7vw,6.5rem)] leading-[1.02] max-w-5xl",
							children: t("tagline")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .9,
								delay: .25
							},
							className: "mt-6 max-w-xl text-base md:text-lg text-foreground/80",
							children: t("subtagline")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 15
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .8,
								delay: .4
							},
							className: "mt-10 flex flex-wrap gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/shop",
									className: "inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-medium hover:bg-primary/90 transition",
									children: [
										t("exploreCollection"),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 mirror-rtl" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/category/living-room",
									className: "inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/60 backdrop-blur px-7 py-3.5 text-sm font-medium hover:bg-background transition",
									children: t("shopNow")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: whatsappLink("Hello AL AYAAN, I'm interested in your collection."),
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/60 backdrop-blur px-7 py-3.5 text-sm font-medium hover:bg-background transition",
									children: t("whatsapp")
								})
							]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-luxe py-24 md:py-32",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between mb-10 md:mb-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow mb-3",
					children: t("home.categoriesTitle")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl md:text-5xl font-semibold tracking-tight max-w-2xl",
					children: t("home.categoriesSub")
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/shop",
					className: "hidden md:inline-flex items-center gap-2 text-sm hover:text-accent",
					children: [
						t("nav.shop"),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 mirror-rtl" })
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5",
				children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/category/$slug",
					params: { slug: c.slug },
					className: "group relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: assetUrl(c.image_key),
							alt: lang === "ar" ? c.name_ar : c.name_en,
							loading: "lazy",
							className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-4 start-4 end-4 text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg md:text-xl font-medium",
								children: lang === "ar" ? c.name_ar : c.name_en
							})
						})
					]
				}, c.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-secondary/50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-luxe grid md:grid-cols-2 gap-12 md:gap-20 py-24 md:py-32 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-[4/5] rounded-3xl overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: lifestyle_villa_default,
						alt: "Dubai luxury villa",
						className: "h-full w-full object-cover",
						loading: "lazy"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-4",
						children: t("home.editorial.eyebrow")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]",
						children: t("home.editorial.heading")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed",
						children: t("home.editorial.copy")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/shop",
						className: "mt-10 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-medium",
						children: [
							t("nav.collections"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 mirror-rtl" })
						]
					})
				] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductRail, {
			title: t("home.featuredTitle"),
			sub: t("home.featuredSub"),
			products: featured
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-luxe py-24 md:py-32 border-t border-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl md:text-5xl font-semibold tracking-tight text-center max-w-3xl mx-auto",
				children: t("home.why.heading")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-16 grid md:grid-cols-4 gap-8",
				children: [
					{
						Icon: ShieldCheck,
						t: "quality"
					},
					{
						Icon: Truck,
						t: "delivery"
					},
					{
						Icon: Wrench,
						t: "install"
					},
					{
						Icon: Headset,
						t: "support"
					}
				].map(({ Icon, t: key }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center md:text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "h-8 w-8 text-accent mb-4 mx-auto md:mx-0",
							strokeWidth: 1.2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-medium",
							children: t(`home.why.${key}`)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground leading-relaxed",
							children: t(`home.why.${key}Copy`)
						})
					]
				}, key))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductRail, {
			title: t("home.newTitle"),
			products: nu
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductRail, {
			title: t("home.bestsellersTitle"),
			products: best
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "container-luxe py-24 md:py-32 border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-2 gap-12 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow mb-4",
						children: "Projects"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]",
						children: t("home.projects.heading")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-muted-foreground max-w-md leading-relaxed",
						children: t("home.projects.copy")
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: lifestyle_hotel_default,
						alt: "Luxury hotel lobby",
						className: "rounded-2xl aspect-[3/4] object-cover",
						loading: "lazy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: lifestyle_villa_default,
						alt: "Luxury villa",
						className: "rounded-2xl aspect-[3/4] object-cover mt-8",
						loading: "lazy"
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-ink text-primary-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-luxe py-24 md:py-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow mb-4 text-primary-foreground/60",
					children: t("home.testimonials.heading")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid md:grid-cols-3 gap-8 md:gap-12 mt-8",
					children: [
						{
							q: "The Halo sectional transformed our entire villa. Craftsmanship you can feel.",
							a: "— Fatima A., Palm Jumeirah"
						},
						{
							q: "AL AYAAN furnished four boardrooms for us in ten days. Flawless.",
							a: "— Kareem H., DIFC"
						},
						{
							q: "The most patient, elegant delivery team in Dubai.",
							a: "— Sara B., Emirates Hills"
						}
					].map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-primary-foreground/20 pt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-xl md:text-2xl leading-snug",
							children: [
								"\"",
								r.q,
								"\""
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-sm text-primary-foreground/70",
							children: r.a
						})]
					}, i))
				})]
			})
		})
	] });
}
function ProductRail({ title, sub, products }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "container-luxe py-20 md:py-24 border-t border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between mb-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl md:text-5xl font-semibold tracking-tight",
				children: title
			}), sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: sub
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/shop",
				className: "hidden md:inline-flex items-center gap-2 text-sm hover:text-accent",
				children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 mirror-rtl" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10",
			children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.id))
		})]
	});
}
//#endregion
export { Home as component };
