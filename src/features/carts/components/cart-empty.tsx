import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/features/base/components/ui/button';
import { getPath } from '@/features/common/utils/routers';

type Props = {};

const CartEmpty = (props: Props) => {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-6 inline-block rounded-full bg-secondary p-6">
          <ShoppingCart className="h-12 w-12 text-primary" />
        </div>
        <h1 className="mb-4 text-3xl font-bold">Your cart is empty</h1>
        <p className="mb-8 text-gray-600">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link href={getPath('home')}>
          <Button size="lg" className="rounded-full">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
