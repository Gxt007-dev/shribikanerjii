import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImage from "@assets/generated_images/indian_sweets_assorted_display.png";

interface HeroProps {
  onShopNowClick?: () => void;
}

export default function Hero({ onShopNowClick }: HeroProps) {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      
      <div className="relative h-full container mx-auto px-4 flex items-center justify-center">
        <div className="text-center text-white max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6" 
            data-testid="text-hero-title"
          >
            Authentic Indian Sweets
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl mb-8 text-white/90" 
            data-testid="text-hero-subtitle"
          >
            Traditional mithai made with finest ingredients and time-honored recipes
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="text-lg px-8 bg-primary/90 backdrop-blur-sm border border-primary-border hover-elevate active-elevate-2 transition-transform hover:scale-105"
              onClick={onShopNowClick}
              data-testid="button-shop-now"
            >
              Shop Now
            </Button>
          </motion.div>

          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-white/80"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2" 
              data-testid="text-free-shipping"
            >
              <span>🚚</span>
              <span>Free Delivery Over ₹500</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2" 
              data-testid="text-natural-ingredients"
            >
              <span>🌿</span>
              <span>100% Pure Ingredients</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2" 
              data-testid="text-handcrafted"
            >
              <span>✨</span>
              <span>Traditional Recipes</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
