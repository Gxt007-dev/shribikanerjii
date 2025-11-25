import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import Footer from "@/components/Footer";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import AdSense from "@/components/AdSense";
import { useToast } from "@/hooks/use-toast";

import chocolateImage from "@assets/generated_images/chocolate_truffle_product_photo.png";
import gummyImage from "@assets/generated_images/gummy_bears_product_photo.png";
import giftBoxImage from "@assets/generated_images/chocolate_gift_box_photo.png";
import candyImage from "@assets/generated_images/hard_candies_product_photo.png";
import chocolateCategoryImage from "@assets/generated_images/chocolate_category_showcase.png";
import gummyCategoryImage from "@assets/generated_images/gummies_category_showcase.png";
import giftBoxCategoryImage from "@assets/generated_images/gift_boxes_category_showcase.png";

//todo: remove mock functionality
const MOCK_PRODUCTS = [
  { id: '1', name: 'Dark Chocolate Truffle', price: '12.99', category: 'Chocolates', image: chocolateImage },
  { id: '2', name: 'Gummy Bears Mix', price: '8.99', category: 'Gummies', image: gummyImage },
  { id: '3', name: 'Premium Gift Box', price: '29.99', category: 'Gift Boxes', image: giftBoxImage },
  { id: '4', name: 'Assorted Hard Candies', price: '6.99', category: 'Candies', image: candyImage },
  { id: '5', name: 'Milk Chocolate Bar', price: '5.99', category: 'Chocolates', image: chocolateImage },
  { id: '6', name: 'Sour Gummy Worms', price: '7.99', category: 'Gummies', image: gummyImage },
  { id: '7', name: 'Deluxe Chocolate Box', price: '49.99', category: 'Gift Boxes', image: giftBoxImage },
  { id: '8', name: 'Fruit Lollipops', price: '4.99', category: 'Candies', image: candyImage },
];

//todo: remove mock functionality
const CATEGORIES = [
  { name: 'Chocolates', image: chocolateCategoryImage },
  { name: 'Gummies', image: gummyCategoryImage },
  { name: 'Gift Boxes', image: giftBoxCategoryImage },
];

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

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

        <section className="container mx-auto px-4 py-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12" data-testid="text-categories-title">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {CATEGORIES.map((category) => (
              <CategoryCard
                key={category.name}
                name={category.name}
                image={category.image}
                onClick={() => console.log('Category clicked:', category.name)}
              />
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <AdSense format="horizontal" slot="homepage-banner" />
        </section>

        <section id="products" className="container mx-auto px-4 py-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12" data-testid="text-products-title">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
                onClick={(id) => console.log('Product clicked:', id)}
              />
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
