"use client";

import { useState, KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="flex items-center gap-2 p-3 border-t"
      style={{ borderColor: "#E8DCA0" }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe tu mensaje..."
        disabled={disabled}
        className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none border-2 border-transparent transition-colors disabled:opacity-50"
        style={{
          backgroundColor: "#F5E8A0",
          color: "#494331",
          fontFamily: "Garet, sans-serif",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#6DAEDB")}
        onBlur={(e) => (e.target.style.borderColor = "transparent")}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: "#6DAEDB", color: "#011638" }}
        aria-label="Enviar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </button>
    </div>
  );
}
