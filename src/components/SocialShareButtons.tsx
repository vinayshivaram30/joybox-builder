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
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col items-center gap-2 sm:gap-3">
        <h3 className="text-base sm:text-lg font-heading font-semibold text-foreground flex items-center gap-2">
          <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
          Share Your Results
        </h3>
        
        {/* Download Image Button */}
        <Button
          onClick={handleDownloadImage}
          disabled={isDownloading}
          variant="cta"
          size="lg"
          className="w-full sm:w-auto min-w-[200px] h-11 sm:h-12 text-sm sm:text-base"
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
        <div className="flex flex-wrap justify-center gap-2 w-full max-w-lg">
          <Button
            onClick={() => handleShare("facebook")}
            variant="outline"
            size="sm"
            className="gap-1.5 sm:gap-2 flex-1 min-w-[110px] sm:flex-initial text-xs sm:text-sm"
          >
            <Facebook className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Facebook</span>
            <span className="xs:hidden">FB</span>
          </Button>
          
          <Button
            onClick={() => handleShare("twitter")}
            variant="outline"
            size="sm"
            className="gap-1.5 sm:gap-2 flex-1 min-w-[110px] sm:flex-initial text-xs sm:text-sm"
          >
            <Twitter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Twitter</span>
            <span className="xs:hidden">X</span>
          </Button>
          
          <Button
            onClick={() => handleShare("linkedin")}
            variant="outline"
            size="sm"
            className="gap-1.5 sm:gap-2 flex-1 min-w-[110px] sm:flex-initial text-xs sm:text-sm"
          >
            <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">LinkedIn</span>
            <span className="xs:hidden">LI</span>
          </Button>
          
          <Button
            onClick={() => handleShare("whatsapp")}
            variant="outline"
            size="sm"
            className="gap-1.5 sm:gap-2 flex-1 min-w-[110px] sm:flex-initial text-xs sm:text-sm"
          >
            <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">WhatsApp</span>
            <span className="xs:hidden">WA</span>
          </Button>

          <Button
            onClick={handleCopyLink}
            variant="outline"
            size="sm"
            className="gap-1.5 sm:gap-2 w-full sm:w-auto text-xs sm:text-sm mt-1 sm:mt-0"
          >
            <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Copy Link
          </Button>
        </div>
      </div>
    </div>
  );
};
