import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  name: string;
  image: string;
  onClick?: (name: string) => void;
}

export default function CategoryCard({ name, image, onClick }: CategoryCardProps) {
  return (
    <Card 
      className="relative overflow-hidden h-64 cursor-pointer hover-elevate active-elevate-2 transition-all duration-300"
      onClick={() => onClick?.(name)}
      data-testid={`card-category-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <img 
        src={image} 
        alt={name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-serif text-3xl font-bold text-white" data-testid={`text-category-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>
          {name}
        </h3>
      </div>
    </Card>
  );
}
