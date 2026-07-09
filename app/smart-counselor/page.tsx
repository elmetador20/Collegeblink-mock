"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles,
  Plus,
  Bot,
  User,
  GraduationCap,
  MessageSquare,
  SendHorizonal,
  Square,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Session = {
  id: string;
  title: string;
  date: Date;
  messages: Message[];
};

const LS_KEY = "collegeblink_counselor_sessions_v2";

const loadSessionsFromStorage = (): Session[] => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    return JSON.parse(raw).map((s: any) => ({ ...s, date: new Date(s.date) }));
  } catch {
    return [];
  }
};

const saveSessionsToStorage = (sessions: Session[]) => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(sessions));
  } catch {}
};

const SUGGESTED_QUESTIONS = [
  "Which stream should I choose after 10th?",
  "How do I prepare for JEE Mains?",
  "What are the top colleges for B.Tech in India?",
  "How does CUET admission work?",
  "What career options are there after B.Com?",
  "How can I apply for scholarships?",
];

export default function SmartCounselorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setSessions(loadSessionsFromStorage());
  }, []);

  const scrollToBottom = (smooth = true) => {
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) {
        el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "instant" });
      }
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (activeSessionId && messages.length > 0) {
      setSessions((prev) => {
        const updated = prev.map((s) =>
          s.id === activeSessionId ? { ...s, messages } : s
        );
        saveSessionsToStorage(updated);
        return updated;
      });
    }
  }, [messages, activeSessionId]);

  const startNewChat = () => {
    abortControllerRef.current?.abort();
    setMessages([]);
    setInput("");
    setIsLoading(false);
    setActiveSessionId(null);
    setError(null);
    setEditingId(null);
    setEditText("");
    textareaRef.current?.focus();
  };

  const loadSession = (session: Session) => {
    abortControllerRef.current?.abort();
    setMessages(session.messages);
    setActiveSessionId(session.id);
    setInput("");
    setIsLoading(false);
    setError(null);
    setEditingId(null);
    setEditText("");
    scrollToBottom(false);
  };

  const stopGeneration = () => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    setInput("");

    const userMessage: Message = {
      id: `${Date.now()}-u`,
      role: "user",
      content: trimmed,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    let sessionId = activeSessionId;
    if (!sessionId) {
      sessionId = Date.now().toString();
      const newSession: Session = {
        id: sessionId,
        title: trimmed.length > 45 ? trimmed.slice(0, 45) + "…" : trimmed,
        date: new Date(),
        messages: [],
      };
      setSessions((prev) => {
        const updated = [newSession, ...prev];
        saveSessionsToStorage(updated);
        return updated;
      });
      setActiveSessionId(sessionId);
    }

    setIsLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch("/api/counselor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: controller.signal,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      const assistantMessage: Message = {
        id: `${Date.now()}-a`,
        role: "assistant",
        content: data.content,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(err.message ?? "Failed to get a response. Please try again.");
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  };

  // Truncate conversation at the edited message and re-send with new text
  const handleEditSubmit = (messageId: string) => {
    const trimmed = editText.trim();
    if (!trimmed) return;

    const index = messages.findIndex((m) => m.id === messageId);
    if (index === -1) return;

    const truncated = messages.slice(0, index);

    setEditingId(null);
    setEditText("");
    setMessages(truncated);
    sendMessage(trimmed);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const hasStarted = messages.length > 0;

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* ── Sidebar ── */}
      <div className="w-72 min-w-[18rem] border-r border-border/70 bg-card flex flex-col overflow-hidden">
        <div className="p-5 border-b border-border/70">
          <div className="mb-4 flex justify-center">
            <img
              src="/logo.png"
              alt="CollegeBlink"
              className="h-10 w-auto object-contain"
            />
          </div>
          <Button
            onClick={startNewChat}
            className="w-full h-11 bg-gradient-to-r from-indigo-500 to-cyan-500 text-base"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-3 space-y-2">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-1">
              Recent Chats
            </h3>

            {sessions.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-6">
                Your past chats will appear here.
              </p>
            ) : (
              sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => loadSession(session)}
                  style={{ maxWidth: "100%" }}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-200 block ${
                    activeSessionId === session.id
                      ? "bg-indigo-500/20 border border-indigo-500/40"
                      : "bg-muted/50 hover:bg-muted/70"
                  }`}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <MessageSquare className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                    <span
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        display: "block",
                        minWidth: 0,
                        flex: 1,
                      }}
                      className="text-foreground text-sm font-medium"
                    >
                      {session.title}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 ml-6">
                    {session.date.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="p-5 border-t border-border/70">
          <div className="flex items-center gap-3 text-muted-foreground text-sm">
            <GraduationCap className="h-4 w-4 text-indigo-400" />
            <span className="font-medium">CollegeBlink Smart</span>
          </div>
        </div>
      </div>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <div className="border-b border-border/70 p-5 flex items-center justify-between bg-gradient-to-r from-indigo-500/5 to-cyan-500/5">
          <Link
            href="/"
            className="flex items-center gap-4 hover:opacity-90 transition-opacity"
          >
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-foreground font-semibold text-lg">
                CollegeBlink Smart
              </h1>
              <p className="text-muted-foreground text-sm">
                Your personal college admissions guide
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>

        {/* Scrollable message area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4"
        >
          <div className="max-w-3xl mx-auto space-y-6 pb-4">
            {!hasStarted ? (
              /* Welcome / empty state */
              <div className="text-center py-12">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-cyan-400/30 to-indigo-500/30 blur-3xl rounded-full" />
                  <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center mx-auto">
                    <Sparkles className="h-10 w-10 text-indigo-400" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  How can I help you today?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Ask me anything about college admissions, entrance exams, or
                  career paths. Type your question below or pick one to start.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {SUGGESTED_QUESTIONS.map((q, index) => (
                    <motion.button
                      key={q}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      onClick={() => sendMessage(q)}
                      className="text-left p-4 rounded-xl bg-muted/50 hover:bg-muted/70 hover:scale-[1.02] border border-border/70 transition-all duration-200"
                    >
                      <span className="text-foreground/80 text-sm">{q}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              /* Conversation */
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex gap-4 ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                        message.role === "user"
                          ? "bg-indigo-500"
                          : "bg-gradient-to-br from-indigo-500 to-cyan-500"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>

                    {/* Message bubble or edit box */}
                    <div className="max-w-[80%] flex flex-col gap-1">
                      {message.role === "user" && editingId === message.id ? (
                        /* ── Inline edit box ── */
                        <div className="rounded-2xl border border-border/70 bg-muted/50 p-3 flex flex-col gap-2 min-w-[260px]">
                          <p className="text-xs text-muted-foreground">
                            Editing — replies below will be removed
                          </p>
                          <Textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleEditSubmit(message.id);
                              }
                              if (e.key === "Escape") {
                                setEditingId(null);
                                setEditText("");
                              }
                            }}
                            rows={3}
                            autoFocus
                            className="resize-none border border-border/50 bg-background text-sm focus-visible:ring-1 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-0 rounded-xl"
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 px-3 text-xs"
                              onClick={() => {
                                setEditingId(null);
                                setEditText("");
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              disabled={!editText.trim()}
                              className="h-7 px-3 text-xs bg-gradient-to-br from-indigo-500 to-cyan-500 hover:opacity-90 disabled:opacity-40"
                              onClick={() => handleEditSubmit(message.id)}
                            >
                              Send
                            </Button>
                          </div>
                        </div>
                      ) : (
                        /* ── Normal bubble with hover edit button ── */
                        <div className="group relative">
                          <Card
                            className={`${
                              message.role === "user"
                                ? "bg-gradient-to-r from-indigo-500 to-cyan-500 border-transparent"
                                : "glass-card border-border/70"
                            }`}
                          >
                            <CardContent className="p-4">
                              {message.role === "assistant" ? (
                                <div className="prose prose-invert prose-sm max-w-none">
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {message.content}
                                  </ReactMarkdown>
                                </div>
                              ) : (
                                <p className="text-white">{message.content}</p>
                              )}
                            </CardContent>
                          </Card>

                          {/* Edit button — user messages only, visible on hover */}
                          {message.role === "user" && !isLoading && (
                            <button
                              onClick={() => {
                                setEditingId(message.id);
                                setEditText(message.content);
                              }}
                              title="Edit message"
                              className="
                                absolute -top-2 -left-2
                                h-6 w-6 rounded-full
                                bg-background border border-border/70
                                flex items-center justify-center
                                opacity-0 group-hover:opacity-100
                                transition-opacity duration-150
                                hover:border-indigo-500/60
                              "
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-3 w-3 text-muted-foreground"
                              >
                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                              </svg>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-4"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                      <GraduationCap className="h-4 w-4 text-white" />
                    </div>
                    <Card className="glass-card border-border/70">
                      <CardContent className="p-4">
                        <div className="flex gap-1 items-center">
                          <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce" />
                          <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:150ms]" />
                          <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:300ms]" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Error state */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-4"
                  >
                    <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4 text-red-400" />
                    </div>
                    <Card className="border-red-500/30 bg-red-500/10">
                      <CardContent className="p-4">
                        <p className="text-red-400 text-sm">{error}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Input area */}
        <div className="border-t border-border/70 p-4 bg-card/50">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-3 rounded-2xl border border-border/70 bg-background p-3 focus-within:border-indigo-500/60 transition-colors">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about colleges, exams, career paths…"
                rows={1}
                disabled={isLoading}
                className="flex-1 resize-none border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 max-h-40 leading-relaxed"
              />

              {isLoading ? (
                <Button
                  onClick={stopGeneration}
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 shrink-0 rounded-xl border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                  title="Stop generating"
                >
                  <Square className="h-3.5 w-3.5 fill-current" />
                </Button>
              ) : (
                <Button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 hover:opacity-90 disabled:opacity-40"
                >
                  <SendHorizonal className="h-4 w-4" />
                </Button>
              )}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Press{" "}
              <kbd className="px-1 py-0.5 rounded bg-muted text-[10px]">
                Enter
              </kbd>{" "}
              to send,{" "}
              <kbd className="px-1 py-0.5 rounded bg-muted text-[10px]">
                Shift+Enter
              </kbd>{" "}
              for a new line &nbsp;·&nbsp; Verify information with official
              college sources
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}