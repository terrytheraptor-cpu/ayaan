import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export type Category = {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  description_en: string | null;
  description_ar: string | null;
  image_key: string | null;
  sort_order: number;
};

export type Product = {
  id: string;
  slug: string;
  category_id: string;
  name_en: string;
  name_ar: string;
  description_en: string | null;
  description_ar: string | null;
  sku: string;
  price_aed: number;
  compare_at_price_aed: number | null;
  material: string | null;
  color: string | null;
  room: string | null;
  image_key: string;
  gallery: string[];
  stock: number;
  rating: number;
  review_count: number;
  is_featured: boolean;
  is_new: boolean;
  is_bestseller: boolean;
  collection: string | null;
};

const SELECT_PRODUCT =
  "id,slug,category_id,name_en,name_ar,description_en,description_ar,sku,price_aed,compare_at_price_aed,material,color,room,image_key,gallery,stock,rating,review_count,is_featured,is_new,is_bestseller,collection";

export const listCategories = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const { data, error } = await sb
    .from("categories")
    .select("id,slug,name_en,name_ar,description_en,description_ar,image_key,sort_order")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as Category[];
});

export const listProducts = createServerFn({ method: "GET" })
  .inputValidator((input: { limit?: number; featured?: boolean; is_new?: boolean; is_bestseller?: boolean; category?: string; collection?: string } | undefined) => input ?? {})
  .handler(async ({ data }) => {
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
    return (rows ?? []) as Product[];
  });

export const getProductBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => input)
  .handler(async ({ data }) => {
    const sb = publicClient();
    const { data: product, error } = await sb
      .from("products")
      .select(SELECT_PRODUCT)
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!product) return null;
    const { data: similar } = await sb
      .from("products")
      .select(SELECT_PRODUCT)
      .eq("category_id", (product as Product).category_id)
      .neq("id", (product as Product).id)
      .limit(4);
    return { product: product as Product, similar: (similar ?? []) as Product[] };
  });

export const getCategoryBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => input)
  .handler(async ({ data }) => {
    const sb = publicClient();
    const { data: cat, error } = await sb
      .from("categories")
      .select("id,slug,name_en,name_ar,description_en,description_ar,image_key,sort_order")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!cat) return null;
    const { data: products } = await sb
      .from("products")
      .select(SELECT_PRODUCT)
      .eq("category_id", (cat as Category).id)
      .order("is_featured", { ascending: false });
    return { category: cat as Category, products: (products ?? []) as Product[] };
  });

export const searchProducts = createServerFn({ method: "GET" })
  .inputValidator((input: { q: string }) => input)
  .handler(async ({ data }) => {
    const term = data.q.trim();
    if (!term) return [] as Product[];
    const sb = publicClient();
    const { data: rows, error } = await sb
      .from("products")
      .select(SELECT_PRODUCT)
      .or(`name_en.ilike.%${term}%,name_ar.ilike.%${term}%,sku.ilike.%${term}%`)
      .limit(20);
    if (error) throw new Error(error.message);
    return (rows ?? []) as Product[];
  });

// Db-generated types are inferred where needed; keeping this typed at the module level.
export type _DB = Database;
