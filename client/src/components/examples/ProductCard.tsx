import ProductCard from '../ProductCard';
import productImage from '@assets/generated_images/chocolate_truffle_product_photo.png';

export default function ProductCardExample() {
  return (
    <div className="w-80">
      <ProductCard
        id="1"
        name="Dark Chocolate Truffle"
        price="12.99"
        category="Chocolates"
        image={productImage}
        onAddToCart={(id) => console.log('Added to cart:', id)}
        onClick={(id) => console.log('Product clicked:', id)}
      />
    </div>
  );
}
