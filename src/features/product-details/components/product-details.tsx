'use client';

import { Separator } from '@radix-ui/react-separator';
import { Calendar, Leaf, Loader2, Minus, Plus, ShoppingCart, Truck } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import loading from '@/app/admin/analytics/ab-testing/loading';
import { Badge } from '@/features/base/components/ui/badge';
import { Button } from '@/features/base/components/ui/button';
import { toast } from '@/features/base/hooks/use-toast';
import { useAddToCartMutation } from '@/features/carts/api/carts.query';
import { selectableElements } from '@/features/common/common.constants';
import { useProductDetailsQuery } from '@/features/product-details/api/product-details.query';
import { ImageGallery } from '@/features/product-details/components/image-gallery';
import ProductDetailsEmpty from '@/features/product-details/components/product-details-empty';
import ProductDetailsLoading from '@/features/product-details/components/product-details-loading';

type Props = {
  productId: string;
};

const ProductDetails = (props: Props) => {
  const { productId } = props;
  const {
    data: product,
    isFetched,
    isFetching,
  } = useProductDetailsQuery({ id: productId }, { enabled: !!productId });

  const [quantity, setQuantity] = useState(1);
  const { mutateAsync: addToCart, isPending: loading } = useAddToCartMutation();

  const handleAddToCart = async () => {
    try {
      if (product) {
        await addToCart({
          item: {
            id: product.id,
            title: product.title,
            price: product.salePrice || product.price,
            type: product.type,
            image: product.image,
            farm: product.farm,
          },
          quantity,
        });
      }
      toast({
        description: `${quantity} ${quantity > 1 ? 'items' : 'item'} added to cart`,
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast({
        variant: 'destructive',
        description: 'Failed to add item to cart',
      });
    }
  };

  return isFetching ? (
    <ProductDetailsLoading />
  ) : !product ? (
    <ProductDetailsEmpty />
  ) : (
    <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Product Images */}
      <div>
        <ImageGallery images={product.images} />
      </div>

      {/* Product Details */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="secondary">{product.type}</Badge>
          <span className="text-gray-600">{product.category}</span>
        </div>

        <h1 className="mb-2 text-3xl font-bold" data-testid={selectableElements.product_title.id}>
          {product.title}
        </h1>

        <div className="mb-4 flex items-center gap-2">
          <span className="text-gray-600">From</span>
          <Link
            href={`/farm/${product.farm.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-primary hover:underline"
          >
            {product.farm}
          </Link>
        </div>

        <div className="mb-6 flex items-center gap-3">
          {product.salePrice ? (
            <>
              <span
                className="text-3xl font-bold text-primary"
                data-testid={selectableElements.product_price.id}
              >
                ${product.salePrice.toFixed(2)}
              </span>
              <span className="text-xl text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span
              className="text-3xl font-bold text-primary"
              data-testid={selectableElements.product_price.id}
            >
              ${product.price.toFixed(2)}
            </span>
          )}
          <span className="text-gray-600">/ {product.unit}</span>
        </div>

        <p className="mb-6 text-gray-700">{product.description}</p>

        <div className="mb-8 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Truck className="h-5 w-5 text-primary" />
            <span>Free local delivery on orders over $35</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Harvested within the last 24 hours</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Leaf className="h-5 w-5 text-primary" />
            <span>{product.type === 'Organic' ? 'Certified organic' : 'Sustainably grown'}</span>
          </div>
        </div>

        <Separator className="mb-6" />

        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={loading}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center text-lg font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => setQuantity(quantity + 1)}
              disabled={loading}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            className="flex-1 rounded-full"
            size="lg"
            onClick={handleAddToCart}
            disabled={loading || !product?.inStock}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
