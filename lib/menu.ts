export interface Cookie {
  id: number;
  slug: string;
  name: string;
  description: string;
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
    description: "La clásica. Fan favorite.",
    ingredients: ["masa base", "chispas de chocolate premium"],
    tags: ["clásica", "fan favorite"],
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=400&fit=crop&q=80",
    isAvailable: true,
  },
  {
    id: 2,
    slug: "nutella",
    name: "Nutella",
    description: "Con relleno de Nutella al centro.",
    ingredients: ["masa base", "Nutella"],
    tags: ["rellena", "hazelnut"],
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop&q=80",
    isAvailable: true,
  },
  {
    id: 3,
    slug: "oreo",
    name: "Oreo",
    description: "Chispas de chocolate + galleta Oreo.",
    ingredients: ["masa base", "chispas de chocolate", "Oreo"],
    tags: ["cookies & cream"],
    imageUrl: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&h=400&fit=crop&q=80",
    isAvailable: true,
  },
  {
    id: 4,
    slug: "biscoff",
    name: "Biscoff",
    description: "Chispas de chocolate + crema Biscoff.",
    ingredients: ["masa base", "chispas de chocolate", "crema Biscoff"],
    tags: ["speculoos", "caramelizado"],
    imageUrl: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&h=400&fit=crop&q=80",
    isAvailable: true,
  },
  {
    id: 5,
    slug: "peanut-butter",
    name: "Peanut Butter",
    description: "Para los amantes del cacahuate.",
    ingredients: ["masa base", "mantequilla de cacahuate"],
    tags: ["cacahuate", "proteína"],
    imageUrl: "https://images.unsplash.com/photo-1548783300-a96468f78b9b?w=600&h=400&fit=crop&q=80",
    isAvailable: true,
  },
  {
    id: 6,
    slug: "kinder",
    name: "Kinder",
    description: "Chispas de chocolate + chocolate Kinder.",
    ingredients: ["masa base", "chispas de chocolate", "chocolate Kinder"],
    tags: ["chocolate", "leche"],
    imageUrl: "https://images.unsplash.com/photo-1607920592519-bab2a80efd95?w=600&h=400&fit=crop&q=80",
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
