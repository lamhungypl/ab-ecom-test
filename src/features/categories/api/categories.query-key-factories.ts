import {
  DefaultError,
  keepPreviousData,
  queryOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

import { PageParams } from '@/features/_api/api.types';
import {
  getCategoryDetails,
  getFeaturedCategories,
  getProductsByCategory,
} from '@/features/categories/api/categories.api';
import {
  Category,
  CategoryListFeaturedPayload,
  CategoryListFeaturedResponse,
  ProductsByCategoryPayload,
  ProductsByCategoryResponse,
} from '@/features/categories/api/categories.types';
import { Product } from '@/features/products/api/products.type';

export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (pageParams?: PageParams) => [...categoryKeys.lists(), pageParams] as const,
  listFeatured: (payload: CategoryListFeaturedPayload) =>
    [...categoryKeys.lists(), 'featured'] as const,
  details: (id: string) => [...categoryKeys.all, 'details', id] as const,
  productsByCategory: (payload: ProductsByCategoryPayload) =>
    [...categoryKeys.all, 'productsByCategory', payload] as const,
};

export type CategoryProductsQueriesOptions = Partial<
  UseQueryOptions<
    ProductsByCategoryResponse,
    DefaultError,
    ProductsByCategoryResponse,
    ReturnType<typeof categoryKeys.productsByCategory>
  >
>;
export type CategoryDetailsQueriesOptions = Partial<
  UseQueryOptions<Category, DefaultError, Category, ReturnType<typeof categoryKeys.details>>
>;
export type CategoryListFeaturedQueriesOptions = Partial<
  UseQueryOptions<
    CategoryListFeaturedResponse,
    DefaultError,
    CategoryListFeaturedResponse,
    ReturnType<typeof categoryKeys.listFeatured>
  >
>;

export const categoryQueriesOptions = {
  details: (id: string, options?: CategoryDetailsQueriesOptions) => {
    return queryOptions({
      queryKey: categoryKeys.details(id),
      queryFn: () => getCategoryDetails(id),
      placeholderData: keepPreviousData,
      ...options,
    });
  },
  listFeatured: (
    payload: CategoryListFeaturedPayload,
    options?: CategoryListFeaturedQueriesOptions
  ) => {
    return queryOptions({
      queryKey: categoryKeys.listFeatured(payload),
      queryFn: () => getFeaturedCategories(payload),
      placeholderData: keepPreviousData,
      ...options,
    });
  },

  productsByCategory: (
    payload: ProductsByCategoryPayload,
    options?: CategoryProductsQueriesOptions
  ) => {
    return queryOptions({
      queryKey: categoryKeys.productsByCategory(payload),
      queryFn: () => getProductsByCategory(payload),
      placeholderData: keepPreviousData,
      ...options,
    });
  },
};
