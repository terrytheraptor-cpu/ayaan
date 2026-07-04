import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-D7qpboqH.mjs";
import { a as stringType, i as objectType, n as enumType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.functions-D9Rd55dQ.js
var OrderInput = objectType({
	contact_name: stringType().trim().min(1).max(120),
	contact_email: stringType().trim().email().max(200),
	contact_phone: stringType().trim().min(4).max(30),
	address: objectType({
		line1: stringType().trim().min(1).max(200),
		line2: stringType().trim().max(200).optional().nullable(),
		city: stringType().trim().min(1).max(80),
		emirate: stringType().trim().min(1).max(80)
	}),
	items: arrayType(objectType({
		product_id: stringType().uuid(),
		slug: stringType(),
		name_en: stringType(),
		name_ar: stringType(),
		sku: stringType(),
		price_aed: numberType().nonnegative(),
		qty: numberType().int().min(1).max(50),
		image_key: stringType()
	})).min(1).max(50),
	payment_method: enumType([
		"card",
		"bank",
		"cod"
	]),
	notes: stringType().trim().max(500).optional().nullable()
});
var placeOrder_createServerFn_handler = createServerRpc({
	id: "a6485a0caa6c7276b8f38fd2e39c7cd965ae3addca5ff318987f97661206380a",
	name: "placeOrder",
	filename: "src/lib/orders.functions.ts"
}, (opts) => placeOrder.__executeServer(opts));
var placeOrder = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => OrderInput.parse(input)).handler(placeOrder_createServerFn_handler, async ({ data, context }) => {
	const subtotal = data.items.reduce((n, i) => n + i.qty * i.price_aed, 0);
	const vat = Math.round(subtotal * .05 * 100) / 100;
	const shipping = subtotal >= 1500 ? 0 : 150;
	const total = subtotal + vat + shipping;
	const { data: row, error } = await context.supabase.from("orders").insert({
		user_id: context.userId,
		contact_name: data.contact_name,
		contact_email: data.contact_email,
		contact_phone: data.contact_phone,
		address: data.address,
		items: data.items,
		subtotal_aed: subtotal,
		vat_aed: vat,
		shipping_aed: shipping,
		total_aed: total,
		payment_method: data.payment_method,
		notes: data.notes ?? null
	}).select("id, order_number, total_aed").single();
	if (error) throw new Error(error.message);
	return row;
});
var listMyOrders_createServerFn_handler = createServerRpc({
	id: "3265360dd1bb8505874dca36fc08c120c489507fb549e4925a945a8286e7a79a",
	name: "listMyOrders",
	filename: "src/lib/orders.functions.ts"
}, (opts) => listMyOrders.__executeServer(opts));
var listMyOrders = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listMyOrders_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("orders").select("id, order_number, total_aed, status, created_at, items, payment_method").order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data ?? [];
});
//#endregion
export { listMyOrders_createServerFn_handler, placeOrder_createServerFn_handler };
