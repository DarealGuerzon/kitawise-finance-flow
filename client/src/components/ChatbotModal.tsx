import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";

interface ChatMessage {
  id: number;
  type: "user" | "bot";
  message: string;
  timestamp: Date;
}

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    type: "bot",
    message: "Hello! I'm your AI financial literacy assistant. I can help you learn about budgeting, saving, managing irregular income, and pricing your services. What would you like to learn about today?",
    timestamp: new Date()
  }
];

const sampleResponses: { [key: string]: string } = {
  "budget": "Great question about budgeting! As a freelancer, try the 50/30/20 rule adapted for irregular income: 50% for needs (rent, utilities), 30% for business expenses and wants, and 20% for savings. Always budget based on your lowest earning month to be safe.",
  "save": "Smart thinking about saving! For freelancers, I recommend the 'Pay Yourself First' method. Set aside 20-30% of each payment immediately. Create separate accounts for taxes (25-30%), emergency fund (6 months expenses), and business investments.",
  "price": "Pricing your services is crucial! Use this formula: (Desired annual salary + Business expenses + Taxes) ÷ Billable hours per year. Don't forget to factor in vacation time, sick days, and non-billable work. Always research market rates in your area too!",
  "income": "Managing irregular income requires discipline. Create a baseline budget using your lowest earning month. When you earn more, allocate extra to savings and debt repayment. Consider diversifying with retainer clients for steady income.",
  "default": "That's an interesting question! Here are some key financial tips for freelancers: 1) Keep detailed records of income and expenses, 2) Set aside money for taxes immediately, 3) Build an emergency fund, 4) Diversify your client base, and 5) Consider professional development as an investment."
};

export function ChatbotModal({ isOpen, onClose }: ChatbotModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: "user",
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const lowerInput = inputMessage.toLowerCase();
      let response = sampleResponses.default;

      if (lowerInput.includes("budget")) response = sampleResponses.budget;
      else if (lowerInput.includes("save") || lowerInput.includes("saving")) response = sampleResponses.save;
      else if (lowerInput.includes("price") || lowerInput.includes("pricing")) response = sampleResponses.price;
      else if (lowerInput.includes("income") || lowerInput.includes("irregular")) response = sampleResponses.income;

      const botMessage: ChatMessage = {
        id: messages.length + 2,
        type: "bot",
        message: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span>AI Financial Assistant</span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === "bot" && (
                      <Bot className="h-4 w-4 mt-0.5 text-blue-600 dark:text-blue-400" />
                    )}
                    {message.type === "user" && (
                      <User className="h-4 w-4 mt-0.5 text-white" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.type === "user"
                            ? "text-blue-100"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex space-x-2 pt-4 border-t border-border">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about budgeting, saving, pricing, or income management..."
            className="flex-1"
          />
          <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Try asking: "How should I budget?", "How to save money?", "How to price my services?", or "Managing irregular income"
        </div>
      </DialogContent>
    </Dialog>
  );
}
