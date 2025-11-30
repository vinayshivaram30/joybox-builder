import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Facebook, Twitter, Linkedin, MessageCircle, Download, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";

interface SocialShareButtonsProps {
  personalityTitle: string;
  shareUrl?: string;
}

export const SocialShareButtons = ({ personalityTitle, shareUrl = "https://toyluv.app" }: SocialShareButtonsProps) => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const shareText = `My child's personality type is ${personalityTitle}! 🎉 Discover toys perfectly matched to their unique traits at ToyLuv.`;

  const handleDownloadImage = async () => {
    setIsDownloading(true);
    try {
      const cardElement = document.getElementById("social-share-card");
      if (!cardElement) {
        throw new Error("Share card not found");
      }

      const canvas = await html2canvas(cardElement, {
        backgroundColor: null,
        scale: 2,
        logging: false,
      });

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), "image/png");
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `toyluv-personality-${personalityTitle.toLowerCase().replace(/\s+/g, "-")}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);

      toast({
        title: "Image Downloaded",
        description: "Share your child's personality result on social media!",
      });
    } catch (error) {
      console.error("Error downloading image:", error);
      toast({
        title: "Download Failed",
        description: "Could not generate the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = (platform: string) => {
    let url = "";
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "whatsapp":
        url = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
    }

    if (url) {
      window.open(url, "_blank", "width=600,height=400");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    toast({
      title: "Link Copied",
      description: "Share link copied to clipboard!",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-3">
        <h3 className="text-lg font-heading font-semibold text-foreground flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Share Your Results
        </h3>
        
        {/* Download Image Button */}
        <Button
          onClick={handleDownloadImage}
          disabled={isDownloading}
          variant="cta"
          size="lg"
          className="w-full md:w-auto min-w-[200px]"
        >
          {isDownloading ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              Generating...
            </>
          ) : downloaded ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Downloaded!
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download Image
            </>
          )}
        </Button>

        {/* Social Share Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            onClick={() => handleShare("facebook")}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Facebook className="h-4 w-4" />
            Facebook
          </Button>
          
          <Button
            onClick={() => handleShare("twitter")}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Twitter className="h-4 w-4" />
            Twitter
          </Button>
          
          <Button
            onClick={() => handleShare("linkedin")}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Button>
          
          <Button
            onClick={() => handleShare("whatsapp")}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </Button>

          <Button
            onClick={handleCopyLink}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Share2 className="h-4 w-4" />
            Copy Link
          </Button>
        </div>
      </div>
    </div>
  );
};
