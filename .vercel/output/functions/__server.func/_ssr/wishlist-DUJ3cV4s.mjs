import { t as queryOptions } from "../_libs/react+tanstack__react-query.mjs";
import { a as listProducts } from "./catalog.functions-Dgbqbzaf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wishlist-DUJ3cV4s.js
var opts = queryOptions({
	queryKey: ["products", "all"],
	queryFn: () => listProducts({ data: {} })
});
//#endregion
export { opts as t };
