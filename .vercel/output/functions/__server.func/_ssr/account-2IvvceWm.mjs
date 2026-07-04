import { a as require_jsx_runtime, r as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { t as formatAED } from "./i18n-CdZxj6no.mjs";
import { t as supabase } from "./client-XLL1ZQls.mjs";
import { t as listMyOrders } from "./orders.functions-C0CKEk_f.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-2IvvceWm.js
var import_jsx_runtime = require_jsx_runtime();
function AccountPage() {
	const { t, i18n } = useTranslation();
	const lang = i18n.language || "en";
	const fetchOrders = useServerFn(listMyOrders);
	const { data: orders } = useQuery({
		queryKey: ["my-orders"],
		queryFn: () => fetchOrders()
	});
	const signOut = async () => {
		await supabase.auth.signOut();
		toast.success(t("signOut"));
		window.location.href = "/";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-luxe py-16 md:py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between flex-wrap gap-4 mb-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl md:text-6xl font-semibold tracking-tight",
				children: t("account.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: signOut,
				className: "rounded-full border border-border px-5 py-2.5 text-sm",
				children: t("signOut")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "eyebrow mb-6",
			children: t("account.orders")
		}), !orders || orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground py-8",
			children: t("account.noOrders")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border",
			children: orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "py-6 flex flex-wrap items-center justify-between gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: o.order_number
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: new Date(o.created_at).toLocaleDateString(lang === "ar" ? "ar-AE" : "en-AE")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground capitalize",
						children: o.status
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: formatAED(Number(o.total_aed), lang)
					})
				]
			}, o.id))
		})] })]
	});
}
//#endregion
export { AccountPage as component };
