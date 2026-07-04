import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const OrderInput = z.object({
  contact_name: z.string().trim().min(1).max(120),
  contact_email: z.string().trim().email().max(200),
  contact_phone: z.string().trim().min(4).max(30),
  address: z.object({
    line1: z.string().trim().min(1).max(200),
    line2: z.string().trim().max(200).optional().nullable(),
    city: z.string().trim().min(1).max(80),
    emirate: z.string().trim().min(1).max(80),
  }),
  items: z.array(z.object({
    product_id: z.string().uuid(),
    slug: z.string(),
    name_en: z.string(),
    name_ar: z.string(),
    sku: z.string(),
    price_aed: z.number().nonnegative(),
    qty: z.number().int().min(1).max(50),
    image_key: z.string(),
  })).min(1).max(50),
  payment_method: z.enum(["card", "bank", "cod"]),
  notes: z.string().trim().max(500).optional().nullable(),
});

export const placeOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => OrderInput.parse(input))
  .handler(async ({ data, context }) => {
    const subtotal = data.items.reduce((n, i) => n + i.qty * i.price_aed, 0);
    const vat = Math.round(subtotal * 0.05 * 100) / 100;
    const shipping = subtotal >= 1500 ? 0 : 150;
    const total = subtotal + vat + shipping;

    const { data: row, error } = await context.supabase
      .from("orders")
      .insert({
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
        notes: data.notes ?? null,
      })
      .select("id, order_number, total_aed")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const listMyOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("orders")
      .select("id, order_number, total_aed, status, created_at, items, payment_method")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });
