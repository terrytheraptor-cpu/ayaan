import { t as queryOptions } from "../_libs/react+tanstack__react-query.mjs";
import { a as listProducts, i as listCategories } from "./catalog.functions-Dgbqbzaf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CGG7-YvF.js
var categoriesOpts = queryOptions({
	queryKey: ["categories"],
	queryFn: () => listCategories()
});
var featuredOpts = queryOptions({
	queryKey: ["products", "featured"],
	queryFn: () => listProducts({ data: {
		featured: true,
		limit: 8
	} })
});
var newOpts = queryOptions({
	queryKey: ["products", "new"],
	queryFn: () => listProducts({ data: {
		is_new: true,
		limit: 8
	} })
});
var bestOpts = queryOptions({
	queryKey: ["products", "bestsellers"],
	queryFn: () => listProducts({ data: {
		is_bestseller: true,
		limit: 8
	} })
});
//#endregion
export { newOpts as i, categoriesOpts as n, featuredOpts as r, bestOpts as t };
