import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-D7qpboqH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-BJhazTm7.mjs";
import { a as stringType, i as objectType, n as enumType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.functions-C0CKEk_f.js
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
var placeOrder = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => OrderInput.parse(input)).handler(createSsrRpc("a6485a0caa6c7276b8f38fd2e39c7cd965ae3addca5ff318987f97661206380a"));
var listMyOrders = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("3265360dd1bb8505874dca36fc08c120c489507fb549e4925a945a8286e7a79a"));
//#endregion
export { placeOrder as n, listMyOrders as t };
