//#region node_modules/.nitro/vite/services/ssr/assets/whatsapp-19okXLFM.js
var WHATSAPP_NUMBER = "971501234567";
function whatsappLink(text) {
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
function productWhatsappText(product) {
	const url = typeof window !== "undefined" ? `${window.location.origin}/product/${product.slug}` : `/product/${product.slug}`;
	return [
		"Hello AL AYAAN,",
		"",
		`I'd like to order:`,
		`• ${product.name}`,
		`• SKU: ${product.sku}`,
		`• Price: AED ${product.price_aed.toLocaleString()}`,
		`• Link: ${url}`,
		"",
		"Please share availability and delivery."
	].join("\n");
}
//#endregion
export { whatsappLink as n, productWhatsappText as t };
