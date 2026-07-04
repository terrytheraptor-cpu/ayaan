// Simple localStorage-backed cart + wishlist with a React hook.
import { useSyncExternalStore } from "react";

export type CartItem = {
  product_id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  price_aed: number;
  image_key: string;
  sku: string;
  qty: number;
};

const CART_KEY = "alyaan_cart_v1";
const WISH_KEY = "alyaan_wish_v1";
const RECENT_KEY = "alyaan_recent_v1";

const listeners = new Set<() => void>();
const cache: Record<string, unknown> = {};
function emit() {
  // invalidate cached snapshots so getSnapshot returns fresh refs only when data changed
  delete cache[CART_KEY];
  delete cache[WISH_KEY];
  delete cache[RECENT_KEY];
  listeners.forEach(l => l());
}

function read<T>(key: string, fallback: T): T {
  if (key in cache) return cache[key] as T;
  if (typeof window === "undefined") { cache[key] = fallback; return fallback; }
  try {
    const raw = localStorage.getItem(key);
    const val = raw ? (JSON.parse(raw) ?? fallback) : fallback;
    cache[key] = val;
    return val as T;
  } catch { cache[key] = fallback; return fallback; }
}
function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
  cache[key] = value;
  listeners.forEach(l => l());
}

export const cart = {
  get(): CartItem[] { return read<CartItem[]>(CART_KEY, []); },
  add(item: Omit<CartItem, "qty">, qty = 1) {
    const items = cart.get();
    const existing = items.find(i => i.product_id === item.product_id);
    if (existing) existing.qty += qty;
    else items.push({ ...item, qty });
    write(CART_KEY, items);
  },
  update(product_id: string, qty: number) {
    const items = cart.get().map(i => i.product_id === product_id ? { ...i, qty } : i).filter(i => i.qty > 0);
    write(CART_KEY, items);
  },
  remove(product_id: string) { write(CART_KEY, cart.get().filter(i => i.product_id !== product_id)); },
  clear() { write(CART_KEY, []); },
  count(): number { return cart.get().reduce((n, i) => n + i.qty, 0); },
  subtotal(): number { return cart.get().reduce((n, i) => n + i.qty * i.price_aed, 0); },
};

export const wishlist = {
  get(): string[] { return read<string[]>(WISH_KEY, []); },
  toggle(product_id: string) {
    const items = wishlist.get();
    write(WISH_KEY, items.includes(product_id) ? items.filter(i => i !== product_id) : [...items, product_id]);
  },
  has(product_id: string) { return wishlist.get().includes(product_id); },
  count() { return wishlist.get().length; },
  clear() { write(WISH_KEY, []); },
};

export const recentlyViewed = {
  get(): string[] { return read<string[]>(RECENT_KEY, []); },
  push(product_id: string) {
    const items = [product_id, ...recentlyViewed.get().filter(i => i !== product_id)].slice(0, 8);
    write(RECENT_KEY, items);
  },
};

function subscribe(cb: () => void) { listeners.add(cb); return () => { listeners.delete(cb); }; }

export function useCart() {
  return useSyncExternalStore(subscribe, () => cart.get(), () => [] as CartItem[]);
}
export function useWishlist() {
  return useSyncExternalStore(subscribe, () => wishlist.get(), () => [] as string[]);
}
