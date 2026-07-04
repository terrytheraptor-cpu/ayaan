import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-BJhazTm7.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog.functions-Dgbqbzaf.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var listCategories = createServerFn({ method: "GET" }).handler(createSsrRpc("9093087a4fde30e7cbeefd735d6dccc2718ef5ec811563a10f9b01884489c6f6"));
var listProducts = createServerFn({ method: "GET" }).inputValidator((input) => input ?? {}).handler(createSsrRpc("ec305e715d428bd5a056174d65530dc3f73a4aae7224baa7e85f3de5db811249"));
var getProductBySlug = createServerFn({ method: "GET" }).inputValidator((input) => input).handler(createSsrRpc("338e414efdb61533c60e3c1671e7aea82e763a0409c4afad4a1f474e3d8c65ce"));
var getCategoryBySlug = createServerFn({ method: "GET" }).inputValidator((input) => input).handler(createSsrRpc("5488941a246672c11e7e731b5355bc6486887024c8f5ad9aee9839ae4866f700"));
var searchProducts = createServerFn({ method: "GET" }).inputValidator((input) => input).handler(createSsrRpc("0ca8c0d451fe626e0bb9952fea9eca731a0c03e85886f5ab2eb56018486f2faf"));
//#endregion
export { listProducts as a, listCategories as i, getCategoryBySlug as n, searchProducts as o, getProductBySlug as r, cn as t };
