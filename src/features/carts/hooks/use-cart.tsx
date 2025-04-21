import {
  useAddToCartMutation,
  useClearCartMutation,
  useGetCartQuery,
  useRemoveItemCartMutation,
  useUpdateQuantityCartMutation,
} from '@/features/carts/api/carts.query';

export type CartItem = {
  farm?: string;
  id: string;
  image: string;
  price: number;
  quantity: number;
  title: string;
  type: 'Organic' | 'Conventional' | 'Local';
};

export function useCart() {
  const { data: cart, isFetching: loading, refetch } = useGetCartQuery();
  const { mutateAsync: addToCart } = useAddToCartMutation();
  const { mutateAsync: updateQuantity, isPending: isUpdating } = useUpdateQuantityCartMutation();
  const { mutateAsync: removeItem, isPending: isRemoving } = useRemoveItemCartMutation();
  const { mutateAsync: clearCart, isPending: isClearing } = useClearCartMutation();

  const updating = isUpdating || isRemoving || isClearing;

  const itemCount = (cart?.items || []).reduce((acc, item) => acc + item.quantity, 0);

  return {
    cartItems: cart?.items,
    loading,
    updating,
    itemCount,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart: refetch,
  };
}
