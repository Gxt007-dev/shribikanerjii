import CategoryCard from '../CategoryCard';
import categoryImage from '@assets/generated_images/chocolate_category_showcase.png';

export default function CategoryCardExample() {
  return (
    <div className="w-96">
      <CategoryCard
        name="Chocolates"
        image={categoryImage}
        onClick={(name) => console.log('Category clicked:', name)}
      />
    </div>
  );
}
