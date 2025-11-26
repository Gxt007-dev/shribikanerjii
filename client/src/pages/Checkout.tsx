import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { updateSEO, pageSEO } from "@/lib/seo";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Checkout() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
  });

  const cartItems: CartItem[] = JSON.parse(sessionStorage.getItem("checkoutCart") || "[]");
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    updateSEO(pageSEO.checkout);
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header cartItemCount={0} onCartClick={() => {}} />
        <main className="flex-1 container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <Button onClick={() => navigate("/")} data-testid="button-back-to-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    if (!formData.customerName || !formData.customerEmail || !formData.shippingAddress) {
      toast({ title: "Error", description: "Please fill in all required fields" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          email: formData.customerEmail,
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          shippingAddress: formData.shippingAddress,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      toast({
        title: "Success!",
        description: "Order created. Redirect to payment processing soon.",
      });

      setTimeout(() => {
        sessionStorage.removeItem("checkoutCart");
        navigate("/");
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Checkout failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={0} onCartClick={() => {}} />

      <main className="flex-1 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-8"
            data-testid="button-back-to-shopping"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shopping
          </Button>

          <h1 className="text-4xl font-bold font-serif mb-12" data-testid="text-checkout-title">
            Checkout
          </h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="md:col-span-2 space-y-6">
              {/* Order Items */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4" data-testid="text-order-summary">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between pb-4 border-b last:border-b-0"
                      data-testid={`cart-item-${item.id}`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded object-cover"
                          data-testid={`img-item-${item.id}`}
                        />
                        <div>
                          <h3 className="font-medium" data-testid={`text-item-name-${item.id}`}>
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground" data-testid={`text-quantity-${item.id}`}>
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold" data-testid={`text-item-total-${item.id}`}>
                          ₹{(item.price * item.quantity).toFixed(0)}
                        </p>
                        <p className="text-sm text-muted-foreground" data-testid={`text-price-${item.id}`}>
                          ₹{item.price.toFixed(0)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Customer Details */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4" data-testid="text-customer-details">
                  Shipping Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full px-3 py-2 border rounded-md"
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      className="w-full px-3 py-2 border rounded-md"
                      data-testid="input-email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="w-full px-3 py-2 border rounded-md"
                      data-testid="input-phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Shipping Address *</label>
                    <textarea
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      placeholder="Street Address"
                      rows={3}
                      className="w-full px-3 py-2 border rounded-md"
                      data-testid="textarea-address"
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Order Total & Checkout */}
            <div>
              <Card className="p-6 sticky top-20">
                <h3 className="text-lg font-semibold mb-4" data-testid="text-order-total-title">
                  Order Total
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between" data-testid="text-subtotal">
                    <span>Subtotal</span>
                    <span>₹{total.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between" data-testid="text-shipping">
                    <span>Shipping</span>
                    <span>FREE</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary" data-testid="text-total">
                      ₹{total.toFixed(0)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                  data-testid="button-place-order"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </Button>
              </Card>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
