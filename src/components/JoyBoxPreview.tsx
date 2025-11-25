import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Toy {
  name: string;
  image: string;
  age: string;
}

interface JoyBoxPreviewProps {
  toys: Toy[];
  personalityType: string;
}

export const JoyBoxPreview = ({ toys, personalityType }: JoyBoxPreviewProps) => {
  return (
    <div className="max-w-3xl mx-auto animate-slide-in">
      <div className="glass-card p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            Your Child's Personalized JoyBox
          </h2>
          <p className="text-lg text-muted-foreground">
            Curated for <span className="font-semibold text-primary">{personalityType}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {toys.map((toy, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 border-2 border-primary/10 hover-lift"
            >
              <div className="aspect-square bg-muted rounded-xl mb-3 overflow-hidden">
                <img
                  src={toy.image}
                  alt={toy.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-foreground mb-1">{toy.name}</h4>
              <p className="text-sm text-muted-foreground">{toy.age}</p>
            </div>
          ))}
        </div>

        <div className="bg-accent/10 rounded-2xl p-6 border-2 border-accent/20 mb-8">
          <div className="flex items-center justify-between">
            <span className="font-heading font-semibold text-lg">Total Box Value:</span>
            <span className="text-2xl font-bold text-accent">₹4,500+</span>
          </div>
        </div>

        <div className="text-center space-y-4">
          <Button
            variant="cta"
            size="lg"
            className="w-full md:w-auto min-w-[300px]"
            onClick={() => toast.success("Redirecting to checkout...", {
              description: "Setting up your subscription"
            })}
          >
            Start My Subscription
          </Button>
          <p className="text-sm text-muted-foreground">
            No commitment • Cancel anytime • Free delivery in Bengaluru
          </p>
        </div>
      </div>
    </div>
  );
};
