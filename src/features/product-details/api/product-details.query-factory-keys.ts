import {
  DefaultError,
  keepPreviousData,
  queryOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

import { getProductDetails } from '@/features/product-details/api/product-details.api';
import {
  GetProductDetailsPayload,
  GetProductDetailsResponse,
} from '@/features/product-details/api/product-details.types';

export const productDetailsKeys = {
  all: ['product-details'] as const,
  lists: () => [...productDetailsKeys.all, 'list'] as const,
  details: (payload: GetProductDetailsPayload) =>
    [...productDetailsKeys.all, 'details', payload] as const,

  listFeatured: () => [...productDetailsKeys.lists(), 'featured'] as const,
};
export type ProductDetailsQueriesOptions = Partial<
  UseQueryOptions<
    GetProductDetailsResponse,
    DefaultError,
    GetProductDetailsResponse,
    ReturnType<typeof productDetailsKeys.details>
  >
>;

export const productDetailsQueriesOptions = {
  details: (payload: GetProductDetailsPayload, options?: ProductDetailsQueriesOptions) => {
    return queryOptions({
      ...options,
      queryKey: productDetailsKeys.details(payload),
      queryFn: () => getProductDetails(payload),
      placeholderData: keepPreviousData,
    });
  },
  listFeatured: () => {},
};
