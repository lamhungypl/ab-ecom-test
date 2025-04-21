import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';

import { cartApi } from '@/features/carts/api/carts.api';
import {
  cartKeys,
  cartQueriesOptions,
  GetCartQueriesOptions,
} from '@/features/carts/api/carts.query-key-factories';
import {
  AddToCartPayload,
  AddToCartResponse,
  ClearCartPayload,
  ClearCartResponse,
  RemoveFromCartPayload,
  RemoveFromCartResponse,
  SubmitOrderPayload,
  SubmitOrderResponse,
  UpdateQuantityCartPayload,
  UpdateQuantityCartResponse,
} from '@/features/carts/api/carts.types';

export const useGetCartQuery = (options?: GetCartQueriesOptions) => {
  return useQuery(cartQueriesOptions.details(options));
};

export const useAddToCartMutation = (
  options?: Partial<UseMutationOptions<AddToCartResponse, any, AddToCartPayload>>
) => {
  return useMutation({
    ...options,
    mutationFn: cartApi.addToCart,
    meta: {
      ...options?.meta,
      invalidates: () => {
        return { queryKey: cartKeys.details() };
      },
    },
  });
};

export const useUpdateQuantityCartMutation = (
  options?: Partial<UseMutationOptions<UpdateQuantityCartResponse, any, UpdateQuantityCartPayload>>
) => {
  return useMutation({
    ...options,
    mutationFn: cartApi.updateQuantity,
    meta: {
      ...options?.meta,
      invalidates: () => {
        return { queryKey: cartKeys.details() };
      },
    },
  });
};

export const useRemoveItemCartMutation = (
  options?: Partial<UseMutationOptions<RemoveFromCartResponse, any, RemoveFromCartPayload>>
) => {
  return useMutation({
    ...options,
    mutationFn: cartApi.removeFromCart,
    meta: {
      ...options?.meta,
      invalidates: () => {
        return { queryKey: cartKeys.details() };
      },
    },
  });
};

export const useClearCartMutation = (
  options?: Partial<UseMutationOptions<ClearCartResponse, any, ClearCartPayload>>
) => {
  return useMutation({
    ...options,
    mutationFn: cartApi.clearCart,
    meta: {
      ...options?.meta,
      invalidates: () => {
        return { queryKey: cartKeys.details() };
      },
    },
  });
};

export const useSubmitOrderMutation = (
  options?: Partial<UseMutationOptions<SubmitOrderResponse, any, SubmitOrderPayload>>
) => {
  return useMutation({
    ...options,
    mutationFn: cartApi.submitOrder,
    meta: {
      ...options?.meta,
      invalidates: () => {
        return { queryKey: cartKeys.details() };
      },
    },
  });
};
