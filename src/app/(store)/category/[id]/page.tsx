'use client';
import React, { use } from 'react';

import {
  useCategoryDetailsQuery,
  useProductsByCategoryQuery,
} from '@/features/categories/api/categories.query';
import ProductList from '@/features/products/components/product-list';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const CategoryProductsPage = (props: Props) => {
  const resolvedParams = use(props.params);
  const categoryId = resolvedParams.id;
  const { data: productsByCategory } = useProductsByCategoryQuery(
    { id: categoryId },
    { enabled: !!categoryId }
  );
  const { data: category } = useCategoryDetailsQuery(categoryId, {
    enabled: !!categoryId,
  });
  return <ProductList data={productsByCategory?.data || []} title={category?.name || ''} />;
};

export default CategoryProductsPage;
