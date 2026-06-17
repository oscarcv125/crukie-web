export const HARDCODED_RESPONSES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["hola", "hey", "buenas", "buen día", "buenas tardes", "buenos días"],
    reply:
      "¡Hola! Soy Crukies 🍪 Tu asistente de galletas. Puedo ayudarte con el menú, precios, cómo pedir y más. ¿En qué te puedo ayudar?",
  },
  {
    keywords: ["menu", "menú", "sabores", "galletas", "tienen", "qué hay", "que hay"],
    reply:
      "Nuestro menú tiene 6 sabores:\n1. Chispas de Chocolate 🍫\n2. Nutella 🌰\n3. Oreo 🖤\n4. Biscoff 🧡\n5. Peanut Butter 🥜\n6. Kinder 🍬\n\n¿Cuál te llama más la atención?",
  },
  {
    keywords: ["precio", "cuánto", "cuanto", "costo", "vale", "cuesta"],
    reply:
      "Los precios los manejamos por DM. Escríbenos por Instagram o WhatsApp y te cotizamos al momento. 💬",
  },
  {
    keywords: ["pedir", "ordenar", "pedido", "hacer", "quiero"],
    reply:
      "Para hacer tu pedido:\n1. Escríbenos por Instagram o WhatsApp\n2. Dinos: nombre, sabor, cantidad, fecha de entrega y si tienes alergias\n3. Confirmamos con 50% de anticipo\n\nRecuerda: pedidos grandes (12+ galletas) requieren 72 horas de anticipación.",
  },
  {
    keywords: ["tiempo", "cuándo", "cuando", "demora", "entrega", "listo", "tardas"],
    reply:
      "Los pedidos grandes (12+ galletas) necesitan mínimo 72 horas de anticipación. Si es urgente (24–48 hrs), hay un cargo adicional del 30%.",
  },
  {
    keywords: ["descuento", "lealtad", "sellos", "puntos", "programa"],
    reply:
      "Tenemos:\n• Tarjeta de sellos: 10 compras = galleta gratis\n• 6–12 galletas: 10% off\n• 12+ galletas: 15% off\n• Referidos: 10% para ti y tu amigo 💛",
  },
  {
    keywords: ["cancelar", "cancela", "cancelación", "cambio", "cambiar"],
    reply:
      "Política de cambios:\n• Cambios de sabor/cantidad: hasta 48 hrs antes\n• Cancelación +48 hrs: reembolso del 100% del anticipo\n• Cancelación -24 hrs: sin reembolso\n\nCualquier duda, contáctanos. 🙏",
  },
  {
    keywords: ["alergia", "alergias", "ingredientes", "gluten", "nuez", "cacahuate"],
    reply:
      "Para preguntas sobre alergias específicas, escríbenos directamente por Instagram o WhatsApp. Así podemos darte información exacta y segura. 🌿",
  },
  {
    keywords: ["instagram", "ig", "whatsapp", "contacto", "donde", "dónde"],
    reply:
      "Puedes contactarnos por:\n• Instagram: @crukie.mty\n• WhatsApp: (próximamente)\n\nSíguenos para no perderte novedades 🍪",
  },
];

export function getHardcodedReply(input: string): string | null {
  const lower = input.toLowerCase();
  for (const entry of HARDCODED_RESPONSES) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.reply;
    }
  }
  return null;
}

export const SYSTEM_PROMPT = `Eres Crukies, el asistente virtual de una marca de galletas premium en Monterrey, México. Tu nombre es Crukies. Eres amigable, warm y conciso.

MENÚ (6 sabores):
1. Chispas de chocolate — la clásica, fan favorite
2. Nutella — relleno de Nutella al centro
3. Oreo — chispas de chocolate + galleta Oreo
4. Biscoff — chispas de chocolate + crema Biscoff
5. Peanut Butter — para los amantes del cacahuate
6. Kinder — chispas de chocolate + chocolate Kinder

PEDIDOS: 12+ galletas requieren mínimo 72 hrs anticipación. 50% anticipo al confirmar. Contacto: Instagram o WhatsApp. Urgentes (24–48 hrs): 30% cargo extra.

LEALTAD: 10 compras = galleta gratis. 6–12 galletas: 10% off. 12+: 15% off.

Responde siempre en español. Máximo 3 oraciones. Si el cliente quiere pedir, indica que escriba por Instagram o WhatsApp. No inventes precios.`;
