import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const searchSchema = z.object({ next: z.string().optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({ meta: [{ title: "Sign in — AL AYAAN" }, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

function AuthPage() {
  const { t } = useTranslation();
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin"|"signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);

  const afterAuth = () => navigate({ to: (next as never) || "/account" as never });

  const emailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
      }
      toast.success(mode === "signin" ? "Welcome back" : "Account created");
      afterAuth();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Auth failed");
    } finally { setBusy(false); }
  };

  const google = async () => {
    setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) { toast.error(error.message); setBusy(false); return; }
  };

  return (
    <div className="container-luxe py-16 md:py-24 max-w-md mx-auto">
      <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
        {mode === "signin" ? t("auth.signInTitle") : t("auth.signUpTitle")}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {mode === "signin" ? t("auth.signInSub") : t("auth.signUpSub")}
      </p>

      <button onClick={google} disabled={busy} className="mt-10 w-full h-12 rounded-full border border-border flex items-center justify-center gap-3 text-sm font-medium hover:bg-secondary transition">
        <GoogleIcon /> {t("continueWithGoogle")}
      </button>

      <div className="my-8 flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest">
        <div className="flex-1 h-px bg-border" />{t("or")}<div className="flex-1 h-px bg-border" />
      </div>

      <form onSubmit={emailSubmit} className="space-y-4">
        {mode === "signup" && (
          <input required placeholder={t("fullName")} value={fullName} onChange={e => setFullName(e.target.value)} className="w-full h-12 rounded-2xl border border-border bg-background px-4" />
        )}
        <input required type="email" placeholder={t("email")} value={email} onChange={e => setEmail(e.target.value)} className="w-full h-12 rounded-2xl border border-border bg-background px-4" />
        <input required type="password" minLength={6} placeholder={t("password")} value={password} onChange={e => setPassword(e.target.value)} className="w-full h-12 rounded-2xl border border-border bg-background px-4" />
        <button type="submit" disabled={busy} className="w-full rounded-full bg-primary text-primary-foreground py-3.5 text-sm font-medium tracking-wider uppercase hover:bg-primary/90 disabled:opacity-50">
          {mode === "signin" ? t("signIn") : t("signUp")}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        {mode === "signin" ? t("auth.noAccount") : t("auth.haveAccount")}{" "}
        <button className="text-foreground underline" onClick={() => setMode(m => m === "signin" ? "signup" : "signin")}>
          {mode === "signin" ? t("signUp") : t("signIn")}
        </button>
      </p>

      <div className="mt-10 text-center">
        <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Back to home</Link>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.9 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.9 3l5.7-5.7C33.9 6.1 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.7 1.1 7.9 3l5.7-5.7C33.9 6.1 29.2 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.1 0 9.8-2 13.3-5.2l-6.1-5.2C29.2 35.3 26.7 36 24 36c-5.4 0-9.9-3.1-11.3-8l-6.5 5C9.6 39.5 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.6 1.7-1.6 3.2-3 4.4l6.1 5.2c-.4.4 6.6-4.8 6.6-13.6 0-1.3-.1-2.4-.4-3.5z"/>
    </svg>
  );
}

