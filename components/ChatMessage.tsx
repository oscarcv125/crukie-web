import { Fragment } from "react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isBot = role === "assistant";

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3`}>
      <div
        className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap"
        style={
          isBot
            ? { backgroundColor: "#003049", color: "#FAF0CA" }
            : { backgroundColor: "#6DAEDB", color: "#011638" }
        }
      >
        {renderInline(content)}
      </div>
    </div>
  );
}
