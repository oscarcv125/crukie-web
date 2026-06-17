import { NextRequest, NextResponse } from "next/server";
import { getAIClient } from "@/lib/openai";
import { SYSTEM_PROMPT } from "@/lib/chatResponses";

export async function POST(req: NextRequest) {
  const ai = getAIClient();

  if (!ai) {
    return NextResponse.json(
      {
        reply:
          "Escríbenos por Instagram o WhatsApp y con gusto te ayudamos 🍪",
      },
      { status: 200 }
    );
  }

  try {
    const { messages } = await req.json();

    const completion = await ai.client.chat.completions.create({
      model: ai.model,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 200,
      temperature: 0.7,
    });

    return NextResponse.json({
      reply: completion.choices[0].message.content,
    });
  } catch {
    return NextResponse.json(
      {
        reply:
          "Hubo un error. Por favor escríbenos por Instagram o WhatsApp 🍪",
      },
      { status: 200 }
    );
  }
}
