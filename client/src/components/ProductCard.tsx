import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  onAddToCart?: (id: string) => void;
  onClick?: (id: string) => void;
}

export default function ProductCard({ 
  id, 
  name, 
  price, 
  image, 
  category,
  onAddToCart,
  onClick 
}: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    onAddToCart?.(id);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="overflow-hidden hover-elevate cursor-pointer transition-all duration-300"
        onClick={() => onClick?.(id)}
        data-testid={`card-product-${id}`}
      >
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden bg-muted relative group">
            <motion.img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              data-testid={`img-product-${id}`}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
          </div>
        </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 p-4">
        <motion.div 
          className="w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs text-muted-foreground mb-1" data-testid={`text-category-${id}`}>
            {category}
          </p>
          <h3 className="font-serif text-xl font-medium mb-2" data-testid={`text-name-${id}`}>
            {name}
          </h3>
          <p className="text-2xl font-bold text-primary" data-testid={`text-price-${id}`}>
            ₹{price}
          </p>
        </motion.div>
        <Button 
          className="w-full transition-all duration-300" 
          onClick={handleAddToCart}
          disabled={isAdding}
          data-testid={`button-add-to-cart-${id}`}
        >
          <motion.div
            animate={isAdding ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isAdding ? "Added!" : "Add to Cart"}
          </motion.div>
        </Button>
      </CardFooter>
    </Card>
    </motion.div>
  );
}
