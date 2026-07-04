import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as QueryClientProvider, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { M as redirect, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { n as setLang } from "./i18n-CdZxj6no.mjs";
import { t as supabase } from "./client-XLL1ZQls.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$9 } from "./auth-CYweTHfx.mjs";
import { i as useWishlist, r as useCart } from "./cart-store-BE6ptNQU.mjs";
import { f as MessageCircle, g as Globe, l as Search, m as Heart, p as Menu, r as User, s as ShoppingBag, t as X } from "../_libs/lucide-react.mjs";
import { t as cn } from "./catalog.functions-Dgbqbzaf.mjs";
import { t as Route$10 } from "./category._slug-fnhWLJ-Y.mjs";
import { n as whatsappLink } from "./whatsapp-19okXLFM.mjs";
import { t as Route$11 } from "./product._slug-51E5_RFM.mjs";
import { t as opts } from "./wishlist-DUJ3cV4s.mjs";
import { n as catsOpts, t as allOpts } from "./shop-Bc4bj_uv.mjs";
import { i as newOpts, n as categoriesOpts, r as featuredOpts, t as bestOpts } from "./routes-CGG7-YvF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DUbaggHE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BJwbzIoe.css";
var nav = [
	{
		to: "/",
		key: "home"
	},
	{
		to: "/shop",
		key: "shop"
	},
	{
		to: "/category/living-room",
		key: "living"
	},
	{
		to: "/category/bedroom",
		key: "bedroom"
	},
	{
		to: "/category/dining",
		key: "dining"
	},
	{
		to: "/category/office",
		key: "office"
	},
	{
		to: "/category/lighting",
		key: "lighting"
	}
];
function Header() {
	const { t, i18n } = useTranslation();
	const cart = useCart();
	const wish = useWishlist();
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const toggleLang = () => setLang(i18n.language === "ar" ? "en" : "ar");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("sticky top-0 z-40 w-full transition-colors duration-300", scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border" : "bg-transparent"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-luxe flex h-16 md:h-20 items-center gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "md:hidden -ms-2 p-2",
					"aria-label": "Menu",
					onClick: () => setOpen((v) => !v),
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-baseline gap-2 me-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg md:text-xl tracking-tight font-semibold",
						children: t("brand")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] md:text-xs tracking-[0.24em] text-muted-foreground uppercase",
						children: t("brandSub")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden md:flex items-center gap-6 lg:gap-8 text-sm",
					children: nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: n.to,
						className: "text-foreground/80 hover:text-foreground transition-colors",
						activeProps: { className: "text-foreground font-medium" },
						activeOptions: { exact: n.to === "/" },
						children: t(`nav.${n.key}`)
					}, n.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ms-auto flex items-center gap-1 md:gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/search",
							className: "p-2 hover:bg-muted rounded-full",
							"aria-label": t("searchLabel"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4.5 w-4.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: toggleLang,
							className: "hidden sm:inline-flex items-center gap-1 p-2 hover:bg-muted rounded-full text-xs",
							"aria-label": "Language",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden md:inline",
								children: t("lang")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/wishlist",
							className: "relative p-2 hover:bg-muted rounded-full",
							"aria-label": t("wishlistLabel"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4.5 w-4.5" }), wish.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -top-0.5 -end-0.5 bg-accent text-accent-foreground text-[10px] font-medium h-4 min-w-4 px-1 rounded-full grid place-items-center",
								children: wish.length
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/account",
							className: "p-2 hover:bg-muted rounded-full hidden sm:inline-flex",
							"aria-label": t("accountLabel"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4.5 w-4.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/cart",
							className: "relative p-2 hover:bg-muted rounded-full",
							"aria-label": t("cartLabel"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4.5 w-4.5" }), cart.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -top-0.5 -end-0.5 bg-ink text-primary-foreground text-[10px] font-medium h-4 min-w-4 px-1 rounded-full grid place-items-center",
								children: cart.reduce((n, i) => n + i.qty, 0)
							})]
						})
					]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "md:hidden border-t border-border bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "container-luxe py-4 flex flex-col gap-1",
				children: [
					nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: n.to,
						onClick: () => setOpen(false),
						className: "py-2 text-base",
						children: t(`nav.${n.key}`)
					}, n.to)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: toggleLang,
						className: "py-2 text-start text-base flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-4 w-4" }),
							" ",
							t("lang")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/account",
						onClick: () => setOpen(false),
						className: "py-2 text-base",
						children: t("accountLabel")
					})
				]
			})
		})]
	});
}
function Footer() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-32 border-t border-border bg-secondary/40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-luxe py-16 md:py-24 grid grid-cols-1 md:grid-cols-4 gap-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl font-semibold",
								children: t("brand")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs tracking-[0.24em] text-muted-foreground uppercase",
								children: t("brandSub")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed",
							children: t("footer.tagline")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-xs text-muted-foreground",
							children: t("footer.vatIncl")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "eyebrow mb-4",
					children: t("footer.shop")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: "hover:text-accent",
							children: t("nav.shop")
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/category/living-room",
							className: "hover:text-accent",
							children: t("nav.living")
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/category/bedroom",
							className: "hover:text-accent",
							children: t("nav.bedroom")
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/category/dining",
							className: "hover:text-accent",
							children: t("nav.dining")
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/category/office",
							className: "hover:text-accent",
							children: t("nav.office")
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "eyebrow mb-4",
					children: t("footer.support")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/cart",
							className: "hover:text-accent",
							children: t("cartLabel")
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/wishlist",
							className: "hover:text-accent",
							children: t("wishlistLabel")
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/account",
							className: "hover:text-accent",
							children: t("accountLabel")
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://wa.me/971501234567",
							className: "hover:text-accent",
							children: "WhatsApp +971 50 123 4567"
						}) })
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-luxe py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" AL AYAAN Furniture. ",
					t("footer.rights")
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Dubai · Abu Dhabi · Sharjah · Ajman" })]
			})
		})]
	});
}
function WhatsAppFAB() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: whatsappLink("Hello AL AYAAN, I'd like to know more about your collection."),
		target: "_blank",
		rel: "noreferrer",
		"aria-label": "WhatsApp",
		className: "fixed bottom-6 end-6 z-40 h-14 w-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-2xl hover:scale-105 transition-transform",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-6 w-6" })
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-7xl font-semibold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground",
					children: "This page does not exist."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground",
					children: "Return home"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Please refresh, or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							reset();
							window.location.reload();
						},
						className: "rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-full border border-border px-6 py-3 text-sm font-medium",
						children: "Home"
					})]
				})
			]
		})
	});
}
var Route$8 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "AL AYAAN Furniture — Premium furniture for the UAE" },
			{
				name: "description",
				content: "Luxury furniture for homes, offices and commercial spaces across the UAE. Living, bedroom, dining, office, outdoor, lighting and mattresses."
			},
			{
				name: "author",
				content: "AL AYAAN Furniture"
			},
			{
				property: "og:title",
				content: "AL AYAAN Furniture — Premium furniture for the UAE"
			},
			{
				property: "og:description",
				content: "Luxury furniture for homes, offices and commercial spaces across the UAE."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "theme-color",
				content: "#FBFAF7"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		dir: "ltr",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$8.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const saved = typeof window !== "undefined" && localStorage.getItem("lang");
		if (saved) setLang(saved);
		else {
			document.documentElement.lang = "en";
			document.documentElement.dir = "ltr";
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((event) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			router.invalidate();
			if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
		});
		return () => sub.subscription.unsubscribe();
	}, [queryClient, router]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-screen flex flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppFAB, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "bottom-center",
				theme: "light",
				richColors: true,
				closeButton: true
			})
		]
	});
}
var $$splitComponentImporter$7 = () => import("./wishlist-5qhNRzZM.mjs");
var Route$7 = createFileRoute("/wishlist")({
	head: () => ({ meta: [{ title: "Your wishlist — AL AYAAN" }, {
		name: "robots",
		content: "noindex"
	}] }),
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(opts);
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./shop-BE6chkLh.mjs");
var Route$6 = createFileRoute("/shop")({
	head: () => ({ meta: [{ title: "Shop luxury furniture — AL AYAAN" }, {
		name: "description",
		content: "Browse the full AL AYAAN catalog: sofas, beds, dining, office, outdoor and lighting. Delivered across the UAE."
	}] }),
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(allOpts);
		context.queryClient.ensureQueryData(catsOpts);
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./search-sRRzpje6.mjs");
var Route$5 = createFileRoute("/search")({
	head: () => ({ meta: [{ title: "Search — AL AYAAN" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./checkout-mBzQdMFZ.mjs");
var Route$4 = createFileRoute("/checkout")({
	head: () => ({ meta: [{ title: "Checkout — AL AYAAN" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./cart-Ctyh9qdZ.mjs");
var Route$3 = createFileRoute("/cart")({
	head: () => ({ meta: [{ title: "Your cart — AL AYAAN" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./route-Di7iQBCH.mjs");
var Route$2 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./routes-CpPYt---.mjs");
var Route$1 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "AL AYAAN Furniture — Premium furniture for modern living in the UAE" }, {
		name: "description",
		content: "Luxury sofas, bedrooms, dining, office and outdoor furniture in Dubai, Abu Dhabi and across the UAE. Free white-glove delivery over AED 1,500."
	}] }),
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(categoriesOpts);
		context.queryClient.ensureQueryData(featuredOpts);
		context.queryClient.ensureQueryData(newOpts);
		context.queryClient.ensureQueryData(bestOpts);
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./account-2IvvceWm.mjs");
var Route = createFileRoute("/_authenticated/account")({
	head: () => ({ meta: [{ title: "My account — AL AYAAN" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var WishlistRoute = Route$7.update({
	id: "/wishlist",
	path: "/wishlist",
	getParentRoute: () => Route$8
});
var ShopRoute = Route$6.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$8
});
var SearchRoute = Route$5.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => Route$8
});
var CheckoutRoute = Route$4.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$8
});
var CartRoute = Route$3.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$8
});
var AuthRoute = Route$9.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$8
});
var AuthenticatedRouteRoute = Route$2.update({
	id: "/_authenticated",
	getParentRoute: () => Route$8
});
var IndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$8
});
var ProductSlugRoute = Route$11.update({
	id: "/product/$slug",
	path: "/product/$slug",
	getParentRoute: () => Route$8
});
var CategorySlugRoute = Route$10.update({
	id: "/category/$slug",
	path: "/category/$slug",
	getParentRoute: () => Route$8
});
var AuthenticatedRouteRouteChildren = { AuthenticatedAccountRoute: Route.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => AuthenticatedRouteRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	CartRoute,
	CheckoutRoute,
	SearchRoute,
	ShopRoute,
	WishlistRoute,
	CategorySlugRoute,
	ProductSlugRoute
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
