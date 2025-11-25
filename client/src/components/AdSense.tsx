import { Card } from "@/components/ui/card";

interface AdSenseProps {
  slot?: string;
  format?: 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

export default function AdSense({ slot = 'demo', format = 'horizontal', className = '' }: AdSenseProps) {
  const heights = {
    horizontal: 'h-24',
    vertical: 'h-96',
    rectangle: 'h-64',
  };

  return (
    <Card className={`${heights[format]} flex items-center justify-center bg-muted/50 ${className}`}>
      <div className="text-center text-muted-foreground">
        <p className="text-sm font-medium" data-testid="text-adsense-placeholder">Google AdSense</p>
        <p className="text-xs" data-testid="text-adsense-slot">{format} ad • slot: {slot}</p>
      </div>
    </Card>
  );
}
