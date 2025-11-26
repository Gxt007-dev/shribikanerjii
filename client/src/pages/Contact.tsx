import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import { useToast } from "@/hooks/use-toast";
import { updateSEO, pageSEO } from "@/lib/seo";

export default function Contact() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    updateSEO(pageSEO.contact);
  }, []);

  const handleFormSubmit = (data: { name: string; email: string; subject: string; message: string }) => {
    console.log('Contact form submitted:', data);
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
      />

      <main className="flex-1">
        <ContactForm onSubmit={handleFormSubmit} />
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cartItems}
        onUpdateQuantity={() => {}}
        onRemoveItem={() => {}}
        onCheckout={() => {}}
      />
    </div>
  );
}
