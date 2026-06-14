interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
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
        {content}
      </div>
    </div>
  );
}
