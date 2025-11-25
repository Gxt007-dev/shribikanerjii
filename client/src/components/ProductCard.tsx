import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

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
  return (
    <Card 
      className="overflow-hidden hover-elevate cursor-pointer transition-all duration-300"
      onClick={() => onClick?.(id)}
      data-testid={`card-product-${id}`}
    >
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
            data-testid={`img-product-${id}`}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 p-4">
        <div className="w-full">
          <p className="text-xs text-muted-foreground mb-1" data-testid={`text-category-${id}`}>
            {category}
          </p>
          <h3 className="font-serif text-xl font-medium mb-2" data-testid={`text-name-${id}`}>
            {name}
          </h3>
          <p className="text-2xl font-bold text-primary" data-testid={`text-price-${id}`}>
            ${price}
          </p>
        </div>
        <Button 
          className="w-full" 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(id);
          }}
          data-testid={`button-add-to-cart-${id}`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
