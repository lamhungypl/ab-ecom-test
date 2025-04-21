import { useQuery } from '@tanstack/react-query';

import {
  CategoryDetailsQueriesOptions,
  CategoryListFeaturedQueriesOptions,
  CategoryProductsQueriesOptions,
  categoryQueriesOptions,
} from '@/features/categories/api/categories.query-key-factories';
import {
  CategoryListFeaturedPayload,
  ProductsByCategoryPayload,
} from '@/features/categories/api/categories.types';

export const useCategoryListFeaturedQuery = (
  payload: CategoryListFeaturedPayload,
  options?: CategoryListFeaturedQueriesOptions
) => {
  return useQuery(categoryQueriesOptions.listFeatured(payload, options));
};

export const useCategoryDetailsQuery = (id: string, options?: CategoryDetailsQueriesOptions) => {
  return useQuery(categoryQueriesOptions.details(id, options));
};

export const useProductsByCategoryQuery = (
  payload: ProductsByCategoryPayload,
  options?: CategoryProductsQueriesOptions
) => {
  return useQuery(categoryQueriesOptions.productsByCategory(payload, options));
};
