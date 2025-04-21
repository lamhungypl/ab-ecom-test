import Link from 'next/link';
import React from 'react';

import { Button } from '@/features/base/components/ui/button';
import { getPath } from '@/features/common/utils/routers';

type Props = {};

const ProductDetailsEmpty = (props: Props) => {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="mb-4 text-2xl font-bold">Product not found</h1>
      <Link href={getPath('home')}>
        <Button>Return to Home</Button>
      </Link>
    </div>
  );
};

export default ProductDetailsEmpty;
