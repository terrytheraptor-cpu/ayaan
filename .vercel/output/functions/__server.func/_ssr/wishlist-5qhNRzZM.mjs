import { a as require_jsx_runtime, n as useSuspenseQuery } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { i as useWishlist } from "./cart-store-BE6ptNQU.mjs";
import { t as ProductCard } from "./ProductCard-RFJ2sOnr.mjs";
import { t as opts } from "./wishlist-DUJ3cV4s.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wishlist-5qhNRzZM.js
var import_jsx_runtime = require_jsx_runtime();
function WishlistPage() {
	const { t } = useTranslation();
	const { data: products } = useSuspenseQuery(opts);
	const wish = useWishlist();
	const items = products.filter((p) => wish.includes(p.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-luxe pt-16 md:pt-24 pb-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl md:text-6xl font-semibold tracking-tight mb-10",
			children: t("wishlistLabel")
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "py-24 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: t("account.noWishlist")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				className: "mt-6 inline-block rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm",
				children: t("cart.continueShopping")
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10",
			children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.id))
		})]
	});
}
//#endregion
export { WishlistPage as component };
