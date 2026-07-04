import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { listMyOrders } from "@/lib/orders.functions";
import { formatAED, type Lang } from "@/lib/i18n";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({ meta: [{ title: "My account — AL AYAAN" }, { name: "robots", content: "noindex" }] }),
  component: AccountPage,
});

function AccountPage() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language as Lang) || "en";
  const fetchOrders = useServerFn(listMyOrders);
  const { data: orders } = useQuery({ queryKey: ["my-orders"], queryFn: () => fetchOrders() });

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success(t("signOut"));
    window.location.href = "/";
  };

  return (
    <div className="container-luxe py-16 md:py-24">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
        <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight">{t("account.title")}</h1>
        <button onClick={signOut} className="rounded-full border border-border px-5 py-2.5 text-sm">
          {t("signOut")}
        </button>
      </div>

      <section>
        <h2 className="eyebrow mb-6">{t("account.orders")}</h2>
        {!orders || orders.length === 0 ? (
          <p className="text-muted-foreground py-8">{t("account.noOrders")}</p>
        ) : (
          <ul className="divide-y divide-border">
            {orders.map(o => (
              <li key={o.id} className="py-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-medium">{o.order_number}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(o.created_at).toLocaleDateString(lang === "ar" ? "ar-AE" : "en-AE")}</p>
                </div>
                <p className="text-sm text-muted-foreground capitalize">{o.status}</p>
                <p className="font-medium">{formatAED(Number(o.total_aed), lang)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
