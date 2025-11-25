import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
}

export default function CartDrawer({ 
  open, 
  onOpenChange, 
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle data-testid="text-cart-title">Your Cart ({items.length})</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-4 py-4">
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground py-8" data-testid="text-empty-cart">
                Your cart is empty
              </p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4" data-testid={`cart-item-${item.id}`}>
                  <div className="h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="h-full w-full object-cover"
                      data-testid={`img-cart-item-${item.id}`}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-sm" data-testid={`text-cart-item-name-${item.id}`}>
                        {item.name}
                      </h4>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 flex-shrink-0"
                        onClick={() => onRemoveItem?.(item.id)}
                        data-testid={`button-remove-${item.id}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm font-semibold" data-testid={`text-cart-item-price-${item.id}`}>
                      ₹{item.price.toFixed(0)}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => onUpdateQuantity?.(item.id, Math.max(0, item.quantity - 1))}
                        data-testid={`button-decrease-${item.id}`}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm" data-testid={`text-quantity-${item.id}`}>
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                        data-testid={`button-increase-${item.id}`}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        <SheetFooter className="flex-col gap-4">
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span data-testid="text-subtotal">₹{subtotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-primary" data-testid="text-total">₹{subtotal.toFixed(0)}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Button 
              className="w-full" 
              size="lg"
              disabled={items.length === 0}
              onClick={onCheckout}
              data-testid="button-checkout"
            >
              Proceed to Checkout
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onOpenChange(false)}
              data-testid="button-continue-shopping"
            >
              Continue Shopping
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
