import {
  DefaultError,
  keepPreviousData,
  queryOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

import { cartApi } from '@/features/carts/api/carts.api';
import { GetCartResponse } from '@/features/carts/api/carts.types';

export const cartKeys = {
  all: ['carts'] as const,
  details: () => [...cartKeys.all, 'details'] as const,
};

export type GetCartQueriesOptions = Partial<
  UseQueryOptions<
    GetCartResponse,
    DefaultError,
    GetCartResponse,
    ReturnType<typeof cartKeys.details>
  >
>;

export const cartQueriesOptions = {
  details: (options?: GetCartQueriesOptions) => {
    return queryOptions({
      queryKey: cartKeys.details(),
      queryFn: () => cartApi.getCart(),
      placeholderData: keepPreviousData,
      ...options,
    });
  },
};
