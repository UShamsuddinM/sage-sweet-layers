import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/wedding-concierge`;

const WeddingConcierge = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { role: "user", content: text };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages }),
      });

      if (resp.status === 429) {
        toast({ title: "Please wait", description: "Our concierge is quite popular! Try again in a moment.", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      if (resp.status === 402) {
        toast({ title: "Unavailable", description: "Service temporarily unavailable. Please try again later.", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      if (!resp.ok || !resp.body) throw new Error("Failed to connect");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast({ title: "Connection Error", description: "Could not reach the concierge. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="border border-sl-gold/30 rounded-none overflow-hidden">
      {/* Header */}
      <div className="bg-sl-sage px-6 py-4 flex items-center gap-3">
        <Sparkles size={18} className="text-sl-gold" />
        <h3 className="font-cormorant text-xl font-semibold text-foreground tracking-wide">
          Wedding Concierge
        </h3>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="h-[400px] overflow-y-auto bg-sl-cream cream-grain px-4 py-6 space-y-4"
      >
        {messages.length === 0 && (
          <div className="text-center py-12 space-y-3">
            <Sparkles size={32} className="mx-auto text-sl-gold/40" />
            <p className="font-cormorant text-xl text-foreground/60 tracking-wide">
              Your personal cake consultant
            </p>
            <p className="text-xs font-manrope text-foreground/40 max-w-xs mx-auto leading-relaxed">
              Tell me about your wedding and I'll help you design the perfect cake
              and sweets package.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 text-sm font-manrope leading-relaxed ${
                msg.role === "user"
                  ? "bg-sl-sage text-foreground"
                  : "bg-white border border-sl-gold/20 text-foreground"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="prose prose-sm prose-stone max-w-none [&_h1]:font-cormorant [&_h2]:font-cormorant [&_h3]:font-cormorant [&_h1]:tracking-wide [&_h2]:tracking-wide [&_h3]:tracking-wide [&_strong]:text-foreground [&_li]:text-foreground/80">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex justify-start">
            <div className="bg-white border border-sl-gold/20 px-4 py-3 flex gap-1">
              <span className="w-2 h-2 bg-sl-gold/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-sl-gold/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-sl-gold/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-sl-gold/20 p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell us about your dream wedding cake..."
          className="flex-1 bg-transparent border border-sl-gold/30 focus:border-sl-gold px-4 py-3 text-sm font-manrope text-foreground placeholder:text-foreground/40 rounded-none outline-none transition-colors"
          disabled={isLoading}
        />
        <button
          onClick={send}
          disabled={isLoading || !input.trim()}
          className="bg-sl-emerald text-sl-gold px-4 py-3 rounded-none font-manrope font-semibold text-xs uppercase tracking-[0.15em] hover:bg-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default WeddingConcierge;
