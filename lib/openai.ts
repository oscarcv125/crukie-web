import OpenAI from "openai";

let client: OpenAI | null = null;
let configuredModel = "gpt-4o-mini";

export function getAIClient(): { client: OpenAI; model: string } | null {
  if (client) return { client, model: configuredModel };

  const groqKey = process.env.GROQ_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (groqKey) {
    client = new OpenAI({
      apiKey: groqKey,
      baseURL: "https://api.groq.com/openai/v1",
    });
    configuredModel = process.env.AI_MODEL || "llama-3.3-70b-versatile";
    return { client, model: configuredModel };
  }

  if (openaiKey) {
    client = new OpenAI({ apiKey: openaiKey });
    configuredModel = process.env.AI_MODEL || "gpt-4o-mini";
    return { client, model: configuredModel };
  }

  return null;
}

export function getOpenAIClient(): OpenAI | null {
  return getAIClient()?.client ?? null;
}
