import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { t as formatAED } from "./i18n-CdZxj6no.mjs";
import { t as supabase } from "./client-XLL1ZQls.mjs";
import { a as stringType, i as objectType, n as enumType } from "../_libs/zod.mjs";
import { n as placeOrder } from "./orders.functions-C0CKEk_f.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useCart, t as cart } from "./cart-store-BE6ptNQU.mjs";
import { _ as CircleCheck, f as MessageCircle } from "../_libs/lucide-react.mjs";
import { n as whatsappLink } from "./whatsapp-19okXLFM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-mBzQdMFZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMIRATES = [
	"Dubai",
	"Abu Dhabi",
	"Sharjah",
	"Ajman",
	"Ras Al Khaimah",
	"Umm Al Quwain",
	"Fujairah"
];
var CheckoutSchema = objectType({
	contact_name: stringType().trim().min(2).max(120),
	contact_email: stringType().trim().email(),
	contact_phone: stringType().trim().min(4).max(30),
	line1: stringType().trim().min(2).max(200),
	line2: stringType().trim().max(200).optional(),
	city: stringType().trim().min(1).max(80),
	emirate: stringType().trim().min(1).max(80),
	payment_method: enumType([
		"card",
		"bank",
		"cod"
	]),
	notes: stringType().trim().max(500).optional()
});
function CheckoutPage() {
	const items = useCart();
	const { t, i18n } = useTranslation();
	const lang = i18n.language || "en";
	const nav = useNavigate();
	const submitOrder = useServerFn(placeOrder);
	const [session, setSession] = (0, import_react.useState)(null);
	const [loadingSession, setLoadingSession] = (0, import_react.useState)(true);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		contact_name: "",
		contact_email: "",
		contact_phone: "",
		line1: "",
		line2: "",
		city: "",
		emirate: "Dubai",
		payment_method: "cod",
		notes: ""
	});
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setLoadingSession(false);
		});
		const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
		return () => data.subscription.unsubscribe();
	}, []);
	const subtotal = items.reduce((n, i) => n + i.qty * i.price_aed, 0);
	const vat = Math.round(subtotal * .05 * 100) / 100;
	const shipping = subtotal === 0 ? 0 : subtotal >= 1500 ? 0 : 150;
	const total = subtotal + vat + shipping;
	const submit = async (e) => {
		e.preventDefault();
		if (!session) {
			toast.error("Please sign in first.");
			nav({
				to: "/auth",
				search: { next: "/checkout" }
			});
			return;
		}
		if (items.length === 0) {
			toast.error(t("cart.empty"));
			return;
		}
		const parsed = CheckoutSchema.safeParse(form);
		if (!parsed.success) {
			toast.error(parsed.error.issues[0]?.message ?? "Please review your details.");
			return;
		}
		setSubmitting(true);
		try {
			const res = await submitOrder({ data: {
				contact_name: form.contact_name,
				contact_email: form.contact_email,
				contact_phone: form.contact_phone,
				address: {
					line1: form.line1,
					line2: form.line2 || null,
					city: form.city,
					emirate: form.emirate
				},
				items: items.map((i) => ({
					product_id: i.product_id,
					slug: i.slug,
					name_en: i.name_en,
					name_ar: i.name_ar,
					sku: i.sku,
					price_aed: i.price_aed,
					qty: i.qty,
					image_key: i.image_key
				})),
				payment_method: form.payment_method,
				notes: form.notes || null
			} });
			setResult({
				order_number: res.order_number,
				total_aed: Number(res.total_aed)
			});
			cart.clear();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Order failed");
		} finally {
			setSubmitting(false);
		}
	};
	if (result) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-luxe py-24 md:py-32 max-w-2xl mx-auto text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
				className: "h-14 w-14 mx-auto text-accent",
				strokeWidth: 1.2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 font-display text-4xl md:text-5xl font-semibold tracking-tight",
				children: t("checkout.success")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-muted-foreground",
				children: [
					t("checkout.orderNumber"),
					": ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground",
						children: result.order_number
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-lg font-medium",
				children: formatAED(result.total_aed, lang)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-wrap justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: whatsappLink(`Hello AL AYAAN, order ${result.order_number} placed for AED ${result.total_aed}.`),
					target: "_blank",
					rel: "noreferrer",
					className: "inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }),
						" ",
						t("checkout.continueOnWhatsapp")
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/account",
					className: "rounded-full border border-border px-6 py-3 text-sm",
					children: t("account.orders")
				})]
			})
		]
	});
	if (loadingSession) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-luxe py-32 text-center text-muted-foreground",
		children: "Loading…"
	});
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-luxe py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: t("cart.empty")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/shop",
			className: "mt-6 inline-block rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm",
			children: t("cart.continueShopping")
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-luxe pt-16 md:pt-24 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl md:text-6xl font-semibold tracking-tight mb-10",
				children: t("checkout.title")
			}),
			!session && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-10 rounded-2xl border border-border bg-secondary/60 p-6 flex items-center justify-between flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: "Please sign in to place your order. Your cart will be preserved."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/auth",
					search: { next: "/checkout" },
					className: "rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm",
					children: t("signIn")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "grid md:grid-cols-[1fr_360px] gap-10 md:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
							title: t("checkout.contact"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("fullName"),
									value: form.contact_name,
									onChange: (v) => setForm((f) => ({
										...f,
										contact_name: v
									})),
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("email"),
									type: "email",
									value: form.contact_email,
									onChange: (v) => setForm((f) => ({
										...f,
										contact_email: v
									})),
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("phone"),
									value: form.contact_phone,
									onChange: (v) => setForm((f) => ({
										...f,
										contact_phone: v
									})),
									required: true
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
							title: t("checkout.shippingAddress"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("checkout.line1"),
									value: form.line1,
									onChange: (v) => setForm((f) => ({
										...f,
										line1: v
									})),
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("checkout.line2"),
									value: form.line2,
									onChange: (v) => setForm((f) => ({
										...f,
										line2: v
									}))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: t("checkout.city"),
										value: form.city,
										onChange: (v) => setForm((f) => ({
											...f,
											city: v
										})),
										required: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs uppercase tracking-widest text-muted-foreground mb-2",
										children: t("checkout.emirate")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: form.emirate,
										onChange: (e) => setForm((f) => ({
											...f,
											emirate: e.target.value
										})),
										className: "w-full h-12 rounded-2xl border border-border bg-background px-4",
										children: EMIRATES.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: e,
											children: e
										}, e))
									})] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: t("checkout.payment"),
							children: [
								"card",
								"bank",
								"cod"
							].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: `flex items-center gap-4 p-4 rounded-2xl border cursor-pointer ${form.payment_method === m ? "border-foreground bg-secondary/40" : "border-border"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "pm",
									checked: form.payment_method === m,
									onChange: () => setForm((f) => ({
										...f,
										payment_method: m
									})),
									className: "accent-accent"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: t(`checkout.paymentMethods.${m}`)
								})]
							}, m))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: t("checkout.orderNotes"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: form.notes,
								onChange: (e) => setForm((f) => ({
									...f,
									notes: e.target.value
								})),
								rows: 3,
								className: "w-full rounded-2xl border border-border bg-background p-4 text-sm"
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "md:sticky md:top-24 md:self-start rounded-3xl bg-secondary/60 p-6 md:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold mb-6",
							children: t("checkout.review")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3 text-sm max-h-64 overflow-y-auto",
							children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "truncate",
									children: [
										lang === "ar" ? i.name_ar : i.name_en,
										" × ",
										i.qty
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0",
									children: formatAED(i.price_aed * i.qty, lang)
								})]
							}, i.product_id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-6 space-y-3 text-sm pt-4 border-t border-border",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: submitting,
							className: "mt-6 w-full rounded-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-wider uppercase hover:bg-primary/90 disabled:opacity-50",
							children: submitting ? "…" : t("checkout.placeOrder")
						})
					]
				})]
			})
		]
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "font-display text-2xl font-semibold mb-6",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children
	})] });
}
function Field({ label, value, onChange, type = "text", required }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "block text-xs uppercase tracking-widest text-muted-foreground mb-2",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		value: value ?? "",
		onChange: (e) => onChange(e.target.value),
		required,
		className: "w-full h-12 rounded-2xl border border-border bg-background px-4"
	})] });
}
//#endregion
export { CheckoutPage as component };
