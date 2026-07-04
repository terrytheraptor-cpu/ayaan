import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog.functions-Dz3qXmN8.js
function publicClient() {
	return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} });
}
var SELECT_PRODUCT = "id,slug,category_id,name_en,name_ar,description_en,description_ar,sku,price_aed,compare_at_price_aed,material,color,room,image_key,gallery,stock,rating,review_count,is_featured,is_new,is_bestseller,collection";
var listCategories_createServerFn_handler = createServerRpc({
	id: "9093087a4fde30e7cbeefd735d6dccc2718ef5ec811563a10f9b01884489c6f6",
	name: "listCategories",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => listCategories.__executeServer(opts));
var listCategories = createServerFn({ method: "GET" }).handler(listCategories_createServerFn_handler, async () => {
	const { data, error } = await publicClient().from("categories").select("id,slug,name_en,name_ar,description_en,description_ar,image_key,sort_order").order("sort_order", { ascending: true });
	if (error) throw new Error(error.message);
	return data ?? [];
});
var listProducts_createServerFn_handler = createServerRpc({
	id: "ec305e715d428bd5a056174d65530dc3f73a4aae7224baa7e85f3de5db811249",
	name: "listProducts",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => listProducts.__executeServer(opts));
var listProducts = createServerFn({ method: "GET" }).inputValidator((input) => input ?? {}).handler(listProducts_createServerFn_handler, async ({ data }) => {
	const sb = publicClient();
	let q = sb.from("products").select(SELECT_PRODUCT);
	if (data.featured) q = q.eq("is_featured", true);
	if (data.is_new) q = q.eq("is_new", true);
	if (data.is_bestseller) q = q.eq("is_bestseller", true);
	if (data.collection) q = q.eq("collection", data.collection);
	if (data.category) {
		const { data: cat } = await sb.from("categories").select("id").eq("slug", data.category).maybeSingle();
		if (cat) q = q.eq("category_id", cat.id);
	}
	q = q.order("is_featured", { ascending: false }).order("created_at", { ascending: false });
	if (data.limit) q = q.limit(data.limit);
	const { data: rows, error } = await q;
	if (error) throw new Error(error.message);
	return rows ?? [];
});
var getProductBySlug_createServerFn_handler = createServerRpc({
	id: "338e414efdb61533c60e3c1671e7aea82e763a0409c4afad4a1f474e3d8c65ce",
	name: "getProductBySlug",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => getProductBySlug.__executeServer(opts));
var getProductBySlug = createServerFn({ method: "GET" }).inputValidator((input) => input).handler(getProductBySlug_createServerFn_handler, async ({ data }) => {
	const sb = publicClient();
	const { data: product, error } = await sb.from("products").select(SELECT_PRODUCT).eq("slug", data.slug).maybeSingle();
	if (error) throw new Error(error.message);
	if (!product) return null;
	const { data: similar } = await sb.from("products").select(SELECT_PRODUCT).eq("category_id", product.category_id).neq("id", product.id).limit(4);
	return {
		product,
		similar: similar ?? []
	};
});
var getCategoryBySlug_createServerFn_handler = createServerRpc({
	id: "5488941a246672c11e7e731b5355bc6486887024c8f5ad9aee9839ae4866f700",
	name: "getCategoryBySlug",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => getCategoryBySlug.__executeServer(opts));
var getCategoryBySlug = createServerFn({ method: "GET" }).inputValidator((input) => input).handler(getCategoryBySlug_createServerFn_handler, async ({ data }) => {
	const sb = publicClient();
	const { data: cat, error } = await sb.from("categories").select("id,slug,name_en,name_ar,description_en,description_ar,image_key,sort_order").eq("slug", data.slug).maybeSingle();
	if (error) throw new Error(error.message);
	if (!cat) return null;
	const { data: products } = await sb.from("products").select(SELECT_PRODUCT).eq("category_id", cat.id).order("is_featured", { ascending: false });
	return {
		category: cat,
		products: products ?? []
	};
});
var searchProducts_createServerFn_handler = createServerRpc({
	id: "0ca8c0d451fe626e0bb9952fea9eca731a0c03e85886f5ab2eb56018486f2faf",
	name: "searchProducts",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => searchProducts.__executeServer(opts));
var searchProducts = createServerFn({ method: "GET" }).inputValidator((input) => input).handler(searchProducts_createServerFn_handler, async ({ data }) => {
	const term = data.q.trim();
	if (!term) return [];
	const { data: rows, error } = await publicClient().from("products").select(SELECT_PRODUCT).or(`name_en.ilike.%${term}%,name_ar.ilike.%${term}%,sku.ilike.%${term}%`).limit(20);
	if (error) throw new Error(error.message);
	return rows ?? [];
});
//#endregion
export { getCategoryBySlug_createServerFn_handler, getProductBySlug_createServerFn_handler, listCategories_createServerFn_handler, listProducts_createServerFn_handler, searchProducts_createServerFn_handler };
