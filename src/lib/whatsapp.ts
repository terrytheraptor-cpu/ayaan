export const WHATSAPP_NUMBER = "971501234567"; // AL AYAAN business number placeholder

export function whatsappLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function productWhatsappText(product: {
  name: string;
  sku: string;
  price_aed: number;
  slug: string;
}) {
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
    "Please share availability and delivery.",
  ].join("\n");
}
