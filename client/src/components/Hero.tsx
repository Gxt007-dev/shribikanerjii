import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/colorful_assorted_sweets_hero.png";

interface HeroProps {
  onShopNowClick?: () => void;
}

export default function Hero({ onShopNowClick }: HeroProps) {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      
      <div className="relative h-full container mx-auto px-4 flex items-center justify-center">
        <div className="text-center text-white max-w-3xl">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6" data-testid="text-hero-title">
            Premium Handcrafted Sweets
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90" data-testid="text-hero-subtitle">
            Indulge in our artisanal collection of chocolates, gummies, and confections
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 bg-primary/90 backdrop-blur-sm border border-primary-border hover-elevate active-elevate-2"
            onClick={onShopNowClick}
            data-testid="button-shop-now"
          >
            Shop Now
          </Button>
          
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-white/80">
            <div className="flex items-center gap-2" data-testid="text-free-shipping">
              <span>🚚</span>
              <span>Free Shipping Over $50</span>
            </div>
            <div className="flex items-center gap-2" data-testid="text-natural-ingredients">
              <span>🌿</span>
              <span>100% Natural Ingredients</span>
            </div>
            <div className="flex items-center gap-2" data-testid="text-handcrafted">
              <span>✨</span>
              <span>Handcrafted Daily</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
