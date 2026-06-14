export interface Cookie {
  id: number;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  ingredients: string[];
  tags: string[];
  imageUrl: string;
  isAvailable: boolean;
}

export const cookies: Cookie[] = [
  {
    id: 1,
    slug: "chispas-chocolate",
    name: "Chispas de Chocolate",
    description: "La clásica que convierte a cualquiera en fan.",
    longDescription:
      "Masa dorada con borde ligeramente crujiente y centro suave que casi se derrite. Cada mordida viene cargada de chispas de chocolate semi-amargo premium que se funden con el calor de la galleta recién horneada. Simple, honesta e irresistible — la razón por la que Crukie existe.",
    ingredients: ["masa base artesanal", "chispas de chocolate semi-amargo premium"],
    tags: ["clásica", "fan favorite"],
    imageUrl: "/images/chispas-chocolate-v2.png",
    isAvailable: true,
  },
  {
    id: 2,
    slug: "nutella",
    name: "Nutella",
    description: "Centro de Nutella que fluye en cada mordida.",
    longDescription:
      "Una galleta chunky que esconde un secreto en su interior: un corazón generoso de Nutella que, al partirla, fluye lentamente como lava de avellana y chocolate. La costra dorada contrasta con ese relleno cremoso que lo cambia todo. Para quienes saben que el interior importa tanto como el exterior.",
    ingredients: ["masa base artesanal", "Nutella de avellana"],
    tags: ["rellena", "hazelnut"],
    imageUrl: "/images/nutella-v2.png",
    isAvailable: true,
  },
  {
    id: 3,
    slug: "oreo",
    name: "Oreo",
    description: "Dos iconos juntos, un resultado devastador.",
    longDescription:
      "Galleta chunky con masa de chocolate intenso, trozos de Oreo incrustados por todas partes y chispas de chocolate que completan el crimen. La textura alternante de la masa suave y los pedazos crujientes de Oreo crea una experiencia que no puedes conseguir con ninguna de las dos por separado. Doble galleta, doble placer.",
    ingredients: ["masa base artesanal", "chispas de chocolate", "galleta Oreo troceada"],
    tags: ["cookies & cream"],
    imageUrl: "/images/oreo-v2.png",
    isAvailable: true,
  },
  {
    id: 4,
    slug: "biscoff",
    name: "Biscoff",
    description: "El sabor que enamora a primera probada.",
    longDescription:
      "Masa enriquecida con canela y especias al estilo speculoos, coronada con crema Biscoff caramelizada y trozos crujientes de galleta Lotus. El resultado es cálido, aromático y con ese toque caramelizado que hace que la gente pida una segunda sin terminar la primera. La cookie más elegante del menú.",
    ingredients: ["masa base artesanal", "chispas de chocolate", "crema Biscoff Lotus", "galleta Lotus troceada"],
    tags: ["speculoos", "caramelizado"],
    imageUrl: "/images/biscoff-v2.png",
    isAvailable: true,
  },
  {
    id: 5,
    slug: "peanut-butter",
    name: "Peanut Butter",
    description: "Densa, cremosa y completamente adictiva.",
    longDescription:
      "Masa cargada de mantequilla de cacahuate natural que le da un sabor profundo, salado y dulce al mismo tiempo. La textura es más densa que el resto — casi como morder un bloque de puro cacahuate en forma de cookie. No lleva chispas de chocolate porque no las necesita: aquí el cacahuate es el protagonista absoluto.",
    ingredients: ["masa base artesanal", "mantequilla de cacahuate natural"],
    tags: ["cacahuate", "sin chocolate"],
    imageUrl: "/images/peanut-butter-v2.png",
    isAvailable: true,
  },
  {
    id: 6,
    slug: "kinder",
    name: "Kinder",
    description: "Nostalgia de infancia en formato XXL.",
    longDescription:
      "Todo lo que amabas de Kinder de niño, ahora dentro de una galleta chunky que no cabe en una mano. Trozos de chocolate Kinder y chispas de chocolate se funden con la masa dorada para crear capas de sabor que van del lácteo al intenso. Una galleta que evoca recuerdos y crea nuevos al mismo tiempo.",
    ingredients: ["masa base artesanal", "chispas de chocolate", "chocolate Kinder troceado"],
    tags: ["chocolate", "leche"],
    imageUrl: "/images/kinder-v2.png",
    isAvailable: true,
  },
];

export const COOKIE_VISUALS: Record<number, { emoji: string; bg: string }> = {
  1: { emoji: "🍫", bg: "linear-gradient(135deg,#6B3A2A,#3D1F12)" },
  2: { emoji: "🌰", bg: "linear-gradient(135deg,#7B4D1E,#3D1A06)" },
  3: { emoji: "🖤", bg: "linear-gradient(135deg,#2A2A2A,#111111)" },
  4: { emoji: "🧡", bg: "linear-gradient(135deg,#C07820,#6B3A00)" },
  5: { emoji: "🥜", bg: "linear-gradient(135deg,#A67C52,#6B4226)" },
  6: { emoji: "🍬", bg: "linear-gradient(135deg,#7B3F1A,#3D1A06)" },
};
