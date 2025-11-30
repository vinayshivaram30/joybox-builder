import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppWidget = () => {
  const whatsappNumber = "1234567890"; // Replace with actual WhatsApp business number
  const message = encodeURIComponent("Hi! I'm interested in learning more about ToyLuv.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat with us on WhatsApp"
    >
      <Button
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-[#25D366] hover:bg-[#20BA5A] text-white border-0"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-background text-foreground px-3 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppWidget;
