// Update these when you have the actual accounts/number
export const INSTAGRAM_URL = "https://instagram.com/crukie.mty";
export const INSTAGRAM_HANDLE = "@crukie.mty";

export const WHATSAPP_NUMBER = "5218662141388";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_ORDER_URL = (cookieName?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    cookieName
      ? `Hola! Me interesa ordenar la galleta ${cookieName} de Crukies`
      : "Hola! Me gustaria hacer un pedido en Crukies"
  )}`;

export const WHATSAPP_TEXT_URL = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
