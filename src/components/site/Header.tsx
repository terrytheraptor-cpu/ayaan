import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Heart, ShoppingBag, Search, User, Menu, X, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { setLang, type Lang } from "@/lib/i18n";
import { useCart, useWishlist } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", key: "home" },
  { to: "/shop", key: "shop" },
  { to: "/category/living-room", key: "living" },
  { to: "/category/bedroom", key: "bedroom" },
  { to: "/category/dining", key: "dining" },
  { to: "/category/office", key: "office" },
  { to: "/category/lighting", key: "lighting" },
] as const;

export function Header() {
  const { t, i18n } = useTranslation();
  const cart = useCart();
  const wish = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = () => setLang((i18n.language === "ar" ? "en" : "ar") as Lang);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-300",
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border" : "bg-transparent",
      )}
    >
      <div className="container-luxe flex h-16 md:h-20 items-center gap-4">
        <button
          className="md:hidden -ms-2 p-2"
          aria-label="Menu"
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link to="/" className="flex items-baseline gap-2 me-6">
          <span className="font-display text-lg md:text-xl tracking-tight font-semibold">{t("brand")}</span>
          <span className="text-[10px] md:text-xs tracking-[0.24em] text-muted-foreground uppercase">
            {t("brandSub")}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm">
          {nav.map(n => (
            <Link
              key={n.to}
              to={n.to}
              className="text-foreground/80 hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {t(`nav.${n.key}`)}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-1 md:gap-2">
          <Link to="/search" className="p-2 hover:bg-muted rounded-full" aria-label={t("searchLabel")}>
            <Search className="h-4.5 w-4.5" />
          </Link>
          <button
            onClick={toggleLang}
            className="hidden sm:inline-flex items-center gap-1 p-2 hover:bg-muted rounded-full text-xs"
            aria-label="Language"
          >
            <Globe className="h-4 w-4" />
            <span className="hidden md:inline">{t("lang")}</span>
          </button>
          <Link to="/wishlist" className="relative p-2 hover:bg-muted rounded-full" aria-label={t("wishlistLabel")}>
            <Heart className="h-4.5 w-4.5" />
            {wish.length > 0 && (
              <span className="absolute -top-0.5 -end-0.5 bg-accent text-accent-foreground text-[10px] font-medium h-4 min-w-4 px-1 rounded-full grid place-items-center">
                {wish.length}
              </span>
            )}
          </Link>
          <Link to="/account" className="p-2 hover:bg-muted rounded-full hidden sm:inline-flex" aria-label={t("accountLabel")}>
            <User className="h-4.5 w-4.5" />
          </Link>
          <Link to="/cart" className="relative p-2 hover:bg-muted rounded-full" aria-label={t("cartLabel")}>
            <ShoppingBag className="h-4.5 w-4.5" />
            {cart.length > 0 && (
              <span className="absolute -top-0.5 -end-0.5 bg-ink text-primary-foreground text-[10px] font-medium h-4 min-w-4 px-1 rounded-full grid place-items-center">
                {cart.reduce((n, i) => n + i.qty, 0)}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container-luxe py-4 flex flex-col gap-1">
            {nav.map(n => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-base"
              >
                {t(`nav.${n.key}`)}
              </Link>
            ))}
            <button onClick={toggleLang} className="py-2 text-start text-base flex items-center gap-2">
              <Globe className="h-4 w-4" /> {t("lang")}
            </button>
            <Link to="/account" onClick={() => setOpen(false)} className="py-2 text-base">
              {t("accountLabel")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
