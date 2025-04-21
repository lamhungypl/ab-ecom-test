'use client';

import React, { useMemo, useState } from 'react';

import { Label } from '@/features/base/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/features/base/components/ui/radio-group';
import { Separator } from '@/features/base/components/ui/separator';
import { useGetCartQuery } from '@/features/carts/api/carts.query';
import OrderForm from '@/features/carts/components/order-form';

type Props = {};

const OrderSummary = (props: Props) => {
  const { data: cart } = useGetCartQuery();

  const subtotal = useMemo(
    () => (cart?.items || []).reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  const tax = subtotal * 0.05;
  const total = subtotal + tax;
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('delivery');

  const shipping = deliveryMethod === 'delivery' ? 5.99 : 0;
  const orderTotal = total + shipping;
  return (
    <div className="sticky top-4 rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

      <div className="mb-6 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="pt-3">
          <RadioGroup
            value={deliveryMethod}
            onValueChange={(value) => setDeliveryMethod(value as 'pickup' | 'delivery')}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup">Pickup (Free)</Label>
              </div>
              <span>$0.00</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label htmlFor="delivery">Delivery</Label>
              </div>
              <span>${shipping.toFixed(2)}</span>
            </div>
          </RadioGroup>
        </div>

        <Separator className="my-3" />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${orderTotal.toFixed(2)}</span>
        </div>
      </div>

      <OrderForm />
    </div>
  );
};

export default OrderSummary;
