import { ShoppingCart, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export default function Header({ cartItemCount = 0, onCartClick }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="/">
              <a className="flex items-center gap-2" data-testid="link-home">
                <span className="font-serif text-2xl font-bold text-primary">Shri Bikanerji</span>
              </a>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/">
                <a className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md" data-testid="link-shop">
                  Shop
                </a>
              </Link>
              <Link href="/contact">
                <a className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md" data-testid="link-contact">
                  Contact
                </a>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-2">
              {searchOpen ? (
                <Input
                  type="search"
                  placeholder="Search sweets..."
                  className="w-64"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                  data-testid="input-search"
                />
              ) : (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setSearchOpen(true)}
                  data-testid="button-search"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="relative"
              onClick={onCartClick}
              data-testid="button-cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  data-testid="badge-cart-count"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="md:hidden" data-testid="button-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/">
                    <a className="text-lg font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md" data-testid="link-mobile-shop">
                      Shop
                    </a>
                  </Link>
                  <Link href="/contact">
                    <a className="text-lg font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md" data-testid="link-mobile-contact">
                      Contact
                    </a>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
