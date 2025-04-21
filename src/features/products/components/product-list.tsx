import React from 'react';

import { Button } from '@/features/base/components/ui/button';
import { Product } from '@/features/products/api/products.type';
import { ProductCard } from '@/features/products/components/product-card';

type Props = { data: Product[]; title: string };

const ProductList = (props: Props) => {
  const { data, title } = props;
  return (
    <section className="bg-[#f8f7f3] py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">{title || ' '}</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
