// Update these when you have the actual accounts/number
export const INSTAGRAM_URL = "https://instagram.com/crukie.mty";
export const INSTAGRAM_HANDLE = "@crukie.mty";

// Replace XXXXXXXXXX with the actual Mexican WhatsApp number (e.g. 5218112345678)
export const WHATSAPP_NUMBER = "521XXXXXXXXXX";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_ORDER_URL = (cookieName?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    cookieName
      ? `Hola! Me interesa ordenar la galleta ${cookieName} de Crukie 🍪`
      : "Hola! Me gustaría hacer un pedido en Crukie 🍪"
  )}`;
