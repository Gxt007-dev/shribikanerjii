import { useState } from 'react';
import CartDrawer from '../CartDrawer';
import { Button } from '@/components/ui/button';
import productImage from '@assets/generated_images/chocolate_truffle_product_photo.png';

export default function CartDrawerExample() {
  const [open, setOpen] = useState(true);
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Dark Chocolate Truffle',
      price: 12.99,
      quantity: 2,
      image: productImage,
    },
    {
      id: '2',
      name: 'Gummy Bears Mix',
      price: 8.99,
      quantity: 1,
      image: productImage,
    },
  ]);

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Open Cart</Button>
      <CartDrawer
        open={open}
        onOpenChange={setOpen}
        items={items}
        onUpdateQuantity={(id, quantity) => {
          if (quantity === 0) {
            setItems(items.filter(item => item.id !== id));
          } else {
            setItems(items.map(item => 
              item.id === id ? { ...item, quantity } : item
            ));
          }
        }}
        onRemoveItem={(id) => setItems(items.filter(item => item.id !== id))}
        onCheckout={() => console.log('Checkout clicked')}
      />
    </div>
  );
}
