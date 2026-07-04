import { t as queryOptions } from "../_libs/react+tanstack__react-query.mjs";
import { a as listProducts, i as listCategories } from "./catalog.functions-Dgbqbzaf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-Bc4bj_uv.js
var allOpts = queryOptions({
	queryKey: ["products", "all"],
	queryFn: () => listProducts({ data: {} })
});
var catsOpts = queryOptions({
	queryKey: ["categories"],
	queryFn: () => listCategories()
});
//#endregion
export { catsOpts as n, allOpts as t };
