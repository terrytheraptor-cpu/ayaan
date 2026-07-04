import { o as __toESM } from "../_runtime.mjs";
import { o as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-store-BE6ptNQU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var CART_KEY = "alyaan_cart_v1";
var WISH_KEY = "alyaan_wish_v1";
var RECENT_KEY = "alyaan_recent_v1";
var listeners = /* @__PURE__ */ new Set();
var cache = {};
function read(key, fallback) {
	if (key in cache) return cache[key];
	if (typeof window === "undefined") {
		cache[key] = fallback;
		return fallback;
	}
	try {
		const raw = localStorage.getItem(key);
		const val = raw ? JSON.parse(raw) ?? fallback : fallback;
		cache[key] = val;
		return val;
	} catch {
		cache[key] = fallback;
		return fallback;
	}
}
function write(key, value) {
	if (typeof window === "undefined") return;
	localStorage.setItem(key, JSON.stringify(value));
	cache[key] = value;
	listeners.forEach((l) => l());
}
var cart = {
	get() {
		return read(CART_KEY, []);
	},
	add(item, qty = 1) {
		const items = cart.get();
		const existing = items.find((i) => i.product_id === item.product_id);
		if (existing) existing.qty += qty;
		else items.push({
			...item,
			qty
		});
		write(CART_KEY, items);
	},
	update(product_id, qty) {
		write(CART_KEY, cart.get().map((i) => i.product_id === product_id ? {
			...i,
			qty
		} : i).filter((i) => i.qty > 0));
	},
	remove(product_id) {
		write(CART_KEY, cart.get().filter((i) => i.product_id !== product_id));
	},
	clear() {
		write(CART_KEY, []);
	},
	count() {
		return cart.get().reduce((n, i) => n + i.qty, 0);
	},
	subtotal() {
		return cart.get().reduce((n, i) => n + i.qty * i.price_aed, 0);
	}
};
var wishlist = {
	get() {
		return read(WISH_KEY, []);
	},
	toggle(product_id) {
		const items = wishlist.get();
		write(WISH_KEY, items.includes(product_id) ? items.filter((i) => i !== product_id) : [...items, product_id]);
	},
	has(product_id) {
		return wishlist.get().includes(product_id);
	},
	count() {
		return wishlist.get().length;
	},
	clear() {
		write(WISH_KEY, []);
	}
};
var recentlyViewed = {
	get() {
		return read(RECENT_KEY, []);
	},
	push(product_id) {
		write(RECENT_KEY, [product_id, ...recentlyViewed.get().filter((i) => i !== product_id)].slice(0, 8));
	}
};
function subscribe(cb) {
	listeners.add(cb);
	return () => {
		listeners.delete(cb);
	};
}
function useCart() {
	return (0, import_react.useSyncExternalStore)(subscribe, () => cart.get(), () => []);
}
function useWishlist() {
	return (0, import_react.useSyncExternalStore)(subscribe, () => wishlist.get(), () => []);
}
//#endregion
export { wishlist as a, useWishlist as i, recentlyViewed as n, useCart as r, cart as t };
