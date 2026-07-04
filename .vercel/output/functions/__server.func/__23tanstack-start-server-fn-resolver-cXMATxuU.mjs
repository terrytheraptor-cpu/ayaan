//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-cXMATxuU.js
var manifest = {
	"0ca8c0d451fe626e0bb9952fea9eca731a0c03e85886f5ab2eb56018486f2faf": {
		functionName: "searchProducts_createServerFn_handler",
		importer: () => import("./_ssr/catalog.functions-Dz3qXmN8.mjs")
	},
	"3265360dd1bb8505874dca36fc08c120c489507fb549e4925a945a8286e7a79a": {
		functionName: "listMyOrders_createServerFn_handler",
		importer: () => import("./_ssr/orders.functions-D9Rd55dQ.mjs")
	},
	"338e414efdb61533c60e3c1671e7aea82e763a0409c4afad4a1f474e3d8c65ce": {
		functionName: "getProductBySlug_createServerFn_handler",
		importer: () => import("./_ssr/catalog.functions-Dz3qXmN8.mjs")
	},
	"5488941a246672c11e7e731b5355bc6486887024c8f5ad9aee9839ae4866f700": {
		functionName: "getCategoryBySlug_createServerFn_handler",
		importer: () => import("./_ssr/catalog.functions-Dz3qXmN8.mjs")
	},
	"9093087a4fde30e7cbeefd735d6dccc2718ef5ec811563a10f9b01884489c6f6": {
		functionName: "listCategories_createServerFn_handler",
		importer: () => import("./_ssr/catalog.functions-Dz3qXmN8.mjs")
	},
	"a6485a0caa6c7276b8f38fd2e39c7cd965ae3addca5ff318987f97661206380a": {
		functionName: "placeOrder_createServerFn_handler",
		importer: () => import("./_ssr/orders.functions-D9Rd55dQ.mjs")
	},
	"ec305e715d428bd5a056174d65530dc3f73a4aae7224baa7e85f3de5db811249": {
		functionName: "listProducts_createServerFn_handler",
		importer: () => import("./_ssr/catalog.functions-Dz3qXmN8.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
