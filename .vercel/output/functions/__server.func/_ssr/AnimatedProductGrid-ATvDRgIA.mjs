import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./catalog.functions-Dgbqbzaf.mjs";
import { t as ProductCard } from "./ProductCard-RFJ2sOnr.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AnimatedProductGrid-ATvDRgIA.js
var import_jsx_runtime = require_jsx_runtime();
var container = {
	hidden: {},
	show: { transition: {
		staggerChildren: .06,
		delayChildren: .05
	} }
};
var item = {
	hidden: {
		opacity: 0,
		y: 24,
		filter: "blur(6px)"
	},
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: .6,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}
	}
};
function AnimatedProductGrid({ products, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		variants: container,
		initial: "hidden",
		animate: "show",
		className: cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10", className),
		children: products.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			variants: item,
			layout: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
				p,
				priority: i < 4
			})
		}, p.id))
	}, products.map((p) => p.id).join(","));
}
//#endregion
export { AnimatedProductGrid as t };
