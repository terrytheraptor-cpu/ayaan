import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { t as supabase } from "./client-XLL1ZQls.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./auth-CYweTHfx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-g6g8Msww.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const { t } = useTranslation();
	const { next } = Route.useSearch();
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const afterAuth = () => navigate({ to: next || "/account" });
	const emailSubmit = async (e) => {
		e.preventDefault();
		setBusy(true);
		try {
			if (mode === "signin") {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
			} else {
				const { error } = await supabase.auth.signUp({
					email,
					password,
					options: {
						emailRedirectTo: window.location.origin,
						data: { full_name: fullName }
					}
				});
				if (error) throw error;
			}
			toast.success(mode === "signin" ? "Welcome back" : "Account created");
			afterAuth();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Auth failed");
		} finally {
			setBusy(false);
		}
	};
	const google = async () => {
		setBusy(true);
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: window.location.origin }
		});
		if (error) {
			toast.error(error.message);
			setBusy(false);
			return;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-luxe py-16 md:py-24 max-w-md mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl md:text-5xl font-semibold tracking-tight",
				children: mode === "signin" ? t("auth.signInTitle") : t("auth.signUpTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: mode === "signin" ? t("auth.signInSub") : t("auth.signUpSub")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: google,
				disabled: busy,
				className: "mt-10 w-full h-12 rounded-full border border-border flex items-center justify-center gap-3 text-sm font-medium hover:bg-secondary transition",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {}),
					" ",
					t("continueWithGoogle")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-8 flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 h-px bg-border" }),
					t("or"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 h-px bg-border" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: emailSubmit,
				className: "space-y-4",
				children: [
					mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						placeholder: t("fullName"),
						value: fullName,
						onChange: (e) => setFullName(e.target.value),
						className: "w-full h-12 rounded-2xl border border-border bg-background px-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						type: "email",
						placeholder: t("email"),
						value: email,
						onChange: (e) => setEmail(e.target.value),
						className: "w-full h-12 rounded-2xl border border-border bg-background px-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						type: "password",
						minLength: 6,
						placeholder: t("password"),
						value: password,
						onChange: (e) => setPassword(e.target.value),
						className: "w-full h-12 rounded-2xl border border-border bg-background px-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: busy,
						className: "w-full rounded-full bg-primary text-primary-foreground py-3.5 text-sm font-medium tracking-wider uppercase hover:bg-primary/90 disabled:opacity-50",
						children: mode === "signin" ? t("signIn") : t("signUp")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 text-center text-sm text-muted-foreground",
				children: [
					mode === "signin" ? t("auth.noAccount") : t("auth.haveAccount"),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "text-foreground underline",
						onClick: () => setMode((m) => m === "signin" ? "signup" : "signin"),
						children: mode === "signin" ? t("signUp") : t("signIn")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-xs text-muted-foreground hover:text-foreground",
					children: "← Back to home"
				})
			})
		]
	});
}
function GoogleIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 48 48",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FFC107",
				d: "M43.6 20.5H42V20H24v8h11.3C33.9 32.9 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.9 3l5.7-5.7C33.9 6.1 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FF3D00",
				d: "M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.7 1.1 7.9 3l5.7-5.7C33.9 6.1 29.2 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4CAF50",
				d: "M24 44c5.1 0 9.8-2 13.3-5.2l-6.1-5.2C29.2 35.3 26.7 36 24 36c-5.4 0-9.9-3.1-11.3-8l-6.5 5C9.6 39.5 16.2 44 24 44z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#1976D2",
				d: "M43.6 20.5H42V20H24v8h11.3c-.6 1.7-1.6 3.2-3 4.4l6.1 5.2c-.4.4 6.6-4.8 6.6-13.6 0-1.3-.1-2.4-.4-3.5z"
			})
		]
	});
}
//#endregion
export { AuthPage as component };
