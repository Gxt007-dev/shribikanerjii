import { ShoppingCart, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

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
            <Link href="/" className="flex items-center gap-2" data-testid="link-home">
              <span className="font-serif text-2xl font-bold text-primary">Shri Bikanerji</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md" data-testid="link-shop">
                Shop
              </Link>
              <Link href="/contact" className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md" data-testid="link-contact">
                Contact
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

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="icon"
                variant="ghost"
                className="relative"
                onClick={onCartClick}
                data-testid="button-cart"
              >
                <ShoppingCart className="h-5 w-5" />
                <AnimatePresence>
                  {cartItemCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -right-1 -top-1"
                    >
                      <Badge 
                        variant="destructive" 
                        className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                        data-testid="badge-cart-count"
                      >
                        <motion.span
                          key={cartItemCount}
                          initial={{ scale: 1.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {cartItemCount}
                        </motion.span>
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="md:hidden" data-testid="button-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="text-lg font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md" data-testid="link-mobile-shop">
                    Shop
                  </Link>
                  <Link href="/contact" className="text-lg font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md" data-testid="link-mobile-contact">
                    Contact
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
