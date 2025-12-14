import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  IconAlertTriangle,
  IconArrowUp,
  IconCloud,
  IconFileSpark,
  IconGauge,
  IconPhotoScan,
} from "@tabler/icons-react";
import { useRef, useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Model = {
  value: string;
  name: string;
  description: string;
  max?: boolean;
};

type Prompt = {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  prompt: string;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const PROMPTS: Prompt[] = [
  {
    icon: IconFileSpark,
    text: "Write documentation",
    prompt:
      "Write comprehensive documentation for this codebase, including setup instructions, API references, and usage examples.",
  },
  {
    icon: IconGauge,
    text: "Optimize performance",
    prompt:
      "Analyze the codebase for performance bottlenecks and suggest optimizations to improve loading times and runtime efficiency.",
  },
  {
    icon: IconAlertTriangle,
    text: "Find and fix 3 bugs",
    prompt:
      "Scan through the codebase to identify and fix 3 critical bugs, providing detailed explanations for each fix.",
  },
];

const MODELS: Model[] = [
  {
    value: "gpt-5",
    name: "GPT-5",
    description: "Most advanced model",
    max: true,
  },
  {
    value: "gpt-4o",
    name: "GPT-4o",
    description: "Fast and capable",
  },
  {
    value: "gpt-4",
    name: "GPT-4",
    description: "Reliable and accurate",
  },
  {
    value: "claude-3.5",
    name: "Claude 3.5 Sonnet",
    description: "Great for coding tasks",
  },
];

export const Route = createFileRoute("/chat")({
  component: ChatComponent,
});

function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmedInput,
    };

    // LOG: Sending user message
    console.log("Sending message:", {
      role: "user",
      content: trimmedInput,
      model: selectedModel.name,
      timestamp: new Date().toISOString(),
    });

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `This is a simulated response to: "${trimmedInput}". In a real app, this would be sent to your chosen model (${selectedModel.name}).`,
      };

      // LOG: Receiving AI response
      console.log("Received response:", {
        role: "assistant",
        content: aiResponse.content,
        model: selectedModel.name,
        timestamp: new Date().toISOString(),
      });

      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMaxBadge = () => (
    <span className="ml-1.5 flex h-3.5 items-center rounded border border-border bg-gradient-to-r from-blue-400 to-purple-400 px-1.5 text-[9px] font-bold uppercase text-white">
      MAX
    </span>
  );

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-4",
                message.role === "user" && "flex-row-reverse gap-3"
              )}
            >
              <Avatar className="shrink-0">
                <AvatarFallback>
                  {message.role === "user" ? "U" : "AI"}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "flex max-w-2xl flex-col gap-2 rounded-2xl px-4 py-3",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="whitespace-pre-wrap break-words">
                  {message.content}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
              <Avatar>
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-3">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:0.2s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background pb-6 pt-4">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-2xl border border-border bg-card shadow-lg">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              className="min-h-12 max-h-48 resize-none border-0 p-4 text-base focus-visible:ring-0"
              rows={1}
            />

            <div className="flex items-center justify-between border-t border-border p-3">
              <div className="flex items-center gap-3">
                <Select
                  value={selectedModel.value}
                  onValueChange={(value) => {
                    const model = MODELS.find((m) => m.value === value);
                    if (model) {
                      setSelectedModel(model);
                      console.log("🤖 Model changed to:", model.name);
                    }
                  }}
                >
                  <SelectTrigger className="h-8 w-fit border-none bg-transparent p-0 text-sm font-medium shadow-none">
                    <SelectValue>
                      <div className="flex items-center gap-1.5">
                        <IconCloud className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedModel.name}</span>
                        {selectedModel.max && renderMaxBadge()}
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {MODELS.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium">{model.name}</span>
                              {model.max && renderMaxBadge()}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {model.description}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  title="Attach images"
                >
                  <IconPhotoScan className="h-5 w-5" />
                </Button>
              </div>

              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className={cn(
                  "h-9 w-9 rounded-full p-0 transition-all",
                  inputValue.trim() && !isLoading
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <IconArrowUp className="h-5 w-5 text-primary-foreground" />
              </Button>
            </div>
          </div>

          {/* Prompt Suggestions */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {PROMPTS.map((button) => {
              const Icon = button.icon;
              return (
                <Button
                  key={button.text}
                  variant="outline"
                  className="h-auto rounded-full border-border px-4 py-2 text-sm transition-all hover:bg-muted/50"
                  onClick={() => handlePromptClick(button.prompt)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {button.text}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
