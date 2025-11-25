import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface CategoryCardProps {
  name: string;
  image: string;
  onClick?: (name: string) => void;
}

export default function CategoryCard({ name, image, onClick }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="relative overflow-hidden h-64 cursor-pointer hover-elevate active-elevate-2 transition-all duration-300 group"
        onClick={() => onClick?.(name)}
        data-testid={`card-category-${name.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <motion.img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-300" />
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-6"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="font-serif text-3xl font-bold text-white" data-testid={`text-category-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>
            {name}
          </h3>
        </motion.div>
      </Card>
    </motion.div>
  );
}
