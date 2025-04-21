import { useQuery } from '@tanstack/react-query';

import {
  productDetailsQueriesOptions,
  ProductDetailsQueriesOptions,
} from '@/features/product-details/api/product-details.query-factory-keys';
import { GetProductDetailsPayload } from '@/features/product-details/api/product-details.types';

export const useProductDetailsQuery = (
  payload: GetProductDetailsPayload,
  options?: ProductDetailsQueriesOptions
) => {
  return useQuery(productDetailsQueriesOptions.details(payload, options));
};
