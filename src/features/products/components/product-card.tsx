'use client';
import { Heart, Loader2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import ImageWithFallback from '@/features/base/components/image-with-fallback';
import { Badge } from '@/features/base/components/ui/badge';
import { Button } from '@/features/base/components/ui/button';
import { Card, CardContent, CardFooter } from '@/features/base/components/ui/card';
import { toast } from '@/features/base/hooks/use-toast';
import { useCart } from '@/features/carts/hooks/use-cart';
import { getPath } from '@/features/common/utils/routers';
import { Product } from '@/features/products/api/products.type';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    try {
      await addToCart({
        item: {
          id: product.id,
          title: product.title,
          price: product.salePrice || product.price,
          type: product.type,
          image: product.image,
          farm: product.farm,
        },
        quantity: 1,
      });

      toast({
        description: `${product.title} added to cart`,
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast({
        variant: 'destructive',
        description: 'Failed to add item to cart',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href={getPath('productDetails', product.id)} className="group">
      <Card className="overflow-hidden border-0 shadow-sm transition-all hover:shadow-md">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <ImageWithFallback
            src={product.image || '/placeholder.svg'}
            alt={product.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            width={200}
            height={200}
          />
          {product.salePrice && <Badge className="absolute left-2 top-2">Sale</Badge>}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 rounded-full bg-white/80 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
        <CardContent className="p-4">
          <div className="mb-1 flex items-center justify-between">
            <Badge variant="secondary" className="font-normal">
              {product.type}
            </Badge>
            <span className="text-sm text-gray-500">{product.farm}</span>
          </div>
          <h3 className="mb-1 line-clamp-2 font-medium">{product.title}</h3>
          <div className="flex items-center gap-2">
            {product.salePrice ? (
              <>
                <span className="font-bold text-primary">${product.salePrice.toFixed(2)}</span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
            )}
            <span className="text-sm text-gray-500">/ {product.unit}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full rounded-full"
            onClick={handleAddToCart}
            disabled={loading || !product.inStock}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ShoppingCart className="mr-2 h-4 w-4" />
            )}
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
