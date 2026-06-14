"use client";

import { useState, useRef, useEffect } from "react";
import { animate } from "animejs";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { getHardcodedReply } from "@/lib/chatResponses";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "¡Hola! 🍪 Soy el asistente de Crukie. Puedo ayudarte con el menú, cómo pedir, tiempos y más. ¿En qué te puedo ayudar?",
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [isLoading, setIsLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevOpen = useRef(false);

  // Animate panel open/close
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (isOpen && !prevOpen.current) {
      panel.style.opacity = "0";
      panel.style.transform = "translateY(20px) scale(0.95)";
      animate(panel, {
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.95, 1],
        duration: 350,
        ease: "outBack(1.2)",
      });
    }
    prevOpen.current = isOpen;
  }, [isOpen]);

  // Animate FAB button on toggle
  const handleToggle = () => {
    if (btnRef.current) {
      animate(btnRef.current, {
        rotate: isOpen ? [180, 0] : [0, 360],
        scale: [1, 0.85, 1.1, 1],
        duration: 450,
        ease: "outBack(1.5)",
      });
    }
    setIsOpen((prev) => !prev);
  };

  // Scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);

    const hardcoded = getHardcodedReply(text);
    if (hardcoded) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), role: "assistant", content: hardcoded },
        ]);
      }, 300);
      return;
    }

    setIsLoading(true);
    try {
      const apiMessages = messages
        .filter((m) => m.id !== "welcome")
        .concat(userMsg)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Por favor escríbenos por Instagram o WhatsApp y con gusto te ayudamos 🍪",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50"
      style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
    >
      {/* Chat panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="absolute bottom-[72px] right-0 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
          style={{
            width: "340px",
            maxWidth: "calc(100vw - 2rem)",
            maxHeight: "480px",
            backgroundColor: "#FAF0CA",
            border: "1px solid rgba(73,67,49,0.12)",
          }}
        >
          {/* Header */}
          <div
            className="px-5 py-4 flex items-center justify-between shrink-0"
            style={{ backgroundColor: "#003049" }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍪</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#FAF0CA" }}>
                  Crukie
                </p>
                <p className="text-xs" style={{ color: "#6DAEDB" }}>
                  Asistente virtual
                </p>
              </div>
            </div>
            <button
              onClick={handleToggle}
              className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer text-lg"
              style={{ color: "#FAF0CA" }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4" style={{ minHeight: "260px" }}>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div
                  className="px-4 py-2.5 rounded-2xl text-sm"
                  style={{ backgroundColor: "#003049", color: "#6DAEDB" }}
                >
                  <span className="animate-pulse">Escribiendo…</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      )}

      {/* FAB button */}
      <button
        ref={btnRef}
        onClick={handleToggle}
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl cursor-pointer"
        style={{
          backgroundColor: "#6DAEDB",
          color: "#011638",
          boxShadow: "0 4px 24px rgba(109,174,219,0.5)",
        }}
        aria-label={isOpen ? "Cerrar chat" : "Abrir asistente de Crukie"}
      >
        {isOpen ? "✕" : "🍪"}
      </button>
    </div>
  );
}
