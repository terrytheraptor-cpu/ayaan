import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { cart, useCart } from "@/lib/cart-store";
import { formatAED, type Lang } from "@/lib/i18n";
import { placeOrder } from "@/lib/orders.functions";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { whatsappLink } from "@/lib/whatsapp";
import { z } from "zod";
import { CheckCircle2, MessageCircle } from "lucide-react";

const EMIRATES = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Umm Al Quwain", "Fujairah"];

const CheckoutSchema = z.object({
  contact_name: z.string().trim().min(2).max(120),
  contact_email: z.string().trim().email(),
  contact_phone: z.string().trim().min(4).max(30),
  line1: z.string().trim().min(2).max(200),
  line2: z.string().trim().max(200).optional(),
  city: z.string().trim().min(1).max(80),
  emirate: z.string().trim().min(1).max(80),
  payment_method: z.enum(["card", "bank", "cod"]),
  notes: z.string().trim().max(500).optional(),
});

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — AL AYAAN" }, { name: "robots", content: "noindex" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const items = useCart();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language as Lang) || "en";
  const nav = useNavigate();
  const submitOrder = useServerFn(placeOrder);

  const [session, setSession] = useState<Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"] | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ order_number: string; total_aed: number } | null>(null);
  const [form, setForm] = useState({
    contact_name: "", contact_email: "", contact_phone: "",
    line1: "", line2: "", city: "", emirate: "Dubai",
    payment_method: "cod" as "card"|"bank"|"cod",
    notes: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoadingSession(false); });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  const subtotal = items.reduce((n, i) => n + i.qty * i.price_aed, 0);
  const vat = Math.round(subtotal * 0.05 * 100) / 100;
  const shipping = subtotal === 0 ? 0 : subtotal >= 1500 ? 0 : 150;
  const total = subtotal + vat + shipping;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) { toast.error("Please sign in first."); nav({ to: "/auth", search: { next: "/checkout" } as never }); return; }
    if (items.length === 0) { toast.error(t("cart.empty")); return; }
    const parsed = CheckoutSchema.safeParse(form);
    if (!parsed.success) { toast.error(parsed.error.issues[0]?.message ?? "Please review your details."); return; }
    setSubmitting(true);
    try {
      const res = await submitOrder({ data: {
        contact_name: form.contact_name,
        contact_email: form.contact_email,
        contact_phone: form.contact_phone,
        address: { line1: form.line1, line2: form.line2 || null, city: form.city, emirate: form.emirate },
        items: items.map(i => ({ product_id: i.product_id, slug: i.slug, name_en: i.name_en, name_ar: i.name_ar, sku: i.sku, price_aed: i.price_aed, qty: i.qty, image_key: i.image_key })),
        payment_method: form.payment_method,
        notes: form.notes || null,
      } });
      setResult({ order_number: res.order_number, total_aed: Number(res.total_aed) });
      cart.clear();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Order failed");
    } finally { setSubmitting(false); }
  };

  if (result) {
    return (
      <div className="container-luxe py-24 md:py-32 max-w-2xl mx-auto text-center">
        <CheckCircle2 className="h-14 w-14 mx-auto text-accent" strokeWidth={1.2} />
        <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold tracking-tight">{t("checkout.success")}</h1>
        <p className="mt-4 text-muted-foreground">{t("checkout.orderNumber")}: <span className="font-medium text-foreground">{result.order_number}</span></p>
        <p className="mt-2 text-lg font-medium">{formatAED(result.total_aed, lang)}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={whatsappLink(`Hello AL AYAAN, order ${result.order_number} placed for AED ${result.total_aed}.`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm">
            <MessageCircle className="h-4 w-4" /> {t("checkout.continueOnWhatsapp")}
          </a>
          <Link to="/account" className="rounded-full border border-border px-6 py-3 text-sm">{t("account.orders")}</Link>
        </div>
      </div>
    );
  }

  if (loadingSession) return <div className="container-luxe py-32 text-center text-muted-foreground">Loading…</div>;

  if (items.length === 0) {
    return (
      <div className="container-luxe py-24 text-center">
        <p className="text-muted-foreground">{t("cart.empty")}</p>
        <Link to="/shop" className="mt-6 inline-block rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm">{t("cart.continueShopping")}</Link>
      </div>
    );
  }

  return (
    <div className="container-luxe pt-16 md:pt-24 pb-24">
      <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight mb-10">{t("checkout.title")}</h1>

      {!session && (
        <div className="mb-10 rounded-2xl border border-border bg-secondary/60 p-6 flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm">Please sign in to place your order. Your cart will be preserved.</p>
          <Link to="/auth" search={{ next: "/checkout" } as never} className="rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm">{t("signIn")}</Link>
        </div>
      )}

      <form onSubmit={submit} className="grid md:grid-cols-[1fr_360px] gap-10 md:gap-16">
        <div className="space-y-10">
          <Section title={t("checkout.contact")}>
            <Field label={t("fullName")} value={form.contact_name} onChange={v => setForm(f => ({ ...f, contact_name: v }))} required />
            <Field label={t("email")} type="email" value={form.contact_email} onChange={v => setForm(f => ({ ...f, contact_email: v }))} required />
            <Field label={t("phone")} value={form.contact_phone} onChange={v => setForm(f => ({ ...f, contact_phone: v }))} required />
          </Section>

          <Section title={t("checkout.shippingAddress")}>
            <Field label={t("checkout.line1")} value={form.line1} onChange={v => setForm(f => ({ ...f, line1: v }))} required />
            <Field label={t("checkout.line2")} value={form.line2} onChange={v => setForm(f => ({ ...f, line2: v }))} />
            <div className="grid grid-cols-2 gap-4">
              <Field label={t("checkout.city")} value={form.city} onChange={v => setForm(f => ({ ...f, city: v }))} required />
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">{t("checkout.emirate")}</label>
                <select value={form.emirate} onChange={e => setForm(f => ({ ...f, emirate: e.target.value }))} className="w-full h-12 rounded-2xl border border-border bg-background px-4">
                  {EMIRATES.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
            </div>
          </Section>

          <Section title={t("checkout.payment")}>
            {(["card","bank","cod"] as const).map(m => (
              <label key={m} className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer ${form.payment_method === m ? "border-foreground bg-secondary/40" : "border-border"}`}>
                <input type="radio" name="pm" checked={form.payment_method === m} onChange={() => setForm(f => ({ ...f, payment_method: m }))} className="accent-accent" />
                <span className="text-sm">{t(`checkout.paymentMethods.${m}`)}</span>
              </label>
            ))}
          </Section>

          <Section title={t("checkout.orderNotes")}>
            <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3} className="w-full rounded-2xl border border-border bg-background p-4 text-sm" />
          </Section>
        </div>

        <aside className="md:sticky md:top-24 md:self-start rounded-3xl bg-secondary/60 p-6 md:p-8">
          <h2 className="font-display text-2xl font-semibold mb-6">{t("checkout.review")}</h2>
          <ul className="space-y-3 text-sm max-h-64 overflow-y-auto">
            {items.map(i => (
              <li key={i.product_id} className="flex justify-between gap-3">
                <span className="truncate">{(lang === "ar" ? i.name_ar : i.name_en)} × {i.qty}</span>
                <span className="shrink-0">{formatAED(i.price_aed * i.qty, lang)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-3 text-sm pt-4 border-t border-border">
            <div className="flex justify-between"><dt className="text-muted-foreground">{t("cart.subtotal")}</dt><dd>{formatAED(subtotal, lang)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">{t("cart.vat")}</dt><dd>{formatAED(vat, lang)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">{t("cart.shipping")}</dt><dd>{shipping === 0 ? "—" : formatAED(shipping, lang)}</dd></div>
            <div className="pt-3 border-t border-border flex justify-between font-medium text-base"><dt>{t("cart.total")}</dt><dd>{formatAED(total, lang)}</dd></div>
          </dl>
          <button type="submit" disabled={submitting} className="mt-6 w-full rounded-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-wider uppercase hover:bg-primary/90 disabled:opacity-50">
            {submitting ? "…" : t("checkout.placeOrder")}
          </button>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold mb-6">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value?: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</label>
      <input type={type} value={value ?? ""} onChange={e => onChange(e.target.value)} required={required} className="w-full h-12 rounded-2xl border border-border bg-background px-4" />
    </div>
  );
}
