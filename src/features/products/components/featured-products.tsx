import React, { useEffect } from 'react';

import { products } from '@/app/api/products/constants';
import { ResponseList } from '@/features/_api/api.types';
import { getFeaturedProducts } from '@/features/products/api/products.api';
import { Product } from '@/features/products/api/products.type';
import ProductList from '@/features/products/components/product-list';

type Props = {};

const mockProducts = {
  data: products,
  meta: {},
} satisfies ResponseList<Product>;
const FeaturedProducts = async (props: Props) => {
  const featuredProducts = mockProducts;

  return <ProductList data={featuredProducts.data ?? []} title="Featured Products" />;
};

export default FeaturedProducts;
