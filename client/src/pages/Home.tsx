import { useState, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import AdSense from "@/components/AdSense";
import { useToast } from "@/hooks/use-toast";
import { motion, useInView } from "framer-motion";

import gulabJamunImage from "@assets/generated_images/gulab_jamun_product_photo.png";
import kajuKatliImage from "@assets/generated_images/kaju_katli_product_photo.png";
import barfiImage from "@assets/generated_images/barfi_assortment_product_photo.png";
import jalebiImage from "@assets/generated_images/jalebi_product_photo.png";
import rasgullaImage from "@assets/generated_images/rasgulla_product_photo.png";
import giftBoxImage from "@assets/generated_images/indian_sweet_gift_box.png";
import barfiCategoryImage from "@assets/generated_images/barfi_category_showcase.png";
import friedSweetsCategoryImage from "@assets/generated_images/fried_sweets_category_showcase.png";
import giftBoxCategoryImage from "@assets/generated_images/indian_sweet_gift_box.png";

//todo: remove mock functionality
const MOCK_PRODUCTS = [
  { id: '1', name: 'Gulab Jamun', price: '299', category: 'Fried Sweets', image: gulabJamunImage },
  { id: '2', name: 'Kaju Katli', price: '599', category: 'Barfi', image: kajuKatliImage },
  { id: '3', name: 'Mithai Gift Box', price: '999', category: 'Gift Boxes', image: giftBoxImage },
  { id: '4', name: 'Assorted Barfi', price: '399', category: 'Barfi', image: barfiImage },
  { id: '5', name: 'Jalebi', price: '249', category: 'Fried Sweets', image: jalebiImage },
  { id: '6', name: 'Rasgulla', price: '199', category: 'Milk Sweets', image: rasgullaImage },
  { id: '7', name: 'Premium Mithai Box', price: '1499', category: 'Gift Boxes', image: giftBoxImage },
  { id: '8', name: 'Mixed Barfi', price: '449', category: 'Barfi', image: barfiImage },
];

//todo: remove mock functionality
const CATEGORIES = [
  { name: 'Barfi', image: barfiCategoryImage },
  { name: 'Fried Sweets', image: friedSweetsCategoryImage },
  { name: 'Gift Boxes', image: giftBoxCategoryImage },
];

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  
  const categoriesRef = useRef(null);
  const productsRef = useRef(null);
  const categoriesInView = useInView(categoriesRef, { once: true, amount: 0.2 });
  const productsInView = useInView(productsRef, { once: true, amount: 0.1 });

  const handleAddToCart = (productId: string) => {
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        quantity: 1,
        image: product.image,
      }]);
    }

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
      />

      <main className="flex-1">
        <Hero onShopNowClick={scrollToProducts} />

        <section ref={categoriesRef} className="container mx-auto px-4 py-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-4xl font-bold text-center mb-12" 
            data-testid="text-categories-title"
          >
            Shop by Category
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {CATEGORIES.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 50 }}
                animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CategoryCard
                  name={category.name}
                  image={category.image}
                  onClick={() => console.log('Category clicked:', category.name)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <AdSense format="horizontal" slot="homepage-banner" />
        </section>

        <section ref={productsRef} id="products" className="container mx-auto px-4 py-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-4xl font-bold text-center mb-12" 
            data-testid="text-products-title"
          >
            Featured Products
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {MOCK_PRODUCTS.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={productsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard
                  {...product}
                  onAddToCart={handleAddToCart}
                  onClick={(id) => console.log('Product clicked:', id)}
                />
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setCartOpen(false);
          toast({
            title: "Checkout",
            description: "Checkout functionality will be implemented soon!",
          });
        }}
      />
    </div>
  );
}
