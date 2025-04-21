'use client';

import { Loader2 } from 'lucide-react';

import { useGetCartQuery } from '@/features/carts/api/carts.query';
import CartEmpty from '@/features/carts/components/cart-empty';
import CartList from '@/features/carts/components/cart-list';
import OrderSummary from '@/features/carts/components/order-summary';

const CartPage = () => {
  const { data: cartItems, isLoading: loading } = useGetCartQuery();

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[400px] items-center justify-center px-4 py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if ((cartItems?.items || []).length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CartList />
        </div>

        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
