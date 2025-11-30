import { useState } from "react";
import { MessageCircle, Send, X, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const quickResponses = [
  { label: "How does ToyLuv work?", response: "ToyLuv is a personalized toy subscription service! Take our personality quiz to discover toys perfect for your child's interests, then subscribe to receive monthly JoyBoxes. Each box is curated based on your child's personality type." },
  { label: "Subscription pricing?", response: "We offer flexible monthly plans starting from ₹999. You can choose between different box sizes and customize your subscription anytime. Visit our Pricing page for detailed information!" },
  { label: "How to take the quiz?", response: "Click the 'Take Personality Quiz' button on our homepage or use the floating quiz button. The quiz takes just 5 minutes and helps us understand your child's play preferences." },
  { label: "Toy quality & safety?", response: "All toys meet international safety standards and undergo rigorous quality checks. We prioritize hygiene with thorough sanitization before each delivery. Your child's safety is our top priority!" },
];

interface ChatBotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChatBotDialog = ({ open, onOpenChange }: ChatBotDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! 👋 I'm your ToyLuv assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleQuickResponse = (question: string, answer: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: "user",
      timestamp: new Date(),
    };
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: answer,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage, botMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: "Thank you for your message! For personalized assistance, I'd recommend connecting with our team on WhatsApp. Would you like to chat with us there?",
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, botResponse]);
    setInputValue("");
  };

  const handleWhatsAppEscalation = () => {
    const whatsappNumber = "1234567890";
    const message = encodeURIComponent(
      `Hi! I need help with: ${messages[messages.length - 2]?.sender === "user" ? messages[messages.length - 2]?.text : "ToyLuv services"}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[600px] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle>ToyLuv Support</DialogTitle>
                <p className="text-xs text-muted-foreground">We're here to help!</p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {messages.length <= 1 && (
              <div className="space-y-2 mt-4">
                <p className="text-sm text-muted-foreground mb-3">Quick questions:</p>
                {quickResponses.map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => handleQuickResponse(item.label, item.response)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            )}

            {messages.length > 2 && messages[messages.length - 1].sender === "bot" && (
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={handleWhatsAppEscalation}
                  className="flex-1 bg-[#25D366] hover:bg-[#20BA5A]"
                  size="sm"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Chat on WhatsApp
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="px-6 py-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatBotDialog;
