import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-32 border-t border-border bg-secondary/40">
      <div className="container-luxe py-16 md:py-24 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-semibold">{t("brand")}</span>
            <span className="text-xs tracking-[0.24em] text-muted-foreground uppercase">{t("brandSub")}</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
            {t("footer.tagline")}
          </p>
          <p className="mt-6 text-xs text-muted-foreground">{t("footer.vatIncl")}</p>
        </div>
        <div>
          <h4 className="eyebrow mb-4">{t("footer.shop")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-accent">{t("nav.shop")}</Link></li>
            <li><Link to="/category/living-room" className="hover:text-accent">{t("nav.living")}</Link></li>
            <li><Link to="/category/bedroom" className="hover:text-accent">{t("nav.bedroom")}</Link></li>
            <li><Link to="/category/dining" className="hover:text-accent">{t("nav.dining")}</Link></li>
            <li><Link to="/category/office" className="hover:text-accent">{t("nav.office")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-4">{t("footer.support")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/cart" className="hover:text-accent">{t("cartLabel")}</Link></li>
            <li><Link to="/wishlist" className="hover:text-accent">{t("wishlistLabel")}</Link></li>
            <li><Link to="/account" className="hover:text-accent">{t("accountLabel")}</Link></li>
            <li><a href="https://wa.me/971501234567" className="hover:text-accent">WhatsApp +971 50 123 4567</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-luxe py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} AL AYAAN Furniture. {t("footer.rights")}</p>
          <p>Dubai · Abu Dhabi · Sharjah · Ajman</p>
        </div>
      </div>
    </footer>
  );
}
