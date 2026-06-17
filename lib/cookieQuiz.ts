import { cookies, type Cookie } from "./menu";

export interface QuizOption {
  label: string;
  scores: Record<number, number>;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
}

export const QUIZ_INTRO =
  "¡Vamos a encontrar tu cookie ideal! 🍪 Te haré 5 preguntas rápidas. Responde con el botón que más te describa.";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "1/5 · ¿Qué te define mejor?",
    options: [
      { label: "Clásico y honesto", scores: { 1: 3, 6: 1 } },
      { label: "Aventurero y curioso", scores: { 4: 3, 2: 2 } },
      { label: "Nostálgico y dulce", scores: { 6: 3, 3: 1 } },
      { label: "Intenso y atrevido", scores: { 3: 3, 5: 2 } },
    ],
  },
  {
    id: "q2",
    prompt: "2/5 · Eliges un sabor base. ¿Cuál?",
    options: [
      { label: "Chocolate puro", scores: { 1: 3, 3: 2, 6: 1 } },
      { label: "Avellana / cremoso", scores: { 2: 3, 4: 1 } },
      { label: "Caramelo / especias", scores: { 4: 3 } },
      { label: "Cacahuate / nuez", scores: { 5: 3 } },
    ],
  },
  {
    id: "q3",
    prompt: "3/5 · ¿Qué textura te gana?",
    options: [
      { label: "Centro fundido que chorrea", scores: { 2: 3, 4: 2 } },
      { label: "Crujiente con trocitos", scores: { 3: 3, 4: 2, 6: 1 } },
      { label: "Densa y mantecosa", scores: { 5: 3, 1: 1 } },
      { label: "Suave y equilibrada", scores: { 1: 3, 6: 2 } },
    ],
  },
  {
    id: "q4",
    prompt: "4/5 · ¿Con qué bebida la acompañas?",
    options: [
      { label: "Leche fría 🥛", scores: { 1: 2, 3: 2, 6: 3 } },
      { label: "Café americano ☕", scores: { 4: 3, 5: 2, 1: 1 } },
      { label: "Latte / capuccino", scores: { 2: 3, 4: 2 } },
      { label: "Sola, sin nada", scores: { 5: 3, 1: 2 } },
    ],
  },
  {
    id: "q5",
    prompt: "5/5 · Tu mood ahora mismo es…",
    options: [
      { label: "Quiero algo que me abrace", scores: { 6: 3, 2: 2, 1: 1 } },
      { label: "Algo elegante y diferente", scores: { 4: 3, 2: 1 } },
      { label: "Necesito MÁS chocolate", scores: { 3: 3, 1: 2, 6: 1 } },
      { label: "Algo único, sin clichés", scores: { 5: 3, 4: 1 } },
    ],
  },
];

export function computeWinner(answers: number[]): Cookie {
  const totals: Record<number, number> = {};
  answers.forEach((optionIdx, qIdx) => {
    const option = QUIZ_QUESTIONS[qIdx]?.options[optionIdx];
    if (!option) return;
    for (const [cookieId, points] of Object.entries(option.scores)) {
      const id = Number(cookieId);
      totals[id] = (totals[id] || 0) + points;
    }
  });

  let bestId = 1;
  let bestScore = -1;
  for (const [id, score] of Object.entries(totals)) {
    if (score > bestScore) {
      bestScore = score;
      bestId = Number(id);
    }
  }

  return cookies.find((c) => c.id === bestId) || cookies[0];
}

export function buildResultMessage(cookie: Cookie): string {
  return `🎉 Tu cookie ideal es: **${cookie.name}**\n\n${cookie.description}\n\n${cookie.longDescription}\n\n¿Quieres pedirla? Escríbenos por Instagram (@crukie.mty) y te ayudamos 💛`;
}
