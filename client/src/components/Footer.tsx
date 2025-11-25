import { Link } from "wouter";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">
              SweetShop
            </h3>
            <p className="text-sm text-muted-foreground">
              Premium handcrafted sweets made with love and the finest ingredients.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/?category=chocolates">
                  <a className="text-muted-foreground hover:text-foreground" data-testid="link-chocolates">
                    Chocolates
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/?category=gummies">
                  <a className="text-muted-foreground hover:text-foreground" data-testid="link-gummies">
                    Gummies
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/?category=candies">
                  <a className="text-muted-foreground hover:text-foreground" data-testid="link-candies">
                    Candies
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/?category=gift-boxes">
                  <a className="text-muted-foreground hover:text-foreground" data-testid="link-gift-boxes">
                    Gift Boxes
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-foreground" data-testid="link-footer-contact">
                    Contact Us
                  </a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-shipping">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-returns">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-faq">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="h-10 w-10 rounded-md bg-muted flex items-center justify-center hover-elevate active-elevate-2"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-md bg-muted flex items-center justify-center hover-elevate active-elevate-2"
                data-testid="link-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-md bg-muted flex items-center justify-center hover-elevate active-elevate-2"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p data-testid="text-copyright">&copy; 2025 SweetShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
